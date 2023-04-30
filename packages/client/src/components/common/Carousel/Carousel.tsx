import { useEffect, useRef, useState } from 'react';
import * as S from './Carousel.styles';
import AngleRight from '~/components/vectors/AngleRight';
import AngleLeft from '~/components/vectors/AngleLeft';
import useDebounce from '~/hooks/useDebounce';

export interface CarouselProps {
  children: React.ReactNode;
}

interface ButtonVisible {
  prev: boolean;
  next: boolean;
}

type ScrollDirection = 'prev' | 'next';

/**
 * @param children Carousel에 List 컴포넌트를 넣는다.
 */
export const Carousel = ({ children }: CarouselProps) => {
  const scrollPanelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [buttonVisible, setButtonVisible] = useState<ButtonVisible>({
    prev: false,
    next: true,
  });

  /** list의 첫번째 자식 widthg 저장 후 스크롤 이동에 사용한다. */
  const childElementWidth = useRef<number>(0);

  /** scroll위치에 따라서 prev, next 버튼을 보여줄지 결정한다. */
  const updateButtonVisible = () => {
    if (!scrollPanelRef.current) return;

    const { scrollWidth, scrollLeft, clientWidth } = scrollPanelRef.current;

    const prevButtonHidden = scrollLeft <= 0;
    const nextButtonHidden = scrollWidth - clientWidth <= scrollLeft; // clientWidth는 스크롤 패널의 너비

    setButtonVisible({
      prev: prevButtonHidden,
      next: nextButtonHidden,
    });
  };

  const handleUpdateScroll = useDebounce({
    value: updateButtonVisible,
    delay: 100,
  });

  // children이 바뀔 때마다 스크롤 위치를 초기화하고 버튼을 업데이트한다.
  useEffect(() => {
    if (!scrollPanelRef.current) return;

    scrollPanelRef.current.scrollLeft = 0;
    updateButtonVisible();
  }, [children]);

  // children이 바뀔 때마다 첫 번째 자식 엘리먼트의 너비를 업데이트한다.
  useEffect(() => {
    const $firstChildElement = listRef.current?.firstElementChild;

    if (!$firstChildElement) return;
    // 첫번째 element의 너비를 저장한 후 나중에 버튼 클릭시 스크롤 이동에 사용한다.
    childElementWidth.current = $firstChildElement.clientWidth;
  }, []);

  /** prev or next 버튼을 클릭했을 때 스크롤 위치를 업데이트한다. */
  const handleChangeScroll = (direction: ScrollDirection) => () => {
    if (!scrollPanelRef.current) return;

    const { scrollWidth, scrollLeft, clientWidth } = scrollPanelRef.current;
    const scrollLocation =
      direction === 'prev'
        ? scrollLeft - childElementWidth.current
        : scrollLeft + childElementWidth.current;

    // 스크롤 위치가 0보다 작거나, 스크롤 위치가 마지막 위치보다 클 경우 스크롤을 이동하지 않는다.
    const isMoveable =
      scrollWidth - clientWidth + childElementWidth.current >= scrollLocation;

    if (!isMoveable) return;

    // 스크롤 위치를 업데이트한다.
    scrollPanelRef.current.scrollTo(scrollLocation, 0);
  };

  return (
    <S.Container>
      <S.SideButton
        className="prev"
        onClick={handleChangeScroll('prev')}
        hidden={buttonVisible.prev}
      >
        <AngleLeft />
      </S.SideButton>
      <S.HorizontalScrollPanel
        ref={scrollPanelRef}
        onScroll={handleUpdateScroll}
      >
        <S.ListContent ref={listRef}>{children}</S.ListContent>
      </S.HorizontalScrollPanel>
      <S.SideButton
        className="next"
        onClick={handleChangeScroll('next')}
        hidden={buttonVisible.next}
      >
        <AngleRight />
      </S.SideButton>
    </S.Container>
  );
};
