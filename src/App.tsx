import { format, setMonth } from "date-fns"
import { useState } from "react"
import { Calendar } from "./Calendar.js"
import { chunk, getMonths } from "./utils.js"

export const App = () => {
  const [start, setStart] = useState<Date>(setMonth(new Date(), 0))
  const chunked = chunk(getMonths(start), 2)

  return (
    <div>
      <div className="preview-only sticky inset-x-0 top-0 z-10 flex w-screen bg-white p-4 shadow">
        <div className="flex w-full max-w-[200mm] items-center gap-4">
          <span className="mr-2">開始月:</span>
          <input
            type="month"
            name="start-month"
            value={format(start, "yyyy-MM")}
            className="cursor-pointer rounded border border-slate-400 p-2 hover:bg-slate-50"
            onChange={(e) => setStart(new Date(e.target.value))}
          />
          <button
            type="button"
            onClick={() => window.print()}
            className="ml-auto rounded bg-slate-800 px-4 py-2 font-bold text-white"
          >
            印刷
          </button>
        </div>
      </div>
      {chunked.map((months) => (
        <section key={`${months[0].year}-${months[0].month}`}>
          <Calendar months={months} />
        </section>
      ))}
    </div>
  )
}
