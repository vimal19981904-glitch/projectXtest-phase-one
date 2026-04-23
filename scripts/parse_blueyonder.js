const fs = require('fs');

function parseBlueYonder() {
    const mdPath = 'c:\\Users\\ARUL XAVIER\\AppData\\Local\\Packages\\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\\LocalState\\sessions\\28A490AFC6635CCB54BB834B708B962602A983BC\\transfers\\2026-17\\BlueYonder Training.md';
    const content = fs.readFileSync(mdPath, 'utf8');

    // Replace MaxMunus with GapAnchor
    const cleanedContent = content.replace(/MaxMunus/gi, 'GapAnchor');

    const sections = cleanedContent.split(/###\s+(?:Blue\s*Yonder|JDA)/i);
    
    // First section is usually intro, let's skip it or use it for about
    const streams = [];

    for (let i = 1; i < sections.length; i++) {
        let section = sections[i].trim();
        if (!section) continue;

        // The first line will be the rest of the title
        const lines = section.split('\n');
        const titleRest = lines[0].trim();
        const streamName = `Blue Yonder ${titleRest}`.trim();

        const bodyLines = [];
        let inCourseContent = false;
        
        for (let j = 1; j < lines.length; j++) {
            const line = lines[j].trim();
            if (!line) continue;
            
            // We want to capture the description/body. Let's just grab the text.
            // We'll skip some boilerplate like "INDIVIDUAL TRAINING BENEFIT", "CORPORATE TRAINING BENEFIT"
            if (line.match(/^INDIVIDUAL TRAINING BENEFIT/i) || line.match(/^CORPORATE TRAINING BENEFIT/i) || line.match(/^Course Duration/i)) {
                // We might stop or skip these
                continue;
            }

            if (line.match(/^Course Content/i)) {
                inCourseContent = true;
                continue;
            }

            // Simple heuristic: if it's a normal paragraph and not too short
            if (line.length > 30 && !line.match(/^Customize /) && !line.match(/^Our Individual /) && !line.match(/^Industry Specific /) && !line.match(/^Flexibility to /) && !line.match(/^Get Flexibility /) && !line.match(/^MaxMunus will /) && !line.match(/^GapAnchor will /) && !line.match(/^GapAnchor has /) && !line.match(/^Few of the clients/)) {
                bodyLines.push(line);
            }
        }

        // Just use the first few paragraphs for description
        const description = bodyLines.length > 0 ? bodyLines[0].substring(0, 150) + '...' : `${streamName} training covers concepts from Basic level to advance level.`;
        
        streams.push({
            name: streamName,
            description: description,
            body: bodyLines.slice(0, 10) // Limit to 10 paragraphs to avoid excessive length
        });
    }

    const result = {
        title: "Blue Yonder Training & Job Support",
        category: "ERP & Supply Chain",
        icon: "🔗",
        color: "#2563eb",
        heroDescription: "Master Blue Yonder (formerly JDA) with GapAnchor's real-time consultants. Get 24/7 online job support and professional certification training for supply chain excellence.",
        about: "GapAnchor's Blue Yonder training covers everything from basic supply chain concepts to advanced Warehouse Management, Transportation Management, and Demand Planning. Our program is designed to develop deep supply chain expertise through role-based professional training and real-time project scenarios. Whether you are troubleshooting configuration or implementing new solutions, our certified experts provide the hands-on guidance needed to optimize your operations.",
        seo: {
            metaTitle: "Blue Yonder Online Training & Job Support | GapAnchor",
            metaDescription: "Top-rated Blue Yonder online training and job support by GapAnchor. Master WMS, TMS, and Demand Planning with real-time projects and certification assistance.",
            keywords: "Blue Yonder training, Blue Yonder job support, JDA online course, Blue Yonder certification, supply chain job support, Blue Yonder consultant"
        },
        features: [
            {
                title: "Blue Yonder WMS Mastery",
                "desc": "In-depth training on Blue Yonder Warehouse Management to optimize your fulfillment centers and supply chain execution."
            },
            {
                title: "TMS Configuration",
                "desc": "Master Transportation Management with expert guidance on routing, carrier portal, and transportation smart bench."
            },
            {
                title: "Real-Time Production Support",
                "desc": "24/7 on-call assistance for critical production issues, integration errors, and complex supply chain workflow debugging."
            },
            {
                title: "Demand & Supply Planning",
                "desc": "Learn to configure SCPO, Demand Planning, and Fulfillment processes to align inventory with orders."
            },
            {
                title: "Labor Management",
                "desc": "Optimize your workforce with Blue Yonder Labor Management, tracking productivity and setting labor standards."
            }
        ],
        curriculum: [
            {
                id: 1,
                name: "Introduction to Blue Yonder Solutions",
                level: "Foundation",
                duration: "4 Hours",
                topics: ["Supply Chain Management Basics", "Blue Yonder Modules Overview", "Common Terms & Definitions", "Navigation and UI"]
            },
            {
                id: 2,
                name: "Warehouse Management System (WMS)",
                level: "Core",
                duration: "10 Hours",
                topics: ["Inbound & Outbound Operations", "Inventory Control", "Wave & Order Management", "System Configuration"]
            },
            {
                id: 3,
                name: "Transportation Management System (TMS)",
                level: "Core",
                duration: "8 Hours",
                topics: ["Tariff Structures", "Transportation Modeler", "Carrier Portal", "Smart Bench Features"]
            },
            {
                id: 4,
                name: "Demand & Fulfillment",
                level: "Advanced",
                duration: "8 Hours",
                topics: ["Demand Table Structures", "Calculate Model", "Transfer FCST Process", "Supply Process Concepts"]
            }
        ],
        trainer: {
            name: "Senior Consultant",
            experience: "10+ Years",
            bio: "Lead Supply Chain Consultant with extensive experience in global Blue Yonder implementations across retail, manufacturing, and 3PL sectors.",
            expertise: ["Blue Yonder WMS", "Blue Yonder TMS", "Demand Planning", "Integration Architecture"]
        },
        faqs: [
            {
                "q": "Is it worth joining Blue Yonder Training at GapAnchor?",
                "a": "Yes. We have a pool of Industry-Specific Subject Matter Experts with over 10 years of experience. They share real-time implementation challenges and provide soft copies of study material, making you project-ready."
            },
            {
                "q": "What are the delivery modes for the training?",
                "a": "We provide Online Instructor-led live training for individuals. For corporate clients, we also offer classroom training in your campus or ours."
            },
            {
                "q": "Do you provide a Job Guarantee?",
                "a": "We focus on high-level quality training that makes you employable. We assist with Resume Building, Mock Interviews, and sharing open positions."
            },
            {
                "q": "Can I attend a demo session before enrollment?",
                "a": "We are confident in our quality, but we do connect you with a trainer to fix the training agenda according to your specific requirements before you start."
            },
            {
                "q": "Do you provide a Course Completion Certificate?",
                "a": "Yes, GapAnchor provides a Course Completion Certificate recognized by the industry, which adds significant value to your professional profile."
            }
        ],
        streams: streams,
        relatedTraining: ["Manhattan WMS", "SAP SCM", "Oracle SCM Cloud"],
        plans: [
            {
                "name": "Professional Training Bundle",
                "price": "Contact for Quote",
                "features": [
                    "End-to-end Blue Yonder training",
                    "Real-time project scenarios",
                    "Certification exam assistance",
                    "3 months of post-training support"
                ]
            },
            {
                "name": "24/7 Production Job Support",
                "price": "Monthly/Task-Based",
                "features": [
                    "Immediate assistance for production bugs",
                    "Critical cutover support",
                    "Complex workflow configuration",
                    "Dedicated Blue Yonder expert access"
                ]
            }
        ]
    };

    console.log(JSON.stringify(result, null, 2));
}

parseBlueYonder();
