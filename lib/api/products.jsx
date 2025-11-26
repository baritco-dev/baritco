import { fetchProducts as fetchMockProducts, fetchProductBySlug as fetchMockProductBySlug, fetchProductReviews as fetchMockProductReviews, fetchRelatedProducts as fetchMockRelatedProducts, fetchProductsByCategory as fetchMockProductsByCategory, searchProducts as searchMockProducts, fetchProductsByTag as fetchMockProductsByTag } from '../mocks/products';

export async function fetchProducts({ limit = 10, offset = 0 } = {}) {
  if (process.env.NODE_ENV === 'development') {
    const allProducts = await fetchMockProducts();
    return allProducts.slice(offset, offset + limit);
  }

  try {
    const res = await fetch(`https://api.baritco.com/products?limit=${limit}&offset=${offset}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return await fetchMockProducts();
  }
}

export async function fetchProductBySlug(slug) {
  if (process.env.NODE_ENV === 'development') {
    return fetchMockProductBySlug(slug);
  }

  try {
    const res = await fetch(`https://api.baritco.com/products/slug/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function fetchProductReviews(slug) {
  if (process.env.NODE_ENV === 'development') {
    return fetchMockProductReviews(slug);
  }

  try {
    const res = await fetch(`https://api.baritco.com/products/slug/${slug}/reviews`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

export async function fetchRelatedProducts(slug) {
  if (process.env.NODE_ENV === 'development') {
    return fetchMockRelatedProducts(slug);
  }

  try {
    const res = await fetch(`https://api.baritco.com/products/slug/${slug}/related`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

export async function fetchProductsByCategory(category) {
  if (process.env.NODE_ENV === 'development') {
    return fetchMockProductsByCategory(category);
  }

  try {
    const res = await fetch(`https://api.baritco.com/products/category/${category}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

export async function searchProducts(query) {
  if (process.env.NODE_ENV === 'development') {
    return searchMockProducts(query);
  }

  try {
    const res = await fetch(`https://api.baritco.com/products/search?q=${encodeURIComponent(query)}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

export async function fetchProductsByTag(tag) {
  if (process.env.NODE_ENV === 'development') {
    return fetchMockProductsByTag(tag);
  }

  try {
    const res = await fetch(`https://api.baritco.com/products/tag/${encodeURIComponent(tag)}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching products by tag:', error);
    return await fetchMockProductsByTag(tag);
  }
}






// // /lib/api/products.jsx
// import { fetchProducts as fetchMockProducts, fetchProductBySlug as fetchMockProductBySlug, fetchProductReviews as fetchMockProductReviews, fetchRelatedProducts as fetchMockRelatedProducts, fetchProductsByCategory as fetchMockProductsByCategory, searchProducts as searchMockProducts } from '../mocks/products';

// export async function fetchProducts({ limit = 10, offset = 0 } = {}) { // جدید: pagination
//   if (process.env.NODE_ENV === 'development') {
//     const allProducts = await fetchMockProducts();
//     return allProducts.slice(offset, offset + limit);
//   }

//   try {
//     const res = await fetch(`https://api.baritco.com/products?limit=${limit}&offset=${offset}`, {
//       next: { revalidate: 3600 },
//     });
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     return res.json();
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     // جدید: fallback به موک در صورت خطا
//     return await fetchMockProducts();
//   }
// }

// export async function fetchProductBySlug(slug) {
//   if (process.env.NODE_ENV === 'development') {
//     return fetchMockProductBySlug(slug);
//   }

//   try {
//     const res = await fetch(`https://api.baritco.com/products/slug/${slug}`, {
//       next: { revalidate: 3600 },
//     });
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     return res.json();
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     return null;
//   }
// }

// export async function fetchProductReviews(slug) {
//   if (process.env.NODE_ENV === 'development') {
//     return fetchMockProductReviews(slug);
//   }

//   try {
//     const res = await fetch(`https://api.baritco.com/products/slug/${slug}/reviews`, {
//       next: { revalidate: 3600 },
//     });
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     return res.json();
//   } catch (error) {
//     console.error('Error fetching reviews:', error);
//     return [];
//   }
// }

// export async function fetchRelatedProducts(slug) {
//   if (process.env.NODE_ENV === 'development') {
//     return fetchMockRelatedProducts(slug);
//   }

//   try {
//     const res = await fetch(`https://api.baritco.com/products/slug/${slug}/related`, {
//       next: { revalidate: 3600 },
//     });
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     return res.json();
//   } catch (error) {
//     console.error('Error fetching related products:', error);
//     return [];
//   }
// }

// export async function fetchProductsByCategory(category) {
//   if (process.env.NODE_ENV === 'development') {
//     return fetchMockProductsByCategory(category);
//   }

//   try {
//     const res = await fetch(`https://api.baritco.com/products/category/${category}`, {
//       next: { revalidate: 3600 },
//     });
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     return res.json();
//   } catch (error) {
//     console.error('Error fetching products by category:', error);
//     return [];
//   }
// }

// export async function searchProducts(query) {
//   if (process.env.NODE_ENV === 'development') {
//     return searchMockProducts(query); // استفاده از تابع گسترش‌یافته موک
//   }

//   try {
//     const res = await fetch(`https://api.baritco.com/products/search?q=${encodeURIComponent(query)}`, {
//       next: { revalidate: 3600 },
//     });
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     return res.json();
//   } catch (error) {
//     console.error('Error searching products:', error);
//     return [];
//   }
// }


