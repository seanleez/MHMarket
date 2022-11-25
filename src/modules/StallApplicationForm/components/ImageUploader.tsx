import React, { useState, useEffect, DragEvent, useRef, ChangeEvent, MouseEvent } from 'react';
import { Box } from '@mui/material';
import { Stack } from '@mui/system';

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

const ImageUploader = ({ max = 1, whiteList = ['image/png', 'image/jpeg'] }: IImageUploader) => {

  const [list, setList] = useState<string[]>([]);
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
      setList(prev => [...prev, base64Data as string]);
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

  return (
    <Box  sx={{
      width: '250px',
    }}>
      {/* the drag n drop area */}
      <div 
        style={{ 
          position: 'relative',
          width: '100%',
          height: '120px',
          backgroundColor: shouldActive ? '#edf7ff' :'#FAFAFA',
          border: '2px dotted #909090',
          borderRadius: '5px'
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

        <Stack spacing={1}>
          {/* {
            list.map(data => (
              <></>
            ))
          } */}
        </Stack>

      </div>
    </Box>
  );
};

// const 

export default ImageUploader;