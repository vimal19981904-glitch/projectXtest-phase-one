const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Read the maxmunus domains
const maxmunusPath = path.resolve('maxmunus_domains.json');
const newDomainsSource = JSON.parse(fs.readFileSync(maxmunusPath, 'utf8'));

// To safely eval domainData.js and domainContentMap
const domainDataRaw = fs.readFileSync(path.resolve('lib/domainData.js'), 'utf8');
const domainContentRaw = fs.readFileSync(path.resolve('lib/domainContentMap.js'), 'utf8');

const ctx1 = { exports: {} };
vm.runInNewContext(domainDataRaw.replace('export const domainData = ', 'exports.domainData = '), ctx1);
let domainData = ctx1.exports.domainData;

const ctx2 = { exports: {} };
vm.runInNewContext(domainContentRaw.replace('export const domainContentMap = ', 'exports.domainContentMap = '), ctx2);
let domainContentMap = ctx2.exports.domainContentMap;

// Category mappings (map maxmunus categories to internal ones)
const categoryMap = {
  'Salesforce Online Job Support': 'Salesforce & CRM',
  'SIEM Tools Job Support': 'Cybersecurity',
  'Analytics Job Support': 'Data & Analytics',
  'Programming Job Support': 'Programming & Development',
  'Cloud Technologies Job Support': 'Cloud & Infrastructure',
  'Supply Chain Technologies': 'ERP & Supply Chain',
  'All Other Technology': 'Miscellaneous tech',
  'Data Warehousing Job Support': 'Data & Analytics',
  'Microsoft Online Job Support': 'Microsoft Technologies',
  'ERP Job Support': 'ERP Systems',
  'IBM Online Job Support': 'IBM Technologies',
  'Oracle Online Job Support': 'Oracle Technologies',
  'DLP job support': 'Cybersecurity',
  'CPQ Job support': 'Salesforce & CRM',
  'DevOps job support': 'DevOps & Automation',
  'PLM job support': 'ERP & Supply Chain',
  'Technology job support': 'Miscellaneous tech'
};

const internalCategoryColors = {
  'Miscellaneous tech': { icon: '🔧', color_accent: '#9ca3af', description: 'Various specialized tools and frameworks.' },
  'Oracle Technologies': { icon: '🔴', color_accent: '#ea580c', description: 'Oracle databases, cloud services, and applications.' }
};

for (const [maxCat, items] of Object.entries(newDomainsSource)) {
    let internalCatName = categoryMap[maxCat] || maxCat;
    
    let internalCat = domainData.find(c => c.category === internalCatName);
    if (!internalCat) {
        internalCat = {
            category: internalCatName,
            icon: internalCategoryColors[internalCatName]?.icon || '📦',
            color_accent: internalCategoryColors[internalCatName]?.color_accent || '#64748b',
            description: internalCategoryColors[internalCatName]?.description || `Specialized job support for ${internalCatName}`,
            sub_domains: []
        };
        domainData.push(internalCat);
    }

    itemLoop: for (const item of items) {
        let cleanName = item.name.replace(/online job support/i, '').replace(/job support/i, '').trim();
        if (!cleanName) cleanName = item.name;

        // Dedup by href or name
        for (const existing of internalCat.sub_domains) {
            if (existing.href === item.href) {
                continue itemLoop;
            }
        }
        
        internalCat.sub_domains.push({
            name: cleanName,
            description: `${cleanName} configurations, troubleshooting, and best practices.`,
            href: item.href
        });

        // Add to domainContentMap
        const slug = item.href.replace('/domains/', '');
        if (!domainContentMap[slug]) {
            domainContentMap[slug] = {
                title: `${item.name} Online Job Support`,
                category: internalCatName,
                icon: internalCat.icon,
                color: internalCat.color_accent,
                heroDescription: `Expert, real-time online job support and training for ${cleanName}. Narrow the gap between expectation and delivery with our dedicated consultants.`,
                about: `Technologies are changing at a very high pace. These days companies expect consistent, error-free results, especially in mission-critical systems like ${cleanName}. Our expert consultants connect with you remotely to solve your complex project requirements in real-time, holding your hand to complete tasks in the most efficient way.`,
                features: [
                  {
                    title: "Real-Time Troubleshooting",
                    desc: "Screen-share with an expert to resolve production bugs or configuration issues instantly."
                  },
                  {
                    title: "Implementation Guidance",
                    desc: "Step-by-step guidance on setting up new pipelines, environments, or modules from scratch."
                  },
                  {
                    title: "Interview Preparation",
                    desc: `Master the toughest technical questions and scenario-based interviews for ${cleanName} roles.`
                  },
                  {
                    title: "Performance Optimization",
                    desc: "Learn best practices for scaling operations and improving system performance safely."
                  }
                ],
                plans: [
                  {
                    name: "Monthly Dedicated Support",
                    price: "Contact Us",
                    features: [
                      "1-2 hours of daily dedicated support",
                      "Mock interviews and resume prep",
                      "Priority slack/whatsapp access",
                      "Perfect for new hires"
                    ]
                  },
                  {
                    name: "Task-Based Support",
                    price: "Per Task",
                    features: [
                      "Pay only for what you need",
                      "Immediate bug resolution",
                      "Architecture design reviews",
                      "Perfect for experienced professionals"
                    ]
                  }
                ]
            };
        }
    }
}

// Write back
fs.writeFileSync(path.resolve('lib/domainData.js'), `export const domainData = ${JSON.stringify(domainData, null, 2)};\n`);
fs.writeFileSync(path.resolve('lib/domainContentMap.js'), `export const domainContentMap = ${JSON.stringify(domainContentMap, null, 2)};\n`);

console.log("Merge completed successfully!");
