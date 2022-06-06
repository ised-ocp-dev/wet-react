import React from 'react';
import GridRB from 'react-bootstrap/Container';
import '../../style.css';

export interface GridProps extends React.HTMLAttributes<HTMLElement> {
  /** makes container full width of screen, instead of fixed value */
  fluid?: boolean;
  /** The contents of the Grid */
  children?: React.ReactNode;
}

const Grid = ({ fluid = false, children }: GridProps) =>
  fluid ? <GridRB fluid>{children}</GridRB> : <GridRB>{children}</GridRB>;

export default Grid;
