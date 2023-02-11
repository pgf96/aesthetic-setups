import { ImageList, ImageListItem } from "@mui/material"

export default function BattleStationCard({battlestations}) {
  return (
    <div>
      <ImageList variant="masonry" cols={3} gap={30}>
        {battlestations.map((battlestation) => (
          <ImageListItem key={battlestation.url}>
            <img
              src={`${battlestation.image}?w=220&fit=crop&auto=format`}
              srcSet={`${battlestation.image}?w=220&fit=crop&auto=format&dpr=2 2x`}
              alt={""}
              loading="lazy"
            />
            {/* if map idx +1 or idx+2 return none stop */}
          </ImageListItem> 
        ))}
      </ImageList>

    </div>
  )
}