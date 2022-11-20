import React from 'react';
import { useImmerReducer } from "use-immer";

// we will use immer to handle the table data

// we only pass the data of table when submitting 

interface IEditableTable {
  initial: unknown
  onSync: (data: unknown) => void
}

function EditableTable({ initial, onSync }: IEditableTable) {

  const [data, dispatch] = useImmerReducer((draft, action) => {

  }, initial)

  return (
    <div>
      
    </div>
  );
}

export default EditableTable;