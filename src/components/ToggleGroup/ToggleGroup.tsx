import React from 'react';
import '../../style.css';
import ToggleButtonGroupRB from 'react-bootstrap/ToggleButtonGroup';

type typeType = 'checkbox' | 'radio' | undefined;
type sizingType = 'lg' | 'sm' | undefined;

export interface ToggleGroupProps extends React.HTMLAttributes<HTMLElement> {
  /** Content of the toggle group */
  children?: React.ReactNode;
  /** The HTML input name for each child toggle. Required if type is set to radio */
  name?: string;
  /** The custom 'non-default' toggle size that you would like */
  size?: sizingType;
  /** The type of toggles inside the toggle group */
  type?: typeType;
  /** Orientation of toggle group */
  isVertical?: boolean;
}

const ToggleGroup = ({
  children,
  name,
  size,
  type = 'radio',
  isVertical = false,
  ...rest
}: ToggleGroupProps) => (
  <ToggleButtonGroupRB
    name={name}
    size={size}
    type={type}
    vertical={isVertical}
    {...rest}
  >
    {children}
  </ToggleButtonGroupRB>
);

export default ToggleGroup;
