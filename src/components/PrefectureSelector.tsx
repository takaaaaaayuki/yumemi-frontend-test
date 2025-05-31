import React, { useEffect, useState } from 'react';
import { getPrefectures } from '../api/getPrefectures';

type Prefecture = {
  prefCode: number;
  prefName: string;
};

const PrefectureSelector: React.FC = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

  useEffect(() => {
    const fetchPrefectures = async () => {
      try {
        const data = await getPrefectures();
        setPrefectures(data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrefectures();
  }, []);

  return (
    <div>
      {prefectures.map((pref) => (
        <label key={pref.prefCode} style={{ marginRight: '10px' }}>
          <input type="checkbox" value={pref.prefCode} />
          {pref.prefName}
        </label>
      ))}
    </div>
  );
};

export default PrefectureSelector;
