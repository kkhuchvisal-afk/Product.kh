// filter keys match what the Shop page understands: category, brand, max (max price)
export const collections = [
  {
    id: "run-club",
    title: "Run Club",
    tagline: "Cushioned, responsive and ready for the long miles.",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&q=80",
    filter: { category: "Running" },
  },
  {
    id: "everyday-classics",
    title: "Everyday Classics",
    tagline: "Easy sneakers for every day.",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
    filter: { category: "Lifestyle" },
  },
  {
    id: "train-hard",
    title: "Train Hard",
    tagline: "Stable and supportive for the gym.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    filter: { category: "Training" },
  },
  {
    id: "game-day",
    title: "Game Day",
    tagline: "Quick, grippy and court ready.",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
    filter: { category: "Court sports" },
  },
  {
    id: "under-150",
    title: "Under $150",
    tagline: "Great pairs that don't stretch the budget.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    filter: { max: 150 },
  },
  {
    id: "trail-ready",
    title: "Trail Ready",
    tagline: "Grip and protection for off-road miles.",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
    filter: { category: "Hiking" },
  },
  {
    id: "asia-edit",
    title: "Asia Edit",
    tagline: "Performance brands from Japan and China.",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80",
    filter: { region: "Asia" },
  },
];

export default collections;