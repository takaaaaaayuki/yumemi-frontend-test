// src/api/getPrefectures.ts
export interface Prefecture {
    prefCode: number;
    prefName: string;
  }
  
  export const getPrefectures = async (): Promise<Prefecture[]> => {
    const response = await fetch('https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/prefectures', {
      headers: {
        'X-API-KEY': '8FzX5qLmN3wRtKjH7vCyP9bGdEaU4sYpT6cMfZnJ'
      }
    });
  
    if (!response.ok) {
      throw new Error('都道府県一覧の取得に失敗しました');
    }
  
    const data = await response.json();
    return data.result;
  };
  