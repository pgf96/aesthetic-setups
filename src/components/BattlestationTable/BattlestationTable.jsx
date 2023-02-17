import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import * as battlestationsAPI from '../../utilities/battlestations-api'
import AddItemBox from '../AddItemBox/AddItemBox';

export default function BattlestationTable({battlestation, setBattlestation, id,user,setUser}) {

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

    async function handleAddRow(itemData) {
        const newRow = { name: itemData.name, model: itemData.model };
        const newItems = [...battlestation.items, newRow];
        const updatedBattlestation = await battlestationsAPI.updateBattlestationItem(newItems, id)
        setBattlestation(updatedBattlestation)
    }

    async function handleDeleteRow(itemId) {
        const items2 = await battlestationsAPI.deleteBattlestationItem(id,itemId)
        setBattlestation((prevState) => {
            const filteredItems = prevState.items.filter((item) => item._id !== itemId)
            console.log(filteredItems)
            return {
                ...prevState,
                items: filteredItems
            }
        })
    }

    function toggleAddItemBox() {
        setRevealed(prevState => !prevState)
    }

    return (
        <TableContainer >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
                            {user.roles.includes('admin') && <button onClick={() => handleDeleteRow(row._id)}>x&nbsp;</button>}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <button onClick={toggleAddItemBox}> + </button>
            {revealed && <AddItemBox handleAddRow={handleAddRow} />}
        </TableContainer>
        
    );
}