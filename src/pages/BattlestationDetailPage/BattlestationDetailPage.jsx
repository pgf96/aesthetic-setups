

import './BattlestationDetailPage.css'
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import * as battlestationsAPI from '../../utilities/battlestations-api'
import { Container } from 'react-bootstrap'
import BattlestationTable from '../../components/BattlestationTable/BattlestationTable'

export default function BattlestationDetailPage({user, setUser}) {
  const [battlestation, setBattlestation] = useState({})
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(function () {
    async function getById() {
      const battlestation = await battlestationsAPI.getById(id)
      setBattlestation(battlestation)
    }
    getById()    
  }, [id])

  async function handleDelete() {
    await battlestationsAPI.deleteOne(id)
  }

  async function handleApprove() {
    if (user.roles.includes('admin')) {
      alert('approved')
    } else {
      alert('not authorized')
    }

  }




  return (
    <div className='BattlestationDetailPage'>
      <Container className='detail'>
        <img className='image' src={battlestation.imageURL} alt="" />
        <ul>
          <BattlestationTable user={user} setUser={setUser} id={id} battlestation={battlestation} setBattlestation={setBattlestation} />
          <li> Link: {battlestation.redditLink}</li>
          <li> User: {battlestation.redditUser}</li>
          {battlestation.approved ?
            <li> "approved"</li> : <li> "not approved"</li>}
          {/* display approval button if not */}
          {user.roles.includes('admin') && 
          <>
            <button onClick={handleDelete}> Delete </button>  
            <button onClick={handleApprove}> approve </button>
          </>
          }
        </ul>





      </Container>




    </div>
  )
}