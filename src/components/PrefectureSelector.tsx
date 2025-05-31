// src/components/PrefectureSelector.tsx
import React, { useEffect, useState } from 'react';
import { getPrefectures, Prefecture } from '../api/getPrefectures';

const PrefectureSelector: React.FC = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPrefectures();
        setPrefectures(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {prefectures.map((pref) => (
        <label key={pref.prefCode}>
          <input type="checkbox" value={pref.prefCode} />
          {pref.prefName}
        </label>
      ))}
    </div>
  );
};

export default PrefectureSelector;
