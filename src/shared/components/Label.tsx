import { cn } from '@/shared/utils/cn'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export function Label({ className, required, children, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        'block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1.5',
        className
      )}
      {...props}
    >
      {children}
      {required && <span className='text-red-500 ml-1' aria-hidden='true'>*</span>}
    </label>
  )
}
