import './HomePage.css'
import { useEffect, useState } from 'react';
import * as battlestationsAPI from '../../utilities/battlestations-api'
import HomePageBanner from "../../components/HomePageBanner/HomePageBanner"
import BattlestationList from '../../components/BattlestationList/BattlestationList';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import ExplanationBanner from '../../components/ExplanationBanner/ExplanationBanner';
import { Container } from 'react-bootstrap';


const HomePage = () => {
  const [battlestations, setBattlestations] = useState([])

  useEffect(function () {
    async function getAllBattlestations() {
      const allBattlestations = await battlestationsAPI.getAll()
      shuffle(allBattlestations)
      setBattlestations(allBattlestations)
    }
    // randomize
    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }



    getAllBattlestations()
  }, [])






  return (
    <div className='HomePage'>
      {/* navbar. after they go past a certain vh render it and sticky it to the top */}
      {/* test */}
      <HomePageBanner />
      <HeroBanner />
      <ExplanationBanner />


      <Container fluid style={{ padding: '0 1vw' }}>
        <BattlestationList battlestations={battlestations} />
      </Container>
    </div>
  )
}
export default HomePage