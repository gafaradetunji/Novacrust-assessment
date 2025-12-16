"use client"

import {
  Select,
  SelectContent,
  SelectItemWithIcon,
  SelectTrigger,
  SelectValue,
  SelectValueWithIcon,
} from "../select"
import { SelectTokenOption } from "@/common/types"
import { Skeleton } from "../skeleton"
import { useState } from "react"

type PaymentQouteComponentProps = {
  text: string
  icon: string
  amount: string
  options: SelectTokenOption[]
  value: string
  onChange: (value: string) => void
  isLoading?: boolean
}

export function PaymentQouteComponent({
  text,
  amount,
  options,
  value,
  onChange,
  isLoading = false,
}: PaymentQouteComponentProps) {
  const selected = options.find((o) => o.value === value)

  return (
    <div className="w-full flex flex-col gap-4 p-[24px] rounded-[30px] border border-[#E0E0E0]">
      <span className="font-medium text-[#828282] tracking-[0.1em]">
        {text}
      </span>

      <div className="flex items-center justify-between gap-4">
        {isLoading ? (
          <Skeleton className="w-20 h-8" />
        ) : (
          <span className="font-semibold text-[1.5rem]">{amount}</span>
        )}

        <Select value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue>
              {selected && (
                <SelectValueWithIcon icon={selected.icon}>
                  {selected.label}
                </SelectValueWithIcon>
              )}
            </SelectValue>
          </SelectTrigger>

          <SelectContent enableSearch>
            {options.map((option) => (
              <SelectItemWithIcon
                key={option.value}
                value={option.value}
                icon={option.icon}
              >
                {option.label}
              </SelectItemWithIcon>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
