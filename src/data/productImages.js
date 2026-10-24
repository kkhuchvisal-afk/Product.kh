// Which picture each product shows, from strongest to weakest:
//
//   1. an entry in `productImages` below (any URL or path)
//   2. a photo file you add to src/assets/products/  (see data/localPhotos.js)
//   3. the fallback picture chosen here:
//        "stock"        generic sneaker photos (real photos, but not the exact model)
//        "illustration" a drawing built from the product data (see data/shoeArt.js)
export const fallbackStyle = "stock";

// Key = product slug (brand + name, lowercase, dashes). Example:
//   "nike-zoom-stride-5": "https://your-cdn.example.com/zoom-stride-5.jpg",
export const productImages = {};

export default productImages;