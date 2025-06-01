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
  const [loadingPrefCode, setLoadingPrefCode] = useState<number | null>(null);

  // 人口区分（総人口 / 年少人口 / 生産年齢人口 / 老年人口）
  const [selectedPopulationType, setSelectedPopulationType] = useState<string>('総人口');

  const handlePopulationTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPopulationType(e.target.value);
  };

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

  // 選択状態が変わるたびに人口データを更新
  useEffect(() => {
    const fetchPopulationData = async () => {
      const latestPrefCode = selectedPrefs[selectedPrefs.length - 1];
      if (latestPrefCode && !populationDataList.find((item) => item.prefCode === latestPrefCode)) {
        try {
          setLoadingPrefCode(latestPrefCode);
          const data = await getPopulation(latestPrefCode);
          const prefName = prefectures.find((pref) => pref.prefCode === latestPrefCode)?.prefName || '';
          setPopulationDataList((prev) => [
            ...prev,
            { prefCode: latestPrefCode, prefName, data }
          ]);
        } catch (error) {
          console.error('人口構成データの取得に失敗しました', error);
        } finally {
          setLoadingPrefCode(null);
        }
      }
    };
    fetchPopulationData();
  }, [selectedPrefs, prefectures, populationDataList]);

  // チェックボックス切り替え
  const handleCheckboxChange = (prefCode: number) => {
    setSelectedPrefs((prev) =>
      prev.includes(prefCode)
        ? prev.filter((code) => code !== prefCode)
        : [...prev, prefCode]
    );

    // チェックを外したらデータも除外
    if (selectedPrefs.includes(prefCode)) {
      setPopulationDataList((prev) => prev.filter((item) => item.prefCode !== prefCode));
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
              onChange={() => handleCheckboxChange(pref.prefCode)}
              className="accent-blue-500"
            />
            {pref.prefName}
          </label>
        ))}
      </div>

      {loadingPrefCode && (
        <p className="text-sm text-blue-500 mt-2">
          {prefectures.find((p) => p.prefCode === loadingPrefCode)?.prefName} の人口データ取得中...
        </p>
      )}

      <div className="mt-4 flex items-center gap-2">
        <label htmlFor="populationType" className="font-medium">
          表示する人口区分:
        </label>
        <select
          id="populationType"
          value={selectedPopulationType}
          onChange={handlePopulationTypeChange}
          className="border p-1 rounded"
        >
          <option value="総人口">総人口</option>
          <option value="年少人口">年少人口</option>
          <option value="生産年齢人口">生産年齢人口</option>
          <option value="老年人口">老年人口</option>
        </select>
      </div>

      <h3 className="text-lg font-semibold mt-4">人口構成グラフ</h3>
      <PopulationGraph
        populationDataList={populationDataList}
        selectedPopulationType={selectedPopulationType}
      />
    </div>
  );
};

export default PrefectureSelector;
