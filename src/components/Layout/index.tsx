import React from 'react';
import './index.scss';
import { css } from '@emotion/react';

const Layout: React.FunctionComponent = () => {
  return (
    <div>
      <h1>Layout</h1>
      <p
        className='text-gray text-black'
        css={css`
          background: green;
        `}
      >
        paragraph
      </p>
    </div>
  );
};

export default Layout;
