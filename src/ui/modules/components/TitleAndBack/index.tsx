import { MoveLeft } from "lucide-react"
import { Button } from "../button"
import { useRouter } from "next/navigation"

type TitleAndBackProps = {
  title: string
}

export function TitleAndBack({
  title
}: TitleAndBackProps) {
    const router = useRouter()
    const handleBack = () => router.back()
  return (
    <div className="flex items-center justify-between">
        <Button
            size="icon"
            className="bg-transparent text-black w-[24px] h-[24px]"
            type="button"
            onClick={handleBack}
        >
            <MoveLeft />
        </Button>

        <span className="font-medium text-[20px] text-[#013941]">
            {title}
        </span>
        <span />
    </div>
  )
}
