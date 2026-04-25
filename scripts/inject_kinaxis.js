const fs = require('fs');
const path = require('path');

const MD_PATH = 'c:\\Users\\ARUL XAVIER\\AppData\\Local\\Packages\\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\\LocalState\\sessions\\28A490AFC6635CCB54BB834B708B962602A983BC\\transfers\\2026-17\\Kinaxis Training Course.md';

function brand(text) {
  return text.replace(/TechMunus/gi, 'GapAnchor').replace(/MaxMunus/gi, 'GapAnchor');
}

function clean(line) {
  return line
    .replace(/^[·•§üøÂ·ÂÂ·Â·vØ]+\s*/, '')
    .replace(/^&#x20;\s*/, '')
    .replace(/^&#\d+;\s*/, '')
    .replace(/^[*_]+|[*_]+$/g, '')
    .replace(/\\/g, '')
    .trim();
}

function parseSection(text) {
  const lines = text.split(/\r?\n/);
  const title = lines[0].trim();
  
  const overview = [];
  const features = [];
  const faqs = [];
  const curriculumRaw = [];
  
  let currentBlock = 'overview'; 
  
  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = clean(brand(rawLine));
    
    if (!line) continue;
    

    if ((/^features of/i.test(line) || /^characteristics are/i.test(line) || /^one of the features/i.test(line)) && line.length < 50) {
      currentBlock = 'features';
      continue;
    }
    if (/course content/i.test(line) && line.length < 50) {
      currentBlock = 'curriculum';
      continue;
    }
    if (/^faqs? for/i.test(line)) {
      currentBlock = 'faqs';
      continue;
    }
    if (/corporate training benefit/i.test(line) || /individual training benefit/i.test(line)) {
      currentBlock = 'skip';
      continue;
    }
    
    if (currentBlock === 'overview') {
      if (line.length > 20 && !line.startsWith('Complete Customization') && !line.startsWith('When it comes to') && !line.startsWith('Our Kinaxis certified')) {
        overview.push(line);
      }
    } else if (currentBlock === 'features') {
      if (line.length > 20 && !line.startsWith('Complete Customization')) {
        // split title and desc if separated by colon
        if (line.includes(': ')) {
          const parts = line.split(': ');
          features.push({ title: parts[0].trim(), desc: parts.slice(1).join(': ').trim() });
        } else {
          features.push({ title: "Key Capability", desc: line });
        }
      }
    } else if (currentBlock === 'curriculum') {
      if (line.length > 5 && !line.toLowerCase().includes('course content')) {
        curriculumRaw.push(line);
      }
    } else if (currentBlock === 'faqs') {
      if (/^Q\.\s/.test(line)) {
        faqs.push({ q: line.replace(/^Q\.\s*/, ''), a: '' });
      } else if (/^Ans[:.]?\s/i.test(line) && faqs.length > 0) {
        faqs[faqs.length - 1].a += line.replace(/^Ans[:.]?\s*/i, '') + ' ';
      } else if (faqs.length > 0 && line.length > 10) {
         faqs[faqs.length - 1].a += line + ' ';
      }
    }
  }
  
  // Format curriculum array (simple grouping for now)
  const curriculum = [];
  for (let i = 0; i < curriculumRaw.length; i+=3) {
    if (curriculumRaw[i]) {
      curriculum.push({
        id: (i/3) + 1,
        name: curriculumRaw[i] || `Module ${(i/3)+1}`,
        level: "Core",
        duration: "2-4 Hours",
        topics: [curriculumRaw[i+1] || "Fundamentals", curriculumRaw[i+2] || "Advanced Topics"]
      });
    }
  }

  return { title, overview, features, faqs, curriculum };
}

function parseMD() {
  const raw = fs.readFileSync(MD_PATH, 'utf8');
  const branded = brand(raw).replace(/\r?\nKinaxis Maestro Author Training\r?\n/, '\n### Kinaxis Maestro Author Training\n');
  
  const parts = branded.split(/(?:^|\r?\n)###[ \t]+/m).filter(p => p.trim().length > 0);
  
  const courses = parts.map(parseSection);
  return courses;
}

function buildDomainEntry(course, slug, color, icon) {
  return {
    title: course.title,
    category: slug.includes('cloudsense') ? "CRM & Sales" : slug.includes('o9') ? "ERP & Supply Chain" : "ERP & Supply Chain",
    icon: icon,
    color: color,
    heroDescription: course.overview[0] || `${course.title} comprehensive online training.`,
    about: course.overview.join(' '),
    overviewParagraphs: course.overview,
    features: course.features.length > 0 ? course.features : [
      { title: "Real-time Training", desc: "Scenario-based hands-on learning." },
      { title: "Job Support", desc: "24/7 production support available." }
    ],
    curriculum: course.curriculum.slice(0, 10), // Limit to 10 for neatness
    faqs: course.faqs,
    streams: [],
    trainer: {
      name: `Senior ${course.title.split(' ')[0]} Consultant`,
      experience: "12+ Years",
      bio: `Lead Consultant with extensive experience in global ${course.title.split(' ')[0]} implementations.`,
      expertise: [course.title.split(' ')[0], "Implementation", "Production Support"]
    },
    relatedTraining: ["Blue Yonder WMS", "Manhattan WMS", "SAP SCM"],
    plans: [
      { name: "Individual Training", price: "Contact us", features: ["Customized content", "Flexible schedule", "Study material"] },
      { name: "Corporate Training", price: "Contact us", features: ["Team assessment", "Use-case driven", "Flexible delivery"] }
    ]
  };
}

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

function inject() {
  const courses = parseMD();
  console.log(`Parsed ${courses.length} courses from MD.`);
  
  // 1: Kinaxis, 2: CloudSense, 3: o9, 4: Maestro Contributor, 5: Maestro Author, 6: Maestro Admin
  const kinaxisCourse = courses.find(c => c.title.toLowerCase().includes('kinaxis training'));
  const cloudsenseCourse = courses.find(c => c.title.toLowerCase().includes('cloudsense'));
  const o9Course = courses.find(c => c.title.toLowerCase().includes('o9 solutions'));
  
  const kinaxisEntry = buildDomainEntry(kinaxisCourse, 'kinaxis-training', '#2563eb', '⚙️');
  const cloudsenseEntry = buildDomainEntry(cloudsenseCourse, 'cloudsense-training', '#8b5cf6', '☁️');
  const o9Entry = buildDomainEntry(o9Course, 'o9-solutions-training', '#10b981', '📊');

  // Enhance Kinaxis features to match Manhattan's premium feel
  kinaxisEntry.features = [
    {
      title: "Kinaxis Maestro AI Orchestration",
      desc: "Master the industry-first AI-powered supply chain orchestration platform for end-to-end visibility and decision intelligence."
    },
    {
      title: "Concurrent Planning Mastery",
      desc: "Learn to eliminate planning silos with Kinaxis' unique simultaneous planning technique for real-time agility."
    },
    {
      title: "RapidResponse Configuration",
      desc: "Deep dive into workbooks, dashboards, and advanced analytics setup to customize the platform for specific business needs."
    },
    {
      title: "Scenario Management",
      desc: "Master what-if scenario execution to respond to supply chain disruptions instantly and optimize outcomes."
    },
    {
      title: "Demand & Supply Synchronization",
      desc: "Learn to balance demand, supply, and inventory across the global network using machine learning and predictive algorithms."
    }
  ];

  // Build STREAMS for Kinaxis from the Maestro sections
  const maestroCourses = courses.filter(c => c.title.toLowerCase().includes('maestro'));
  maestroCourses.forEach(mc => {
    kinaxisEntry.streams.push({
      name: mc.title,
      description: mc.overview[0] ? mc.overview[0].substring(0, 150) + "..." : "Master " + mc.title,
      body: mc.overview,
    });
  });

  console.log(`Prepared kinaxis-training with ${kinaxisEntry.streams.length} streams.`);

  const mapPath = path.join(process.cwd(), 'lib', 'domainContentMap.js');
  let map = fs.readFileSync(mapPath, 'utf8');

  const entriesToInject = [
    { key: '"kinaxis-training"', data: kinaxisEntry },
    { key: '"cloudsense-job-support"', data: cloudsenseEntry }, // mapping to cloudsense-job-support as per domainData.js
    { key: '"o9-solutions-training"', data: o9Entry }
  ];

  for (const item of entriesToInject) {
    const jsonStr = JSON.stringify(item.data, null, 2);
    if (map.includes(item.key)) {
      map = replaceKey(map, item.key, jsonStr);
      console.log(`✅ Updated ${item.key}`);
    } else {
      const insertIdx = map.indexOf('{') + 1;
      map = map.substring(0, insertIdx) + `\n  ${item.key}: ${jsonStr},` + map.substring(insertIdx);
      console.log(`✅ Inserted ${item.key}`);
    }
  }

  fs.writeFileSync(mapPath, map, 'utf8');
  console.log(`📦 domainContentMap.js updated successfully!`);
}

inject();
