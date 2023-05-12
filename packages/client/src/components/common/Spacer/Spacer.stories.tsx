import type { Meta, StoryObj } from '@storybook/react';

import Spacer from './Spacer';
import styled from '@emotion/styled';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Example/Spacer',
  component: Spacer,
  tags: ['autodocs'],
} satisfies Meta<typeof Spacer>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  render: (args) => {
    return (
      <Container>
        <FlexColumn>
          <Box />
          <Spacer {...args} />
          <Box />
        </FlexColumn>
        <FlexRow>
          <Box />
          <Spacer {...args} />
          <Box />
        </FlexRow>
      </Container>
    );
  },
  args: {
    x: 1,
    y: 1,
  },
};

const Box = styled.div`
  background: #f31260;
  width: 100px;
  height: 100px;
`;

const Container = styled.div`
  margin-top: 1rem;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;
