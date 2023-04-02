import { useRef } from 'react';

const useOffset = <T extends HTMLElement = HTMLParagraphElement>(
  blockRef: React.RefObject<T>,
) => {
  const offsetRef = useRef<number>(0);

  const setOffset = (offset = 0) => {
    if (!blockRef.current) return;

    const selection = window.getSelection();

    if (!selection?.rangeCount) return;
    const range = selection.getRangeAt(0);

    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(blockRef.current);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    const maxOffset = preCaretRange.toString().length;

    const nextOffset = range.startOffset + offset;

    offsetRef.current = Math.min(maxOffset, Math.max(0, nextOffset));

    console.log('offsetRef.current', offsetRef.current);
  };

  const clearOffset = () => {
    offsetRef.current = 0;
  };

  const onArrowKeyDown: React.KeyboardEventHandler = (e) => {
    switch (e.nativeEvent.key) {
      case 'ArrowLeft':
        setOffset(-1);
        break;
      case 'ArrowRight':
        setOffset(1);
        break;
    }
  };

  const onClick = () => {
    setOffset();
  };

  const offsetHandlers = {
    onClick,
    onBlur: clearOffset,
    onKeyDown: onArrowKeyDown,
  };

  return {
    offsetRef,
    setOffset,
    clearOffset,
    onArrowKeyDown,
    offsetHandlers,
  };
};

export default useOffset;
