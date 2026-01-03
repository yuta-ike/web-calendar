import { getMonth } from "date-fns"
import { cn, getRangeOfCalendarMonth } from "./utils.js"

type Props = {
  months: { year: number; month: number }[]
}

export const Calendar = ({ months }: Props) => {
  return (
    <div className="grid h-full grid-rows-2 gap-8">
      {months.map(({ year, month }) => (
        <Month key={`${year}-${month}`} year={year} month={month} />
      ))}
    </div>
  )
}

const Month = ({ year, month }: { year: number; month: number }) => {
  const dates = getRangeOfCalendarMonth(year, month)

  return (
    <div>
      <h2 className="font-bold text-lg">
        <span className="mx-1 text-3xl">{year}</span>年
        <span className="mx-1 text-3xl">{month + 1}</span>月
      </h2>
      <div className="grid grid-cols-7 gap-px">
        <CalendarHeader color="sun">日</CalendarHeader>
        <CalendarHeader>月</CalendarHeader>
        <CalendarHeader>火</CalendarHeader>
        <CalendarHeader>水</CalendarHeader>
        <CalendarHeader>木</CalendarHeader>
        <CalendarHeader>金</CalendarHeader>
        <CalendarHeader color="sat">土</CalendarHeader>
        {dates.map(({ date, fold, hidden, merge, holiday }) => (
          <DateCell
            key={date.getTime()}
            date={date}
            inactive={getMonth(date) !== month}
            fold={fold}
            hidden={hidden}
            holiday={holiday}
            merge={merge}
          />
        ))}
      </div>
    </div>
  )
}

const CalendarHeader = ({
  children,
  className,
  color,
}: {
  children: React.ReactNode
  className?: string
  color?: "sun" | "sat"
}) => {
  return (
    <div
      className={cn(
        "mb-0.5 px-[1mm] py-0.5 font-bold text-white text-xs outline",
        color === "sun"
          ? "bg-sun"
          : color === "sat"
            ? "bg-sat"
            : "bg-[#A7A7A7]",
        className,
      )}
    >
      {children}
    </div>
  )
}

const DateCell = ({
  date,
  inactive,
  fold,
  hidden,
  merge,
  holiday,
}: {
  date: Date
  inactive: boolean
  fold: boolean
  hidden: boolean
  merge: boolean
  holiday?: string
}) => {
  const day = date.getDay()
  if (hidden) {
    return null
  }
  return (
    <div
      data-inactive={inactive ? "true" : undefined}
      className={cn(
        "p-0.5 font-bold text-sm outline outline-slate-700 data-inactive:opacity-30",
        fold ? "h-[11mm]" : "h-[22mm]",
        holiday != null || day === 0 ? "text-sun" : day === 6 ? "text-sat" : "",
        merge && "row-span-2",
      )}
    >
      <div className="flex w-full items-baseline justify-between pr-1">
        <div>{date.getDate()}</div>
        <div className="font-bold text-xs">{holiday}</div>
      </div>
    </div>
  )
}
