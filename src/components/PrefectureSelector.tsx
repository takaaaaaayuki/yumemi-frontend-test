import React, { useEffect, useState } from 'react';
import { getPrefectures, Prefecture } from '../api/getPrefectures';
import { getPopulation, PopulationComposition } from '../api/getPopulation';
import PopulationGraph from './PopulationGraph';

interface PopulationDataItem {
  prefCode: number;
  prefName: string;
  data: PopulationComposition;
}

const PrefectureSelector: React.FC = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([]);
  const [populationDataList, setPopulationDataList] = useState<PopulationDataItem[]>([]);

  // 都道府県一覧取得
  useEffect(() => {
    const fetchPrefectures = async () => {
      try {
        const data = await getPrefectures();
        setPrefectures(data);
      } catch (error) {
        console.error('都道府県の取得に失敗しました', error);
      }
    };
    fetchPrefectures();
  }, []);

  // チェックボックス選択状態変更
  const handleCheckboxChange = async (prefCode: number, prefName: string) => {
    setSelectedPrefs((prev) =>
      prev.includes(prefCode)
        ? prev.filter((code) => code !== prefCode)
        : [...prev, prefCode]
    );

    // 選択に応じてデータ取得
    if (!selectedPrefs.includes(prefCode)) {
      try {
        const data = await getPopulation(prefCode);
        setPopulationDataList((prev) => [
          ...prev,
          { prefCode, prefName, data },
        ]);
      } catch (error) {
        console.error('人口構成データの取得に失敗しました', error);
      }
    } else {
      // チェックを外したらリストから除外
      setPopulationDataList((prev) =>
        prev.filter((item) => item.prefCode !== prefCode)
      );
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">都道府県セレクター</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {prefectures.map((pref) => (
          <label
            key={pref.prefCode}
            className="flex items-center gap-1 bg-white p-2 rounded shadow-sm"
          >
            <input
              type="checkbox"
              checked={selectedPrefs.includes(pref.prefCode)}
              onChange={() => handleCheckboxChange(pref.prefCode, pref.prefName)}
              className="accent-blue-500"
            />
            {pref.prefName}
          </label>
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-4">人口構成グラフ</h3>
      <PopulationGraph populationDataList={populationDataList} />
    </div>
  );
};

export default PrefectureSelector;
