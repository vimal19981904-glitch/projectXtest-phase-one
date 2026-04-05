import fs from 'fs';
import { domainData } from './lib/domainData.js';

function slugify(text) {
  return text.toLowerCase().trim().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '');
}

const contentMap = {};

// Specialized templates per category
const templates = {
  "IBM Technologies": {
    features: [
      { title: 'IBM Software Configuration', desc: 'Expert guidance on configuring, tuning, and deploying IBM solutions in enterprise environments.' },
      { title: 'Middleware Integration', desc: 'Resolve complex integration issues between legacy systems and modern IBM middleware.' },
      { title: 'Performance Tuning', desc: 'Identify bottlenecks and optimize performance across IBM infrastructure and applications.' },
      { title: 'Architecture Review', desc: 'Ensure your IBM deployment aligns with high availability and disaster recovery best practices.' },
      { title: 'Migration & Support', desc: 'Step-by-step assistance for migrating to newer versions or adopting IBM Cloud Paks.' }
    ],
    about: (name) => `IBM's enterprise solutions require specialized knowledge to operate at peak efficiency. Whether you are deploying ${name} on-premises or in the cloud, our expert consultants provide hands-on, real-time job support. We help you navigate complex configurations, resolve critical production issues, and integrate ${name} seamlessly within your broader IT ecosystem.`
  },
  "ERP & Supply Chain": {
    features: [
      { title: 'WMS/ERP Configuration', desc: 'Detailed assistance in configuring complex warehousing rules, shipping logic, and supply chain flows.' },
      { title: 'Integration Troubleshooting', desc: 'Resolve real-time integration failures between your ERP, WMS, and automation equipment.' },
      { title: 'Custom Development Support', desc: 'Guidance on custom mods, user exits, and API extensions for your specific operational needs.' },
      { title: 'Go-Live Handholding', desc: 'Dedicated remote support during critical cutover and go-live phases in distribution centers.' },
      { title: 'Process Optimization', desc: 'Learn best practices to streamline picking, packing, and shipping workflows.' }
    ],
    about: (name) => `In modern supply chain and logistics, downtime is not an option. ${name} is a mission-critical system that demands precision configuration. Our specialized consultants connect with your team remotely to ensure ${name} operates flawlessly. From implementing complex workflow rules to debugging integration points with material handling equipment, we provide the deep expertise required to keep your operations running smoothly.`
  },
  "default": {
    features: [
      { title: 'Real-Time Troubleshooting', desc: 'Screen-share with an expert to resolve production bugs or configuration issues instantly.' },
      { title: 'Implementation Guidance', desc: 'Step-by-step guidance on setting up new pipelines, environments, or modules from scratch.' },
      { title: 'Interview Preparation', desc: 'Master the toughest technical questions and scenario-based interviews.' },
      { title: 'Performance Optimization', desc: 'Learn best practices for scaling operations and improving system performance safely.' },
      { title: 'Code Reviews', desc: 'Thorough reviews of your codebase to ensure best practices and security.' }
    ],
    about: (name) => `Technologies are changing at a very high pace. These days companies expect consistent, error-free results, especially in mission-critical systems like ${name}. Our expert consultants connect with you remotely to solve your complex project requirements in real-time, holding your hand to complete tasks in the most efficient way.`
  }
};

domainData.forEach(category => {
  const tpl = templates[category.category] || templates["default"];
  
  category.sub_domains.forEach(sub => {
    // Extract slug directly from the href to ensure perfect matching in page.js
    const slug = sub.href.replace('/domains/', '');
    
    contentMap[slug] = {
      title: `${sub.name} Online Job Support`,
      category: category.category,
      icon: category.icon,
      color: category.color_accent,
      heroDescription: `Expert, real-time online job support and training for ${sub.name}. Narrow the gap between expectation and delivery with our dedicated consultants.`,
      about: tpl.about(sub.name),
      features: tpl.features,
      plans: [
        {
           name: 'Dedicated Part-Time Support',
           price: 'Contact Us',
           features: ['2 hours/day of dedicated remote support', 'System configuration & tuning', 'Priority Slack/WhatsApp access', 'Perfect for active implementations']
        },
        {
           name: 'Task-Based Bug Fixes',
           price: 'Per Task',
           features: ['Pay only for what you need', 'Immediate bug resolution', 'Architecture design reviews', 'Perfect for go-live hypercare']
        }
      ]
    };
  });
});

const fileContent = `export const domainContentMap = ${JSON.stringify(contentMap, null, 2)};\n`;

fs.writeFileSync('./lib/domainContentMap.js', fileContent, 'utf8');
console.log('Successfully generated domainContentMap.js with ' + Object.keys(contentMap).length + ' entries.');
