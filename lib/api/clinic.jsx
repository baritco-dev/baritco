import { fetchSpecialists, fetchSpecialistBySlug } from '../mocks/clinic';

export async function getSpecialists() {
  try {
    const specialists = await fetchSpecialists();
    return { data: specialists, error: null };
  } catch (error) {
    return { data: null, error: 'خطا در دریافت متخصصان' };
  }
}

export async function getSpecialistBySlug(slug) {
  try {
    const specialist = await fetchSpecialistBySlug(slug);
    if (!specialist) {
      return { data: null, error: 'متخصص یافت نشد' };
    }
    return { data: specialist, error: null };
  } catch (error) {
    return { data: null, error: 'خطا در دریافت اطلاعات متخصص' };
  }
}

export async function bookAppointment(appointmentData) {
  try {
    // شبیه‌سازی ذخیره رزرو در API
    return { data: { id: Date.now(), ...appointmentData }, error: null };
  } catch (error) {
    return { data: null, error: 'خطا در ثبت رزرو' };
  }
}