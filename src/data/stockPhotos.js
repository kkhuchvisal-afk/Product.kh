// Free-to-use Unsplash sneaker photos. They are GENERIC: they show a sneaker, not the exact model.
// Replace them by adding your own photo for a product (see data/localPhotos.js).
const u = (id) => `https://images.unsplash.com/${id}?w=900&q=80`;

const pools = {
  Running: ["photo-1542291026-7eec264c27ff", "photo-1552346154-21d32810aba3", "photo-1460353581641-37baddab0fa2", "photo-1595950653106-6c9ebd614d3a", "photo-1608231387042-66d1773070a5"],
  Lifestyle: ["photo-1549298916-b41d501d3772", "photo-1600185365926-3a2ce3cdb9eb", "photo-1491553895911-0055eca6402d", "photo-1606107557195-0e29a4b5b4aa", "photo-1515955656352-a1fa3ffcd111"],
  Basketball: ["photo-1579338559194-a162d19bf842", "photo-1543508282-6319a3e2621f", "photo-1514989940723-e8e51635b782"],
  Training: ["photo-1491553895911-0055eca6402d", "photo-1460353581641-37baddab0fa2", "photo-1539185441755-769473a23570"],
  "Court sports": ["photo-1608231387042-66d1773070a5", "photo-1549298916-b41d501d3772", "photo-1514989940723-e8e51635b782"],
  Football: ["photo-1543508282-6319a3e2621f", "photo-1579338559194-a162d19bf842", "photo-1542291026-7eec264c27ff"],
  Hiking: ["photo-1595950653106-6c9ebd614d3a", "photo-1542291026-7eec264c27ff", "photo-1556906781-9a412961c28c"],
};

export const stockPhoto = (product, index = 0) => {
  const pool = pools[product.category] ?? pools.Lifestyle;
  return u(pool[index % pool.length]);
};

export default stockPhoto;