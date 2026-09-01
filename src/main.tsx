// Ensure fetch can be reassigned or referenced without throwing if the host environment defines a getter-only fetch property
(function() {
  try {
    const globalScope: any = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {};
    let activeFetch: any;
    try {
      activeFetch = globalScope.fetch;
    } catch {}

    function defineSafeAccessor(target: any, prop: string) {
      if (!target) return;
      try {
        const desc = Object.getOwnPropertyDescriptor(target, prop);
        if (desc && desc.writable && !desc.get) return;

        Object.defineProperty(target, prop, {
          get: () => activeFetch,
          set: (fn) => {
            activeFetch = fn;
          },
          configurable: true,
          enumerable: true,
        });
      } catch {
        try {
          Object.defineProperty(target, prop, {
            value: activeFetch,
            writable: true,
            configurable: true,
            enumerable: true,
          });
        } catch {}
      }
    }

    const targets: any[] = [
      typeof window !== 'undefined' ? window : null,
      typeof globalThis !== 'undefined' ? globalThis : null,
      typeof self !== 'undefined' ? self : null,
      typeof Window !== 'undefined' && (Window as any).prototype ? (Window as any).prototype : null,
    ];

    if (typeof window !== 'undefined') {
      let p: any = window;
      while (p) {
        targets.push(p);
        try {
          p = Object.getPrototypeOf(p);
        } catch {
          break;
        }
      }
    }

    for (let i = targets.length - 1; i >= 0; i--) {
      if (targets[i]) {
        defineSafeAccessor(targets[i], 'fetch');
      }
    }
  } catch {}
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
