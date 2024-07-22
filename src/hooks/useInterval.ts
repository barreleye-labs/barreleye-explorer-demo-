import { MutableRefObject, useEffect, useRef } from 'react';

import { MutatorCallback } from 'swr';

function useInterval(callback: MutatorCallback, delay: number) {
  const savedCallback: MutableRefObject<MutatorCallback | undefined> = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
