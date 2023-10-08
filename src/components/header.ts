import m from 'mithril';

export const Header = {
  view: (): m.Vnode =>
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
    )
};
