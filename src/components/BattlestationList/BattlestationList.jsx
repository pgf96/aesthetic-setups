import { ImageList, ImageListItem } from "@mui/material"
import './BattlestationList.css'
// import BattlestationCard from "../BattlestationCard/BattlestationCard"
import BattlestationC from "../BattlestationC/BattlestationC"

export default function BattlestationList({battlestations}) {

  return (
    <div className="BattlestationList">
      <ImageList variant="masonry" cols={3} gap={20}>
        {battlestations ? battlestations.map((battlestation) => (
          <BattlestationC battlestation={battlestation} key={battlestation._id}/>
        )):
        <h1>
          nothing to display
        </h1>
        }
      </ImageList>

    </div>
  )
}