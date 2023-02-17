import { ImageList, ImageListItem } from "@mui/material"
import './BattlestationList.css'
import { Link } from "react-router-dom"
import BattlestationCard from "../BattlestationCard/BattleStationCard"



export default function BattlestationList({battlestations}) {

  return (
    <div className="BattlestationList">
      <ImageList variant="masonry" cols={3} gap={20}>
        {battlestations ? battlestations.map((battlestation) => (
          <BattlestationCard battlestation={battlestation} key={battlestation._id}/>
        )):
        <h1>
          nothing to display
        </h1>
        }
      </ImageList>

    </div>
  )
}