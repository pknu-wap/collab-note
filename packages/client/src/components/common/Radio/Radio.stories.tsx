import type { Meta, StoryObj } from '@storybook/react';

import Radio from './Radio';
import styled from '@emotion/styled';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Example/Radio',
  component: Radio,
  tags: ['autodocs'],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  render: () => <RadioWithHooks />,
};

type RadioValues =
  | 'default'
  | 'primary'
  | 'success'
  | 'secondary'
  | 'warning'
  | 'error';

const RadioWithHooks = () => {
  const [value, setValue] = useState<RadioValues>('default');

  const handleChange = (value: RadioValues) => {
    setValue(value);
  };
  return (
    <FlexColumn>
      <Radio
        value="default"
        labelText="default"
        labelColor
        checked={value === 'default'}
        onChange={() => handleChange('default')}
      />
      <Radio
        value="primary"
        labelText="primary"
        labelColor
        color="primary"
        checked={value === 'primary'}
        onChange={() => handleChange('primary')}
      />
      <Radio
        value="success"
        labelText="success"
        labelColor
        color="success"
        checked={value === 'success'}
        onChange={() => handleChange('success')}
      />
      <Radio
        value="secondary"
        labelText="secondary"
        labelColor
        color="secondary"
        checked={value === 'secondary'}
        onChange={() => handleChange('secondary')}
      />
      <Radio
        value="warning"
        labelText="warning"
        labelColor
        color="warning"
        checked={value === 'warning'}
        onChange={() => handleChange('warning')}
      />
      <Radio
        value="error"
        labelText="error"
        labelColor
        color="error"
        checked={value === 'error'}
        onChange={() => handleChange('error')}
      />
      <div>value : {value}</div>
    </FlexColumn>
  );
};

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;
