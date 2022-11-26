import React, { useState, useEffect, DragEvent, useRef, ChangeEvent, MouseEvent, useCallback, memo } from 'react';
import { Box, Stack } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { v4 as uuid } from 'uuid';

interface IImageUploader {
  max?: number;  // the maximum file number.
  whiteList?: string[]
}

const toBase64 = (file: File) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

type StoredFile = { data: string, name: string, id: string }

const ImageUploader = ({ max = 1, whiteList = ['image/png', 'image/jpeg'] }: IImageUploader) => {

  const [list, setList] = useState<StoredFile[]>([]);
  const [shouldActive, setShouldActive] = useState(false);
  const input = useRef<null | HTMLInputElement>(null);

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

  //
  const storeFile = async (file: File) => {
    try{
      const base64Data = await toBase64(file);
      if(base64Data === null) {
        throw 'Something went wrong'
      }
      setList(prev => [
        ...prev, 
        { 
          data: base64Data as string, 
          name: file.name, 
          id: uuid()
        }
      ]);
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

  useEffect(() => {
    console.log(list)
  }, [list]);

  const handleDelete = useCallback((id: string) => {
    setList(prev => {
      return prev.filter(file => file.id !== id);
    })
  }, []);

  return (
    <Box  sx={{
      width: '250px',
    }}>
      {/* the drag n drop area */}
      <div 
        style={{ 
          position: 'relative',
          height: '120px',
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
          list.map(file => (
            // <React.Fragment >
              <PreviewRow key={file.id} { ...file } handleDelete={handleDelete} />
            // </React.Fragment>
          ))
        }
      </Box>
    </Box>
  );
};

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