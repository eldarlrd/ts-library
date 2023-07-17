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

interface Modal {
  isOpen: boolean;
  toggleOpen: () => boolean;
  checkOutside: (target: EventTarget | null) => void;
}

const bookCreate: Modal = {
  isOpen: false,
  toggleOpen: () => (bookCreate.isOpen = !bookCreate.isOpen),
  checkOutside: target => {
    target !== null
      ? (
          (<unknown>(
            ((<unknown>target) as HTMLDivElement).closest('#modal')
          )) as HTMLDivElement[]
        ).length
        ? null
        : bookCreate.toggleOpen()
      : null;
  }
};

export const App = (): VirtualDOM => {
  return {
    view: () =>
      m(
        'div#app',
        {
          class:
            'flex items-center justify-around min-h-screen flex-col font-main bg-yellow-900 accent-blue-500'
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
                'flex bg-slate-50 gap-6 flex-col items-center p-6 md:min-h-[calc(100vh-16.75em)] min-h-[calc(100vh-16.25em)] w-full'
            },
            [
              m(
                'button',
                {
                  onclick: bookCreate.toggleOpen,
                  class:
                    'outline-none drop-shadow-md transition-colors active:bg-blue-700 hover:bg-blue-600 select-none bg-blue-500 text-white text-center text-lg sm:text-xl md:text-2xl font-bold rounded-xl px-3 py-2'
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
                        {
                          class:
                            'mt-4 m-2 text-center text-lg sm:text-xl md:text-2xl hyphens-auto'
                        },
                        '"The Stranger"'
                      ),
                      m(
                        'figcaption#author',
                        {
                          class:
                            'm-2 text-center sm:text-lg md:text-xl hyphens-auto'
                        },
                        'by Albert Camus'
                      ),
                      m(
                        'figcaption#pages',
                        {
                          class:
                            'grow m-2 text-center sm:text-lg md:text-xl hyphens-auto'
                        },
                        '159 Pages'
                      ),
                      m('span', { class: 'flex flex-col w-11/12 mb-2' }, [
                        m(
                          'button#read',
                          {
                            class:
                              'outline-none drop-shadow-md transition-colors active:bg-green-700 hover:bg-green-600 select-none bg-green-500 text-white text-center sm:text-lg md:text-xl flex items-center justify-center gap-2 font-bold rounded-xl px-3 py-2 m-2'
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
                              'outline-none drop-shadow-md transition-colors active:bg-red-700 hover:bg-red-600 select-none bg-red-500 text-white text-center sm:text-lg md:text-xl font-bold flex items-center justify-center gap-2 rounded-xl px-3 py-2 m-2'
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
                      ])
                    ]
                  )
                ]
              ),
              // Modal
              m(
                'div#overlay',
                {
                  onclick: bookCreate.toggleOpen,
                  class: bookCreate.isOpen
                    ? 'fixed inset-0 z-20 flex h-full w-full items-center justify-center bg-black/75'
                    : 'hidden'
                },
                [
                  m(
                    'section#modal',
                    {
                      onclick: (e: Event) => bookCreate.checkOutside(e.target),
                      class:
                        'scale-100 transition-transform flex flex-col items-center justify-center gap-6 rounded-xl bg-stone-200 drop-shadow-2xl h-96 md:w-80'
                    },
                    [
                      m(
                        'h2',
                        { class: 'select-none text-xl font-bold md:text-2xl' },
                        'Book Details'
                      ),
                      m(
                        'form',
                        {
                          class:
                            'flex flex-col items-center justify-center gap-6'
                        },
                        [
                          m('input#title', {
                            class: 'px-3 py-2 rounded-xl w-11/12',
                            required: true,
                            name: 'title',
                            placeholder: 'Title'
                          }),
                          m('input#author', {
                            class: 'px-3 py-2 rounded-xl w-11/12',
                            required: true,
                            name: 'author',
                            placeholder: 'Author'
                          }),
                          m('input#pages', {
                            class:
                              'px-3 py-2 invalid:focus:accent-red-500 rounded-xl w-11/12',
                            required: true,
                            min: 2,
                            type: 'number',
                            name: 'pages',
                            placeholder: 'Pages'
                          }),
                          m('span', { class: 'flex gap-2' }, [
                            m(
                              'label',
                              {
                                for: 'readStatus',
                                class:
                                  'text-lg md:text-xl select-none cursor-pointer'
                              },
                              'Have you read it?'
                            ),
                            m('input#readStatus', {
                              name: 'readStatus',
                              class: 'cursor-pointer w-5 border outline-none',
                              type: 'checkbox'
                            })
                          ]),
                          m('input', {
                            class:
                              'w-11/12 cursor-pointer outline-none drop-shadow-md transition-colors active:bg-blue-700 hover:bg-blue-600 select-none bg-blue-500 text-white text-center md:text-xl text-lg font-bold rounded-xl px-3 py-2',
                            name: 'submitBoom',
                            type: 'submit',
                            value: 'Add'
                          })
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
                    'm-6 gap-1 font-bold flex select-none flex-col items-center justify-center text-center text-lg font-bold text-white drop-shadow-xl sm:text-xl md:text-2xl'
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
