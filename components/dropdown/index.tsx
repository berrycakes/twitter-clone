import clsx from 'clsx';
import React, { Dispatch, MouseEventHandler, ReactNode, useState } from 'react';
import { MdDelete, MdMoreHoriz } from 'react-icons/md';
import Button from '../ui-kit/Button';
import Card from '../ui-kit/Card';
import IconButton from '../ui-kit/IconButton';
import styles from './styles.module.css';
import { useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

export type DropdownItem = {
  icon?: ReactNode;
  label?: string;
  onClick?: MouseEventHandler;
  customHover?: boolean;
};

type DropdownItemProps = DropdownItem & {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
};

type DropdownProps = {
  items?: DropdownItem[];
  icon?: ReactNode;
};

const DropdownItem = ({
  icon,
  label,
  onClick,
  customHover,
  setOpen,
}: DropdownItemProps) => {
  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    setOpen(false);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(styles.menuButton, customHover && styles.customHover)}
    >
      <div className={styles.itemIcon}>{icon}</div>
      <div className={styles.label}>{label}</div>
    </button>
  );
};

const Dropdown = ({ icon, items }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const toggleDropdown = () => {
    setOpen(!open);
  };
  const handleClickOutside = () => {
    setOpen(false);
  };

  const ref = useRef(null);
  useOnClickOutside(ref, handleClickOutside);

  return (
    <div className={styles.container} ref={ref}>
      <IconButton icon={icon || <MdMoreHoriz />} onClick={toggleDropdown} />
      <Card className={clsx(styles.menu, !open && styles.hidden)} padding="0">
        {items &&
          items.map((item) => {
            return (
              <DropdownItem {...item} setOpen={setOpen} key={item.label} />
            );
          })}
      </Card>
    </div>
  );
};

export default Dropdown;
