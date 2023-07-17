import m from 'mithril';
import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';
import githubLogo from '@/assets/github.svg';

const githubURL: string = 'https://github.com/eldarlrd';

interface VirtualDOM {
  view: () => m.Vnode;
}

export const App = (): VirtualDOM => {
  return {
    view: () =>
      m(
        'div#app',
        {
          class:
            'flex gap-12 items-center justify-around min-h-screen flex-col font-main bg-yellow-900'
        },
        [
          // Header
          m(
            'header',
            { class: 'w-full -mb-12 shadow-md shadow-yellow-950/60 z-10' },
            m(
              'h1',
              {
                class:
                  'flex flex-wrap items-center justify-center md:justify-start gap-2 text-center text-white text-4xl font-bold select-none m-6 sm:text-5xl md:text-6xl'
              },
              [
                m(
                  'span',
                  { class: 'bg-blue-500 px-3 py-2 rounded-xl' },
                  'TypeScript'
                ),
                'Library'
              ]
            )
          ),
          // Main
          m(
            'main',
            {
              class:
                'flex bg-slate-50 flex-col items-center justify-center min-h-screen w-full'
            },
            [m('h2', 'Mithril')]
          ),
          // Footer
          m(
            'footer',
            { class: 'w-full -mt-12 z-10 shadow-md-top shadow-yellow-950/60' },
            [
              m(
                'p',
                {
                  class:
                    'm-6 font-bold flex select-none flex-col items-center justify-center text-center text-lg font-bold text-white drop-shadow-xl sm:text-xl md:text-2xl'
                },
                [
                  'by',
                  m(
                    'a',
                    {
                      class:
                        'flex items-center outline-none justify-center gap-1 text-center transition-transform hover:scale-110flex items-center justify-center gap-1 text-center transition-transform hover:scale-110',
                      title: 'Go to GitHub',
                      target: '_blank',
                      rel: 'noreferrer',
                      href: githubURL
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
        ]
      )
  };
};
