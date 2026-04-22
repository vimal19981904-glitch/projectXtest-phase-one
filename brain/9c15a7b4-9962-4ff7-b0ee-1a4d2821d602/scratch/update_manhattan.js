const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Project X - Online training platform\\anitigravity\\lib\\domainContentMap.js';
const newContent = `  "manhattan-wms-training": {
    "title": "Manhattan WMS Training & Job Support",
    "category": "ERP & Supply Chain",
    "icon": "🔗",
    "color": "#2563eb",
    "heroDescription": "Master Manhattan Active® WM, WMOS, and WMi with GapAnchor's real-time consultants. Get 24/7 online job support and professional certification training for supply chain excellence.",
    "about": "GapAnchor's Manhattan WMS training covers everything from basic supply chain concepts to advanced Warehouse Management for IBM i (WMi), Active Inventory, and Transportation Management. Our program is designed to develop deep supply chain expertise through role-based professional training and real-time project scenarios. Whether you are troubleshooting legacy WMOS configuration or implementing cloud-native Active WM, our certified experts provide the hands-on guidance needed to optimize your warehouse operations and workforce performance.",
    "seo": {
      "metaTitle": "Manhattan WMS Online Training & 24/7 Job Support | GapAnchor",
      "metaDescription": "Top-rated Manhattan WMS online training and job support by GapAnchor. Master WMOS, Active WM, and WMi with real-time projects and certification assistance.",
      "keywords": "Manhattan WMS training, Manhattan WMS job support, Manhattan WMOS online course, Active WM certification, supply chain job support, Manhattan WMS consultant"
    },
    "features": [
      {
        "title": "Manhattan Active® WM Mastery",
        "desc": "In-depth training on the industry's first cloud-native enterprise-class WMS, including machine learning-based optimization and versionless updates."
      },
      {
        "title": "WMOS & WMi Configuration",
        "desc": "Master legacy WMOS and WMi (IBM i) versions with expert guidance on system parameters, wave management, and yard/dock door logic."
      },
      {
        "title": "Real-Time Production Support",
        "desc": "24/7 on-call assistance for critical production issues, PIX integration errors, and complex warehouse workflow debugging."
      },
      {
        "title": "Labor & Slotting Optimization",
        "desc": "Learn to configure labor standards, track productivity via gamification, and optimize product placement using advanced slotting algorithms."
      },
      {
        "title": "Omnichannel Fulfillment",
        "desc": "Master buy online pickup in-store (BOPIS), ship-from-store, and store inventory management within the Manhattan retail suite."
      }
    ],
    "curriculum": [
      {
        "id": 1,
        "name": "Introduction to Supply Chain & WMS",
        "level": "Foundation",
        "duration": "4 Hours",
        "topics": ["Supply Chain Management Basics", "Warehouse Management Systems Core Functions", "WMS Benefits", "Common Terms & Definitions"]
      },
      {
        "id": 2,
        "name": "Manhattan WMS Architecture & Navigation",
        "level": "Core",
        "duration": "6 Hours",
        "topics": ["Introduction to Retail Domain", "Warehouse Terminology (SKU, iLPN, OLPN)", "Different Interfaces", "System Configuration (Warehouse, System Codes, User Master)"]
      },
      {
        "id": 3,
        "name": "Inbound & Outbound Operations",
        "level": "Advanced",
        "duration": "10 Hours",
        "topics": ["Yard & Dock Door Management", "WM Inbound (Yard Mgmt, Guard Check-in/out)", "WM Outbound (PIX, Ship Confirmation)", "Wave & Order Management", "Picking, Packing, & Shipping Updates"]
      },
      {
        "id": 4,
        "name": "Inventory Control & Integration",
        "level": "Expert",
        "duration": "10 Hours",
        "topics": ["Inventory Control", "Cycle Count & Physical Count", "ASN & Facilities", "Integration between ERP and WMOS", "Integration between MHE and WMOS"]
      }
    ],
    "trainer": {
      "name": "Monalisa",
      "experience": "13+ Years",
      "bio": "Lead WMS Consultant with extensive experience in global implementations. Specialized in Manhattan WMOS, Active WM, and WMi across retail, healthcare, and 3PL sectors.",
      "expertise": ["Manhattan WMS", "Active WM", "Supply Chain Optimization", "Integration Architecture"]
    },
    "faqs": [
      {
        "q": "Is it worth joining Manhattan Training at GapAnchor?",
        "a": "Yes. We have a pool of Industry-Specific Subject Matter Experts with over 13 years of experience. They share real-time implementation challenges and provide soft copies of study material, making you project-ready."
      },
      {
        "q": "What are the delivery modes for the training?",
        "a": "We provide Online Instructor-led live training for individuals. For corporate clients, we also offer classroom training in your campus or ours."
      },
      {
        "q": "Do you provide a Job Guarantee?",
        "a": "We focus on high-level quality training that makes you employable. We assist with Resume Building, Mock Interviews, and sharing open positions in Manhattan WMS across the world."
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
    "streams": [
      {
        "name": "Manhattan Active Warehouse Management Training",
        "description": "Deep-dive into Manhattan Active WM — a cloud-based WMS that utilizes machine learning and actionable insights to optimize operations.",
        "body": [
          "Manhattan Active Warehouse Management (WM) is a cloud-based warehouse management system (WMS) that utilizes machine learning, gamification, and actionable insights to optimize warehouse operations and workforce.",
          "From order processing to fulfilment, Manhattan's WMS combines WES capabilities to provide complete command and control over every step of warehouse operational processes with total visibility, advanced automation, and execution strategy.",
          "Using machine learning, Manhattan Active WM implements order streaming to intelligently ensure real-time alignment between inventory and orders for improved orchestration. Businesses can maximize throughput and asset utilization with continuous order prioritization, automatic inventory allocation, and real-time replenishments calculations.",
          "Unified Control provides real-time data visualizations of network-wide summary of performance across the organization, which can be broken down into the smallest data points for actionable insights on all levels of the business."
        ]
      },
      {
        "name": "Manhattan WMI Training",
        "description": "Comprehensive training on Manhattan's core Warehouse Management for IBM i (WMi), covering navigation, configuration, and operational workflows.",
        "body": [
          "Manhattan Associates’ Warehouse Management for IBM i (WMi) is an on-premise warehouse management solution for retailers. It improves Operational Efficiency & Carrier Compliance. Some of the latest features are Omni-Channel, Web Service Support, and Order Streaming.",
          "In this GapAnchor WMI training, we cover topics like WMI, Inbound Overview, Task Management, Transport and Execution Overview, Cycle Count, PIXES, System Configuration, and more.",
          "Our certified expert consultants teach based on real-time scenario-based case studies and provide study material. We help you clear Manhattan WMI certification by providing proper guidance throughout the course."
        ]
      },
      {
        "name": "Manhattan Order Management Training",
        "description": "Configure and optimize Manhattan Order Management (OMS) for a 360-degree view of orders across online and in-store channels.",
        "body": [
          "Manhattan Order Management provides retailers with a 360-degree view of orders online and in-store. It excels at fulfilling orders seamlessly and efficiently, enabling stores to offer endless aisle, buy online pickup in store (BOPIS), and ship-from-store.",
          "The solution intelligently sources inventory across a retailer’s network of distribution centers, suppliers, and stores, discovering the most profitable route to fulfill the customer promise.",
          "Key capabilities include Enterprise Inventory for a complete catalogue view, Available to Commerce for tailoring channel views, and Store Fulfilment for managing omnichannel orchestration in real-time."
        ]
      },
      {
        "name": "Manhattan Active Supply Chain Training",
        "description": "End-to-end supply chain planning and execution using Manhattan's unified cloud-native application.",
        "body": [
          "Manhattan Active Supply Chain is a single, cloud-native application that includes three different platforms: Manhattan Active Warehouse Management, Manhattan Active Labor Management, and Manhattan Active Transportation Management.",
          "It represents a true future system convergence across every element of distribution and transportation, providing end-to-end visibility into performance metrics across key areas including transportation, warehousing, visibility, and forecasting.",
          "Supervisors can reduce operating costs by automating, monitoring, and streamlining the flow of goods through the entire supply chain while managing forecasting, replenishment management, and inventory optimization."
        ]
      },
      {
        "name": "Manhattan Active Inventory Training",
        "description": "Master real-time inventory visibility and demand forecasting with Manhattan's catalogue management solution.",
        "body": [
          "Manhattan Active Inventory is a catalogue management solution that allows managers to streamline financial planning, inventory replenishment, and operations. It uses demand forecasting to help managers optimize inventory planning.",
          "It highlights slow-selling items, forecasts by sales channel, auto-adjusts seasonal profiles, and tracks promotional/baseline demand, providing a holistic view of your inventory strategy.",
          "This solution is designed to help businesses enhance inventory management strategies while improving or eliminating costly supply chain challenges in the era of digital commerce."
        ]
      },
      {
        "name": "Manhattan Forecasting & Replenishment Training",
        "description": "Leverage demand forecasting algorithms and automated replenishment rules to maintain optimal stock levels.",
        "body": [
          "Manhattan’s Forecasting & Replenishment solutions allow retailers and wholesalers to enhance sales and customer service with the least amount of inventory investment possible.",
          "The solutions combine market-leading innovation, advanced algorithms, and data science with an intuitive, visually-stunning user experience, helping drive shareholder value from every inventory-intensive operation.",
          "New machine-learning-based capabilities enable the solution to not only detect opportunities to improve results but also to self-tune inventory strategies to drive even greater financial benefits."
        ]
      },
      {
        "name": "Manhattan Labor & Slotting Optimization",
        "description": "Optimize workforce productivity and product placement within the warehouse using Manhattan's advanced tools.",
        "body": [
          "Manhattan Labor Management Training covers labor standard creation, real-time performance tracking, and incentive program configuration to reduce labor costs while improving throughput.",
          "Manhattan Slotting Optimization Training teaches you to maximize pick efficiency by mastering algorithms that determine the optimal placement of products based on velocity and product characteristics.",
          "Together, these modules provide the tools needed to manage a high-performance workforce and a highly efficient warehouse layout."
        ]
      },
      {
        "name": "Manhattan TMS & Transport Execution",
        "description": "Manage carrier selection, rate shopping, and shipment optimization within Manhattan's transportation modules.",
        "body": [
          "Manhattan TMS Training covers carrier onboarding, rate table management, and automated carrier selection rules to balance cost, speed, and service quality.",
          "Manhattan Transport Planning and Execution Training provides deeper insights into multi-modal shipping strategies and freight audit processes.",
          "Mastering these tools allows organizations to optimize their transportation spend and ensure reliable delivery performance across their network."
        ]
      },
      {
        "name": "Manhattan Specialized Modules",
        "description": "Overview of Manhattan Yard, Hub, Event, and Billing Management for comprehensive supply chain control.",
        "body": [
          "Manhattan Yard Management Training optimizes dock scheduling and trailer tracking, while Manhattan Hub Management focuses on cross-dock operations and hub consolidation.",
          "Manhattan Event Management Training provides configurable alerts for proactive exception handling, and Manhattan Billing Management automates billing for 3PL and multi-client operations.",
          "These specialized modules ensure that every facet of the supply chain—from the yard gate to the final invoice—is managed with precision."
        ]
      }
    ],
    "relatedTraining": ["Blue Yonder WMS", "SAP SCM", "Oracle SCM Cloud", "TMS Transport Management"],
    "plans": [
      {
        "name": "Professional Training Bundle",
        "price": "Contact for Quote",
        "features": [
          "End-to-end WMOS/Active WM/WMi training",
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
          "Dedicated Manhattan expert access"
        ]
      }
    ]
  },`;

let data = fs.readFileSync(filePath, 'utf8');

// Find the start and end of the manhattan-wms-training block
const startMarker = '  "manhattan-wms-training": {';
const endMarker = '  },';

const startIndex = data.indexOf(startMarker);
if (startIndex === -1) {
  console.error('Could not find start marker');
  process.exit(1);
}

// Find the next occurrence of "oracle-epm-cloud" to know where to stop
const nextBlockMarker = '"oracle-epm-cloud": {';
const nextBlockIndex = data.indexOf(nextBlockMarker);

if (nextBlockIndex === -1) {
    console.error('Could not find next block marker');
    process.exit(1);
}

// The end of the manhattan block is the last "}," before the next block
const substringToSearch = data.substring(startIndex, nextBlockIndex);
const lastBraceIndex = substringToSearch.lastIndexOf('  },');

if (lastBraceIndex === -1) {
    console.error('Could not find end of block');
    process.exit(1);
}

const endIndex = startIndex + lastBraceIndex + 4; // +4 for "  },"

const updatedData = data.substring(0, startIndex) + newContent + data.substring(endIndex);

fs.writeFileSync(filePath, updatedData, 'utf8');
console.log('Successfully updated Manhattan WMS content');
