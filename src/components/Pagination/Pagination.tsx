import React from 'react';
import PaginationRB from 'react-bootstrap/Pagination';
import '../../style.css';

/** Types */
type sizingType = 'lg' | 'sm' | undefined;

export interface PaginationProps {
  /** Page options */
  children?: React.ReactNode;
  /** The custom 'non-default' size of pagination button group */
  size?: sizingType;
}

const Pagination = ({ children, size = undefined }: PaginationProps) => {
  const sizeName =
    size === 'lg' ? 'pagination-lg' : size === 'sm' ? 'pagination-sm' : '';
  return (
    <PaginationRB className={`pagination ${sizeName}`}>{children}</PaginationRB>
  );
};
Pagination.displayName = 'Pagination';

export default Pagination;
