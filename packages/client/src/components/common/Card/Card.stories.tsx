import type { Meta, StoryObj } from '@storybook/react';

import Card from './Card';
import styled from '@emotion/styled';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Example/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  render: (args) => {
    return (
      <FlexColumn>
        <FlexRow>
          <Card {...args} />
          <Card {...args} />
          <Card {...args} />
        </FlexRow>
        <FlexRow>
          <Card {...args} />
          <Card {...args} />
          <Card {...args} />
        </FlexRow>
      </FlexColumn>
    );
  },
  args: {
    isPressable: true,
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima officia eius velit excepturi distinctio, blanditiis sunt, quod architecto voluptate perspiciatis ea corporis voluptatum, reprehenderit vero harum ratione animi hic cum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima officia eius velit excepturi distinctio, blanditiis sunt, quod architecto voluptate perspiciatis ea corporis voluptatum, reprehenderit vero harum ratione animi hic cum.',
  },
};

export const Flat: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: 'flat',
  },
};

export const Borderd: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: 'bordered',
  },
};

export const Shadow: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: 'shadow',
  },
};

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 900px;
  gap: 10px;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 1000px;
`;
