const fs = require('fs');
const path = require('path');
const https = require('https');

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchHTML(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  const html = await fetchHTML('https://www.maxmunus.com/page/BlueYonder-Training');
  
  // Extract sidebar links
  const sidebarMatch = html.match(/class="catelist"[\s\S]*?<\/ul>/i);
  if (sidebarMatch) {
    const sidebarHtml = sidebarMatch[0];
    const linkRegex = /<a[^>]*>(.*?)<\/a>/gi;
    let match;
    const streams = [];
    while ((match = linkRegex.exec(sidebarHtml)) !== null) {
      let streamName = match[1].trim();
      // clean up HTML tags if any
      streamName = streamName.replace(/<[^>]+>/g, '').trim();
      if (streamName) {
        streams.push(streamName);
      }
    }
    console.log("Found Streams:", streams);
  } else {
    console.log("No sidebar match");
  }
}

run();
