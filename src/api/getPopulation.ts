// 各年の人口データの型
export interface PopulationData {
  year: number; // 年
  value: number; // 人口の数値
}

// 各都道府県の人口構成データの型
export interface PopulationComposition {
  boundaryYear: number; // 境界年（最新データの年）
  data: {
    label: string; // データの種類（総人口、年少人口など）
    data: PopulationData[]; // 各年の人口データリスト
  }[];
}

// 特定の都道府県の人口構成データをAPIから取得する関数
export const getPopulation = async (prefCode: number): Promise<PopulationComposition> => {
  // APIにリクエストを送信
  const response = await fetch(
    `https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/population/composition/perYear?prefCode=${prefCode}`,
    {
      headers: {
        'X-API-KEY': '8FzX5qLmN3wRtKjH7vCyP9bGdEaU4sYpT6cMfZnJ', // 認証キーを設定
      },
    }
  );

  // もし失敗したらエラーをスロー
  if (!response.ok) {
    throw new Error('人口構成データの取得に失敗しました');
  }

  // APIレスポンスをJSONに変換
  const data = await response.json();

  // 結果部分だけ返す
  return data.result;
};
