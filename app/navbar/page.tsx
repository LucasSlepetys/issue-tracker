'use client';
import { Skeleton } from '../components';
import {
  Avatar,
  Button,
  Container,
  DropdownMenu,
  Flex,
} from '@radix-ui/themes';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import { Loading } from '../components';

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

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
    <nav className='flex items-center h-24 px-8 text-xl mb-4 border-b'>
      <Container>
        <Flex justify={'between'}>
          <Flex gap={'4'} align={'center'}>
            <Link href='/'>
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthenticationButtons />
        </Flex>
      </Container>
    </nav>
  );

  function NavLinks() {
    return (
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
    );
  }

  function AuthenticationButtons() {
    if (status === 'loading') return <Skeleton width={'4rem'} height='2rem' />;
    if (status === 'unauthenticated')
      return (
        <Link
          href='/api/auth/signin'
          className='text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-xl text-sm px-3.5 py-1.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2'
        >
          Login
        </Link>
      );

    return (
      session && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              size='2'
              radius='full'
              src={session.user?.image!}
              fallback='?'
              className='cursor-pointer'
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>{session.user?.email}</DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href='/api/auth/signout' className=''>
                Log Out
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )
    );
  }
};

export default NavBar;
