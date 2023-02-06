import style from './Alert.module.css';
import clsx from 'clsx';

type AlertProps = {
  type: 'error' | 'success' | 'warning' | 'primary' | 'secondary' | 'info';
  message: string;
  id: number;
  closeAlert: (id: number) => void;
  timeout: number;
};

const Alert = ({ type, message, closeAlert, id, timeout }: AlertProps) => {
  const handleClose = () => {
    closeAlert(id);
  };

  setTimeout(() => {
    handleClose();
  }, timeout);

  return (
    <div className={clsx(style.alert, style[type])}>
      <span className={style.closebtn} onClick={handleClose}>
        &times;
      </span>
      {message}
    </div>
  );
};

export default Alert;
