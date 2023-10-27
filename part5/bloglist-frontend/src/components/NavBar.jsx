import { useState, useEffect } from 'react';

import { Transition } from '@headlessui/react';

import HomeLogo from '../img/icons/home.svg';
import XMark from '../img/icons/xmark-icon.svg';
import Menu from '../img/icons/menu-icon.svg';

export default function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const [scrollDir, setScrollDir] = useState('down');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      setScrollY(currentScrollY);
      setScrollDir(currentScrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDir, scrollY]);

  {
    if (scrollY === 0 || scrollDir === 'up') {
      return (
        <nav
          className={
            'w-full md:w-3/4 md:mx-auto fixed md:rounded-b top-0 left-0 right-0 z-10 bg-black/40 backdrop-blur-sm'
          }
        >
          <div className='flex justify-between items-center h-16'>
            <a href='/' className='ml-4'>
              <img src={HomeLogo} alt='logo' className='w-6 h-auto' />
            </a>

            <div className='flex md:hidden mr-4'>
              <button onClick={() => setNavbar(!navbar)}>
                {navbar ? (
                  <img
                    src={XMark}
                    alt='Close NavBar menu'
                    className='w-6 h-auto'
                  />
                ) : (
                  <img
                    src={Menu}
                    alt='Open NavBar menu'
                    className='w-6 h-auto'
                  />
                )}
              </button>
            </div>
          </div>

          <Transition
            show={navbar}
            enter='transition-opacity duration-100'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <ul
              className={
                'h-screen flex flex-col justify-evenly items-center text-white text-xl'
              }
            ></ul>
          </Transition>
        </nav>
      );
    }
  }
}
