import { fetchOrganizations, fetchOrganizationBySlug } from '../mocks/organizations';

export async function getOrganizations() {
  try {
    const organizations = await fetchOrganizations();
    return { data: organizations, error: null };
  } catch (error) {
    return { data: null, error: 'خطا در دریافت شرکت‌ها' };
  }
}

export async function getOrganizationBySlug(slug) {
  try {
    const organization = await fetchOrganizationBySlug(slug);
    if (!organization) {
      return { data: null, error: 'شرکت یافت نشد' };
    }
    return { data: organization, error: null };
  } catch (error) {
    return { data: null, error: 'خطا در دریافت اطلاعات شرکت' };
  }
}