import React from 'react';
import '../../style.css';
import './Toggle.css';
import ToggleButtonRB from 'react-bootstrap/ToggleButton';

/** Types */
type typeType = 'checkbox' | 'radio' | undefined;

type variantType =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | undefined;

export interface ToggleProps extends React.HTMLAttributes<HTMLElement> {
  /** Content of the toggle */
  children?: React.ReactNode;
  /** Is the toggle checked */
  checked?: boolean;
  /** Is the toggle disabled */
  disabled?: boolean;
  /** Required for button clicks to toggle the input */
  id?: string;
  /** Name of HTML input used to group like checkbox or radio toggles together */
  name?: string;
  /** A callback fired when the value prop changes */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** The type of toggle */
  type?: typeType;
  /** Value associated with the toggle. It should be unique amongst siblings nested in a ToggleGroup */
  value: string | number | readonly string[];
  /** The styling variant of the toggle */
  variant?: variantType;
}

const Toggle = ({
  children,
  variant = 'default',
  checked = false,
  disabled = false,
  id,
  name,
  onChange,
  type,
  value,
  ...rest
}: ToggleProps) => (
  <ToggleButtonRB
    variant={variant}
    checked={checked}
    disabled={disabled}
    id={id}
    name={name}
    onChange={onChange}
    type={type}
    value={value}
    {...rest}
  >
    {children}
  </ToggleButtonRB>
);

export default Toggle;
