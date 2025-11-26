import { fetchAds as fetchMockAds, fetchAdBySlug as fetchMockAdBySlug, fetchAdCategories as fetchMockAdCategories, fetchAdsByTag as fetchMockAdsByTag } from '../mocks/ads';

// بررسی محیط توسعه
const isDevelopment = process.env.NODE_ENV === 'development';

export async function fetchAds() {
  if (isDevelopment) {
    return fetchMockAds();
  }
  try {
    const res = await fetch('https://api.baritco.com/ads', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.warn(`HTTP error fetching ads: ${res.status}`);
      return await fetchMockAds(); // فال‌بک به داده‌های موک
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching ads:', error);
    return await fetchMockAds();
  }
}

export async function fetchAdBySlug(slug) {
  if (!slug) {
    console.warn('No slug provided to fetchAdBySlug');
    return null;
  }
  if (isDevelopment) {
    return fetchMockAdBySlug(slug);
  }
  try {
    const res = await fetch(`https://api.baritco.com/ads/slug/${encodeURIComponent(slug)}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.warn(`HTTP error fetching ad with slug ${slug}: ${res.status}`);
      return await fetchMockAdBySlug(slug); // فال‌بک به داده‌های موک
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching ad with slug ${slug}:`, error);
    return await fetchMockAdBySlug(slug); // فال‌بک به داده‌های موک
  }
}

export async function fetchAdCategories() {
  if (isDevelopment) {
    return fetchMockAdCategories();
  }
  try {
    const res = await fetch('https://api.baritco.com/ad-categories', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.warn(`HTTP error fetching ad categories: ${res.status}`);
      return await fetchMockAdCategories(); // فال‌بک به داده‌های موک
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching ad categories:', error);
    return await fetchMockAdCategories();
  }
}

export async function fetchAdsByTag(tag) {
  if (isDevelopment) {
    return fetchMockAdsByTag(tag);
  }
  try {
    const res = await fetch(`https://api.baritco.com/ads/tag/${encodeURIComponent(tag)}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.warn(`HTTP error fetching ads by tag ${tag}: ${res.status}`);
      return await fetchMockAdsByTag(tag); // فال‌بک به داده‌های موک
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching ads by tag ${tag}:`, error);
    return await fetchMockAdsByTag(tag);
  }
}



