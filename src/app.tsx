// eslint-disable-next-line
// @ts-ignore
import m from 'mithril'; // eslint-disable-line
import 'virtual:uno.css';

export const App = () => {
  return {
    view: () => (
      <>
        <div class='text-base text-xl prose prose-sky'>Hello World!</div>
        <p>Mithril</p>
      </>
    )
  };
};
