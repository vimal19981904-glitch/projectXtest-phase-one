
import { domainData } from '../lib/domainData.js';

domainData.forEach(domain => {
    if (!domain.sub_domains || domain.sub_domains.length === 0) {
        console.log(`Category "${domain.category}" has NO sub-domains!`);
    } else {
        // console.log(`Category "${domain.category}" has ${domain.sub_domains.length} sub-domains.`);
    }
});
console.log("Check complete.");
