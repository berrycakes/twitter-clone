import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AlertProp = {
  type: 'error' | 'success' | 'warning' | 'primary' | 'secondary' | 'info';
  message: string;
};

interface Alert extends AlertProp {
  id: number;
}

type Store = {
  alertList: Alert[];
  addAlert: (alert: AlertProp) => void;
  closeAlert: (id: number) => void;
};

const useAlertStore = create<Store>()(
  persist(
    (set) => ({
      alertList: [],
      addAlert: (alert: AlertProp) =>
        set((state) => {
          const newAlert: Alert = {
            id: Math.max(0, Math.max(...state.alertList.map((alert) => alert.id)) + 1),
            type: alert.type,
            message: alert.message,
          };
          return { alertList: [newAlert, ...state.alertList] };
        }),
      closeAlert: (id: number) =>
        set((state) => {
          const newAlertList = state.alertList.filter((alert) => alert.id !== id);
          return {
            ...state,
            alertList: newAlertList,
          };
        }),
    }),
    {
      name: 'alerts-storage',
    }
  )
);

export default useAlertStore;
