import fs from 'fs/promises';

async function merge() {
  const files = [
    'synthesized_jda_sap.json',
    'synthesized_ibm.json',
    'synthesized_cloud.json',
    'synthesized_oracle.json',
    'synthesized_devops.json',
    'synthesized_analytics.json'
  ];

  let masterCatalog = [];
  const seenIds = new Set();

  for (const file of files) {
    try {
      const data = await fs.readFile(file, 'utf-8');
      const items = JSON.parse(data);
      for (const item of items) {
        if (!item.id || item.id === 'cloud--support' || item.id === 'ibm-support') continue; // Skip empty/broken IDs
        if (!seenIds.has(item.id)) {
          masterCatalog.push(item);
          seenIds.add(item.id);
        }
      }
      console.log(`Merged ${items.length} items from ${file}`);
    } catch (err) {
      console.warn(`Could not read ${file}, skipping.`);
    }
  }

  await fs.writeFile('master_project_x_catalog.json', JSON.stringify(masterCatalog, null, 2));
  console.log(`\nSuccess! Master catalog generated with ${masterCatalog.length} unique enterprise domains.`);
}

merge().catch(console.error);
