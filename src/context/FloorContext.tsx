import { createContext } from 'react';

interface IFloorContext {
  listFloors: any[];
}

const initContextObj = {
  listFloors: [],
};

export const FloorContext = createContext<IFloorContext>(initContextObj);
export default function FloorContextProvider({ children }: any) {
  const passdownValues = {
    listFloors: ['1', '3'],
  };
  return (
    <>
      <FloorContext.Provider value={passdownValues}>
        {children}
      </FloorContext.Provider>
    </>
  );
}
