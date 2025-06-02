// src/api/getPrefectures.ts

// 都道府県データの型（都道府県コードと名前）
export interface Prefecture {
  prefCode: number; // 都道府県コード
  prefName: string; // 都道府県名
}

// 都道府県一覧をAPIから取得する関数
export const getPrefectures = async (): Promise<Prefecture[]> => {
  // APIにリクエストを送信
  const response = await fetch(
    'https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/prefectures',
    {
      headers: {
        'X-API-KEY': '8FzX5qLmN3wRtKjH7vCyP9bGdEaU4sYpT6cMfZnJ', // 認証用APIキー
      },
    }
  );

  // 取得に失敗した場合はエラーをスロー
  if (!response.ok) {
    throw new Error('都道府県一覧の取得に失敗しました');
  }

  // APIレスポンスをJSONに変換
  const data = await response.json();

  // 結果部分だけ返す
  return data.result;
};
