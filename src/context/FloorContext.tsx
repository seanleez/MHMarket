import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface IFloorContext {
  listFloors: any[];
  setListFloors: Dispatch<SetStateAction<any[]>>;
}

const initContextObj = {
  listFloors: [],
  setListFloors: () => {
    // any
  },
};

export const FloorContext = createContext<IFloorContext>(initContextObj);
export default function FloorContextProvider({ children }: any) {
  const [listFloors, setListFloors] = useState<any[]>([]);

  const passdownValues = {
    listFloors,
    setListFloors,
  };
  return (
    <>
      <FloorContext.Provider value={passdownValues}>
        {children}
      </FloorContext.Provider>
    </>
  );
}
