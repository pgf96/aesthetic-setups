import './HomePage.css'
import { useEffect, useState } from 'react';
import * as battlestationsAPI from '../../utilities/battlestations-api'
import HomePageBanner from "../../components/HomePageBanner/HomePageBanner"
import BattlestationList from '../../components/BattlestationList/BattlestationList';
import { useNavigate } from 'react-router-dom';
// import { battlestations } from '../../data';

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
      <HomePageBanner />
      <BattlestationList battlestations={battlestations}/>
    </div>
  )
}
export default HomePage