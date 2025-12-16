import * as React from "react"
import { Loader2Icon, CheckIcon } from "lucide-react"
import { cn } from "@/common/lib/utils"

type InputProps = React.ComponentProps<"input"> & {
  isLoading?: boolean
  isSuccess?: boolean
  error?: string
}

function Input({
  className,
  type,
  isLoading = false,
  isSuccess = false,
  error,
  disabled,
  ...props
}: InputProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="relative w-full flex items-center">
        <input
          type={type}
          data-slot="input"
          disabled={isLoading || disabled}
          aria-invalid={!!error}
          className={cn(
            "h-9 w-full rounded-[30px] border bg-[#F2F2F2] px-[16px] py-[12px] text-base outline-none transition",
            "border-[#E0E0E0]",
            "focus-visible:ring-[3px] focus-visible:ring-ring/50",
            "disabled:cursor-not-allowed disabled:opacity-50",
            (isLoading || isSuccess) && "pr-9",
            error && "border-red-500 focus-visible:ring-red-500/30",
            className
          )}
          {...props}
        />

        {isLoading && (
          <Loader2Icon className="absolute right-3 size-4 animate-spin text-muted-foreground" />
        )}

        {!isLoading && isSuccess && !error && (
          <CheckIcon className="absolute right-3 size-4 text-green-500" />
        )}
      </div>

      {error && (
        <span className="text-xs text-red-500 px-2">
          {error}
        </span>
      )}
    </div>
  )
}

export { Input }
