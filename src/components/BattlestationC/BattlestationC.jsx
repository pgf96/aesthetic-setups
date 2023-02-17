export default function BattlestationC({battlestation}) {

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
