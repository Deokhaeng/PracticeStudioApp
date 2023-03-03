import dayjs from 'dayjs';
import { useMemo } from 'react';

export type DateDataType = {
  year: string[];
  month: string[];
  day: string[];
};

export type DayLengthType = 28 | 29 | 30 | 31;

export default function useYearMonthData(selectedYearIndex: number, selectedMonthIndex: number, selectedDayIndex: number) {
  const yearLength = dayjs().get('year') - 1950;
  const yearMontData: DateDataType = useMemo(() => {
    return {
      year: Array.from({ length: yearLength }, (_, index) => String(1950 + index)),
      month: Array.from({ length: 12 }, (_, index) => String(index + 1)),
      day: Array.from({ length: 31 }, (_, index) => String(index + 1)),
    };
  }, []);

  const selectedYear = useMemo(() => yearMontData.year[selectedYearIndex], [selectedYearIndex]);
  const selectedMonth = useMemo(() => yearMontData.month[selectedMonthIndex], [selectedMonthIndex]);
  const selectedDay = useMemo(() => yearMontData.day[selectedDayIndex], [selectedDayIndex]);

  return { yearOption: yearMontData.year, monthOption: yearMontData.month, dayOption: yearMontData.day, selectedYear, selectedMonth, selectedDay };
}
