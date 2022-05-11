import React from 'react';
import { render, screen } from '@testing-library/react';

import ToggleGroup from '@components/ToggleGroup';
import Toggle from '@components/Toggle';

describe('Toggle Group', () => {
  const toggleText1 = 'Toggle 1';
  const toggleText2 = 'Toggle 2';
  const toggleText3 = 'Toggle 3';

  describe('ToggleGroup Orientation', () => {
    test('Default ToggleGroup orientation', () => {
      render(
        <ToggleGroup name="toggles">
          <Toggle name="toggles" value={1}>
            {toggleText1}
          </Toggle>
          <Toggle name="toggles" value={2}>
            {toggleText2}
          </Toggle>
          <Toggle name="toggles" value={3}>
            {toggleText3}
          </Toggle>
        </ToggleGroup>
      );
      expect(screen.getByRole('group')).toHaveClass('btn-group');
      expect(screen.getByText(toggleText1)).toHaveClass('btn');
      expect(screen.getByText(toggleText2)).toHaveClass('btn');
      expect(screen.getByText(toggleText3)).toHaveClass('btn');
    });

    test('Horizontal ToggleGroup orientation', () => {
      render(
        <ToggleGroup name="toggles" vertical={false}>
          <Toggle name="toggles" value={1}>
            {toggleText1}
          </Toggle>
          <Toggle name="toggles" value={2}>
            {toggleText2}
          </Toggle>
          <Toggle name="toggles" value={3}>
            {toggleText3}
          </Toggle>
        </ToggleGroup>
      );
      expect(screen.getByRole('group')).toHaveClass('btn-group');
      expect(screen.getByRole('group')).not.toHaveClass('btn-group-vertical');
      expect(screen.getByText(toggleText1)).toHaveClass('btn');
      expect(screen.getByText(toggleText2)).toHaveClass('btn');
      expect(screen.getByText(toggleText3)).toHaveClass('btn');
    });

    test('Vertical ToggleGroup orientation', () => {
      render(
        <ToggleGroup name="toggles" vertical>
          <Toggle name="toggles" value={1}>
            {toggleText1}
          </Toggle>
          <Toggle name="toggles" value={2}>
            {toggleText2}
          </Toggle>
          <Toggle name="toggles" value={3}>
            {toggleText3}
          </Toggle>
        </ToggleGroup>
      );
      expect(screen.getByRole('group')).toHaveClass('btn-group-vertical');
      expect(screen.getByText(toggleText1)).toHaveClass('btn');
      expect(screen.getByText(toggleText2)).toHaveClass('btn');
      expect(screen.getByText(toggleText3)).toHaveClass('btn');
    });
  });

  describe('ToggleGroup Sizing', () => {
    test('Default ToggleGroup size', () => {
      render(
        <ToggleGroup name="toggles">
          <Toggle name="toggles" value={1}>
            {toggleText1}
          </Toggle>
          <Toggle name="toggles" value={2}>
            {toggleText2}
          </Toggle>
          <Toggle name="toggles" value={3}>
            {toggleText3}
          </Toggle>
        </ToggleGroup>
      );
      expect(screen.getByRole('group')).toHaveClass('btn-group');
      expect(screen.getByRole('group')).not.toHaveClass('btn-group-lg');
      expect(screen.getByRole('group')).not.toHaveClass('btn-group-sm');
      expect(screen.getByText(toggleText1)).toHaveClass('btn');
      expect(screen.getByText(toggleText2)).toHaveClass('btn');
      expect(screen.getByText(toggleText3)).toHaveClass('btn');
    });

    test('Large ToggleGroup size', () => {
      render(
        <ToggleGroup name="toggles" size="lg">
          <Toggle name="toggles" value={1}>
            {toggleText1}
          </Toggle>
          <Toggle name="toggles" value={2}>
            {toggleText2}
          </Toggle>
          <Toggle name="toggles" value={3}>
            {toggleText3}
          </Toggle>
        </ToggleGroup>
      );
      expect(screen.getByRole('group')).toHaveClass('btn-group');
      expect(screen.getByRole('group')).toHaveClass('btn-group-lg');
      expect(screen.getByText(toggleText1)).toHaveClass('btn');
      expect(screen.getByText(toggleText2)).toHaveClass('btn');
      expect(screen.getByText(toggleText3)).toHaveClass('btn');
    });

    test('Small ToggleGroup size', () => {
      render(
        <ToggleGroup name="toggles" size="sm">
          <Toggle name="toggles" value={1}>
            {toggleText1}
          </Toggle>
          <Toggle name="toggles" value={2}>
            {toggleText2}
          </Toggle>
          <Toggle name="toggles" value={3}>
            {toggleText3}
          </Toggle>
        </ToggleGroup>
      );
      expect(screen.getByRole('group')).toHaveClass('btn-group');
      expect(screen.getByRole('group')).toHaveClass('btn-group-sm');
      expect(screen.getByText(toggleText1)).toHaveClass('btn');
      expect(screen.getByText(toggleText2)).toHaveClass('btn');
      expect(screen.getByText(toggleText3)).toHaveClass('btn');
    });
  });

  describe('ToggleGroup Type', () => {
    test('Default ToggleGroup type', () => {
      const result = render(
        <ToggleGroup name="toggles" size="sm">
          <Toggle name="toggles" value={1}>
            {toggleText1}
          </Toggle>
          <Toggle name="toggles" value={2}>
            {toggleText2}
          </Toggle>
          <Toggle name="toggles" value={3}>
            {toggleText3}
          </Toggle>
        </ToggleGroup>
      );
      expect(
        result.container.querySelectorAll('input[type="radio"]')
      ).toHaveLength(3);
    });

    test('Radio ToggleGroup type', () => {
      const result = render(
        <ToggleGroup name="toggles" size="sm" type="radio">
          <Toggle name="toggles" value={1}>
            {toggleText1}
          </Toggle>
          <Toggle name="toggles" value={2}>
            {toggleText2}
          </Toggle>
          <Toggle name="toggles" value={3}>
            {toggleText3}
          </Toggle>
        </ToggleGroup>
      );
      expect(
        result.container.querySelectorAll('input[type="radio"]')
      ).toHaveLength(3);
    });

    test('Checkbox ToggleGroup type', () => {
      const result = render(
        <ToggleGroup name="toggles" size="sm" type="checkbox">
          <Toggle name="toggles" value={1}>
            {toggleText1}
          </Toggle>
          <Toggle name="toggles" value={2}>
            {toggleText2}
          </Toggle>
          <Toggle name="toggles" value={3}>
            {toggleText3}
          </Toggle>
        </ToggleGroup>
      );
      expect(
        result.container.querySelectorAll('input[type="checkbox"]')
      ).toHaveLength(3);
    });
  });
});
