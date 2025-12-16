"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/common/lib/utils"
import { SelectSearchContext } from "@/common/states"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" className="w-full" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" className="bg-[#F7F7F7] border-[1px] border-[#E0E0E0] px-[12px] py-[8px] rounded-[20px]" {...props} />
}

function SelectValueWithIcon({
  icon,
  children,
}: {
  icon?: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-2">
      {icon && (
        <img src={icon} alt="" className="w-[24px] h-[24px] rounded-full" />
      )}
      <span className="truncate text-[#013941] text-[14px] font-medium">{children}</span>
    </div>
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-neutral-200 data-[placeholder]:text-neutral-500 [&_svg:not([class*='text-'])]:text-neutral-500 focus-visible:border-neutral-950 focus-visible:ring-neutral-950/50 aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500 dark:bg-neutral-200/30 dark:hover:bg-neutral-200/50 flex w-fit items-center justify-between gap-2 rounded-[30px] border text-[#013941] bg-[#F7F7F7] px-[24px] py-[20px] border-[1px] border-[#E0E0E0] text-[1rem] font-normal whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 dark:border-neutral-800 dark:data-[placeholder]:text-neutral-400 dark:[&_svg:not([class*='text-'])]:text-neutral-400 dark:focus-visible:border-neutral-300 dark:focus-visible:ring-neutral-300/50 dark:aria-invalid:ring-red-900/20 dark:dark:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900 dark:dark:bg-neutral-800/30 dark:dark:hover:bg-neutral-800/50",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    enableSearch?: boolean
    searchPlaceholder?: string
  }
>(
  (
    {
      className,
      children,
      enableSearch = false,
      searchPlaceholder = "Search...",
      position = "popper",
      ...props
    },
    ref
  ) => {
    const [query, setQuery] = React.useState("")

    return (
      <SelectSearchContext.Provider value={{ query, setQuery }}>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            ref={ref}
            position={position}
            className={cn(
              "z-50 w-full rounded-[30px] border bg-white shadow-lg px-[12px] py-[16px]",
              className
            )}
            {...props}
          >
            {enableSearch && (
              <div className="border-b p-2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full rounded-md border px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-neutral-300"
                />
              </div>
            )}

            <SelectScrollUpButton />

            <SelectPrimitive.Viewport className="">
              {children}
            </SelectPrimitive.Viewport>

            <SelectScrollDownButton />
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectSearchContext.Provider>
    )
  }
)
SelectContent.displayName = "SelectContent"

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-neutral-500 px-2 py-1.5 text-xs dark:text-neutral-400", className)}
      {...props}
    />
  )
}

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, value, ...props }, ref) => {
  const ctx = React.useContext(SelectSearchContext)

  if (ctx?.query) {
    const text = String(children).toLowerCase()
    if (!text.includes(ctx.query.toLowerCase())) return null
  }

  return (
    <SelectPrimitive.Item
      ref={ref}
      value={value}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-md px-2 py-2 text-sm outline-none focus:bg-neutral-100 w-full",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>
        {children}
      </SelectPrimitive.ItemText>

      <SelectPrimitive.ItemIndicator className="absolute right-2">
        <CheckIcon className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
})
SelectItem.displayName = "SelectItem"

function SelectItemWithIcon({
  icon,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item> & {
  icon?: string
}) {
  return (
    <SelectItem {...props}>
      <div className="flex items-center gap-2">
        {icon && (
          <img src={icon} alt="" className="w-4 h-4 rounded-full" />
        )}
        <p className="font-medium tet-[14px] text-[#013941]">{children}</p>
      </div>
    </SelectItem>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-neutral-200 pointer-events-none -mx-1 my-1 h-px dark:bg-neutral-800", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemWithIcon,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectValueWithIcon
}
