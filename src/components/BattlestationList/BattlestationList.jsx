import { ImageList, ImageListItem } from "@mui/material"
import './BattlestationList.css'
// import BattlestationCard from "../BattlestationCard/BattlestationCard"
import BattlestationC from "../BattlestationC/BattlestationC"
import useMediaQuery from "@mui/material/useMediaQuery"

export default function BattlestationList({battlestations}) {
  
  const twoCols = useMediaQuery('(max-width:1000px)')

  return (
    <div className="BattlestationList">
      <ImageList classname="image-list" variant="masonry" cols={twoCols ? 2: 3} gap={20}>
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