// avatarData.js
// ============================================================
// Place your 7 professional headshot photos in:
//   /public/images/avatars/avatar-1.jpg ... avatar-7.jpg
// Square crop, min 112x112px, keep under 100KB each.
// ============================================================

export const avatarData = [
  {
    id: 1,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Sarah Chen',
    title: 'WMS Expert',
  },
  {
    id: 2,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'James Rodriguez',
    title: 'ERP Consultant',
  },
  {
    id: 3,
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    name: 'Priya Sharma',
    title: 'Supply Chain Lead',
  },
  {
    id: 4,
    image: 'https://randomuser.me/api/portraits/men/46.jpg',
    name: "Michael O'Brien",
    title: 'Oracle Specialist',
  },
  {
    id: 5,
    image: 'https://randomuser.me/api/portraits/women/90.jpg',
    name: 'Emma Thompson',
    title: 'SAP Trainer',
  },
  {
    id: 6,
    image: 'https://randomuser.me/api/portraits/men/85.jpg',
    name: 'David Kumar',
    title: 'Tech Lead',
  },
  {
    id: 7,
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    name: 'Lisa Martinez',
    title: 'Business Analyst',
  },
  {
    id: 8,
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    name: 'Alex Johnson',
    title: 'Cloud Architect',
  }
];

// Instead of a single radius/angle, we can define specific x,y positions (relative to center)
// to make them look scattered across the globe surface like the reference image.
export const avatarPositions = [
  { angle: 15, radiusFactor: 0.85 },
  { angle: 65, radiusFactor: 1.0 },
  { angle: 110, radiusFactor: 0.75 },
  { angle: 160, radiusFactor: 0.95 },
  { angle: 210, radiusFactor: 0.8 },
  { angle: 250, radiusFactor: 1.05 },
  { angle: 300, radiusFactor: 0.7 },
  { angle: 340, radiusFactor: 1.0 },
];
