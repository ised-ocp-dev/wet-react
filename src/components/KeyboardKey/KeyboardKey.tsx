import React from 'react';
import '../../style.css';

export interface KeyboardKeyProps extends React.HTMLAttributes<HTMLElement> {
  /** the key being displayed */
  keyValue?: string;
  /** optional hidden description of key, for screen readers */
  description?: string;
}

const KeyboardKey = ({ keyValue = '', description = '' }: KeyboardKeyProps) =>
  keyValue === '' ? null : description === '' ? (
    <p>
      <kbd>{keyValue}</kbd>
    </p>
  ) : (
    <p>
      <kbd>
        <abbr title={description}>{keyValue}</abbr>
      </kbd>
    </p>
  );

export default KeyboardKey;
