// /lib/api/content.js
import { fetchContentByType, fetchContentBySlug as fetchMockContentBySlug } from '../mocks/content';

// بررسی محیط توسعه
const isDevelopment = process.env.NODE_ENV === 'development';

export async function fetchContent(contentType) {
  if (isDevelopment) {
    return fetchContentByType(contentType);
  }
  const res = await fetch(`https://api.baritco.com/${contentType}`, {
    next: { revalidate: 3600 },
  });
  return res.json();
}

export async function fetchContentBySlug(slug, contentType) {
  if (isDevelopment) {
    return fetchMockContentBySlug(slug, contentType);
  }
  const res = await fetch(`https://api.baritco.com/${contentType}/slug/${slug}`, {
    next: { revalidate: 3600 },
  });
  return res.json();
}