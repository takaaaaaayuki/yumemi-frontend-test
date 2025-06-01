import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
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
  const [isMobile, setIsMobile] = useState(false);

  // レスポンシブ対応
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (populationDataList.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '48px 0',
        background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
        borderRadius: '8px'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: '#e5e7eb',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: '32px',
          color: '#9ca3af'
        }}>
          ?
        </div>
        <p style={{
          color: '#6b7280',
          fontWeight: '500',
          marginBottom: '8px',
          fontSize: '16px'
        }}>
          グラフを表示するにはデータが必要です
        </p>
        <p style={{
          color: '#9ca3af',
          fontSize: '14px',
          margin: 0
        }}>
          都道府県を選択してください
        </p>
      </div>
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

  // 美しいカラーパレット
  const colorPalette = [
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#10B981', // Green
    '#F59E0B', // Amber
    '#8B5CF6', // Purple
    '#06B6D4', // Cyan
    '#EC4899', // Pink
    '#84CC16', // Lime
    '#F97316', // Orange
    '#6366F1', // Indigo
    '#14B8A6', // Teal
    '#F43F5E', // Rose
    '#22C55E', // Emerald
    '#A855F7', // Violet
    '#0EA5E9', // Sky
    '#EAB308', // Yellow
  ];

  // 都道府県ごとに固定のカラーを生成
  const getColor = (index: number): string => {
    return colorPalette[index % colorPalette.length];
  };

  // カスタムツールチップ
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #e5e7eb'
        }}>
          <h4 style={{
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '8px',
            fontSize: '14px'
          }}>
            {label}年
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {payload.map((entry: any, index: number) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: entry.color
                }} />
                <span style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  {entry.dataKey}:
                </span>
                <span style={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#111827'
                }}>
                  {entry.value?.toLocaleString()}人
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // カスタム凡例
  const CustomLegend = ({ payload }: any) => (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '16px',
      marginTop: '16px',
      padding: '16px',
      background: 'rgba(249, 250, 251, 0.5)',
      borderRadius: '8px'
    }}>
      {payload?.map((entry: any, index: number) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            backgroundColor: entry.color,
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }} />
          <span style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151'
          }}>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* グラフ統計情報 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
        gap: '12px'
      }}>
        <div style={{
          background: 'linear-gradient(to right, #eff6ff, #dbeafe)',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #bfdbfe'
        }}>
          <p style={{
            fontSize: '12px',
            color: '#2563eb',
            fontWeight: '500',
            margin: '0 0 4px'
          }}>
            表示中
          </p>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: 'bold',
            color: '#1e40af',
            margin: 0
          }}>
            {populationDataList.length}件
          </p>
        </div>
        
        <div style={{
          background: 'linear-gradient(to right, #f0fdf4, #dcfce7)',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #bbf7d0'
        }}>
          <p style={{
            fontSize: '12px',
            color: '#16a34a',
            fontWeight: '500',
            margin: '0 0 4px'
          }}>
            開始年
          </p>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: 'bold',
            color: '#15803d',
            margin: 0
          }}>
            {years[0]}年
          </p>
        </div>
        
        <div style={{
          background: 'linear-gradient(to right, #fef3c7, #fde68a)',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #fcd34d',
          gridColumn: isMobile ? 'span 2' : 'auto'
        }}>
          <p style={{
            fontSize: '12px',
            color: '#d97706',
            fontWeight: '500',
            margin: '0 0 4px'
          }}>
            最新年
          </p>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: 'bold',
            color: '#92400e',
            margin: 0
          }}>
            {years[years.length - 1]}年
          </p>
        </div>
      </div>

      {/* メイングラフ */}
      <div style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
        padding: isMobile ? '16px' : '24px',
        borderRadius: '12px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ marginBottom: '16px' }}>
          <h4 style={{
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '4px'
          }}>
            {selectedPopulationType} 推移
          </h4>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0
          }}>
            選択された都道府県の人口推移を表示しています
          </p>
        </div>
        
        <div style={{
          background: '#ffffff',
          padding: isMobile ? '12px' : '16px',
          borderRadius: '8px',
          boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
          border: '1px solid #f3f4f6'
        }}>
          <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
            <LineChart 
              data={chartData}
              margin={{ 
                top: 20, 
                right: isMobile ? 20 : 30, 
                left: isMobile ? 10 : 20, 
                bottom: 20 
              }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#E5E7EB" 
                opacity={0.6}
              />
              <XAxis 
                dataKey="year" 
                stroke="#6B7280"
                fontSize={isMobile ? 10 : 12}
                fontWeight={500}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={isMobile ? 10 : 12}
                fontWeight={500}
                tickFormatter={(value) => `${(value / 10000).toFixed(0)}万`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
              {populationDataList.map((item, index) => (
                <Line
                  key={item.prefCode}
                  type="monotone"
                  dataKey={item.prefName}
                  stroke={getColor(index)}
                  strokeWidth={isMobile ? 2 : 3}
                  dot={{ 
                    fill: getColor(index), 
                    strokeWidth: 2, 
                    stroke: '#fff',
                    r: isMobile ? 3 : 4 
                  }}
                  activeDot={{ 
                    r: isMobile ? 5 : 6, 
                    stroke: getColor(index),
                    strokeWidth: 2,
                    fill: '#fff'
                  }}
                  strokeDasharray={index % 3 === 0 ? "0" : index % 3 === 1 ? "5,5" : "10,5"}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* データ要約 */}
      <div style={{
        background: 'linear-gradient(to right, #f9fafb, #f3f4f6)',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <h5 style={{
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '8px',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          データ要約
        </h5>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '12px',
          fontSize: '14px'
        }}>
          <div>
            <span style={{ color: '#6b7280' }}>表示期間: </span>
            <span style={{ fontWeight: '500', color: '#1f2937' }}>
              {years[0]}年 〜 {years[years.length - 1]}年
            </span>
          </div>
          <div>
            <span style={{ color: '#6b7280' }}>人口区分: </span>
            <span style={{ fontWeight: '500', color: '#1f2937' }}>
              {selectedPopulationType}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopulationGraph;