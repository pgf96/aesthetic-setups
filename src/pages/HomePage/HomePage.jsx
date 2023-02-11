import './HomePage.css'
import HomePageBanner from "../../components/HomePageBanner/HomePageBanner"
import BattleStationList from '../../components/BattleStationList/BattleStationList';

import { battlestations } from '../../data';

const HomePage = () => {
  return (
    <div>
      {/* navbar. after they go past a certain vh render it and sticky it to the top */}

      <HomePageBanner />
      <BattleStationList battlestations={battlestations}/>
        

      <h1>asdf</h1>
    </div>
  )
}
export default HomePage