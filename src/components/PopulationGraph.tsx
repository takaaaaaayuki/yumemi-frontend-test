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
}

const PopulationGraph: React.FC<Props> = ({ populationDataList }) => {
  if (populationDataList.length === 0)
    return <p className="text-gray-500">データを選択してください</p>;

  // まず全ての年をベースにしたデータ構造を作成
  const years: number[] = populationDataList[0].data.data[0].data.map(
    (d) => d.year
  );

  // 年ごとに各都道府県の人口を集約
  const chartData = years.map((year: number, index: number) => {
    const dataPoint: { [key: string]: number | string } = { year };
    populationDataList.forEach((item) => {
      const total = item.data.data[0].data[index].value;
      dataPoint[item.prefName] = total;
    });
    return dataPoint;
  });

  // カラーを都道府県ごとに固定的に生成する（例: prefCodeベースの色）
  const getColor = (prefCode: number) => {
    const color = (prefCode * 2654435761) % 16777215;
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
