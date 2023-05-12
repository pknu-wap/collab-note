import * as S from './Skeleton.styles';

export interface Props {
  circle?: boolean;
}

const Skeleton = ({ circle = false }: Props) => {
  return <S.Root circle={circle} />;
};

export default Skeleton;
