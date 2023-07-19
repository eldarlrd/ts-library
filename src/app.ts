import m, { VnodeDOM } from 'mithril';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import bookOpen from '@/assets/book-open.svg';
import bookClosed from '@/assets/book-closed.svg';
import trash from '@/assets/trash.svg';
import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';

interface VirtualDOM {
  view: () => m.Vnode;
}

interface Modal {
  isOpen: boolean;
  isDisabled: boolean;
  toggleOpen: () => boolean;
  toggleDisabled: () => void;
  checkOutside: (target: EventTarget | null) => void;
}

const bookWindow: Modal = {
  isOpen: false,
  isDisabled: true,
  toggleOpen: () => (bookWindow.isOpen = !bookWindow.isOpen),
  toggleDisabled: () => {
    if (!library.title || !library.author || !library.pages)
      bookWindow.isDisabled = true;
    else bookWindow.isDisabled = false;
  },
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
  title?: string;
  author?: string;
  pages?: number;
  isRead?: string;
}

interface BookList {
  form: EventTarget | null;
  books: BookDetails[];
  title?: string;
  author?: string;
  pages?: string;
  addBook: (e: Event) => void;
  checkTitle: (title: string) => void;
  checkAuthor: (author: string) => void;
  checkPages: (pages: string) => void;
  removeBook: (title: string | undefined) => void;
  toggleRead: (title: string | undefined) => void;
  setLibrary: () => void;
}

const library: BookList = {
  form: new EventTarget(),
  books: [],
  title: '',
  author: '',
  pages: '',
  addBook: e => {
    if (e !== null) {
      library.form = document.getElementsByTagName('form')[0];
      const formData = new FormData(library.form as HTMLFormElement);
      if (
        !library.books.some(
          book => book.title === Object.fromEntries(formData.entries()).title
        )
      ) {
        library.books.push(Object.fromEntries(formData.entries()));
        bookWindow.isOpen = false;
        bookWindow.isDisabled = true;
        (library.title = ''), (library.author = ''), (library.pages = '');
        (document.getElementById('isRead') as HTMLInputElement).checked = false;
        library.setLibrary();
      } else alert('ERROR: Duplicates are not allowed!');
    }
  },
  checkTitle: title => {
    if (title) library.title = title;
    else library.title = '';
    bookWindow.toggleDisabled();
  },
  checkAuthor: author => {
    if (author) library.author = author;
    else library.author = '';
    bookWindow.toggleDisabled();
  },
  checkPages: pages => {
    if (pages !== null && +pages > 0 && +pages % 1 === 0) library.pages = pages;
    else library.pages = '';
    bookWindow.toggleDisabled();
  },
  removeBook: title => {
    if (title !== null) {
      const index = library.books.findIndex(book => {
        return book.title === title;
      });
      library.books.splice(index, 1);
      library.setLibrary();
    }
  },
  toggleRead: title => {
    if (title !== null) {
      const index = library.books.findIndex(book => {
        return book.title === title;
      });
      if (library.books[index].isRead) {
        library.books[index].isRead = '';
        library.setLibrary();
      } else {
        library.books[index].isRead = 'on';
        library.setLibrary();
      }
    }
  },
  setLibrary: () => localStorage.setItem('books', JSON.stringify(library.books))
};

