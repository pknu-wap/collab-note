import * as S from './Card.styles';

export type CardVariantType = 'shadow' | 'flat' | 'bordered';

export interface Props {
  children: React.ReactNode;
  variant?: CardVariantType;
  isPressable?: boolean;
}

const Card = ({ children, variant = 'shadow', isPressable = false }: Props) => {
  return (
    <S.Root variant={variant} isPressable={isPressable}>
      {children}
    </S.Root>
  );
};
export default Card;
