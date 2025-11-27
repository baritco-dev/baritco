// app/layout.jsx
import './globals.css';
import { Providers } from '../lib/redux/provider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MegaMenu from '../components/Menus/MegaMenu';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FloatingContactButton from '@/components/FloatingContactButton';

export const metadata = {
  title: 'باریتکو',
  description: 'پلتفرم تخصصی معدن و صنایع معدنی',
};

export const metadataBase = new URL('https://bariteco.ir');

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Providers>
          <Header />
          <MegaMenu />
          
          {/* Breadcrumb حذف شد — فقط توی صفحات لازم اضافه می‌شه */}
          
          <main>{children}</main>
          
          <FloatingContactButton />
          <ToastContainer />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}




// import './globals.css';
// import { Providers } from '../lib/redux/provider';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import MegaMenu from '../components/Menus/MegaMenu';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // تنظیمات متادیتا برای کل برنامه
// export const metadata = {
//   title: 'باریتکو',
//   description: 'پلتفرم تخصصی معدن و صنایع معدنی',
// };

// // تنظیم metadataBase برای رزول کردن تصاویر Open Graph و Twitter
// export const metadataBase = new URL('https://bariteco.ir');

// // لی‌اوت اصلی برنامه
// export default async function RootLayout({ children }) {
//   return (
//     <html lang="fa" dir="rtl">
//       <head>
//         <meta charSet="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       </head>
//       <body>
//         <Providers>
//           <Header />
//           <MegaMenu />
//           {children}
//           <ToastContainer />
//           <Footer />
//         </Providers>
//       </body>
//     </html>
//   );
// }



