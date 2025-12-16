import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItemWithIcon,
  SelectTrigger,
  SelectValue,
} from "../select"
import { SelectTokenOption } from "@/common/types"

type PayWalletListProps = {
  title: string
  options: SelectTokenOption[]
  value: string
  onChange: (value: string) => void
}

export function PayWalletList({
  title,
  options,
  value,
  onChange,
}: PayWalletListProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-medium text-[#013941]">{title}</p>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>

        <SelectContent className="p-4">
          <SelectGroup>
            {options.map((option) => (
              <SelectItemWithIcon
                key={option.value}
                value={option.value}
                icon={option.icon}
              >
                {option.label}
              </SelectItemWithIcon>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
