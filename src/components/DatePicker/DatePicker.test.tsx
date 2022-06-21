import React from 'react';
import { render, screen } from '@testing-library/react';

import DatePicker from '@components/DatePicker';

describe('DatePicker Test', () => {
  test('Label test', () => {
    render(
      <>
        <label htmlFor="date-picker-id">Date</label>
        <DatePicker
          name="date"
          id="date-picker-id"
          min="2020-01-01"
          max="2029-12-31"
        />
      </>
    );
    expect(screen.getByLabelText('Date')).toBeTruthy();
  });

  test('min and max props test', () => {
    const result = render(<DatePicker min="2020-01-01" max="2029-12-31" />);
    expect(
      result.container.querySelector('input[min="2020-01-01"]')
    ).toBeInTheDocument();
    expect(
      result.container.querySelector('input[max="2029-12-31"]')
    ).toBeInTheDocument();
  });
});
