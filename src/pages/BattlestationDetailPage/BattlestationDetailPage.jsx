

import './BattlestationDetailPage.css'
import { useParams } from "react-router-dom"
import { useRef } from 'react'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import * as battlestationsAPI from '../../utilities/battlestations-api'
import * as itemsAPI from '../../utilities/items-api'
import { Container } from 'react-bootstrap'
import BattlestationTable from '../../components/BattlestationTable/BattlestationTable'
import ImageTagger from '../../components/ImageTagger/ImageTagger'

export default function BattlestationDetailPage({user, setUser}) {
  const [battlestation, setBattlestation] = useState({})
  const [clickCoordinates, setClickCoordinates] = useState([]);

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(function () {
    async function getById() {
      const battlestation = await battlestationsAPI.getById(id)
      setBattlestation(battlestation)
    }
    getById()    
  }, [])

  async function handleDelete() {
    await battlestationsAPI.deleteOne(id)
    navigate('/')
  }

  async function handleApprove() {
    const approve = await battlestationsAPI.approvePending(battlestation, id)
    setBattlestation(approve)
    navigate('/pending')
  }

  async function handleDeleteItem(itemId) {
    await itemsAPI.deleteItem(id, itemId)
    setBattlestation((prevData) => {
      const itemList = prevData.items.filter((item) => item._id !== itemId)
      return {
          ...prevData,
          items: itemList
      }})
  }

  async function handleAddItem(itemData) {
    const newItemList = await itemsAPI.addItem(itemData, id)
    setBattlestation(prevData => ({
      ...prevData, 
      items: newItemList
    }))
  }

  async function handleUpdateAllItemPositions(itemPositions) {
    // console.log(itemPositions)
    const updatedItems = await itemsAPI.updateAllItemPositions(id, itemPositions)
    console.log(updatedItems)
    setBattlestation(prevData => ({...prevData, items:updatedItems.items}))
    
  }
  
  const svgRef = useRef(null)



  return (
    <div className='BattlestationDetailPage'>
      <Container className='detail'>  
        {/* <img className='image' ref={svgRef} src={battlestation.imageURL} alt="" /> */}
        <ImageTagger battlestation={battlestation} handleUpdateAllItemPositions={handleUpdateAllItemPositions}/>
        <ul>
          <BattlestationTable user={user} battlestation={battlestation} handleDeleteItem={handleDeleteItem} handleAddItem={handleAddItem}/>
          <li> Link: <a href={battlestation.redditLink}>Click </a></li>
          <li> User: {battlestation.redditUser}</li>
          {battlestation.approved ?
             "": <li style={{color: 'red'}}> "not approved"</li>}
          {/* display approval button if not */}
          {user && user.roles.includes('admin') && 
          <>
            <button onClick={handleDelete}> Delete </button>  
            {battlestation.approved === !true &&
            <button onClick={handleApprove}> approve </button> 
            }
          </>
          }
        </ul>
      </Container>
    </div>
  )
}