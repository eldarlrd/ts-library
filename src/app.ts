import m from 'mithril';
import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';
// import bookOpen from '@/assets/book-open.svg';
import bookClosed from '@/assets/book-closed.svg';
import trash from '@/assets/trash.svg';
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
            'flex items-center justify-around min-h-screen flex-col font-main bg-yellow-900'
        },
        [
          // Header
          m(
            'header',
            {
              class:
                'min-h-[9.5em] flex items-center justify-center w-full shadow-md shadow-yellow-950/60 z-10'
            },
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
                'flex bg-slate-50 gap-6 flex-col items-center p-6 min-h-[calc(100vh-16em)] w-full'
            },
            [
              m(
                'button',
                {
                  class:
                    'outline-none transition-colors active:bg-blue-700 hover:bg-blue-600 select-none bg-blue-500 text-white text-center text-lg sm:text-xl md:text-2xl font-bold rounded-xl px-3 py-2'
                },
                '+ New Book'
              ),
              m(
                'section',
                {
                  class: 'flex flex-wrap gap-4 items-center justify-center mb-4'
                },
                [
                  m(
                    'figure',
                    {
                      class:
                        'flex shadow-md justify-around items-center flex-col flex-wrap rounded-xl w-64 min-h-80 bg-stone-200'
                    },
                    [
                      m(
                        'figcaption#title',
                        { class: 'text-center text-lg sm:text-xl md:text-2xl' },
                        '"Title"'
                      ),
                      m(
                        'figcaption#author',
                        { class: 'text-center sm:text-lg md:text-xl' },
                        'by Author'
                      ),
                      m(
                        'figcaption#pages',
                        { class: 'text-center sm:text-lg md:text-xl' },
                        '144 Pages'
                      ),
                      m(
                        'button#read',
                        {
                          class:
                            'outline-none transition-colors active:bg-green-700 hover:bg-green-600 select-none bg-green-500 text-white text-center sm:text-lg md:text-xl flex items-center justify-center gap-1 font-bold rounded-xl px-3 py-2 mx-3 -mb-4 w-[calc(100%-1.5em)]'
                        },
                        [
                          m('img', {
                            class: 'h-4 w-4 md:h-5 md:w-5',
                            alt: 'Closed Book',
                            src: bookClosed
                          }),
                          'Read'
                        ]
                      ),
                      m(
                        'button#remove',
                        {
                          class:
                            'outline-none transition-colors active:bg-red-700 hover:bg-red-600 select-none bg-red-500 text-white text-center sm:text-lg md:text-xl font-bold flex items-center justify-center gap-1 rounded-xl px-3 py-2 mx-3 mb-2 w-[calc(100%-1.5em)]'
                        },
                        [
                          m('img', {
                            class: 'h-4 w-4 md:h-5 md:w-5',
                            alt: 'Trash Can',
                            src: trash
                          }),
                          'Remove'
                        ]
                      )
                    ]
                  )
                ]
              )
            ]
          ),
          // Footer
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
                    'm-6 font-bold flex select-none flex-col items-center justify-center text-center text-lg font-bold text-white drop-shadow-xl sm:text-xl md:text-2xl'
                },
                [
                  'by',
                  m(
                    'a',
                    {
                      class:
                        'outline-none flex items-center justify-center gap-1 text-center transition-transform hover:scale-110',
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
