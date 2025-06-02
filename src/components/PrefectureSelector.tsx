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
  const [selectedPopulationType, setSelectedPopulationType] = useState<string>('総人口');
  const [isMobile, setIsMobile] = useState(false);

  // 画面サイズに合わせてモバイル表示かどうかを判定する処理
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
      if (latestPrefCode && !populationDataList.some((item) => item.prefCode === latestPrefCode)) {
        try {
          setLoadingPrefCode(latestPrefCode);
          const data = await getPopulation(latestPrefCode);
          const prefName =
            prefectures.find((pref) => pref.prefCode === latestPrefCode)?.prefName || '';
          setPopulationDataList((prev) => [...prev, { prefCode: latestPrefCode, prefName, data }]);
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
      prev.includes(prefCode) ? prev.filter((code) => code !== prefCode) : [...prev, prefCode]
    );

    // チェックを外したらデータも除外
    if (selectedPrefs.includes(prefCode)) {
      setPopulationDataList((prev) => prev.filter((item) => item.prefCode !== prefCode));
    }
  };

  // 全選択/全解除
  const handleSelectAll = () => {
    if (selectedPrefs.length === prefectures.length) {
      setSelectedPrefs([]);
      setPopulationDataList([]);
    } else {
      setSelectedPrefs(prefectures.map((pref) => pref.prefCode));
    }
  };

  // 選択解除
  const handleClearAll = () => {
    setSelectedPrefs([]);
    setPopulationDataList([]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 統計カード */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                background: '#3b82f6',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
            >
              {prefectures.length}
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>全都道府県</p>
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                background: '#10b981',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
            >
              {selectedPrefs.length}
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>選択中</p>
            </div>
          </div>
        </div>
      </div>

      {/* 選択コントロール */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '16px',
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? '18px' : '20px',
              fontWeight: 'bold',
              color: '#1f2937',
              margin: 0,
              textAlign: isMobile ? 'center' : 'left',
            }}
          >
            都道府県を選択してください
          </h2>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              width: isMobile ? '100%' : 'auto',
            }}
          >
            <button
              onClick={handleSelectAll}
              style={{
                padding: '12px 20px',
                background: '#3b82f6',
                color: 'white',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '500',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s',
                flex: isMobile ? '1' : 'none',
                minHeight: '44px',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#2563eb')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#3b82f6')}
            >
              {selectedPrefs.length === prefectures.length ? '全解除' : '全選択'}
            </button>
            <button
              onClick={handleClearAll}
              style={{
                padding: '12px 20px',
                background: '#6b7280',
                color: 'white',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '500',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s',
                flex: isMobile ? '1' : 'none',
                minHeight: '44px',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#4b5563')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#6b7280')}
            >
              解除
            </button>
          </div>
        </div>

        {/* チェックボックスグリッド */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile
              ? 'repeat(2, 1fr)'
              : 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '16px',
          }}
        >
          {prefectures.map((pref) => {
            const isSelected = selectedPrefs.includes(pref.prefCode);
            const isLoading = loadingPrefCode === pref.prefCode;

            return (
              <label
                key={pref.prefCode}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: '2px solid',
                  borderColor: isSelected ? 'transparent' : '#e5e7eb',
                  background: isSelected
                    ? 'linear-gradient(to right, #3b82f6, #8b5cf6)'
                    : 'rgba(255, 255, 255, 0.7)',
                  color: isSelected ? 'white' : '#374151',
                  boxShadow: isSelected
                    ? '0 4px 12px rgba(59, 130, 246, 0.4)'
                    : '0 1px 3px rgba(0, 0, 0, 0.1)',
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                  opacity: isLoading ? 0.7 : 1,
                  minHeight: '44px', // iOS推奨タッチターゲット
                }}
                onMouseOver={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                  }
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    border: '2px solid',
                    borderColor: isSelected ? 'white' : '#d1d5db',
                    background: isSelected ? 'white' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    flexShrink: 0,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleCheckboxChange(pref.prefCode)}
                    style={{ display: 'none' }}
                  />
                  {isSelected && (
                    <svg width="14" height="14" fill="#3b82f6" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>

                <span
                  style={{
                    fontWeight: '500',
                    fontSize: '16px',
                    flex: '1',
                  }}
                >
                  {pref.prefName}
                </span>

                {isLoading && (
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid',
                      borderColor: isSelected ? 'white' : '#3b82f6',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      flexShrink: 0,
                    }}
                  ></div>
                )}
              </label>
            );
          })}
        </div>

        {loadingPrefCode && (
          <div
            style={{
              marginTop: '16px',
              padding: '12px',
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '8px',
            }}
          >
            <p
              style={{
                fontSize: '14px',
                color: '#1d4ed8',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid #1d4ed8',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              ></div>
              {prefectures.find((p) => p.prefCode === loadingPrefCode)?.prefName}{' '}
              の人口データを取得中...
            </p>
          </div>
        )}
      </div>

      {/* 人口区分セレクト */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'stretch' : 'center',
          }}
        >
          <label
            style={{
              fontWeight: '600',
              color: '#1f2937',
              fontSize: '18px',
              textAlign: isMobile ? 'center' : 'left',
            }}
          >
            表示する人口区分
          </label>

          <div style={{ position: 'relative', width: isMobile ? '100%' : 'auto' }}>
            <select
              value={selectedPopulationType}
              onChange={(e) => setSelectedPopulationType(e.target.value)}
              style={{
                appearance: 'none',
                background: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px 40px 12px 16px',
                fontWeight: '500',
                color: '#374151',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s',
                width: isMobile ? '100%' : '220px',
                minHeight: '44px',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
              }}
            >
              <option value="総人口">総人口</option>
              <option value="年少人口">年少人口</option>
              <option value="生産年齢人口">生産年齢人口</option>
              <option value="老年人口">老年人口</option>
            </select>
            <div
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            >
              <svg width="16" height="16" fill="#9ca3af" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* グラフセクション */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          <h3
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#1f2937',
              margin: 0,
            }}
          >
            {selectedPopulationType} 推移グラフ
          </h3>
        </div>

        {selectedPrefs.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '48px 0',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                background: '#f3f4f6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '32px',
                color: '#9ca3af',
              }}
            >
              ?
            </div>
            <p
              style={{
                color: '#6b7280',
                fontSize: '18px',
                margin: '0 0 8px',
              }}
            >
              都道府県を選択してください
            </p>
            <p
              style={{
                color: '#9ca3af',
                fontSize: '14px',
                margin: 0,
              }}
            >
              上のチェックボックスから都道府県を選択すると、グラフが表示されます
            </p>
          </div>
        ) : (
          <div
            style={{
              background: 'white',
              borderRadius: '8px',
              padding: '16px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              border: '1px solid #f3f4f6',
            }}
          >
            <PopulationGraph
              populationDataList={populationDataList}
              selectedPopulationType={selectedPopulationType}
            />
          </div>
        )}
      </div>

      {/* CSSアニメーション */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PrefectureSelector;
