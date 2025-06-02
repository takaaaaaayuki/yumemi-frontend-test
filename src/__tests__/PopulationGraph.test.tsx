import React from 'react';
import { render, screen } from '@testing-library/react';
import PopulationGraph from '../components/PopulationGraph';
import { PopulationComposition } from '../api/getPopulation';

describe('PopulationGraph', () => {
  test('初期表示メッセージを表示する', () => {
    render(<PopulationGraph populationDataList={[]} selectedPopulationType="総人口" />);
    const message = screen.getByText(/都道府県を選択してください/i);
    expect(message).toBeInTheDocument();
  });

  test('人口グラフのコンテナが存在する', () => {
    const dummyData: PopulationComposition = {
      boundaryYear: 2020,
      data: [
        {
          label: '総人口',
          data: [
            { year: 2000, value: 100000 },
            { year: 2005, value: 120000 }
          ]
        }
      ]
    };

    const testPopulationDataList = [
      {
        prefCode: 1,
        prefName: '北海道',
        data: dummyData
      }
    ];

    const { container } = render(
      <PopulationGraph
        populationDataList={testPopulationDataList}
        selectedPopulationType="総人口"
      />
    );

    const rechartsContainer = container.querySelector('.recharts-responsive-container');
    expect(rechartsContainer).toBeInTheDocument();
  });
});
