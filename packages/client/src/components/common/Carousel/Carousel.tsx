import { useEffect, useRef, useState } from 'react';
import * as S from './Carousel.styles';

interface Props {
  children: React.ReactNode;
}

export const Carousel = ({ children }: Props) => {
  const scrollPanelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [buttonVisible, setButtonVisible] = useState<{
    previous: boolean;
    next: boolean;
  }>({
    previous: false,
    next: true,
  });

  const childElementWidth = useRef<number>(0);

  const updateButtonVisible = () => {
    if (!scrollPanelRef.current) return;

    const { scrollWidth, scrollLeft, clientWidth } = scrollPanelRef.current;

    const isPreviousButtonVisible = scrollLeft <= 0;
    const isNextButtonVisible = scrollWidth - clientWidth <= scrollLeft;

    setButtonVisible({
      previous: isPreviousButtonVisible,
      next: isNextButtonVisible,
    });
  };

  useEffect(() => {
    if (!scrollPanelRef.current) return;

    scrollPanelRef.current.scrollLeft = 0;
    updateButtonVisible();
  }, [children]);

  useEffect(() => {
    const $firstChildElement = listRef.current?.firstElementChild;

    if (!$firstChildElement) return;
    childElementWidth.current = $firstChildElement.clientWidth;
  }, []);

  const handleChangeScroll = (direction: 'previous' | 'next') => () => {
    if (!scrollPanelRef.current) return;

    const { scrollWidth, scrollLeft, clientWidth } = scrollPanelRef.current;
    const scrollLocation =
      direction === 'previous'
        ? scrollLeft - childElementWidth.current
        : scrollLeft + childElementWidth.current;
    const isMoveable =
      scrollWidth - clientWidth + childElementWidth.current >= scrollLocation;

    if (!isMoveable) return;

    scrollPanelRef.current.scrollTo(scrollLocation, 0);
  };

  return (
    <S.Container>
      <S.SideButton
        className="previous"
        onClick={handleChangeScroll('previous')}
        visible={buttonVisible.previous}
      >
        P
      </S.SideButton>
      <S.HorizontalScrollPanel
        ref={scrollPanelRef}
        onScroll={updateButtonVisible}
      >
        <S.ListContent ref={listRef}>{children}</S.ListContent>
      </S.HorizontalScrollPanel>
      <S.SideButton
        className="next"
        onClick={handleChangeScroll('next')}
        visible={buttonVisible.next}
      >
        N
      </S.SideButton>
    </S.Container>
  );
};
