import React from 'react';
import { render, screen } from '@testing-library/react';
import PrefectureSelector from '../components/PrefectureSelector';

describe('PrefectureSelector', () => {
  test('初期表示でタイトルが表示される', () => {
    render(<PrefectureSelector />);
    const heading = screen.getByRole('heading', { name: /都道府県を選択してください/i });
    expect(heading).toBeInTheDocument();
  });

  test('全解除ボタンが初期表示される', () => {
    render(<PrefectureSelector />);
    const button = screen.getByRole('button', { name: /全解除/i });
    expect(button).toBeInTheDocument();
  });
});
