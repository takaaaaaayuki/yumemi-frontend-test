export interface PopulationData {
    year: number;
    value: number;
  }
  
  export interface PopulationComposition {
    boundaryYear: number;
    data: {
      label: string;
      data: PopulationData[];
    }[];
  }
  
  export const getPopulation = async (prefCode: number): Promise<PopulationComposition> => {
    const response = await fetch(
      `https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/population/composition/perYear?prefCode=${prefCode}`,
      {
        headers: {
          'X-API-KEY': '8FzX5qLmN3wRtKjH7vCyP9bGdEaU4sYpT6cMfZnJ'
        }
      }
    );
  
    if (!response.ok) {
      throw new Error('人口構成データの取得に失敗しました');
    }
  
    const data = await response.json();
    return data.result;
  };
  