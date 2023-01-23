import { Dispatch, SetStateAction } from 'react';
import { useLockedBody } from 'usehooks-ts';
import Button from './Button';
import Card from './Card';
import styles from './Modal.module.css';
import Stack from './Stack';

type ModalProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  header: string;
  content: string;
  actionLabel: string;
  action: VoidFunction;
};

const Modal = ({
  setIsOpen,
  header,
  content,
  actionLabel,
  action,
  isOpen,
}: ModalProps) => {
  useLockedBody(isOpen, '__next');
  if (!isOpen) return null;
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <Card padding="1rem">
          <h6 className={styles.heading}>{header}</h6>
          <div className={styles.modalContent}>{content}</div>
          <Stack row gap={16} padding={16}>
            <Button
              variant={actionLabel === 'Delete' ? 'error' : 'primary'}
              onClick={action}
            >
              {actionLabel}
            </Button>
            <Button variant="muted" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </Stack>
        </Card>
      </div>
    </>
  );
};

export default Modal;
