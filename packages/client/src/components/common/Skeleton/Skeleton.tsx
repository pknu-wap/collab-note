import * as S from './Skeleton.styles';

export interface Props {
  circle?: boolean;
}

export const Skeleton = ({ circle = false }: Props) => {
  return <S.Root circle={circle} />;
};
