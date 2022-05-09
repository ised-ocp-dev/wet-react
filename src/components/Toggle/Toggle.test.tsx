import React from 'react';
import { render, screen } from '@testing-library/react';

import Toggle from '@components/Toggle';

describe('Toggle Tests', () => {
  const toggleContent = 'Toggle';

  test('Test Toggle component', () => {
    render(
      <Toggle value="value" variant="default">
        {toggleContent}
      </Toggle>
    );
    expect(screen.getByText(toggleContent)).toHaveClass('btn btn-default');
  });

  describe('Test Toggle style variants', () => {
    test('Default Toggle', () => {
      render(
        <Toggle value="value" variant="default">
          {toggleContent}
        </Toggle>
      );
      expect(screen.getByText(toggleContent)).toHaveClass('btn btn-default');
    });

    test('Primary Toggle', () => {
      render(
        <Toggle value="value" variant="primary">
          {toggleContent}
        </Toggle>
      );
      expect(screen.getByText(toggleContent)).toHaveClass('btn btn-primary');
    });

    test('Danger Toggle', () => {
      render(
        <Toggle value="value" variant="danger">
          {toggleContent}
        </Toggle>
      );
      expect(screen.getByText(toggleContent)).toHaveClass('btn btn-danger');
    });

    test('Success Toggle', () => {
      render(
        <Toggle value="value" variant="success">
          {toggleContent}
        </Toggle>
      );
      expect(screen.getByText(toggleContent)).toHaveClass('btn btn-success');
    });

    test('Warning Toggle', () => {
      render(
        <Toggle value="value" variant="warning">
          {toggleContent}
        </Toggle>
      );
      expect(screen.getByText(toggleContent)).toHaveClass('btn btn-warning');
    });

    test('Info Toggle', () => {
      render(
        <Toggle value="value" variant="info">
          {toggleContent}
        </Toggle>
      );
      expect(screen.getByText(toggleContent)).toHaveClass('btn btn-info');
    });
  });

  describe('Active/Disable State Toggle Tests', () => {
    test('Active Toggle state', () => {
      render(<Toggle value="value">{toggleContent}</Toggle>);
      expect(screen.getByText(toggleContent)).toHaveClass('btn btn-default');
    });

    test('Disabled Toggle state', () => {
      render(
        <Toggle value="value" disabled>
          {toggleContent}
        </Toggle>
      );
      expect(screen.getByText(toggleContent)).toHaveClass(
        'disabled btn btn-default'
      );
    });
  });

  describe('Toggle Types and Checked States', () => {
    test('Radio Toggle, checked', () => {
      const result = render(
        <Toggle value="value" type="radio" checked>
          {toggleContent}
        </Toggle>
      );
      expect(result.container.querySelector('input[type="radio"]'));
      expect(result.container.querySelector('input')).toBeChecked();
    });

    test('Radio Toggle, unchecked', () => {
      const result = render(
        <Toggle value="value" type="radio">
          {toggleContent}
        </Toggle>
      );
      expect(result.container.querySelector('input[type="radio"]'));
      expect(result.container.querySelector('input')).not.toBeChecked();
    });

    test('Checkbox Toggle, checked', () => {
      const result = render(
        <Toggle value="value" type="checkbox" checked>
          {toggleContent}
        </Toggle>
      );
      expect(result.container.querySelector('input[type="checkbox"]'));
      expect(result.container.querySelector('input')).toBeChecked();
    });

    test('Checkbox Toggle, unchecked', () => {
      const result = render(
        <Toggle value="value" type="checkbox">
          {toggleContent}
        </Toggle>
      );
      expect(result.container.querySelector('input[type="checkbox"]'));
      expect(result.container.querySelector('input')).not.toBeChecked();
    });
  });
});
