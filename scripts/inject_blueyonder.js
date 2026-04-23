const fs = require('fs');
const path = require('path');

// ── helpers ────────────────────────────────────────────────────────────────
function brand(text) {
  return text.replace(/MaxMunus/gi, 'GapAnchor');
}

function clean(line) {
  // strip leading bullets / markdown artifacts
  return line
    .replace(/^[·•§üøÂ·ÂÂ·Â·]+\s*/, '')
    .replace(/^&#x20;\s*/, '')
    .replace(/^&#\d+;\s*/, '')
    .replace(/^[*_]+|[*_]+$/g, '')
    .replace(/\\/g, '')
    .trim();
}

const SKIP_PATTERNS = [
  /^INDIVIDUAL TRAINING BENEFIT/i,
  /^CORPORATE TRAINING BENEFIT/i,
  /^Individual Training Benefit/i,
  /^Corporate Training Benefit/i,
  /^Course Duration/i,
  /^Course Time/i,
  /^Training Mode/i,
  /^Training Time/i,
  /^Trainer[-–—]/i,
  /^Connecting Tool/i,
  /^Duration/i,
  /^Customize .+ Course Content/i,
  /^Our Individual .+ Training program/i,
  /^Industry Specific Subject Matter/i,
  /^Flexibility to choose/i,
  /^Get Flexibility/i,
  /^GapAnchor will provide/i,
  /^GapAnchor has successfully/i,
  /^GapAnchor will help/i,
  /^Few of the clients/i,
  /^DHL \| PWC/i,
  /^Explore Our Other/i,
  /^Why Choose GapAnchor/i,
  /^Complete Customization of/i,
  /^Our GapAnchor/i,
  /^Our Blue Yonder/i,
  /^When it comes to/i,
  /^For more information/i,
  /^For more details/i,
  /^You can reach us/i,
];

function shouldSkip(line) {
  return SKIP_PATTERNS.some(p => p.test(line));
}

// ── parse sections from the .md ────────────────────────────────────────────
function cleanHeading(h) {
  return h
    .replace(/###\s*/g, '')           // remove embedded ###
    .replace(/&#x20;/gi, ' ')         // HTML entity
    .replace(/&amp;/gi, '&')          // HTML entity
    .replace(/\\([&])/g, '$1')        // escaped chars
    .replace(/\s+/g, ' ')
    .trim();
}

function parseMD(mdPath) {
  const raw = fs.readFileSync(mdPath, 'utf8');
  const text = brand(raw);

  // Split on any ### heading (preceded by newline or start)
  const parts = text.split(/(?:^|\n)###[ \t]+/m);
  // parts[0] is the preamble before any ### heading

  const streams = [];
  const seenNames = new Set();

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    const lines = part.split('\n');
    let heading = cleanHeading(lines[0]);
    if (!heading || /^\s*$/.test(heading)) continue;

    // Normalise to "Blue Yonder X Training" format
    const displayName = heading.startsWith('Blue Yonder') || heading.startsWith('JDA')
      ? heading
      : `Blue Yonder ${heading}`;

    // Deduplicate
    const key = displayName.toLowerCase().replace(/\s+/g, ' ');
    if (seenNames.has(key)) continue;
    seenNames.add(key);

    // Skip the preamble section (not a real module)
    if (/^blue yonder\s+(blue\s*yonder\s+)?training\s*$/i.test(displayName)) continue;

    const bodyLines = [];
    const courseContentLines = [];
    let inCourseContent = false;
    let inFAQ = false;
    let description = '';

    for (let j = 1; j < lines.length; j++) {
      let raw = lines[j];
      let line = clean(brand(raw));
      if (!line) continue;

      // FAQ section → skip
      if (/^FAQs?\s+for/i.test(line) || /^Q\.\s/.test(line) || /^Ans:/i.test(line) || /^Ans\./i.test(line)) {
        inFAQ = true;
        continue;
      }
      if (inFAQ) continue;

      // Course content section
      if (/^Course Content/i.test(line)) {
        inCourseContent = true;
        continue;
      }

      if (inCourseContent) {
        if (line.length > 5) courseContentLines.push(line);
        continue;
      }

      if (shouldSkip(line)) continue;

      if (line.length > 40) {
        bodyLines.push(line);
        if (!description) description = line.substring(0, 200);
      }
    }

    // Use a meaningful description
    if (!description) {
      description = `${displayName} training covers concepts from Basic to Advanced level. Fully customizable for individual and corporate clients.`;
    }

    streams.push({
      name: displayName,
      description: description.substring(0, 200) + (description.length > 200 ? '...' : ''),
      body: bodyLines.slice(0, 15),
      courseContent: courseContentLines.slice(0, 20),
    });
  }

  return streams;
}

// ── build the full entry object ────────────────────────────────────────────
function buildEntry(streams) {
  return {
    title: 'Blue Yonder (JDA) Training & Job Support',
    category: 'ERP & Supply Chain',
    icon: '🔗',
    color: '#1d4ed8',
    heroDescription:
      "Master Blue Yonder (formerly JDA) – the world's leading supply chain platform. GapAnchor's real-time consultants deliver hands-on WMS, TMS, Demand Planning, and 15+ module training with 24/7 job support.",
    about:
      "GapAnchor's Blue Yonder training covers the complete JDA/Blue Yonder ecosystem: Warehouse Management (WMS), Transportation Management (TMS), Labor Management, Price & Revenue Management (PRM), Enterprise Planning, Luminate Platform, Assortment Management, Space Planning, Floor Planning, Demand Planning, Supply Planning, Cloud Transformation, Logistics Network, Returns Management, Sales & Operations Execution, Supply Chain Planning & Execution, Warehouse Execution, and more. Our certified consultants deliver real-time scenario-based training for both individuals and corporate teams. GapAnchor has successfully conducted 1000+ corporate training sessions across India, USA, UK, Germany, UAE, Saudi Arabia, Australia, Singapore, Japan, South Korea, and 30+ other countries.",
    seo: {
      metaTitle: 'Blue Yonder JDA Online Training & Job Support | GapAnchor',
      metaDescription:
        'Top-rated Blue Yonder (JDA) online training and 24/7 job support by GapAnchor. Master WMS, TMS, Demand Planning, Luminate Platform and 15+ modules with real-time project scenarios.',
      keywords:
        'Blue Yonder training, JDA training, Blue Yonder WMS, Blue Yonder TMS, Blue Yonder job support, JDA online course, Blue Yonder certification, supply chain training, JDA WMS training, Blue Yonder Luminate',
    },
    features: [
      {
        title: 'Blue Yonder WMS Mastery',
        desc: 'End-to-end training on Blue Yonder Warehouse Management System – inbound, outbound, inventory, wave management, and system configuration.',
      },
      {
        title: 'TMS & Transportation',
        desc: 'Master Blue Yonder TMS from tariff structures and Transportation Modeler to Smart Bench features and carrier portal management.',
      },
      {
        title: 'Demand & Supply Planning',
        desc: 'Configure SCPO, Demand Planning, Fulfillment, Supply Planning and Inventory Optimization to align supply with customer demand.',
      },
      {
        title: 'Luminate Platform',
        desc: 'Leverage the Blue Yonder Luminate Control Tower, Planning, and Experience capabilities for end-to-end supply chain visibility.',
      },
      {
        title: 'Labor & Workforce Management',
        desc: 'Optimize workforce productivity with Blue Yonder Labor Management, Workforce Management, and Task Management training.',
      },
      {
        title: 'Retail & Merchandise Solutions',
        desc: 'Training on Space Planning, Floor Planning, Assortment Management, MMS, MMHF, PMM, and Retail Lifecycle Pricing.',
      },
      {
        title: 'Cloud Transformation',
        desc: 'Learn how to migrate Blue Yonder supply chain applications to the cloud with our Cloud Transformation and Logistics Network training.',
      },
      {
        title: '24/7 Real-Time Job Support',
        desc: 'On-call production support for critical issues, go-live cutover, integration debugging, and complex workflow configurations.',
      },
    ],
    curriculum: [
      {
        id: 1,
        name: 'Introduction to Blue Yonder Solutions',
        level: 'Foundation',
        duration: '4 Hours',
        topics: [
          'Supply Chain Management Basics',
          'Blue Yonder Product Portfolio Overview',
          'JDA to Blue Yonder: Rebranding & New Capabilities',
          'Navigation & UI Fundamentals',
        ],
      },
      {
        id: 2,
        name: 'Warehouse Management System (WMS)',
        level: 'Core',
        duration: '10 Hours',
        topics: [
          'Inbound & Outbound Operations',
          'Inventory Control & Wave Management',
          'System Configuration & User Management',
          'Integration with ERP & MHE Systems',
        ],
      },
      {
        id: 3,
        name: 'Transportation Management System (TMS)',
        level: 'Core',
        duration: '8 Hours',
        topics: [
          'Tariff Structures & Operational Lifecycle',
          'Transportation Modeler & Strategy Files',
          'Transportation Smart Bench (TSB)',
          'Carrier Portal & Tender Notices',
        ],
      },
      {
        id: 4,
        name: 'Demand Planning & Fulfillment',
        level: 'Advanced',
        duration: '20-25 Hours',
        topics: [
          'Blue Yonder SCPO Introduction',
          'Demand Table Structures & Master Data',
          'Demand Process: Reconciliation & Publish FCST',
          'Supply Planning & Batch Overview',
        ],
      },
      {
        id: 5,
        name: 'Enterprise Planning & Luminate Platform',
        level: 'Advanced',
        duration: '15-20 Hours',
        topics: [
          'ESP Plan & Manufacturing Planning Solution',
          'Luminate Control Tower & Planning',
          'Sales & Operations Execution (S&OE)',
          'Exception Management with Agile Control Tower',
        ],
      },
      {
        id: 6,
        name: 'Retail & Merchandise Modules',
        level: 'Specialist',
        duration: '20 Hours',
        topics: [
          'Space Planning & Floor Planning',
          'Assortment Management & Luminate Assortment',
          'MMS, MMHF & PMM Training',
          'Retail Lifecycle Pricing & PRM',
        ],
      },
    ],
    trainer: {
      name: 'Senior Blue Yonder Consultant',
      experience: '13+ Years',
      bio: 'Lead Supply Chain Consultant with extensive experience in global Blue Yonder/JDA implementations across retail, manufacturing, and 3PL sectors. Certified in WMS, TMS, Demand Planning, and the Luminate Platform.',
      expertise: [
        'Blue Yonder WMS & TMS',
        'Demand & Supply Planning',
        'Luminate Platform',
        'Retail & Merchandise Solutions',
        'Cloud Transformation',
      ],
    },
    faqs: [
      {
        q: 'Is it worth joining Blue Yonder Training at GapAnchor?',
        a: 'Yes. We have a pool of Industry-Specific Subject Matter Experts with over 13 years of experience. They share real-time implementation challenges, case studies, and provide soft copies of study material, making you project-ready from day one.',
      },
      {
        q: 'What are the delivery modes for the training?',
        a: 'We provide Online Instructor-led live training for individuals. For corporate clients, we also offer classroom training in your campus or ours. Group classes have both classroom and online options.',
      },
      {
        q: 'Do you provide a Job Guarantee?',
        a: 'We focus on high-level quality training that makes you employable. We assist with Resume Building, Mock Interviews, and sharing open positions in Blue Yonder across the world.',
      },
      {
        q: 'Can I attend a demo session before enrollment?',
        a: 'We are confident in our quality, but we do connect you with a trainer to fix the Blue Yonder training agenda according to your specific requirements before you start.',
      },
      {
        q: 'Do you provide a Course Completion Certificate?',
        a: 'Yes, GapAnchor provides a Course Completion Certificate recognized by the industry. It adds significant value to your professional profile and helps in certification exam preparation.',
      },
      {
        q: 'Can I cancel my enrollment and get a refund?',
        a: 'Our training quality is very high, so cancellations are rare. If you have time availability issues, you can reschedule anytime. If cancellation is needed, we deduct admin cost and refund the remaining amount.',
      },
      {
        q: 'Is the training live or pre-recorded?',
        a: 'All training sessions are Live Instructor-Led Online Training. You interact directly with a real-time certified Blue Yonder consultant.',
      },
      {
        q: 'Do you offer crash courses?',
        a: 'Yes, crash course options are available for all Blue Yonder modules at an accelerated pace to match your timeline.',
      },
    ],
    streams: streams,
    relatedTraining: ['Manhattan WMS', 'SAP SCM', 'Oracle SCM Cloud', 'SAP EWM'],
    plans: [
      {
        name: 'Individual Training',
        price: 'Contact for Quote',
        features: [
          'Fully customized course content',
          'Real-time scenario-based case studies',
          'Flexible schedule (weekdays/weekends)',
          'Study material & PPT provided',
          'Certification exam guidance',
          'Course Completion Certificate',
        ],
      },
      {
        name: 'Corporate Training Bundle',
        price: 'Contact for Quote',
        features: [
          'Customized to company project requirements',
          'Classroom or online delivery',
          'Industry-specific subject matter experts',
          'Flexible location, mode & schedule',
          'Step-by-step progress assessment',
          'Course Completion Certificate',
        ],
      },
      {
        name: '24/7 Production Job Support',
        price: 'Monthly / Task-Based',
        features: [
          'Immediate assistance for production bugs',
          'Critical go-live cutover support',
          'Complex workflow configuration help',
          'Integration debugging (ERP, MHE, API)',
          'Dedicated Blue Yonder expert access',
        ],
      },
    ],
  };
}

// ── replace a key in the map ────────────────────────────────────────────────
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

// ── inject into domainContentMap.js ────────────────────────────────────────
function inject(byEntry, bywmsEntry) {
  const mapPath = path.join(process.cwd(), 'lib', 'domainContentMap.js');
  let map = fs.readFileSync(mapPath, 'utf8');

  // 1. Update / insert "blueyonder-training"
  const byKey = '"blueyonder-training"';
  const byJson = JSON.stringify(byEntry, null, 2);

  if (map.includes(byKey)) {
    const updated = replaceKey(map, byKey, byJson);
    if (updated) { map = updated; console.log('✅ Replaced "blueyonder-training" entry.'); }
  } else {
    const anchorKey = '"manhattan-wms-training"';
    const anchorIdx = map.indexOf(anchorKey);
    if (anchorIdx !== -1) {
      const blockStart = map.indexOf('{', anchorIdx);
      let bc = 0, blockEnd = -1;
      for (let i = blockStart; i < map.length; i++) {
        if (map[i] === '{') bc++;
        else if (map[i] === '}') { bc--; if (bc === 0) { blockEnd = i; break; } }
      }
      let insertAt = blockEnd + 1;
      if (map[insertAt] === ',') insertAt++;
      map = map.substring(0, insertAt) + `\n  ${byKey}: ${byJson},` + map.substring(insertAt);
    } else {
      const insertIdx = map.indexOf('{') + 1;
      map = map.substring(0, insertIdx) + `\n  ${byKey}: ${byJson},` + map.substring(insertIdx);
    }
    console.log('✅ Inserted new "blueyonder-training" entry.');
  }

  // 2. Always replace "blue-yonder-wms" with full 29-stream content
  const wmsKey = '"blue-yonder-wms"';
  if (map.includes(wmsKey)) {
    const wmsJson = JSON.stringify(bywmsEntry, null, 2);
    const updated = replaceKey(map, wmsKey, wmsJson);
    if (updated) { map = updated; console.log('✅ Replaced "blue-yonder-wms" with all 29 streams.'); }
    else { console.warn('⚠  Could not replace blue-yonder-wms entry.'); }
  }

  fs.writeFileSync(mapPath, map, 'utf8');
  console.log(`📦 domainContentMap.js updated. Total size: ${(map.length / 1024).toFixed(1)} KB`);
}

// ── main ────────────────────────────────────────────────────────────────────
const MD_PATH = 'c:\\Users\\ARUL XAVIER\\AppData\\Local\\Packages\\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\\LocalState\\sessions\\28A490AFC6635CCB54BB834B708B962602A983BC\\transfers\\2026-17\\BlueYonder Training.md';

console.log('📖 Parsing BlueYonder Training.md …');
const streams = parseMD(MD_PATH);
console.log(`   Found ${streams.length} training streams:`);
streams.forEach((s, i) => console.log(`   ${i + 1}. ${s.name}`));

// Entry for /domains/blueyonder-training
const byEntry = buildEntry(streams);

// Entry for /domains/blue-yonder-wms — same streams, original WMS branding kept
const bywmsEntry = {
  ...byEntry,
  title: 'Blue Yonder WMS (JDA) Training',
  slug: 'blue-yonder-wms',
  color: '#005596',
  heroDescription: 'Master the complete Blue Yonder / JDA training curriculum — WMS, TMS, Labor Management, Demand Planning, Luminate, and 25+ specialized modules. Expert-led, real-time, fully customizable for individuals & corporate teams.',
};

console.log('\n🔧 Injecting into domainContentMap.js …');
inject(byEntry, bywmsEntry);


