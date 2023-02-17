import { ImageList, ImageListItem } from "@mui/material"
import { Link } from "react-router-dom"

export default function BattlestationCard({battlestation}) {

  return (
    <div>
    <Link to={`/battlestations/${battlestation._id}`}>
      <ImageListItem key={battlestation.redditLink}>
        <img
          style={{borderRadius:10}}
          src={`${battlestation.imageURL}?w=220&fit=crop&auto=format`}
          srcSet={`${battlestation.imageURL}?w=220&fit=crop&auto=format&dpr=2 2x`}
          alt={""}
          loading="lazy"
        />
      </ImageListItem>
      </Link>
    </div>

  )
}