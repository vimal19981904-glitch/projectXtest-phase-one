const fs = require('fs');

// We need to extract domainData from the file to iterate over it
// A quick regex or eval. Let's just read it, modify it slightly and eval to get the array.
const rawData = fs.readFileSync('./lib/domainData.js', 'utf8');
const arrayString = rawData.replace('export const domainData = ', '');
const domainData = eval(arrayString);

function slugify(text) {
  return text.toLowerCase().trim().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '');
}

const contentMap = {};

domainData.forEach(category => {
  category.sub_domains.forEach(sub => {
    const slug = slugify(sub.name);
    
    // Generate specialized enterprise job support content based on exactly what the user wants.
    contentMap[slug] = {
      title: `${sub.name} Online Job Support`,
      category: category.category,
      icon: category.icon,
      color: category.color_accent,
      heroDescription: `Expert, real-time online job support and training for ${sub.name}. Narrow the gap between expectation and delivery with our dedicated consultants.`,
      about: `Technologies are changing at a very high pace. These days companies expect consistent, error-free results, especially in mission-critical systems like ${sub.name}. Our expert consultants connect with you remotely to solve your complex project requirements in real-time, holding your hand to complete tasks in the most efficient way.`,
      features: [
        { title: 'Real-Time Troubleshooting', desc: 'Screen-share with an expert to resolve production bugs or configuration issues instantly.' },
        { title: 'Implementation Guidance', desc: 'Step-by-step guidance on setting up new pipelines, environments, or modules from scratch.' },
        { title: 'Interview Preparation', desc: `Master the toughest technical questions and scenario-based interviews for ${sub.name} roles.` },
        { title: 'Performance Optimization', desc: 'Learn best practices for scaling operations and improving system performance safely.' }
      ],
      plans: [
        {
           name: 'Monthly Dedicated Support',
           price: 'Contact Us',
           features: ['1-2 hours of daily dedicated support', 'Mock interviews and resume prep', 'Priority slack/whatsapp access', 'Perfect for new hires']
        },
        {
           name: 'Task-Based Support',
           price: 'Per Task',
           features: ['Pay only for what you need', 'Immediate bug resolution', 'Architecture design reviews', 'Perfect for experienced professionals']
        }
      ]
    };
  });
});

const fileContent = `export const domainContentMap = ${JSON.stringify(contentMap, null, 2)};\n`;

fs.writeFileSync('./lib/domainContentMap.js', fileContent, 'utf8');
console.log('Successfully generated domainContentMap.js with ' + Object.keys(contentMap).length + ' entries.');
