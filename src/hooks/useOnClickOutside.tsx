/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */
import React from 'react';

export const useOnClickOutside = (cb: any) => {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    function onClick(e: any): any {
      if (ref && ref.current && !ref.current.contains(e.target)) {
        cb(e);
      }
    }
    document.addEventListener('mousedown', onClick);

    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return ref;
};
