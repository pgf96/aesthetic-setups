import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function AddItemBox({handleAddItem}) {
    const [itemData, setItemData] = useState({
        name: '',
        model: ''
    })

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
        '& > :not(style)': { m: 1, width: '25ch', color: 'black'},
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" name='name' value={itemData.name} label="name" variant="outlined" onChange={handleChange}/>
      <TextField id="outlined-basic" name='model' value={itemData.model} label="model" variant="outlined" onChange={handleChange}/>
      <button onClick={handleSubmit}>submit</button>
    </Box>
  );
}