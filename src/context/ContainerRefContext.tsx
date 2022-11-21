import React, { useRef } from 'react';
import { createContext } from 'vm';

interface IContainerContext {
  containerRef: React.RefObject<HTMLDivElement>;
}

const initObj = {
  containerRef: React.createRef() as any,
};

export const ContainerContext = React.createContext<IContainerContext>(initObj);
export default function ContainerContextProvider({ children }: any) {
  const containerRef = useRef(null);
  const passdownValues = {
    containerRef,
  };
  return (
    <>
      <ContainerContext.Provider value={passdownValues}>
        {children}
      </ContainerContext.Provider>
    </>
  );
}
