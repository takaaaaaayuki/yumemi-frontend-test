// src/pages/Home.tsx
import React from 'react';
import PrefectureSelector from '../components/PrefectureSelector';

const Home: React.FC = () => {
  return (
    <div>
      <h1>都道府県別人口推移</h1>
      <PrefectureSelector />
    </div>
  );
};

export default Home;
