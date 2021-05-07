import { useEffect, useState, useRef } from "react";


// 重写 useState + callback
export const useCallbackState = (state: any) => {
  const cbRef: any = useRef();
  const [data, setData] = useState(state);

  useEffect(() => {
    cbRef.current && cbRef.current(data);
  }, [data]);

  return [data, function (val: any, callback: Function) {
    cbRef.current = callback;
    setData(val);
  }];
}
