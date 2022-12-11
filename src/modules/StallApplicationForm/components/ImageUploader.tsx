import React, { useState, useEffect, DragEvent, useRef, ChangeEvent, MouseEvent, useCallback, memo, forwardRef, useImperativeHandle } from 'react';
import { Box, Stack } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { v4 as uuid } from 'uuid';
import floorApis from '../../../services/floorApis';
import { useStallData } from '../pages/EditStallApplication';

interface IImageUploader {
  max?: number;  // the maximum file number.
  whiteList?: string[];
  name: string;
}

const toBase64 = (file: File) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

type StoredFile = { data: string, name: string, id: string }

const ImageUploader = forwardRef(({ max = 1, whiteList = ['image/png', 'image/jpeg'], name }: IImageUploader, ref) => {

  const [list, setList] = useState<StoredFile[]>([]);
  const [shouldActive, setShouldActive] = useState(false);
  const input = useRef<null | HTMLInputElement>(null);

  const { commonData, setCommonData } = useStallData();

  const handleActive = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    if(!shouldActive && list.length < max) {
      setShouldActive(true)
    }
  }

  const handleInActive = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    if(shouldActive && list.length < max) {
      setShouldActive(false)
    }
  }

  useEffect(() => {
    if(commonData[name]){
      setList([
        {
          // @ts-ignore
          data: commonData[name] as string, 
          // @ts-ignore
          name: commonData[name], 
          id: uuid()
        }
      ])
    }
  }, []);

  //
  const storeFile = async (file: File) => {
    try{
      // const base64Data = await toBase64(file);
      // if(base64Data === null) {
      //   throw 'Something went wrong'
      // }
      const imageData = new FormData();
      // @ts-ignore
      imageData.append('attachment', file);
      const res = await floorApis.uploadFile(imageData);

      setList(prev => [
        ...prev, 
        { 
          // @ts-ignore
          data: res.pre_signed_url as string, 
          // @ts-ignore
          name: res.content, 
          id: uuid()
        }
      ]);
      setCommonData((draft: { [x: string]: any; }) => {
        // @ts-ignore
        draft[name] = res.pre_signed_url
      });
    } catch (e) {
      console.log(e)
    }
  }
  //


  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    if(list.length < max){
      handleInActive(e);
      // todo
      const { files } = e.dataTransfer
      const file = files[0];
      if(whiteList.includes(file.type)) {
        storeFile(file);
      }
    }
  }

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if(list.length < max){
      input?.current?.click();
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if(files !== null) {
      storeFile(files[0]);
    }
    e.target.value = ''; // clear value to posible select that file again
  }

  const handleDelete = useCallback((id: string) => {
    setList(prev => {
      return prev.filter(file => file.id !== id);
    })
    setCommonData((draft: { [x: string]: string; }) => {
      draft[name] = '';
    })
  }, []);

  useImperativeHandle(ref, () => ({
    syncDataToParent: () => list,
  }))

  return (
    <Box  sx={{
      width: '350px',
    }}>
      {/* the drag n drop area */}
      <div 
        style={{ 
          position: 'relative',
          height: '150px',
          backgroundColor: shouldActive ? '#edf7ff' :'#FAFAFA',
          border: '2px dotted #909090',
          borderRadius: '5px',
          marginBottom: '10px'
        }}
        
        // handle active
        onDragOver={handleActive}
        onDragEnter={handleActive}

        // handle in-active
        onDragLeave={handleInActive}
        
        // handle drop
        onDrop={handleDrop}

        // handle click
        onClick={handleClick}

      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#909090',
            userSelect: 'none',
            cursor: list.length < max ? 'pointer' : 'not-allowed'
          }}
        >{ `Drag and drop file${max !== 1 ? 's' : ''} here` }</Box>
        
        {/* the hidden input */}
        <input 
          ref={input} 
          type='file' 
          style={{ display: 'none' }} 
          onChange={handleChange} 
          accept={whiteList.join(',')}
        />


      </div>
      <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: '150px', overflowY: 'auto' }}>
        {
          list.length === 0 && (
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              border: '2px solid #edf7ff',
              borderRadius: '5px'
            }}>
              No file chosen
            </Box>
          )
        }
        {
          list.map(file => (
            // <React.Fragment >
              <PreviewRow key={file.id} { ...file } handleDelete={handleDelete} />
            // </React.Fragment>
          ))
        }
      </Box>
    </Box>
  );
});

const PreviewRow = memo(
(
  { 
    data, 
    name, 
    id, 
    handleDelete 
  }: StoredFile & { handleDelete: (id: string) => void }
) => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      padding: '8px',
      border: '2px solid #edf7ff',
      borderRadius: '5px'
    }}>
      <img src={data} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
      <Box sx={{ 
        minWidth: 0,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        fontSize: '14px', 
        color: 'blue', 
        fontWeight: 600, 
        flexGrow: 1, 
        padding: '0 10px',
      }}>{name}</Box>
      <DeleteOutlineIcon 
        sx={{
          fontSize: '16px',
          color: 'red',
          cursor: 'pointer'
        }}
        onClick={() => handleDelete(id)} 
      />
    </Box>
  )
})

export default ImageUploader;