import m, { VnodeDOM } from 'mithril';
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
  isDisabled: boolean;
  toggleOpen: () => boolean;
  checkOutside: (target: EventTarget | null) => void;
}

const bookWindow: Modal = {
  isOpen: false,
  isDisabled: true,
  toggleOpen: () => (bookWindow.isOpen = !bookWindow.isOpen),
  checkOutside: target => {
    target !== null
      ? (
          (<unknown>(
            ((<unknown>target) as HTMLDivElement).closest('#modal')
          )) as HTMLDivElement[]
        ).length
        ? null
        : bookWindow.toggleOpen()
      : null;
  }
};

interface BookDetails {
  [key: string]: FormDataEntryValue | string | number | boolean | undefined;
  title?: string;
  author?: string;
  pages?: number;
  isRead?: boolean;
}

interface BookList {
  form: EventTarget | null;
  books: BookDetails[];
  addBook: (e: Event) => void;
  addTitle: (title: string | null) => void;
  addAuthor: (author: string | null) => void;
  addPages: (pages: string | null) => void;
  toggleRead: (isRead: boolean | null) => void;
}

const book: BookDetails = {};

const library: BookList = {
  form: new EventTarget(),
  books: [],
  addBook: e => {
    if (e !== null) {
      library.form = document.getElementsByTagName('form')[0];
      const formData = new FormData(library.form as HTMLFormElement);
      formData.forEach((v, k) => (book[k as keyof BookDetails] = v));
      library.books.push(book);
    }
  },
  addTitle: title => {
    if (title !== null) {
      console.log(title);
    }
  },
  addAuthor: author => {
    if (author !== null) {
      console.log(author);
    }
  },
  addPages: pages => {
    if (pages !== null && +pages > 1 && +pages % 1 === 0) {
      console.log(pages);
    }
  },
  toggleRead: isRead => {
    if (isRead !== null) {
      console.log(isRead);
    }
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
                  onclick: bookWindow.toggleOpen,
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
                  library.books.map(item =>
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
                          `"${item.title}"`
                        ),
                        m(
                          'figcaption#author',
                          {
                            class:
                              'm-2 text-center sm:text-lg md:text-xl hyphens-auto'
                          },
                          `by ${item.author}`
                        ),
                        m(
                          'figcaption#pages',
                          {
                            class:
                              'grow m-2 text-center sm:text-lg md:text-xl hyphens-auto'
                          },
                          `${item.pages} Pages`
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
                  )
                ]
              ),
              // Modal
              m(
                'div#overlay',
                {
                  onclick: bookWindow.toggleOpen,
                  class: bookWindow.isOpen
                    ? 'fixed inset-0 z-20 flex h-full w-full items-center justify-center bg-black/75'
                    : 'hidden'
                },
                [
                  m(
                    'section#modal',
                    {
                      onclick: (e: Event) => bookWindow.checkOutside(e.target),
                      class:
                        'scale-100 transition-transform flex flex-col items-center justify-center gap-6 rounded-xl bg-stone-200 drop-shadow-2xl max-h-full h-96 md:w-80'
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
                          oncreate: (e: VnodeDOM) => {
                            library.form = ((<unknown>e) as Event).target;
                          },
                          class:
                            'flex flex-col items-center justify-center gap-6'
                        },
                        [
                          m('input#title', {
                            oninput: (e: Event) =>
                              library.addTitle(
                                (e.target as HTMLInputElement).value
                              ),
                            class: 'px-3 py-2 rounded-xl w-11/12',
                            required: true,
                            name: 'title',
                            placeholder: 'Title'
                          }),
                          m('input#author', {
                            oninput: (e: Event) =>
                              library.addAuthor(
                                (e.target as HTMLInputElement).value
                              ),
                            class: 'px-3 py-2 rounded-xl w-11/12',
                            required: true,
                            name: 'author',
                            placeholder: 'Author'
                          }),
                          m('input#pages', {
                            oninput: (e: Event) =>
                              library.addPages(
                                (e.target as HTMLInputElement).value
                              ),
                            class:
                              'px-3 py-2 focus:invalid:accent-red-500 rounded-xl w-11/12',
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
                              oninput: (e: Event) =>
                                library.toggleRead(
                                  (e.target as HTMLInputElement).checked
                                ),
                              name: 'readStatus',
                              class: 'cursor-pointer w-5 border outline-none',
                              type: 'checkbox'
                            })
                          ]),
                          m('input', {
                            onclick: (e: Event) => {
                              e.preventDefault();
                              library.addBook(e);
                            },
                            // disabled: bookWindow.isDisabled,
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

// Easter Egg
console.log(
  `"I'm quite illiterate, but I read a lot."
- J. D. Salinger, The Catcher in the Rye`
);
