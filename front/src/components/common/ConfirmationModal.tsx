import React from 'react';
import ModalComponent from '@/components/common/ModalComponent';

interface ConfirmationModalProps {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmationModal({
  visible,
  message,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <ModalComponent
      visible={visible}
      message={message}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}

export default ConfirmationModal;
