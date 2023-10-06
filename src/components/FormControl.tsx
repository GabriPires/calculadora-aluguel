import { Label } from './ui/label'

interface FormControlProps {
  label: string
  children: React.ReactNode
  htmlFor: string
  errorMessage?: string
}

export function FormControl({
  children,
  label,
  htmlFor,
  errorMessage,
}: FormControlProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {errorMessage && (
        <span className="text-red-600 text-sm">{errorMessage}</span>
      )}
    </div>
  )
}
