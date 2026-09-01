// Ensure fetch can be reassigned or referenced without throwing if the host environment defines a getter-only fetch property
(function() {
  function makeWritable(obj: any, prop: string) {
    if (!obj) return;
    try {
      const currentVal = obj[prop];
      try {
        Object.defineProperty(obj, prop, {
          value: currentVal,
          writable: true,
          configurable: true,
          enumerable: true,
        });
      } catch {
        let val = currentVal;
        Object.defineProperty(obj, prop, {
          get: () => val,
          set: (newVal) => { val = newVal; },
          configurable: true,
          enumerable: true,
        });
      }
    } catch {}
  }

  function patchChain(target: any, prop: string) {
    if (!target) return;
    let curr = target;
    while (curr) {
      try {
        const desc = Object.getOwnPropertyDescriptor(curr, prop);
        if (desc && desc.get && !desc.set) {
          let fn = curr[prop];
          Object.defineProperty(curr, prop, {
            get: () => fn,
            set: (v) => { fn = v; },
            configurable: true,
            enumerable: true,
          });
        }
      } catch {}
      try {
        curr = Object.getPrototypeOf(curr);
      } catch {
        break;
      }
    }
    makeWritable(target, prop);
  }

  if (typeof window !== 'undefined') {
    patchChain(window, 'fetch');
    if (typeof Window !== 'undefined' && Window.prototype) {
      patchChain(Window.prototype, 'fetch');
    }
  }
  if (typeof globalThis !== 'undefined') {
    patchChain(globalThis, 'fetch');
  }
  if (typeof self !== 'undefined') {
    patchChain(self, 'fetch');
  }
})();

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
