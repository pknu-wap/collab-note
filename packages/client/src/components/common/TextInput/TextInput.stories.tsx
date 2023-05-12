import type { Meta, StoryObj } from '@storybook/react';

import TextInput from './TextInput';
import styled from '@emotion/styled';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Example/TextInput',
  component: TextInput,
  tags: ['autodocs'],
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bordered = () => {
  return (
    <FlexColumn>
      <TextInput placeholder="primary" color="primary" variant="bordered" />
      <TextInput placeholder="error" color="error" variant="bordered" />
      <TextInput placeholder="secondary" color="secondary" variant="bordered" />
      <TextInput placeholder="success" color="success" variant="bordered" />
      <TextInput placeholder="warning" color="warning" variant="bordered" />
    </FlexColumn>
  );
};

export const Underlined = () => {
  return (
    <FlexColumn>
      <TextInput placeholder="primary" color="primary" variant="underlined" />
      <TextInput placeholder="error" color="error" variant="underlined" />
      <TextInput
        placeholder="secondary"
        color="secondary"
        variant="underlined"
      />
      <TextInput placeholder="success" color="success" variant="underlined" />
      <TextInput placeholder="warning" color="warning" variant="underlined" />
    </FlexColumn>
  );
};

const FlexColumn = styled.div`
  display: flex;
  width: 250px;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  padding: 1rem;
`;
