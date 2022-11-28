import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { Draft } from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import React, { ChangeEvent, forwardRef, memo, useEffect, useImperativeHandle } from 'react';
import { useImmerReducer } from "use-immer";
import { v4 as uuid } from 'uuid';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';


interface IEditableDependentTable {}

type Row = {
  [key: string]: unknown,
  _id: string,
  // index: number,
  name: string,
  age: string
}

type ModifyCase = { _id: string, key: string, value: string }

const reducer = (draft: Draft<Row[]>, action: { type: string, payload?: string | ModifyCase }) => {
  switch (action.type) {
    case 'ADD':
      draft.push({
        _id: uuid(),
        // index: draft.length + 1,
        name: '',
        age: ''
      })
      break;
    
    case 'DEL':
      return draft.filter((row) => row._id !== action.payload)
    
    case 'MOD':
      const row = draft.find((row) => row._id === (action.payload as ModifyCase)._id) as WritableDraft<Row>

      const key = (action.payload as ModifyCase).key;
      const value = (action.payload as ModifyCase).value;

      if((key === 'age' && numberOnly.test(value)) || key === 'name' || value === '') {
        row[(action.payload as ModifyCase).key] = (action.payload as ModifyCase).value;
      }
  }
}

const numberOnly = /^[1-9]+[0-9]*$/;
/* 
  we will use immer to handle the table data

  we only pass the data of table outside (to parent) 
  when submitting the form WITH the syncDataToParent method 
*/
const EditableDependentTable = forwardRef(({  }: IEditableDependentTable, ref) => {

  const [data, dispatch] = useImmerReducer(reducer, [{
    _id: uuid(),
    index: 1,
    name: '',
    age: ''
  }] as Row[])

  // #region table feature methods
  const handleChange = (e: ChangeEvent<HTMLInputElement>, _id: string, key: string) => {
    dispatch({
      type: 'MOD',
      payload: {
        _id,
        key,
        value: e.target.value
      }
    })
  } 

  const handleDelete = (id: string) => {
    dispatch({ type: 'DEL', payload: id })
  }

  const handleAdd = () => {
    dispatch({ type: 'ADD' })
  }
  // #endregion

  // #region methods for parent 
  useImperativeHandle(ref, () => ({
    syncDataToParent(cb: (data: Row[]) => void) {  // is callback style ok? or return data directly ok?
      cb(data);
    }
  }));
  // #endregion


  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ '& th': { fontWeight: 'bold', color: '#4b4b4b' } }}>
            <TableCell></TableCell>
            <TableCell>Name *</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          { 
            data.map((row, index) => (
              <TableRow key={row._id}>

                <TableCell>{ index + 1 }</TableCell>

                <TableCell>
                  <TextField 
                    size='small' 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, row._id, 'name')} 
                    value={row.name}
                  />
                </TableCell>

                <TableCell>
                  <Grid container>
                    <Grid item xs={3}>
                      <TextField 
                        size='small' 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, row._id, 'age')}
                        value={row.age}
                      />
                    </Grid>
                  </Grid>
                </TableCell>

                <TableCell>
                  <CancelPresentationIcon sx={{ color: 'red' }} onClick={() => handleDelete(row._id)} />
                </TableCell>
                
              </TableRow>
            )
          ) }
        </TableBody>

      </Table>
      <Button size='small' color='primary' variant='contained' sx={{ marginTop: '30px' }} onClick={() => handleAdd()} >Add new +</Button>
    </TableContainer>
  );
})

export default memo(EditableDependentTable);