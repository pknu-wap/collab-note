import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';
import styled from '@emotion/styled';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  args: {
    size: 'md',
    children: 'Button',
  },
};

export const Size = () => {
  return (
    <FlexColumn>
      <Button shadow size="sm">
        sm
      </Button>
      <Button shadow size="md">
        md
      </Button>
      <Button shadow size="lg">
        lg
      </Button>
      <Button shadow size="auto">
        auto
      </Button>
    </FlexColumn>
  );
};

export const Color = () => {
  return (
    <FlexColumn>
      <Button shadow color="primary">
        primary
      </Button>
      <Button shadow color="error">
        error
      </Button>
      <Button shadow color="secondary">
        secondary
      </Button>
      <Button shadow color="success">
        success
      </Button>
      <Button shadow color="warning">
        warning
      </Button>
    </FlexColumn>
  );
};

export const Shadow = () => {
  return (
    <FlexColumn>
      <Button>default</Button>
      <Button shadow>shadow</Button>
    </FlexColumn>
  );
};

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;
