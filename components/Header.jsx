'use client';

import Link from 'next/link';
import Image from 'next/image';
import NavMenu from './Menus/NavMenu';

export default function Header() {
  return (
    <header className="bg-primary text-white py-4 shadow-md">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image
            src="/images/baritecoLogo.png"
            alt="لوگو باریتکو"
            width={120}
            height={40}
            className="object-contain"
          />
        </Link>
        <NavMenu />
      </div>
    </header>
  );
}


