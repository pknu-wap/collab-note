import * as S from './Spacer.styles';

export interface Props {
  x?: number;
  y?: number;
}

const Spacer = ({ x = 1, y = 1 }: Props) => {
  return <S.Root x={x} y={y} />;
};

export default Spacer;
