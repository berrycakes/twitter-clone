import clsx from 'clsx';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';
import styles from './FormProvider.module.css';

type FormProviderProps = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  className?: string;
};

const FormProvider = ({ children, onSubmit, className, methods }: FormProviderProps) => {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} className={clsx(className, styles.form)}>
        {children}
      </form>
    </Form>
  );
};

export default FormProvider;
