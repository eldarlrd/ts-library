import m from 'mithril';
import 'virtual:uno.css';

export const App = () => {
  return {
    view: () =>
      m('div#app', [
        m(
          'header',
          m('h1', { class: 'prose prose-sky' }, 'TypeScript Library')
        ),
        m('main', { class: 'flex items-center justify-center' }, [
          m('h2', 'Mithril')
        ])
      ])
  };
};
