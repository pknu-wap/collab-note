import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Checkbox from './Checkbox';
import { NormalColorType } from '~/lib/styles';
import styled from '@emotion/styled';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Example/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  render: () => <CheckBoxWithHooks />,
  args: {
    labelText: 'Checkbox',
  },
};

const CheckBoxWithHooks = () => {
  const CHECKBOX_LIST: { id: number; data: NormalColorType }[] = [
    { id: 1, data: 'primary' },
    { id: 2, data: 'success' },
    { id: 3, data: 'secondary' },
    { id: 4, data: 'warning' },
    { id: 5, data: 'error' },
  ];
  const [selected, setSelected] = useState<NormalColorType[]>([
    'primary',
    'success',
    'error',
    'secondary',
    'warning',
  ]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onCheckedElement = (checked: any, item: any) => {
    if (checked) {
      setSelected([...selected, item]);
    } else if (!checked) {
      setSelected(selected.filter((el) => el !== item));
    }
  };

  return (
    <FlexColumn>
      {CHECKBOX_LIST.map((checkbox) => (
        <FlexColumn key={checkbox.id}>
          <Checkbox
            color={checkbox.data}
            labelText={checkbox.data}
            value={checkbox.data}
            onChange={(e) => {
              onCheckedElement(e.target.checked, e.target.value);
            }}
            // 3️⃣ 체크표시 & 해제를 시키는 로직. 배열에 data가 있으면 true, 없으면 false
            checked={selected.includes(checkbox.data) ? true : false}
          />
        </FlexColumn>
      ))}
      <div>Selected : {selected.join(', ')}</div>
    </FlexColumn>
  );
};

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;
