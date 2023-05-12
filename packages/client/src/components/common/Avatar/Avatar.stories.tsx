import type { Meta, StoryObj } from '@storybook/react';

import Avatar from './Avatar';
import styled from '@emotion/styled';

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
  render: (args) => {
    return (
      <Container>
        <Avatar {...args} size="sm" />
        <Avatar {...args} size="md" />
        <Avatar {...args} size="lg" />
        <Avatar {...args} size="xl" />
      </Container>
    );
  },
  args: {
    src: 'https://avatars.githubusercontent.com/u/75781414?v=4',
    alt: 'profile image',
    isBorder: true,
  },
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 40px;
`;
