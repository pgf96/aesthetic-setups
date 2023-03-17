import './HomePage.css'
import { useEffect, useState } from 'react';
import * as battlestationsAPI from '../../utilities/battlestations-api'
import HomePageBanner from "../../components/HomePageBanner/HomePageBanner"
import BattlestationList from '../../components/BattlestationList/BattlestationList';
import { Container } from 'react-bootstrap';


const HomePage = () => {
  const [battlestations, setBattlestations] = useState([])
  
  useEffect(function() {
    async function getAllBattlestations() {
      const allBattlestations = await battlestationsAPI.getAll()
      setBattlestations(allBattlestations)
    }
    getAllBattlestations()
  },[])




  return (
    <div className='HomePage'>
      {/* navbar. after they go past a certain vh render it and sticky it to the top */}
      {/* test */}
      <HomePageBanner />
      <Container fluid style={{padding: '0 1vw'}}>

      <BattlestationList battlestations={battlestations}/>
      </Container>
    </div>
  )
}
export default HomePage