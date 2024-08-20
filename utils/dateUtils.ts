export function getCurrentDateInfo() {
  // ISO week number 계산 함수
  function getWeekNumber(date: Date): number {
    const tempDate = new Date(date.getTime());

    tempDate.setHours(0, 0, 0, 0);
    tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));

    const week1 = new Date(tempDate.getFullYear(), 0, 4);

    return (
      1 +
      Math.round(
        ((tempDate.getTime() - week1.getTime()) / 86400000 -
          3 +
          ((week1.getDay() + 6) % 7)) /
          7
      )
    );
  }

  // 달에 해당하는 주들 구하는 함수
  function getWeeksOfMonth(year: number, month: number): number[] {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);
    const weeks = new Set<number>();

    let currentDay = firstDayOfMonth;
    while (currentDay <= lastDayOfMonth) {
      weeks.add(getWeekNumber(currentDay));
      currentDay.setDate(currentDay.getDate() + 7);
    }

    return Array.from(weeks);
  }

  // 현재 연도, 월, 분기 정보
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const quarter = Math.ceil(month / 3);

  // 현재 분기에 해당하는 월들 계산
  const getQuarterMonths = (quarter: number): number[] => {
    const startMonth = (quarter - 1) * 3 + 1;
    return [startMonth, startMonth + 1, startMonth + 2];
  };
  const quarterMonths = getQuarterMonths(quarter);

  // 이번 달의 주 수 계산
  const weeks = getWeeksOfMonth(year, month);
  const currentWeek = getWeekNumber(now);

  return {
    year,
    quarter,
    month,
    quarterMonths,
    numberOfWeeksInMonth: weeks.length,
    currentWeek,
    weeks,
  };
}
