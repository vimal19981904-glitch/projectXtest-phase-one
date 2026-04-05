const fs = require('fs');

function slugify(text) {
  return text.toLowerCase().trim().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '');
}

try {
  let content = fs.readFileSync('./lib/domainData.js', 'utf8');

  content = content.replace(/name:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*href:\s*"#"/g, (match, name, desc) => {
      return `name: "${name}",\n        description: "${desc}",\n        href: "/domains/${slugify(name)}"`;
  });

  fs.writeFileSync('./lib/domainData.js', content, 'utf8');
  console.log("Updated domainData.js successfully.");
} catch (e) {
  console.error("Error formatting domainData.js", e);
}
