import { DateTimeCell } from './DateTimeCell'

interface SeenCompleteCellProps {
  rowIndex: number
}

export const SeenCompleteCell = ({ rowIndex }: SeenCompleteCellProps) => {
  return (
    <DateTimeCell format="relative" rowIndex={rowIndex} field="seen_complete" />
  )
}
