import React, { useEffect, useState } from 'react';
import { getPrefectures } from '../api/getPrefectures';
import { Prefecture } from '../types';

const PrefectureSelector = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPrefectures();
        setPrefectures(data.result); // API の仕様に合わせて
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
