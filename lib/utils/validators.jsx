export function validateForm(data) {
  const errors = {};

  if (!data.name && data.title && data.title.length < 3) {
    errors.title = 'عنوان باید حداقل ۳ کاراکتر باشد';
  }
  if (!data.email && data.description && data.description.length < 10) {
    errors.description = 'توضیحات باید حداقل ۱۰ کاراکتر باشد';
  }
  if (!data.company && data.category && !data.category) {
    errors.category = 'دسته‌بندی الزامی است';
  }
  if (!data.company && data.image && !data.image) {
    errors.image = 'لینک تصویر الزامی است';
  }
  if (!data.company && data.contact && !data.contact) {
    errors.contact = 'اطلاعات تماس الزامی است';
  }
  if (data.name && data.name.length < 3) {
    errors.name = 'نام باید حداقل ۳ کاراکتر باشد';
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'ایمیل معتبر نیست';
  }
  if (data.company && data.company.length < 3) {
    errors.company = 'نام شرکت باید حداقل ۳ کاراکتر باشد';
  }

  return errors;
}