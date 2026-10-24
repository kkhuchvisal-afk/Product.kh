// Picks up every photo you put in  src/assets/products/  automatically (Create React App / webpack).
//
// Name each file after the product's slug:   nike-zoom-stride-5.jpg
// Extra angles:                              nike-zoom-stride-5-2.jpg, nike-zoom-stride-5-3.jpg
//
// The full list of slugs is in assets/products/PHOTO-LIST.csv
let files = {};

try {
  const ctx = require.context("../assets/products", false, /\.(jpe?g|png|webp|avif)$/i);
  files = Object.fromEntries(
    ctx.keys().map((key) => {
      const name = key.replace(/^\.\//, "").replace(/\.\w+$/, "").toLowerCase();
      const mod = ctx(key);
      return [name, mod.default ?? mod];
    })
  );
} catch {
  files = {}; // not running inside webpack (for example in a test script)
}

// All photos for one product, main photo first: slug, slug-2, slug-3 ...
export const photosFor = (slug) =>
  Object.keys(files)
    .filter((name) => name === slug || new RegExp(`^${slug}-\\d+$`).test(name))
    .sort((a, b) => {
      const n = (x) => (x === slug ? 1 : Number(x.slice(slug.length + 1)));
      return n(a) - n(b);
    })
    .map((name) => files[name]);

export default files;