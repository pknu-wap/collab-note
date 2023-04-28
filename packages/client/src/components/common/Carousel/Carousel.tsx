import { useEffect, useRef, useState } from 'react';
import * as S from './Carousel.styles';
import AngleRight from '~/components/vectors/AngleRight';
import AngleLeft from '~/components/vectors/AngleLeft';

interface Props {
  children: React.ReactNode;
}

interface ButtonVisible {
  prev: boolean;
  next: boolean;
}

type ScrollDirection = 'prev' | 'next';

export const Carousel = ({ children }: Props) => {
  const scrollPanelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [buttonVisible, setButtonVisible] = useState<ButtonVisible>({
    prev: false,
    next: true,
  });

  const childElementWidth = useRef<number>(0);

  const updateButtonVisible = () => {
    if (!scrollPanelRef.current) return;

    const { scrollWidth, scrollLeft, clientWidth } = scrollPanelRef.current;

    const isPrevButtonVisible = scrollLeft <= 0;
    const isNextButtonVisible = scrollWidth - clientWidth <= scrollLeft;

    setButtonVisible({
      prev: isPrevButtonVisible,
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

  const handleChangeScroll = (direction: ScrollDirection) => () => {
    if (!scrollPanelRef.current) return;

    const { scrollWidth, scrollLeft, clientWidth } = scrollPanelRef.current;
    const scrollLocation =
      direction === 'prev'
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
        className="prev"
        onClick={handleChangeScroll('prev')}
        visible={buttonVisible.prev}
      >
        <AngleLeft />
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
        <AngleRight />
      </S.SideButton>
    </S.Container>
  );
};
