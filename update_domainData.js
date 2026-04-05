const fs = require('fs');

const rawData = fs.readFileSync('lib/domainData.js', 'utf8');

if (rawData.includes('ibmSubDomains')) {
    console.log("Already updated.");
    process.exit(0);
}

// Write backup
fs.writeFileSync('lib/domainData.js.bak', rawData, 'utf8');

const updatedContent = `import { ibmSubDomains } from '../src/data/domains/ibm';
import { supplyChainSubDomains } from '../src/data/domains/supplychain';

${rawData}

// Dynamic Chunk Merging Logic
function mergeDynamicSubDomains(categoryName, newSubs, defaultIcon = '🚀', defaultCodeColor = '#3b82f6') {
  let category = domainData.find(d => d.category === categoryName);
  if (!category) {
    category = {
      category: categoryName,
      icon: defaultIcon,
      color_accent: defaultCodeColor,
      description: \`\${categoryName} courses, training, and job support.\`,
      sub_domains: []
    };
    domainData.push(category);
  }

  const existingHrefs = new Set(category.sub_domains.map(s => s.href));
  for (const sub of newSubs) {
    if (!existingHrefs.has(sub.href)) {
      category.sub_domains.push(sub);
      existingHrefs.add(sub.href);
    }
  }
}

mergeDynamicSubDomains('IBM Technologies', ibmSubDomains, '💼', '#054ada');
mergeDynamicSubDomains('ERP & Supply Chain', supplyChainSubDomains, '🔗', '#2563eb');
`;

fs.writeFileSync('lib/domainData.js', updatedContent, 'utf8');
console.log('Successfully updated domainData.js with chunk imports.');
