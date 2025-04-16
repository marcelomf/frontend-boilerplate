import { ChartAreaInteractive } from "@/app/dashboard/chart-area-interactive"
import { SectionCards } from "@/app/dashboard/section-cards"
import { Log } from "./log"

export default function Dashboard() {
  return (
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="flex">
              <div className="px-4 lg:px-6 w-3/4">
                <ChartAreaInteractive />
              </div>
              <div className=" w-1/4">
                <Log />
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}