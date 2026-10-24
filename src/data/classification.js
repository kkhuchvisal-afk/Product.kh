// How the shop groups footwear: by the sport it is built for, and by everyday use.
// `filter` is what the Shop page applies: { category } matches a product category, { q } searches name and description.

export const classification = [
  {
    id: "sport",
    number: "01",
    title: "By sport type",
    description: "Built for the movements and surfaces of one sport.",
    items: [
      {
        id: "running",
        name: "Running",
        description: "Road and track shoes for forward motion and repeated impact.",
        features: ["Cushioned midsole", "Breathable mesh", "Lightweight"],
        filter: { category: "Running" },
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      },
      {
        id: "training",
        name: "Training & gym",
        description: "Stable shoes for lifting, classes and mixed workouts.",
        features: ["Flat stable base", "Lateral support", "Durable upper"],
        filter: { category: "Training" },
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
      },
      {
        id: "basketball",
        name: "Basketball",
        description: "High-impact shoes for jumping, cutting and quick stops.",
        features: ["Ankle support", "Strong grip", "Impact cushioning"],
        filter: { category: "Basketball" },
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
      },
      {
        id: "football",
        name: "Football & futsal",
        description: "Boots with studs for grass and turf, and flat soles for futsal.",
        features: ["Stud pattern", "Light touch upper", "Traction"],
        filter: { category: "Football" },
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
      },
      {
        id: "court",
        name: "Court sports",
        description: "Tennis, volleyball, squash and indoor courts.",
        features: ["Side-to-side support", "Non-marking sole", "Durable outsole"],
        filter: { category: "Court sports" },
        image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
      },
      {
        id: "hiking",
        name: "Hiking & trail",
        description: "Off-road shoes for rough ground, wet rocks and long days.",
        features: ["Deep lugs", "Toe and rock protection", "Weather resistance"],
        filter: { category: "Hiking" },
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
      },
    ],
  },
  {
    id: "daily",
    number: "02",
    title: "For daily use",
    description: "Comfort and style for work, errands and time off.",
    items: [
      {
        id: "everyday",
        name: "Everyday sneakers",
        description: "Versatile pairs that go with almost everything.",
        features: ["Easy to style", "All-day comfort", "Cushioned sole"],
        filter: { category: "Lifestyle" },
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
      },
      {
        id: "walking",
        name: "Walking",
        description: "Soft, flexible shoes for long days on your feet.",
        features: ["Flexible forefoot", "Arch support", "Soft cushioning"],
        filter: { q: "walk" },
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
      },
      {
        id: "street",
        name: "Skate & street",
        description: "Flat, tough shoes made for streetwear and skating.",
        features: ["Flat grippy sole", "Suede or canvas", "Reinforced toe"],
        filter: { q: "skate" },
        image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80",
      },
      {
        id: "slipon",
        name: "Slip-ons",
        description: "Quick to put on, easy to wear every day.",
        features: ["No laces", "Stretch panels", "Light weight"],
        filter: { q: "slip-on" },
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
      },
      {
        id: "retro",
        name: "Retro & heritage",
        description: "Classic silhouettes from the archives.",
        features: ["Vintage design", "Premium materials", "Everyday wear"],
        filter: { q: "retro" },
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
      },
    ],
  },
];

export default classification;