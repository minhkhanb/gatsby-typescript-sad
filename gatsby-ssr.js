/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from 'react';
import {Provider} from "react-redux";
import configureStore from "./src/store";

import './src/assets/scss/index.scss'

export const wrapRootElement = ({ element }) => {
  const store = configureStore();

  return <Provider store={store}>{element}</Provider>;
}

// Hack, to reorder the helmet components as first in <head> tag
export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents();

  headComponents.sort((a, b) => {
    if (a.type === 'link' && a.props && a.props['data-react-helmet'] && b.type !== 'link') {
      return -1;
    }
    return 0;
  });

  replaceHeadComponents(headComponents);
};
