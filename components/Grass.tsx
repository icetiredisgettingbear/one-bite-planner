import React, { useState } from "react";
import { Box, Tooltip, Typography, Tabs, Tab } from "@mui/material";
import Stack from "./Stack";

const colors = ["#F0F2F5", "#D6E6FF", "#A9CBFF", "#71A7F8", "#2D70D6"];

// 잔디 셀의 데이터 타입
interface GrassCell {
  date: string;
  count: number;
}

// Props 타입
interface GrassProps {
  data: GrassCell[][];
  year: number;
}

const GithubGrass: React.FC<GrassProps> = ({ data, year }) => {
  const cellSize = 16;
  const cellRadius = "3px";
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <Box
      sx={{
        overflowX: "auto",
        padding: 3,
        border: "1px solid #E5E5E5",
        borderRadius: 4,
      }}
    >
      <Stack gap={3}>
        <Stack
          direction="row"
          gap={0.5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            display="flex"
            alignItems="center"
            variant="body2"
            fontWeight={600}
            px={2}
            bgcolor="background.paper"
            borderRadius={10}
            width="fit-content"
            color="text.secondary"
            height={32}
          >
            개발 중...
          </Typography>
          <Stack direction="row" gap={0.5}>
            {colors.map((color) => (
              <Box
                key={color}
                sx={{
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: color,
                  borderRadius: cellRadius,
                }}
              />
            ))}
          </Stack>
        </Stack>

        {/* 월 표시 */}
        {/* <Stack
          direction="row"
          width="100%"
          flex={1}
          justifyContent="space-between"
          mb={2}
        >
          {months.map((month) => (
            <Typography
              key={month}
              variant="caption"
              align="center"
              sx={{ color: "#888" }}
            >
              {month}월
            </Typography>
          ))}
          <Typography
            key="temp"
            variant="caption"
            align="center"
            sx={{ color: "#888" }}
          >
            {""}
          </Typography>
        </Stack> */}

        {/* 잔디 그래프 */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${months.length}, ${cellSize}px)`,
            gridAutoFlow: "column",
            gap: 0.5,
          }}
        >
          {data.map((weekData, weekIndex) => (
            <Box
              key={weekIndex}
              sx={{
                display: "grid",
                gridTemplateRows: `repeat(7, ${cellSize}px)`,
                gap: 0.5,
              }}
            >
              {weekData.map((dayData, dayIndex) => {
                const level = Math.min(dayData.count, colors.length - 1);
                return (
                  <Tooltip
                    key={dayIndex}
                    title={
                      dayData.count
                        ? `${dayData.date}에 ${dayData.count}개의 목표를 달성했어요!`
                        : `${dayData.date}에 달성한 목표가 없어요 :(`
                    }
                  >
                    <Box
                      sx={{
                        width: cellSize,
                        height: cellSize,
                        backgroundColor: colors[level],
                        borderRadius: cellRadius,
                      }}
                    />
                  </Tooltip>
                );
              })}
            </Box>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

// 더미 데이터 생성 함수
const generateDummyData = (year: number): GrassCell[][] => {
  const data: GrassCell[][] = [];
  const startDate = new Date(`${year}-01-01`);
  const endDate = new Date(`${year}-12-31`);
  const oneDay = 24 * 60 * 60 * 1000; // 하루의 밀리초 수

  // 연도 전체 주를 반복하여 데이터 생성
  for (
    let date = new Date(startDate);
    date <= endDate;
    date = new Date(date.getTime() + 7 * oneDay)
  ) {
    const weekData: GrassCell[] = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(date.getTime() + i * oneDay);
      weekData.push({
        date: currentDay.toISOString().split("T")[0],
        count: Math.floor(Math.random() * 5),
      });
    }
    data.push(weekData);
  }

  return data;
};

// 메인 컴포넌트
const Grass: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2024); // 초기 연도
  //   const years = [2024, 2023]; // 연도 선택
  const data = generateDummyData(selectedYear);

  return (
    <Stack gap={2}>
      {/* <Tabs
        value={selectedYear}
        onChange={(event, newValue) => setSelectedYear(newValue)}
        aria-label="year tabs"
      >
        {years.map((year) => (
          <Tab key={year} label={`${year}년`} value={year} />
        ))}
      </Tabs> */}
      <GithubGrass data={data} year={selectedYear} />
    </Stack>
  );
};

export default Grass;
