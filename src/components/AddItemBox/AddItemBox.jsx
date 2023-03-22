import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import {AiOutlineCheckCircle} from 'react-icons/ai'
import { Button } from '@mui/material';
import './AddItemBox.css'
import { useMediaQuery } from 'react-responsive'

export default function AddItemBox({handleAddItem, tableWidth}) {
    const [itemData, setItemData] = useState({
        name: '',
        model: ''
    })

    const smallViewport = useMediaQuery({query: '(max-width: 480px)'})

    function handleChange(e) {
        setItemData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }
    
    async function handleSubmit(e) {
        e.preventDefault()
        handleAddItem(itemData)
        setItemData(prevData => ({
            ...prevData,
            'name':'',
            'model':''
        }))

    }

  return (
    <Box
      component="form"
      sx={{color: 'black',
        '& > :not(style)': { m: .75, width: smallViewport ? '140px': '200px', color: 'black'},
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" name='name' value={itemData.name} label="name" variant="outlined" onChange={handleChange}/>
      <TextField id="outlined-basic" name='model' value={itemData.model} label="model" variant="outlined" onChange={handleChange}/>
      {/* <br /> */}
      <button className='submit-button' onClick={handleSubmit}> <AiOutlineCheckCircle /> </button>
    </Box>
  );
}