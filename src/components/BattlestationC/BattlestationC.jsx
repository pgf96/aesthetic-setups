import { Link } from "react-router-dom"
import { ImageListItem } from "@mui/material"
export default function BattlestationC({battlestation}) {

  function handleOnClick() {
    // console.log('wuuuuuuuuut')
  }

  return (
    <div onClick={handleOnClick}>
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
