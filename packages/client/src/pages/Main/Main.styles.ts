import styled from '@emotion/styled';
import { mediaQuery } from '~/lib/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 2rem;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.05);
  ${mediaQuery.mobile} {
    width: 600px;
  }
`;

export const Block = styled.p`
  width: 100%;
  line-height: 1.5;
  outline: none;
  border: solid 1px gray;
  padding: 1rem;
  border-radius: 0.5rem;
`;
