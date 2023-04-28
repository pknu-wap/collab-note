import type { Meta, StoryObj } from '@storybook/react';

import { Carousel } from './Carousel';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Example/Carousel',
  component: Carousel,
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  args: {
    children: 'Carousel',
  },
  render: (args) => (
    <Carousel {...args}>
      {Array.from({ length: 30 }).map((_, idx) => (
        <div
          key={idx}
          style={{
            width: '300px',
            height: '380px',
            marginRight: '24px',
            backgroundColor: '#f3f3f3',
          }}
        />
      ))}{' '}
    </Carousel>
  ),
};
