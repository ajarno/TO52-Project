import React, { useState } from "react";

export const useEffectOnlyOnce = (func) => React.useEffect(func, []);

export function useForceUpdate() {
  // eslint-disable-next-line
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}
