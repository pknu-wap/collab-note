import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Example/Avatar',
  component: Avatar,
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  args: {
    src: 'https://avatars.githubusercontent.com/u/75781414?v=4',
    alt: 'profile image',
    size: 'md',
    isBorder: true,
  },
};
