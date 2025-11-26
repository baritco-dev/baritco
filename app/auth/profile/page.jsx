'use client';

import { useSelector } from 'react-redux';
import SkeletonLoader from '../../../components/SkeletonLoader';

export default function ProfilePage() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">پروفایل کاربری</h1>
        <p>لطفاً ابتدا وارد حساب کاربری خود شوید.</p>
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">پروفایل کاربری</h1>
      <div className="space-y-4 max-w-md mx-auto">
        <div>
          <p className="font-semibold">نام: {user.name}</p>
        </div>
        <div>
          <p className="font-semibold">ایمیل: {user.email}</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg">
          ویرایش پروفایل
        </button>
      </div>
      <SkeletonLoader />
    </div>
  );
}