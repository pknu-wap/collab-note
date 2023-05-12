import { useEffect, useState } from 'react';

const createElement = (id: string): HTMLElement => {
  const el = document.createElement('div');
  el.setAttribute('id', id);
  return el;
};

const isBrowser = (): boolean => {
  return Boolean(
    typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement,
  );
};

const usePortal = (selectId: string): HTMLElement | null => {
  const id = `${selectId}`;

  const [elSnapshot, setElSnapshot] = useState<HTMLElement | null>(
    isBrowser() ? createElement(id) : null,
  );

  useEffect(() => {
    const parentElement = document.body;
    const hasElement = parentElement?.querySelector<HTMLElement>(`#${id}`);
    const el = hasElement || createElement(id);

    if (!hasElement) {
      parentElement.appendChild(el);
    }
    setElSnapshot(el);
  }, []);

  return elSnapshot;
};

export default usePortal;
