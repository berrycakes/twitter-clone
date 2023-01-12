import { createContext, ReactNode, useEffect } from 'react';
import useAlertStore from '../../store';
import Alert from './Alert';
import styles from './AlertProvider.module.css';

type AlertContext = {};

type AlertProviderProps = {
  children: ReactNode;
  timeout?: number;
};

const AlertContext = createContext<AlertContext>({} as AlertContext);

const AlertProvider = ({ children, timeout = 5000 }: AlertProviderProps) => {
  const { alertList, closeAlert } = useAlertStore();

  useEffect(() => {
    if (alertList?.length > 2) {
      const firstId = alertList[2].id;
      closeAlert(firstId);
    }
  }, [alertList]);

  return (
    <AlertContext.Provider value={{}}>
      {children}
      <div className={styles.container}>
        {alertList && alertList.length
          ? alertList.map((alert) => {
              return (
                <Alert
                  key={alert.id}
                  id={alert.id}
                  type={alert.type}
                  message={alert.message}
                  closeAlert={closeAlert}
                  timeout={timeout}
                />
              );
            })
          : null}
      </div>
    </AlertContext.Provider>
  );
};

export default AlertProvider;
