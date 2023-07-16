import m from 'mithril';
import 'virtual:uno.css';
import githubLogo from '@/assets/github.svg';

const githubURL: string = 'https://github.com/eldarlrd';

interface VirtualDOM {
  view: () => m.Vnode;
}

export const App = (): VirtualDOM => {
  return {
    view: () =>
      m('div#app', [
        m(
          'header',
          m('h1', { class: 'prose prose-sky' }, 'TypeScript Library')
        ),

        m('main', { class: 'flex items-center justify-center' }, [
          m('h2', 'Mithril')
        ]),

        m('footer', [
          m('p', {
            class: 'm-6 flex select-none flex-col items-center justify-center text-center text-lg font-bold text-black drop-shadow-xl sm:text-xl md:text-2xl'
          }, ['by ', m('a', {
            class: 'flex items-center justify-center gap-1 text-center transition-transform hover:scale-110flex items-center justify-center gap-1 text-center transition-transform hover:scale-110',
            title: 'Go to GitHub',
            target: '_blank',
            rel: 'noreferrer',
            href: githubURL
        }, [m('img', {
          class: 'h-6 w-6',
          alt: 'GitHub Logo',
          src: githubLogo
        }), 'eldarlrd'])])
        ])
      ])
  };
};
