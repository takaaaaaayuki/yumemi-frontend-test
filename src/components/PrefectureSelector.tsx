import React, { useEffect, useState } from 'react';
import { getPrefectures, Prefecture } from '../api/getPrefectures';

const PrefectureSelector: React.FC = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([]);

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

  const handleCheckboxChange = (prefCode: number) => {
    setSelectedPrefs((prev) =>
      prev.includes(prefCode)
        ? prev.filter((code) => code !== prefCode)
        : [...prev, prefCode]
    );
  };

  return (
    <div>
      <h2>都道府県セレクター</h2>
      <div>
        {prefectures.map((pref) => (
          <label key={pref.prefCode} style={{ display: 'block' }}>
            <input
              type="checkbox"
              checked={selectedPrefs.includes(pref.prefCode)}
              onChange={() => handleCheckboxChange(pref.prefCode)}
            />
            {pref.prefName}
          </label>
        ))}
      </div>
    </div>
  );
};

export default PrefectureSelector;
