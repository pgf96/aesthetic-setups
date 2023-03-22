import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import AddItemBox from '../AddItemBox/AddItemBox';
import { Button } from '@mui/material';
import {MdDeleteForever} from 'react-icons/md'
import {BiMessageAltAdd} from 'react-icons/bi'
import './BattlestationTable.css'

export default function BattlestationTable({battlestation, user, handleDeleteItem, handleAddItem, tableWidth}) {

    const [rows, setRows] = useState([])
    const [revealed, setRevealed] = useState(false)

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            // backgroundColor: 'gray',
            // table header text color
            color: 'white',
        },
        [`&.${tableCellClasses.body}`]: {
            color: 'white',
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            // backgroundColor: 'gray',
            color: 'white',
            border: 0,
        },
        '&:nth-of-type(even)': {
            // backgroundColor: 'gray',
            border: 0,
            color: 'white',
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
            // backgroundColor: 'gray'
        },
    }));

    function createData(name, model) {
        return { name, model };
    }


    useEffect(() => {
        if (battlestation && battlestation.items) {
            const items = battlestation.items;
            const rows = items.map((item) => createData(item.name, item.model, item._id));
            setRows(battlestation.items);
        }
    }, [battlestation]);

    async function handleDeleteRow(itemId) {
        await handleDeleteItem(itemId)
    }

    function toggleAddItemBox() {
        setRevealed(prevState => !prevState)
    }

    return (
        <TableContainer sx={{ minHeight: 500}}>
            <Table sx={{ width: tableWidth }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Item </StyledTableCell>
                        <StyledTableCell align="right">model&nbsp;</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row._id}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.model}&nbsp;
                            {/* if there is a user and the user is an admin */}
                            {/* {user && user.roles.includes('admin') && <button onClick={() => handleDeleteItem(row._id)}>x&nbsp;</button>} */}
                            {user && (user.roles.includes('admin')|| user.roles.includes('guest')) && <Button className='delete-button' onClick={() => handleDeleteRow(row._id)}>{<MdDeleteForever/>}&nbsp;</Button>}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            {!user && <button disabled style={{color: 'white', borderRadius: '7px', display: 'flex', margin:'0 auto'}}> login to add item</button>}
            {/* if there is a user display the add item button */}
            {user && <Button className='add-button' onClick={toggleAddItemBox}> <BiMessageAltAdd /> </Button> }
            {revealed && <AddItemBox tableWidth={tableWidth} handleAddItem={handleAddItem} />}
        </TableContainer>
        
    );
}