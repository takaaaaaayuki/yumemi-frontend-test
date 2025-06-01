import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { PopulationComposition } from '../api/getPopulation';

interface PopulationDataItem {
  prefCode: number;
  prefName: string;
  data: PopulationComposition;
}

interface Props {
  populationDataList: PopulationDataItem[];
  selectedPopulationType: string;
}

const PopulationGraph: React.FC<Props> = ({
  populationDataList,
  selectedPopulationType
}) => {
  if (populationDataList.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-4">
        データを選択してください
      </p>
    );
  }

  // 全ての年をベースにデータ構造を作成
  const years: number[] = populationDataList[0].data.data[0].data.map(
    (d) => d.year
  );

  // 年ごとに各都道府県の人口データをまとめる
  const chartData = years.map((year: number, index: number) => {
    const dataPoint: { [key: string]: number | string } = { year };
    populationDataList.forEach((item) => {
      const targetDataEntry = item.data.data.find(
        (d) => d.label === selectedPopulationType
      );
      if (targetDataEntry) {
        dataPoint[item.prefName] = targetDataEntry.data[index].value;
      }
    });
    return dataPoint;
  });

  // 都道府県ごとに固定のカラーを生成
  const getColor = (prefCode: number): string => {
    const color = (prefCode * 2654435761) % 0xffffff;
    return `#${color.toString(16).padStart(6, '0')}`;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        {populationDataList.map((item) => (
          <Line
            key={item.prefCode}
            type="monotone"
            dataKey={item.prefName}
            stroke={getColor(item.prefCode)}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PopulationGraph;
