import type { Meta, StoryObj } from '@storybook/react';

import Loader from './Loader';
import styled from '@emotion/styled';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Example/Loader',
  component: Loader,
  tags: ['autodocs'],
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  render: ({ size }) => {
    return (
      <Container>
        <FlexRow>
          <Loader size={size} />
          <Loader color="error" size={size} />
          <Loader color="secondary" size={size} />
          <Loader color="success" size={size} />
          <Loader color="warning" size={size} />
        </FlexRow>
      </Container>
    );
  },
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 3rem;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;
