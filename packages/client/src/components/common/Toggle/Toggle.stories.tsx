import type { Meta, StoryObj } from '@storybook/react';

import Toggle from './Toggle';
import styled from '@emotion/styled';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Example/Toggle',
  component: Toggle,
  tags: ['autodocs'],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default = () => {
  return (
    <FlexColumn>
      <Toggle labelText="primary" color="primary" defaultChecked />
      <Toggle labelText="error" color="error" defaultChecked />
      <Toggle labelText="secondary" color="secondary" defaultChecked />
      <Toggle labelText="success" color="success" defaultChecked />
      <Toggle labelText="warning" color="warning" defaultChecked />
    </FlexColumn>
  );
};

export const Size = () => {
  return (
    <FlexColumn>
      <Toggle labelText="primary" color="primary" variant="lg" defaultChecked />
      <Toggle labelText="error" color="error" variant="lg" defaultChecked />
      <Toggle
        labelText="secondary"
        color="secondary"
        variant="lg"
        defaultChecked
      />
      <Toggle labelText="success" color="success" variant="lg" defaultChecked />
      <Toggle labelText="warning" color="warning" variant="lg" defaultChecked />
    </FlexColumn>
  );
};

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;
