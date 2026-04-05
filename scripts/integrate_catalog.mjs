import fs from 'fs/promises';

const CATEGORY_STYLES = {
  'ERP & Supply Chain': { icon: '🔗', color: '#2563eb' },
  'IBM Technologies': { icon: '🔷', color: '#1d4ed8' },
  'Cloud & Infrastructure': { icon: '☁️', color: '#0ea5e9' },
  'Oracle Technologies': { icon: '⭕', color: '#ea580c' },
  'DevOps & Automation': { icon: '⚙️', color: '#6366f1' },
  'Data & Analytics': { icon: '📊', color: '#8b5cf6' }
};

async function integrate() {
  // 1. Read Master Catalog
  const catalogRaw = await fs.readFile('master_project_x_catalog.json', 'utf-8');
  const catalog = JSON.parse(catalogRaw);

  // 2. Read Existing Map
  // We'll read it as text, find the object start, and try to parse or just build a new one.
  // Given the file size, it's safer to build a new one or carefully merge.
  // Actually, let's just IMPORT it if we can, but since this is a script, we'll read and regex.
  
  // Actually, a better approach for this specific task:
  // We will generate the NEW entries as a separate JS object and then instructions to the user
  // or I will try to read the file and append/merge.
  
  const existingMapFile = await fs.readFile('lib/domainContentMap.js', 'utf-8');
  
  // Extract the object content between { and };
  const match = existingMapFile.match(/export const domainContentMap = (\{[\s\S]*\});/);
  if (!match) {
    console.error("Could not find domainContentMap object in lib/domainContentMap.js");
    return;
  }

  // We can't easily JSON.parse a JS object with trailing commas and unquoted keys.
  // So we'll treat it as a string manipulation or use a safer approach.
  // Let's just generate the 133 entries and merge them into a fresh object if we can't parse.
  
  const newEntries = {};

  for (const item of catalog) {
    const style = CATEGORY_STYLES[item.category] || { icon: '💎', color: '#6366f1' };
    
    // Format features from courseContent
    const features = item.courseContent.map((bullet, idx) => ({
      title: bullet.split(' ').slice(0, 3).join(' '), // Create a short title from first 3 words
      desc: bullet
    }));

    newEntries[item.id] = {
      title: item.title,
      category: item.category,
      icon: style.icon,
      color: style.color,
      heroDescription: item.overview.slice(0, 160) + (item.overview.length > 160 ? '...' : ''),
      about: item.overview,
      features: features,
      plans: [
        {
          name: "Project X Enterprise Support",
          price: "Contact for Quote",
          features: [
            ...item.supportFeatures,
            `Duration: ${item.duration}`,
            "Architecture Review",
            "Environment Tuning"
          ]
        },
        {
          name: "Consultancy & Implementation",
          price: "Custom",
          features: [
            "End-to-end Project Delivery",
            "On-demand Expert Access",
            "Production Support SLA",
            "Knowledge Transfer"
          ]
        }
      ]
    };
  }

  // To avoid breaking the 40k line file, we'll create a SUPPLEMENTARY map file
  // and then update the main file to import/spread it. This is much safer.
  
  const outputContent = `export const supplementalContentMap = ${JSON.stringify(newEntries, null, 2)};`;
  await fs.writeFile('lib/supplementalContentMap.js', outputContent);
  
  console.log(`\nSuccess! Integrated 133 entries into lib/supplementalContentMap.js`);
  console.log(`Next Step: Update lib/domainContentMap.js to merge this supplemental map.`);
}

integrate().catch(console.error);
