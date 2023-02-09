import clsx from 'clsx';
import styles from './Spinner.module.css';

type SpinnerProps = {
  type: 'dots' | 'ring';
  size?: number;
};

const Spinner = ({ type, size }: SpinnerProps) => {
  return (
    <div className={clsx(type === 'ring' ? styles.ring : styles.ellipsis)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
