import {
  addMonths,
  addWeeks,
  differenceInMonths,
  endOfMonth,
  endOfWeek,
  getDay,
  getWeekOfMonth,
  isBefore,
  startOfMonth,
  startOfWeek,
} from "date-fns"
import JapaneseHolidays from "japanese-holidays"

export const getMonths = (date: Date) => {
  let base = new Date(date)
  const months = []
  for (let i = 0; i < 12; i++) {
    months.push({ year: base.getFullYear(), month: base.getMonth() })
    base = addMonths(base, 1)
  }
  return months
}

export const getRangeOfCalendarMonth = (year: number, month: number) => {
  const base = new Date(year, month, 1)
  const start = startOfWeek(base)
  const end = endOfWeek(endOfMonth(base))

  const week = getWeekOfMonth(endOfMonth(base))

  const dates = getDateList(start, end)
  const foldedSize = getDay(endOfMonth(base)) + 1

  const shouldFold = 6 <= week

  return dates.map((date) => {
    const isPrevMonth = isBefore(startOfMonth(date), startOfMonth(base))
    const isNextMonth = isBefore(startOfMonth(base), startOfMonth(date))
    const merge = shouldFold && 0 < differenceInMonths(addWeeks(date, 1), base)
    const fold =
      !isPrevMonth &&
      shouldFold &&
      (5 <= getWeekOfMonth(date) || isNextMonth) &&
      getDay(date) < foldedSize
    const hidden = isNextMonth && shouldFold
    const holiday = JapaneseHolidays.isHoliday(date)

    return {
      date,
      fold,
      hidden,
      merge,
      holiday,
    }
  })
}

export const getDateList = (start: Date, end: Date) => {
  const dateList: Date[] = []
  let current = start
  while (current <= end) {
    dateList.push(current)
    current = new Date(current.getTime() + 24 * 60 * 60 * 1000) // Add one day
  }
  return dateList
}

export const cn = (...classes: (string | undefined | false)[]) => {
  return classes.filter(Boolean).join(" ")
}

export const chunk = <T>(array: T[], size: number): T[][] => {
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}
