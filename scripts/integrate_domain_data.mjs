import fs from 'fs/promises';

async function integrateDomainData() {
  // 1. Read Master Catalog
  const catalogRaw = await fs.readFile('master_project_x_catalog.json', 'utf-8');
  const catalog = JSON.parse(catalogRaw);

  // 2. Read Existing domainData.js
  const domainDataFile = await fs.readFile('lib/domainData.js', 'utf-8');
  
  // We'll extract the array and attempt to parse it or manipulate it.
  const match = domainDataFile.match(/export const domainData = (\[[\s\S]*\]);/);
  if (!match) {
    console.error("Could not find domainData array in lib/domainData.js");
    return;
  }

  // To be safe with a 3k line file, we'll use a safer approach:
  // We'll find the category sections and append the new sub_domains.
  
  let newDomainDataText = match[1];
  
  // Map categories to indices or just regex find/replace
  const categories = [
    "ERP & Supply Chain",
    "IBM Technologies",
    "Cloud & Infrastructure",
    "Oracle Technologies",
    "DevOps & Automation",
    "Data & Analytics"
  ];

  for (const cat of categories) {
    const catEntries = catalog.filter(item => item.category === cat);
    if (catEntries.length === 0) continue;

    console.log(`Adding ${catEntries.length} items to ${cat}`);

    // Create the new sub_domain entries
    const subDomains = catEntries.map(item => ({
      name: item.title,
      description: item.overview.slice(0, 80) + '...',
      href: `/domains/${item.id}`
    }));

    // Find the end of the sub_domains array for this category
    // This regex looks for the category name and then the next closing bracket of sub_domains
    const catRegex = new RegExp(`("category":\\s*"${cat}"[\\s\\S]*?"sub_domains":\\s*\\[)([\\s\\S]*?)(\\])`, 'g');
    
    newDomainDataText = newDomainDataText.replace(catRegex, (match, prefix, content, suffix) => {
      // Avoid adding duplicates if already present
      const filteredSubDomains = subDomains.filter(sd => !content.includes(sd.href));
      if (filteredSubDomains.length === 0) return match;
      
      const newItemsText = filteredSubDomains.map(sd => `      {\n        "name": ${JSON.stringify(sd.name)},\n        "description": ${JSON.stringify(sd.description)},\n        "href": ${JSON.stringify(sd.href)}\n      }`).join(',\n');
      
      // Clean up the comma at the end if content is not empty
      const separator = content.trim().length > 0 && !content.trim().endsWith(',') ? ',\n' : '';
      return `${prefix}${content}${separator}${newItemsText}${suffix}`;
    });
  }

  const finalFileContent = domainDataFile.replace(match[1], newDomainDataText);
  await fs.writeFile('lib/domainData.js', finalFileContent);
  
  console.log(`\nSuccess! Updated lib/domainData.js with new enterprise entries.`);
}

integrateDomainData().catch(console.error);
