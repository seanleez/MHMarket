import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { rootURL } from '../const/const';

interface IFloorContext {
  listFloors: any[];
  setListFloors: Dispatch<SetStateAction<any[]>>;
  updateListFloors: () => void;
}

const initContextObj = {
  listFloors: [],
  setListFloors: () => {
    // any
  },
  updateListFloors: () => {
    // any
  },
};
const currentUser = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser') as string)
  : null;
const token = currentUser?.access_token;
const marketId = localStorage.getItem('marketId');

export const FloorContext = createContext<IFloorContext>(initContextObj);
export default function FloorContextProvider({ children }: any) {
  const [listFloors, setListFloors] = useState<any[]>([]);

  const updateListFloors = () => {
    fetch(`${rootURL}/markets/${marketId}/floors?draft=true`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.error_code) {
          throw new Error(response.error_description);
        } else {
          setListFloors(response.floors ?? []);
        }
      })
      .catch((err) => console.error(err));
  };

  const passdownValues = {
    listFloors,
    setListFloors,
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
