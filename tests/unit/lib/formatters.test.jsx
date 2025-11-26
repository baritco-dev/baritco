import { formatPrice, formatDate, truncateText } from '../../../lib/utils/formatters';

describe('Formatters', () => {
  test('formatPrice formats price correctly', () => {
    expect(formatPrice(1000000)).toMatch(/۱٬۰۰۰٬۰۰۰/);
  });

  test('formatDate formats date correctly', () => {
    const date = new Date('2025-07-24');
    expect(formatDate(date)).toMatch(/۳ مرداد ۱۴۰۴/);
  });

  test('truncateText truncates long text', () => {
    const text = 'این یک متن طولانی برای تست است';
    expect(truncateText(text, 10)).toBe('این یک متن طو...');
  });
});