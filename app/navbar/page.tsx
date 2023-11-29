'use client';
import classnames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    {
      name: 'Dashboard',
      href: '/dashboard',
    },
    {
      name: 'Issues',
      href: '/issues/view',
    },
  ];

  return (
    <nav className='flex gap-4 h-24 items-center px-8 text-xl mb-4 border-b'>
      <Link href='/'>
        <AiFillBug />
      </Link>
      <ul className='flex gap-4 mx-4'>
        {links.map((link, index) => {
          return (
            <li
              key={index}
              className={classnames({
                'text-zinc-900 border-b-2 border-black':
                  currentPath === link.href,
                'text-zinc-500': currentPath !== link.href,
                'hover:text-zinc-800 transition-all duration-300': true,
              })}
            >
              <Link href={link.href}>{link.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
