

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
  }, [])

  async function handleDelete() {
    await battlestationsAPI.deleteOne(id)
  }

  async function handleApprove() {
    const approve = await battlestationsAPI.approvePending(battlestation, id)
    setBattlestation(approve)
    navigate('/pending')
  }




  return (
    <div className='BattlestationDetailPage'>
      <Container className='detail'>
        <img className='image' src={battlestation.imageURL} alt="" />
        <ul>
          <BattlestationTable user={user} setUser={setUser} id={id} battlestation={battlestation} setBattlestation={setBattlestation} />
          <li> Link: <a href={battlestation.redditLink}>{battlestation.redditLink}</a></li>
          <li> User: {battlestation.redditUser}</li>
          {battlestation.approved ?
             "": <li style={{color: 'red'}}> "not approved"</li>}
          {/* display approval button if not */}
          {user.roles.includes('admin') && 
          <>
            <button onClick={handleDelete}> Delete </button>  

            <button onClick={handleApprove}> approve </button> : ""

          </>
          }
        </ul>





      </Container>




    </div>
  )
}