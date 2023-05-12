import { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import styled from '@emotion/styled';
import { Button } from '../index';

const meta = {
  title: 'Example/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;
export default meta;

type Story = StoryObj<typeof Tooltip>;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

export const Default: Story = {
  render: (args) => {
    return (
      <Container>
        <Tooltip {...args}>
          <Button shadow size="md">
            Hover Here
          </Button>
        </Tooltip>
      </Container>
    );
  },
  args: {
    placement: 'top',
    content: '나였으면~ 그대 사랑하는 사람~ 나였으면~',
  },
};
