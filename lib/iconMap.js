'use client';

// Unified Lucide icon map for all domain categories
// All icons use consistent stroke-width=1.5, size=20px
import {
  Package,
  Cloud,
  Settings2,
  BarChart2,
  BrainCircuit,
  Users,
  LayoutGrid,
  Database,
  ShieldCheck,
  Code2,
  Cpu,
  Server,
  Globe,
  Layers,
  Workflow,
  BookOpen,
  Briefcase,
  Network,
  Zap,
  Lock,
  Terminal,
  Box,
} from 'lucide-react';

/** Default icon props for visual consistency across ALL usages */
export const ICON_PROPS = {
  size: 20,
  strokeWidth: 1.75,
};

/**
 * Returns a Lucide icon component for a given domain category name.
 * Falls back to BookOpen if no match found.
 */
export function getDomainIcon(category) {
  const key = (category || '').toLowerCase();

  if (key.includes('erp') && key.includes('supply')) return Package;
  if (key.includes('supply chain')) return Package;
  if (key.includes('cloud') && key.includes('infra')) return Cloud;
  if (key.includes('devops') || key.includes('automation') || key.includes('ci/cd')) return Settings2;
  if (key.includes('data') && key.includes('analytics')) return BarChart2;
  if (key.includes('ai') || key.includes('machine learning') || key.includes('artificial')) return BrainCircuit;
  if (key.includes('salesforce') || key.includes('crm')) return Users;
  if (key.includes('microsoft')) return LayoutGrid;
  if (key.includes('erp systems') || key.includes('erp system')) return Database;
  if (key.includes('cybersecurity') || key.includes('security')) return ShieldCheck;
  if (key.includes('programming') || key.includes('development')) return Code2;
  if (key.includes('ibm')) return Cpu;
  if (key.includes('oracle') || key.includes('sap')) return Server;
  if (key.includes('network')) return Network;
  if (key.includes('python') || key.includes('java') || key.includes('javascript') || key.includes('node')) return Terminal;
  if (key.includes('api')) return Zap;
  if (key.includes('dsa') || key.includes('algorithm')) return Workflow;
  if (key.includes('cloud')) return Cloud;
  if (key.includes('erp')) return Box;

  return BookOpen;
}

/**
 * Color accents for each category (for active highlighted state in MegaMenu)
 */
export const DOMAIN_ACCENT_MAP = {
  'ERP & Supply Chain': '#2563eb',
  'Cloud & Infrastructure': '#0ea5e9',
  'DevOps & Automation': '#7c3aed',
  'Data & Analytics': '#059669',
  'AI & Machine Learning': '#db2777',
  'Salesforce & CRM': '#0284c7',
  'Microsoft Technologies': '#2563eb',
  'ERP Systems': '#b45309',
  'Cybersecurity': '#dc2626',
  'Programming & Development': '#16a34a',
};
