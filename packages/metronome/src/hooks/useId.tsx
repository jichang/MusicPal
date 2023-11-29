import { getId } from '@musicpal/common';
import { useState } from 'react';

export function useId() {
  const [id] = useState(() => {
    return getId();
  });

  return id;
}
