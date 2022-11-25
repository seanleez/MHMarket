import { useSnackbar } from 'notistack';
import { createContext, useState } from 'react';
import marketApis from '../services/marketApis';

interface IFloorContext {
  listFloors: any[];
  updateListFloors: () => void;
}

const initContextObj = {
  listFloors: [],
  updateListFloors: () => {
    // any
  },
};

export const FloorContext = createContext<IFloorContext>(initContextObj);
export default function FloorContextProvider({ children }: any) {
  const [listFloors, setListFloors] = useState<any[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const updateListFloors = () => {
    const marketId = localStorage.getItem('marketId') ?? '';
    (async () => {
      try {
        const res = await marketApis.getMarket(marketId);
        setListFloors((res as any).floors ?? []);
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
  };

  const passdownValues = {
    listFloors,
    updateListFloors,
  };
  return (
    <>
      <FloorContext.Provider value={passdownValues}>
        {children}
      </FloorContext.Provider>
    </>
  );
}
