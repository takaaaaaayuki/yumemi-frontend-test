import React from 'react';
import PrefectureSelector from '../components/PrefectureSelector';

const Home: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e0e7ff 100%)',
        padding: '0',
      }}
    >
      {/* ヘッダーセクション */}
      <div
        style={{
          maxWidth: '1152px',
          margin: '0 auto',
          padding: '32px 16px',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          <h1
            style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #2563eb, #9333ea, #4f46e5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '12px',
              lineHeight: '1.2',
            }}
          >
            都道府県別人口推移
          </h1>
          <p
            style={{
              color: '#6b7280',
              fontSize: '1.125rem',
              marginBottom: '16px',
            }}
          >
            都道府県を選択して、人口構成の推移をグラフで確認できます
          </p>
          <div
            style={{
              width: '96px',
              height: '4px',
              background: 'linear-gradient(to right, #3b82f6, #a855f7)',
              margin: '0 auto',
              borderRadius: '9999px',
            }}
          ></div>
        </div>

        {/* メインコンテンツ */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(8px)',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
          }}
        >
          <PrefectureSelector />
        </div>

        {/* フッター */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '32px',
            paddingBottom: '32px',
          }}
        >
          <p
            style={{
              color: '#6b7280',
              fontSize: '0.875rem',
            }}
          >
            © 2025 都道府県人口推移アプリ - ゆめみフロントエンド試験課題
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
