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
            m(
              'h1',
              {
                class:
                  'flex flex-wrap items-center justify-center gap-1 text-center text-white text-4xl font-bold select-none m-6 sm:text-5xl md:text-6xl'
              },
              [
                m(
                  'span',
                  { class: 'bg-blue-500 px-3 py-2 rounded-xl' },
                  'TypeScript'
                ),
                ' Library'
              ]
            )
          ),
          // Main
          m('main', { class: 'flex items-center justify-center' }, [
            m('h2', 'Mithril')
          ]),
          // Footer
          m('footer', [
            m(
              'p',
              {
                class:
                  'm-6 font-bold flex select-none flex-col items-center justify-center text-center text-lg font-bold text-white drop-shadow-xl sm:text-xl md:text-2xl'
              },
              [
                'by ',
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
          ])
        ]
      )
  };
};
