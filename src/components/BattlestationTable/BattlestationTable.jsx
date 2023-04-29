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
import { MdDeleteForever } from 'react-icons/md'
import { BiMessageAltAdd } from 'react-icons/bi'
import './BattlestationTable.css'

export default function BattlestationTable({ battlestation, user, handleDeleteItem, handleAddItem, tableWidth }) {

    const [rows, setRows] = useState([])
    const [revealed, setRevealed] = useState(false)
    const [itemColumnWidth, setItemColumnWidth] = useState(0)

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: 'rgb(1, 6, 10)',
            color: 'rgb(191,192,219)',
            // controls the heading border
            borderBottom: '1px solid red',
            border: 0,
        },
        [`&.${tableCellClasses.body}`]: {
            borderBottom: '3px solid rgb(56,66,84)',
            color: 'rgba(153,164,185,1)',
            fontSize: 13.3,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {

        },
        '&:nth-of-type(even)': {
            color: 'red',
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
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

    useEffect(() => {
        const newColumnWidth = parseInt(tableWidth * .30)
        setItemColumnWidth(newColumnWidth)
        console.log(newColumnWidth)

    },[tableWidth])

    async function handleDeleteRow(itemId) {
        await handleDeleteItem(itemId)
    }

    function toggleAddItemBox() {
        setRevealed(prevState => !prevState)
    }


    return (
        <TableContainer className='item-table-container' 
            sx={{ 
                border: '1px solid rgba(41, 49, 58)', 
                borderRadius: 4,
                minHeight: 500,

            }}
            >
            <Table className='thetable' sx={{ 
                width: tableWidth
                }}>
                <TableHead>
                    <TableRow>
                        {/* the column without a defined width is given the remainder of the table width */}
                        <StyledTableCell
                            style={{
                                width: itemColumnWidth,
                                fontSize: '1.3rem',
                                fontWeight: 500,
                            }}>
                            Item
                        </StyledTableCell>
                        <StyledTableCell
                            style={{
                                fontSize: '1.3rem',
                            }}
                            align="right">
                            Model&nbsp;</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row._id}>
                            {/* <StyledTableCell> o </StyledTableCell> */}
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.model}&nbsp;
                                {/* if there is a user and the user is an admin */}
                                {/* {user && user.roles.includes('admin') && <button onClick={() => handleDeleteItem(row._id)}>x&nbsp;</button>} */}
                                {(user && (user.roles.includes('admin') || (user.roles.includes('guest') && battlestation._id === '63f662e91b6e69d4961170b6'))) && (
                                    <Button className='delete-button' onClick={() => handleDeleteRow(row._id)}>
                                        {<MdDeleteForever />}&nbsp;
                                    </Button>
                                )}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            {/* add item button
            {!user && <button disabled style={{ color: 'white', borderRadius: '7px', display: 'flex', margin: '0 auto' }}> login to add item</button>} */}
            {/* if there is a user display the add item button */}
            {user && <Button className='add-button' onClick={toggleAddItemBox}> <BiMessageAltAdd /> </Button>}
            {revealed && <AddItemBox tableWidth={tableWidth} handleAddItem={handleAddItem} />}
        </TableContainer>

    );
}