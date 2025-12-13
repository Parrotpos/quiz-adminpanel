import { useCallback, useState } from "react";

export const useBoolean = (defaultVal = false) => {
  const [bool, setBool] = useState<boolean>(defaultVal);

  const onTrue = useCallback(() => {
    setBool(true);
  }, []);

  const onFalse = useCallback(() => {
    setBool(false);
  }, [setBool]);

  return {
    bool,
    onTrue,
    onFalse,
    setBool,
  };
};
