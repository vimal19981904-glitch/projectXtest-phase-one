const fs = require('fs');
const path = require('path');

/**
 * Generic Domain Injector
 * 
 * Usage: 
 * const entry = buildDomainEntry();
 * injectDomain('domain-slug-key', entry);
 */

function replaceKey(map, key, entryJson) {
  const startMarker = `${key}: {`;
  const startIdx = map.indexOf(startMarker);
  if (startIdx === -1) return null;

  let bracketCount = 0;
  let endIdx = -1;
  for (let i = startIdx + startMarker.length - 1; i < map.length; i++) {
    if (map[i] === '{') bracketCount++;
    else if (map[i] === '}') {
      bracketCount--;
      if (bracketCount === 0) { endIdx = i; break; }
    }
  }
  if (endIdx === -1) return null;

  let afterEnd = endIdx + 1;
  if (map[afterEnd] === ',') afterEnd++;

  return map.substring(0, startIdx) + `${key}: ${entryJson},` + map.substring(afterEnd);
}

function injectDomain(targetKey, entryObject) {
  const mapPath = path.join(process.cwd(), 'lib', 'domainContentMap.js');
  let map = fs.readFileSync(mapPath, 'utf8');

  const keyString = `"${targetKey}"`;
  const entryJson = JSON.stringify(entryObject, null, 2);

  if (map.includes(keyString)) {
    const updated = replaceKey(map, keyString, entryJson);
    if (updated) { 
      map = updated; 
      console.log(`✅ Replaced existing "${targetKey}" entry.`); 
    }
  } else {
    // Insert at the very top of the map object
    const insertIdx = map.indexOf('{') + 1;
    map = map.substring(0, insertIdx) + `\n  ${keyString}: ${entryJson},` + map.substring(insertIdx);
    console.log(`✅ Inserted new "${targetKey}" entry.`);
  }

  fs.writeFileSync(mapPath, map, 'utf8');
  console.log(`📦 domainContentMap.js updated. Total size: ${(map.length / 1024).toFixed(1)} KB`);
}

// Export for other scripts to use
module.exports = { injectDomain };

// If run directly, inject a skeleton for Kinaxis
if (require.main === module) {
  const kinaxisEntry = {
    title: "Kinaxis RapidResponse Training",
    category: "ERP & Supply Chain",
    icon: "⚙️",
    color: "#0ea5e9",
    heroDescription: "Master Kinaxis RapidResponse with our expert-led training. Learn concurrent planning, supply chain visibility, and advanced analytics.",
    about: "Kinaxis RapidResponse is a leading concurrent planning platform. Our training covers the complete ecosystem from basic navigation to advanced supply chain planning, demand management, and scenario execution.",
    seo: {
      metaTitle: "Kinaxis RapidResponse Training & Job Support | GapAnchor",
      metaDescription: "Top-rated Kinaxis online training and 24/7 job support by GapAnchor. Master concurrent planning and supply chain visibility.",
      keywords: "Kinaxis training, RapidResponse training, Kinaxis job support, concurrent planning"
    },
    features: [
      {
        title: "Concurrent Planning",
        desc: "Learn to manage end-to-end supply chain planning in a single platform."
      },
      {
        title: "Scenario Management",
        desc: "Master what-if scenario execution to respond to supply chain disruptions instantly."
      }
    ],
    curriculum: [
      {
        id: 1,
        name: "Introduction to Kinaxis RapidResponse",
        level: "Foundation",
        duration: "4 Hours",
        topics: [
          "Platform Overview",
          "Navigation & UI",
          "Basic Workbooks & Dashboards"
        ]
      }
    ],
    trainer: {
      name: "Senior Kinaxis Consultant",
      experience: "10+ Years",
      bio: "Lead Supply Chain Consultant with extensive experience in global Kinaxis implementations.",
      expertise: [
        "Concurrent Planning",
        "Demand Management",
        "Supply Chain Visibility"
      ]
    },
    faqs: [
      {
        q: "Do you provide Kinaxis job support?",
        a: "Yes, we offer 24/7 production job support for Kinaxis RapidResponse implementations."
      }
    ],
    streams: [
      {
        name: "Kinaxis RapidResponse Author",
        content: "### Overview\nLearn to build and customize workbooks, dashboards, and advanced analytics in RapidResponse."
      },
      {
        name: "Kinaxis Supply Chain Planning",
        content: "### Overview\nMaster the core planning functions including demand, supply, and inventory management."
      }
    ],
    relatedTraining: ["Manhattan WMS", "Blue Yonder WMS", "SAP SCM"],
    plans: [
      {
        name: "Individual Training",
        price: "Contact for Quote",
        features: [
          "Customized course content",
          "Flexible schedule",
          "Study material provided"
        ]
      }
    ]
  };

  injectDomain('kinaxis-training', kinaxisEntry);
}
