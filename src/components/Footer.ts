import m from 'mithril';

import githubLogo from '@/assets/images/github.svg';

export const Footer = {
  view: (): m.Vnode =>
    m(
      'footer',
      {
        class:
          'flex items-center justify-center w-full z-10 shadow-md-top shadow-yellow-950/60'
      },
      [
        m(
          'p',
          {
            class:
              'm-6 gap-1 font-bold flex select-none flex-col items-center justify-center text-center text-lg font-bold text-white drop-shadow-xl sm:text-xl md:text-2xl'
          },
          [
            '© 2023 - 2024',
            m(
              'a',
              {
                class:
                  'outline-none flex items-center justify-center gap-1 text-center transition-transform hover:scale-110',
                title: 'Source',
                target: '_blank',
                type: 'text/html',
                rel: 'author external noreferrer',
                href: 'https://github.com/eldarlrd/ts-library'
              },
              [
                m('img', {
                  class: 'h-6 w-6',
                  alt: 'GitHub Logo',
                  src: githubLogo
                }),
                'eldarlrd'
              ]
            )
          ]
        )
      ]
    )
};
