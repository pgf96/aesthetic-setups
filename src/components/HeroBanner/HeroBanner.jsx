import './HeroBanner.css'
import Spline from '@splinetool/react-spline';
import { Container } from '@mui/material';
import { Slide } from 'react-slideshow-image';
import NextArrow from '../NextArrow/NextArrow';
import 'react-slideshow-image/dist/styles.css'



export default function HeroBanner() {
  return (
    <Container maxWidth='xl'>
      <div className='hero-banner'>
        <div className='heading-container'>
        <div className='heading'>
          <h1>Find Your <br /> <span className='color'>Aesthetic</span></h1>
        </div>
        </div>
        <div className='description'>
          {/* <p>Simplify your search to find the right accessories for your workspace and showcase inspirational designs. <br></br>Inspiration drawn from the best of r/Battlestations. */}
          {/* <p>Simplify your search for workspace accessories. <br />
            Showcase inspirational designs. <br />
            Find your <span className='accenuate'> aesthetic.</span> <br />
            <span className='inspiration'>
            Concept inspired by subreddit r/battlestations.
          </span>
          </p> */}
          <p>Streamline your search for workspace accessories with our collection of labeled setups. Join our community of enthusiasts and showcase your inspirational designs.<br />
            <span className='inspiration'>
            Concept inspired by subreddit r/battlestations.
          </span>
          </p>

        </div>
        <div className="img-container">
          <div className="img-wrapper">
            <img src="https://res.cloudinary.com/db6jsod0y/image/upload/q_10/v1683654118/first_2_jxstte.webp"alt=''></img>
            <img src="https://res.cloudinary.com/db6jsod0y/image/upload/q_40/v1683654118/first_1_uy2dq1.webp" alt=''></img>
            <img src="https://res.cloudinary.com/db6jsod0y/image/upload/q_10/v1683656023/2-1_fpuseb.webp" alt=''></img>
            <img src="https://res.cloudinary.com/db6jsod0y/image/upload/q_40/v1683656022/2-2_voefky.jpg" alt=''></img>
            <img src="https://res.cloudinary.com/db6jsod0y/image/upload/q_10/v1683656197/3-1_jfx2zk.jpg" alt=''></img>
            <img src="https://res.cloudinary.com/db6jsod0y/image/upload/q_40/v1683656197/3-2_y4omch.jpg" alt=''></img>
            <img src="https://res.cloudinary.com/db6jsod0y/image/upload/q_10/v1683654118/first_2_jxstte.webp" alt=''></img>
          </div>
        </div>
        <div className='static-bottom'>
        <NextArrow></NextArrow>
      </div>
      </div>

    </Container>
  )
}