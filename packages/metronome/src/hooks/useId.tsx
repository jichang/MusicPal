import { useState } from 'react';

export function useId() {
  const [id] = useState(() => {
    return Date.now();
  });

  return id;
}