export const App = (): VirtualDOM => {
  return {
    view: () =>
      m(
        'div#app',
        {
          oncreate: localStorage.books
            ? (library.books = JSON.parse(localStorage.books))
            : null,
          class:
            'flex items-center justify-around min-h-screen flex-col font-main bg-yellow-900 accent-blue-500'
        },
        [
          m(Header),
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
                    'focus:outline drop-shadow-md transition-colors active:bg-blue-700 hover:bg-blue-600 select-none bg-blue-500 text-white text-center text-lg sm:text-xl md:text-2xl font-bold rounded-xl px-3 py-2'
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
                        key: item.title,
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
                          item.pages !== undefined
                            ? +item.pages === 1
                              ? `${item.pages} Page`
                              : `${item.pages} Pages`
                            : ''
                        ),
                        m('span', { class: 'flex flex-col w-11/12 mb-2' }, [
                          m(
                            'button#read',
                            {
                              onclick: () => library.toggleRead(item.title),
                              class: `${
                                item.isRead === 'on'
                                  ? 'active:bg-green-700 hover:bg-green-600 bg-green-500'
                                  : 'active:bg-amber-700 hover:bg-amber-600 bg-amber-500'
                              } focus:outline drop-shadow-md transition-colors select-none text-white text-center sm:text-lg md:text-xl flex items-center justify-center gap-2 font-bold rounded-xl px-3 py-2 m-2`
                            },
                            [
                              m('img', {
                                class: 'h-4 w-4 md:h-5 md:w-5',
                                alt:
                                  item.isRead === 'on'
                                    ? 'Closed Book'
                                    : 'Open Book',
                                src:
                                  item.isRead === 'on' ? bookClosed : bookOpen
                              }),
                              item.isRead === 'on' ? 'Read' : 'Not read'
                            ]
                          ),
                          m(
                            'button#remove',
                            {
                              onclick: () => library.removeBook(item.title),
                              class:
                                'focus:outline drop-shadow-md transition-colors active:bg-red-700 hover:bg-red-600 select-none bg-red-500 text-white text-center sm:text-lg md:text-xl font-bold flex items-center justify-center gap-2 rounded-xl px-3 py-2 m-2'
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
                              library.checkTitle(
                                (e.target as HTMLInputElement).value
                              ),
                            value: library.title,
                            min: 1,
                            class:
                              'px-3 py-2 focus:invalid:accent-red-500 rounded-xl w-11/12',
                            required: true,
                            name: 'title',
                            placeholder: 'Title'
                          }),
                          m('input#author', {
                            oninput: (e: Event) =>
                              library.checkAuthor(
                                (e.target as HTMLInputElement).value
                              ),
                            value: library.author,
                            min: 1,
                            class:
                              'px-3 py-2 focus:invalid:accent-red-500 rounded-xl w-11/12',
                            required: true,
                            name: 'author',
                            placeholder: 'Author'
                          }),
                          m('input#pages', {
                            oninput: (e: Event) =>
                              library.checkPages(
                                (e.target as HTMLInputElement).value
                              ),
                            value: library.pages,
                            class:
                              'px-3 py-2 focus:invalid:accent-red-500 rounded-xl w-11/12',
                            required: true,
                            min: 1,
                            type: 'number',
                            name: 'pages',
                            placeholder: 'Pages'
                          }),
                          m('span', { class: 'flex gap-2' }, [
                            m(
                              'label',
                              {
                                for: 'isRead',
                                class:
                                  'text-lg md:text-xl select-none cursor-pointer'
                              },
                              'Have you read it?'
                            ),
                            m('input#isRead', {
                              name: 'isRead',
                              class: 'cursor-pointer w-5 border',
                              type: 'checkbox'
                            })
                          ]),
                          m('input', {
                            onclick: (e: Event) => {
                              e.preventDefault();
                              library.addBook(e);
                            },
                            disabled: bookWindow.isDisabled,
                            class: `${
                              bookWindow.isDisabled
                                ? 'cursor-not-allowed bg-gray-500 active:bg-gray-700 hover:bg-gray-600'
                                : 'cursor-pointer bg-blue-500 active:bg-blue-700 hover:bg-blue-600'
                            } w-11/12 focus:outline drop-shadow-md transition-colors select-none text-white text-center md:text-xl text-lg font-bold rounded-xl px-3 py-2`,
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
          m(Footer)
        ]
      )
  };
};

// Easter Egg
console.log(
  `"I'm quite illiterate, but I read a lot."
- J. D. Salinger, The Catcher in the Rye`
);
