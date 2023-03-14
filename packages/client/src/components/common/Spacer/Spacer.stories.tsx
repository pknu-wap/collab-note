import type { Meta, StoryObj } from '@storybook/react';

import { Spacer } from './Spacer';

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
  args: {
    x: 1,
    y: 1,
  },
};
