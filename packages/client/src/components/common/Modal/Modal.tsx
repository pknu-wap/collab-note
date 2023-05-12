import { AnimatePresence } from 'framer-motion';
import { Button } from '~/components/common';
import * as S from './Modal.styles';
import { useEffect } from 'react';
import usePortal from '~/hooks/usePortal';
import { createPortal } from 'react-dom';

export interface ModalProps {
  visible: boolean;
  title: string;
  message: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal = ({
  visible,
  title,
  message,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  onConfirm,
  onCancel,
}: ModalProps) => {
  const el = usePortal('modal');

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [visible]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCancel]);

  if (!el) return null;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <>
          <S.Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onCancel}
          />
          <S.Positioner>
            <S.ModalBlock
              initial={{ y: '-15px', opacity: 0 }}
              animate={{ y: '0vh', opacity: 1 }}
              exit={{ y: '-15px', opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <S.Title>{title}</S.Title>
              <S.Message>{message}</S.Message>
              <S.Footer>
                <Button shadow size="sm" color="error" onClick={onCancel}>
                  {cancelText}
                </Button>
                <Button shadow size="sm" color="success" onClick={onConfirm}>
                  {confirmText}
                </Button>
              </S.Footer>
            </S.ModalBlock>
          </S.Positioner>
        </>
      )}
    </AnimatePresence>,
    el,
  );
};

export default Modal;
