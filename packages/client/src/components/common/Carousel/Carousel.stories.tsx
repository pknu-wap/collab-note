import type { Meta, StoryObj } from '@storybook/react';

import Carousel from './Carousel';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Example/Carousel',
  component: Carousel,
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

// 랜덤 밝은 색 컬러 생성기
const randomColor = () => {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  return `#${color}`;
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  args: {
    children: (
      <>
        {Array.from({ length: 30 }).map((_, idx) => (
          <div
            key={idx}
            style={{
              width: '300px',
              height: '380px',
              marginRight: '24px',
              backgroundColor: randomColor(),
            }}
          />
        ))}
      </>
    ),
  },
};
