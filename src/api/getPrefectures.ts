export const getPrefectures = async () => {
    const response = await fetch(
      'https://yumemi-frontend-engineer-codecheck-api.vercel.app/prefectures',
      {
        headers: {
          'X-API-KEY': '8FzX5qLmN3wRtKjH7vCyP9bGdEaU4sYpT6cMfZnJ'
        }
      }
    );
  
    if (!response.ok) {
      throw new Error(`都道府県一覧の取得に失敗しました: ${response.status}`);
    }
  
    return response.json();
  };
  