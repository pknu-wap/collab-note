import { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import useDisclosure from '~/hooks/useDisclosure';
import styled from '@emotion/styled';
import { Button } from '../index';

const meta = {
  title: 'Example/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;
export default meta;

type Story = StoryObj<typeof Modal>;

const ModalWithHooks = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Container>
      <Button onClick={onOpen}>버튼</Button>
      <Modal
        visible={isOpen}
        title="로그인 후 이용해주세요."
        message="로그인이 필요한 서비스입니다."
        confirmText="로그인"
        cancelText="취소"
        onConfirm={() => alert('confirm')}
        onCancel={onClose}
      />
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
`;

export const Default: Story = {
  render: () => <ModalWithHooks />,
};
