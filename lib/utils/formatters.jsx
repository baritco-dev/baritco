export function formatPrice(price) {
  return new Intl.NumberFormat('fa-IR', {
    style: 'currency',
    currency: 'IRR',
  }).format(price);
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}