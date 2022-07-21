import React from 'react';
import ToggleButtonGroupRB from 'react-bootstrap/ToggleButtonGroup';
import '../../style.css';

/** Types */
type typeType = 'checkbox' | 'radio';
type sizingType = 'lg' | 'sm';
type onChangeRadio = (value: string | number, event: unknown) => void;
type onChangeCheckbox = (value: string[] | number[]) => void;

declare type BaseToggleGroupProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  'toggle' | 'defaultValue' | 'onChange'
>;

export interface ToggleGroupProps extends BaseToggleGroupProps {
  /** The input type of the rendered toggles. Determines the toggle behavior */
  type?: typeType;
  /** Content of the toggle group */
  children?: React.ReactNode;
  /** The HTML input name for each child toggle. Required if type is set to radio */
  name?: string;
  /** The custom 'non-default' toggle size that you would like */
  size?: sizingType;
  /** Orientation of the toggle group */
  vertical?: boolean;
  /** The value, or array of values, of the active (pressed) toggles. Controlled by onChange, and the initial prop is defaultValue */
  value?: string | number | string[] | number[];
  /** Initial prop of value */
  defaultValue?: string | number | string[] | number[];
  /** Callback fired when a toggle is pressed. Called with the active value if type is 'radio', or an array of active values if type is 'checkbox' */
  onChange?: onChangeCheckbox | onChangeRadio;
}

const ToggleGroup = ({
  children,
  name,
  size,
  value,
  defaultValue,
  onChange,
  type = 'radio',
  vertical = false,
  ...rest
}: ToggleGroupProps) => {
  if (type === 'radio' && name) {
    return (
      <ToggleButtonGroupRB
        name={name}
        size={size}
        type="radio"
        vertical={vertical}
        defaultValue={
          defaultValue && !Array.isArray(defaultValue)
            ? defaultValue
            : undefined
        }
        value={value && !Array.isArray(value) ? value : undefined}
        onChange={onChange as onChangeRadio}
        {...rest}
      >
        {children}
      </ToggleButtonGroupRB>
    );
  }

  return (
    <ToggleButtonGroupRB
      name={name}
      size={size}
      type="checkbox"
      vertical={vertical}
      defaultValue={
        defaultValue && Array.isArray(defaultValue) ? defaultValue : undefined
      }
      value={value && Array.isArray(value) ? value : undefined}
      onChange={onChange as onChangeCheckbox}
      {...rest}
    >
      {children}
    </ToggleButtonGroupRB>
  );
};

export default ToggleGroup;
