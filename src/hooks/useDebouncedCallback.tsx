/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */

import React from 'react';

const useDebouncedCallback = (cb: (..._args: any[]) => any, delaySeconds = 800) => {
  const timeout = React.useRef<any>();

  return React.useCallback(
    (...args: any) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => cb(...args), delaySeconds);
    },
    [cb]
  );
};

export default useDebouncedCallback;
