const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const DOMAIN_DATA_PATH = path.join(__dirname, 'lib', 'domainData.js');
const CONTENT_MAP_PATH = path.join(__dirname, 'lib', 'domainContentMap.js');

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchHTML(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => { resolve(data); });
    }).on('error', (err) => { reject(err); });
  });
}

// Fallback AI Content Generator
function generateFallbackStreams(domainName) {
  const baseName = domainName.replace(' Training', '').replace(' Online Job Support', '').trim();
  return [
    {
      name: `${baseName} Implementation & Configuration`,
      description: `Master the core setup, environment configuration, and business logic of ${baseName}.`,
      body: [
        `${baseName} implementation requires a deep understanding of enterprise architecture and business process alignment. This stream covers the initial setup, environment provisioning, and core configuration parameters needed for a successful rollout.`,
        `You will learn how to map organizational hierarchies, define security roles, and establish data governance standards within the ${baseName} ecosystem. Our experts provide hands-on guidance on configuring system preferences and global settings.`,
        `Advanced topics include performance tuning, troubleshooting common implementation hurdles, and preparing for system cutover in high-stakes production environments.`
      ]
    },
    {
      name: `${baseName} Technical Architecture`,
      description: `Deep dive into the underlying data models, API integrations, and cloud infrastructure of ${baseName}.`,
      body: [
        `Understanding the technical foundation of ${baseName} is critical for developers and system architects. This course explores the underlying data structures, schema relationships, and database optimization techniques used by the platform.`,
        `We cover REST/SOAP API integration patterns, middleware connectivity, and real-time data synchronization between ${baseName} and other enterprise systems like ERPs and CRMs.`,
        `Learn to build custom extensions, automate repetitive tasks via scripting, and leverage the platform's native developer tools to enhance core functionality.`
      ]
    },
    {
      name: `${baseName} Operations & Support`,
      description: `Daily administration, incident management, and 24/7 job support for ${baseName} production environments.`,
      body: [
        `Efficiently managing a live ${baseName} environment requires proactive monitoring and rapid incident response. This stream focuses on day-to-day operations, log analysis, and system health checks.`,
        `Our 24/7 job support model is integrated here, providing you with real-world scenarios for resolving production bugs, user access issues, and workflow bottlenecks.`,
        `Master the tools used for system administration, update deployments, and performance monitoring to ensure maximum uptime and operational efficiency for your enterprise.`
      ]
    }
    // More could be added dynamically
  ];
}

async function populate() {
  console.log("Starting stream population...");

  // Load current map
  let contentMapStr = fs.readFileSync(CONTENT_MAP_PATH, 'utf8');
  // Simple regex to extract the object part. Note: This assumes a specific format.
  // In production, we'd use a parser, but for this task, we'll be careful.
  
  // For the sake of this script, we will just target a few specific domains 
  // and inject their streams to demonstrate the "Manhattan Model".

  const targetSlugs = [
    { slug: 'oracle-scm-cloud', name: 'Oracle Fusion SCM', url: 'https://www.maxmunus.com/page/Oracle-Fusion-SCM-Online-Training-and-Certification-Guidance' },
    { slug: 'blue-yonder-wms', name: 'Blue Yonder WMS', url: 'https://www.maxmunus.com/page/BlueYonder-Training' },
    { slug: 'sap-scm', name: 'SAP SCM', url: 'https://www.maxmunus.com/page/SAP-SCM-Training' },
    { slug: 'e2open-training', name: 'E2open', url: 'https://www.maxmunus.com/page/E2open-Training' }
  ];

  for (const item of targetSlugs) {
    console.log(`Processing ${item.name}...`);
    let streams = [];
    
    try {
      const html = await fetchHTML(item.url);
      // Extract from Course Content tab (tab2)
      const tabMatch = html.match(/id="tab2"[\s\S]*?<\/div>/i);
      if (tabMatch) {
        const tabHtml = tabMatch[0];
        const moduleRegex = /<strong><span[^>]*>(.*?)<\/span><\/strong>/gi;
        let m;
        while ((m = moduleRegex.exec(tabHtml)) !== null) {
          const name = m[1].replace(/<[^>]+>/g, '').trim();
          if (name && name.length > 5 && !name.includes('TIMINGS')) {
            streams.push({
              name: name,
              description: `Master ${name} within the ${item.name} ecosystem with expert-led deep dives and real-time support.`,
              body: [
                `This module focuses on ${name}, a critical component of the ${item.name} platform. You will learn the fundamental concepts, configuration best practices, and operational workflows associated with this area.`,
                `Our training covers real-world scenarios and production-level troubleshooting, ensuring you can manage ${name} effectively in any enterprise environment.`,
                `By the end of this stream, you will be proficient in ${name} setup, management, and optimization, backed by our 24/7 job support.`
              ]
            });
          }
        }
      }
    } catch (e) {
      console.log(`Failed to fetch ${item.name}, using fallback.`);
    }

    if (streams.length === 0) {
      streams = generateFallbackStreams(item.name);
    }

    // Inject into domainContentMap.js (Rough injection for demo)
    // We'll replace the existing domain object if it exists
    const streamsJson = JSON.stringify(streams, null, 6);
    const domainRegex = new RegExp(`"${item.slug}": \\{[\\s\\S]*?\\n  \\},`, 'g');
    
    // This is risky for a large file, so we'll just log what we found for now 
    // and I will do the actual file update in the next step to be safe.
    console.log(`Discovered ${streams.length} streams for ${item.slug}`);
  }
}

populate();
