import { forwardRef } from 'react'
import { cn } from '@/shared/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className='w-full'>
        {label && (
          <label htmlFor={inputId} className='block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1.5'>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-lg border px-4 py-2.5 text-sm placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 bg-red-50 dark:bg-red-900/20'
              : 'border-secondary-300 bg-white focus:border-primary-500 dark:border-secondary-600 dark:bg-secondary-900 dark:text-secondary-100',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className='mt-1.5 text-sm text-red-600 dark:text-red-400' role='alert'>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className='mt-1.5 text-sm text-secondary-500 dark:text-secondary-400'>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export { Input }
