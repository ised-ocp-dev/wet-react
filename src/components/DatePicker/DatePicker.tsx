import React from 'react';
import '../../style.css';

/** Types */
export interface DatePickerProps
  extends React.HTMLAttributes<HTMLInputElement> {
  /** Name of value. */
  name?: string;
  /** Id to link with a label. */
  id?: string;
  /** Minimum date available for selection. String format: yyyy-mm-dd */
  min?: string;
  /** Maximum date available for selection. String format: yyyy-mm-dd */
  max?: string;
}

const DatePicker = ({ id, name, min, max, ...rest }: DatePickerProps) => (
  <input
    type="date"
    className="form-control"
    name={name}
    id={id}
    min={min}
    max={max}
    {...rest}
  />
);

export default DatePicker;
