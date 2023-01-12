import { FormProvider as Form, UseFormReturn } from 'react-hook-form'

type FormProviderProps = {
  children: React.ReactNode
  methods: UseFormReturn<any>
  onSubmit?: VoidFunction
  className?: string
}

const FormProvider = ({
  children,
  onSubmit,
  className,
  methods,
}: FormProviderProps) => {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} className={className}>
        {children}
      </form>
    </Form>
  )
}

export default FormProvider
