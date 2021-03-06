import React from 'react';
import { render, screen } from '@testing-library/react';

import Label from '@components/Label';

describe('Label Tests', () => {
  describe('Test Label style variants', () => {
    const labelContent = 'Hello world!';

    test('renders the default Label component', () => {
      render(<Label>{labelContent}</Label>);
      expect(screen.getByText(labelContent)).toHaveClass('label');
      expect(screen.getByText(labelContent)).toHaveClass('label-default');
    });

    test('renders the primary Label component', () => {
      render(<Label variant="primary">Hello world!</Label>);
      expect(screen.getByText(labelContent)).toHaveClass('label');
      expect(screen.getByText(labelContent)).toHaveClass('label-primary');
    });

    test('renders the success Label component', () => {
      render(<Label variant="success">Hello world!</Label>);
      expect(screen.getByText(labelContent)).toHaveClass('label');
      expect(screen.getByText(labelContent)).toHaveClass('label-success');
    });

    test('renders the danger Label component', () => {
      render(<Label variant="danger">Hello world!</Label>);
      expect(screen.getByText(labelContent)).toHaveClass('label');
      expect(screen.getByText(labelContent)).toHaveClass('label-danger');
    });

    test('renders the warning Label component', () => {
      render(<Label variant="warning">Hello world!</Label>);
      expect(screen.getByText(labelContent)).toHaveClass('label');
      expect(screen.getByText(labelContent)).toHaveClass('label-warning');
    });

    test('renders the info Label component', () => {
      render(<Label variant="info">Hello world!</Label>);
      expect(screen.getByText(labelContent)).toHaveClass('label');
      expect(screen.getByText(labelContent)).toHaveClass('label-info');
    });
  });

  test('visible Label component', () => {
    const result = render(
      <Label visible variant="warning">
        Hello world!
      </Label>
    );
    expect(result.container.querySelector('.label')).toBeInTheDocument();
  });

  test('hidden Label component', () => {
    const result = render(
      <Label visible={false} variant="warning">
        Hello world!
      </Label>
    );
    expect(result.container.querySelector('.label')).not.toBeInTheDocument();
  });
});
