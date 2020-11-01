import React from "react";

export const useEffectOnlyOnce = (func) => React.useEffect(func, []);