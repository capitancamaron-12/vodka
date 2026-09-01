// Ensure fetch can be reassigned or referenced without throwing if the host environment defines a getter-only fetch property
(function() {
  try {
    if (typeof window !== 'undefined') {
      const originalFetch = window.fetch;
      let descriptor = Object.getOwnPropertyDescriptor(window, 'fetch');
      if (!descriptor) {
        descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(window), 'fetch');
      }
      if (descriptor && descriptor.get && !descriptor.set) {
        let activeFetch = originalFetch || (descriptor.get ? descriptor.get.call(window) : undefined);
        Object.defineProperty(window, 'fetch', {
          get: () => activeFetch,
          set: (fn) => {
            activeFetch = fn;
          },
          configurable: true,
          enumerable: true,
        });
      }
    }
  } catch {
    // Ignore if not permitted
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
