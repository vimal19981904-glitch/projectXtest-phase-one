import fs from 'fs/promises';
function toSlug(text) {
  return text.toLowerCase().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '');
}

async function synthesize() {
  const rawData = await fs.readFile('raw_extraction_Analytics.json', 'utf-8');
  const items = JSON.parse(rawData);
  const result = [];

  for (const item of items) {
    // 1. Rebrand Title
    let brandTitle = item.title
      .replace(/Training/gi, 'Enterprise Support')
      .replace(/MaxMunus/gi, '')
      .replace(/Online Course/gi, '')
      .replace(/Certification/gi, '')
      .replace(/Tutorial/gi, '')
      .replace(/tips/gi, '')
      .replace(/in online/gi, '')
      .replace(/\|/g, '')
      .replace(/&/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    // 2. Synthesize Overview
    let overview = item.overview
      .replace(/Hi we provide/gi, 'Project X provides Tier-1')
      .replace(/MaxMunus/gi, 'Project X')
      .replace(/training/gi, 'enterprise architectural support and job assistance')
      .replace(/our certified expert consultant who can teach/gi, 'Our elite architectural consultants implement')
      .replace(/classroom/gi, 'on-premise deployment support')
      .replace(/study material and ppt/gi, 'production-grade architecture blueprints');
      
      if(overview.toLowerCase().includes('tableau') || overview.toLowerCase().includes('qlik') || overview.toLowerCase().includes('power bi')) {
        overview += ' Specializing in advanced data visualization, self-service BI governance, and complex dashboard performance optimization.';
      } else if (overview.toLowerCase().includes('hadoop') || overview.toLowerCase().includes('spark') || overview.toLowerCase().includes('big data')) {
        overview += ' Experts in distributed computing architectures, data lake engineering, and real-time stream processing optimization.';
      } else if (overview.toLowerCase().includes('informatica') || overview.toLowerCase().includes('pentaho')) {
        overview += ' Focused on enterprise data integration (ETL), master data management (MDM), and automated data quality validation.';
      } else {
        overview += ' We ensure end-to-end operational stability and seamless integration of modern data analytics practices into your enterprise ecosystem.';
      }

    // 3. Synthesize Course Content
    let syllabus = [];
    const techLower = item.title.toLowerCase();
    
    if (techLower.includes('tableau') || techLower.includes('qlik')) {
      syllabus = [
        "Advanced Data Modeling & Calculation Engineering",
        "Enterprise Dashboard Design & Storytelling Best Practices",
        "Server Architecture, Security, and Governance Frameworks",
        "Performance Tuning for Large-Scale Data Visualizations"
      ];
    } else if (techLower.includes('hadoop') || techLower.includes('spark')) {
      syllabus = [
        "Distributed Systems Architecture & Cluster Management",
        "Data Ingestion Strategies (Kafka/Sqoop/Flume)",
        "Advanced MapReduce & Spark RDD/DataFrame Optimization",
        "Data Lake Governance and Security Configuration"
      ];
    } else if (techLower.includes('informatica') || techLower.includes('pentaho')) {
      syllabus = [
        "Complex ETL Workflow Design & Transformation Logic",
        "Metadata Management & Data Lineage Configuration",
        "Incremental Loading & Performance Tuning Strategies",
        "Automated Data Quality & Validation Engineering"
      ];
    } else {
      syllabus = [
        "Core Module Configuration & Advanced Setup",
        "Enterprise Integration Strategies (API / EDI / MFT)",
        "Production Support Best Practices & Log Analysis",
        "Performance Tuning & Database Administration"
      ];
    }

    result.push({
      id:'analytics-' + toSlug(brandTitle.replace(/tableau|qlik|pentaho/gi, '')) + '-support',
      title: brandTitle,
      category: item.category,
      overview: overview,
      courseContent: syllabus,
      duration: item.duration || "40 Enterprise Hours",
      supportFeatures: [
        "Customized Corporate Curriculum",
        "Real-time scenario-based architecture",
        "Live Video Support Sessions"
      ]
    });
  }

  await fs.writeFile('synthesized_analytics.json', JSON.stringify(result, null, 2));
  console.log(`Synthesis complete. Generated ${result.length} refined domain structures.`);
}

synthesize().catch(console.error);
