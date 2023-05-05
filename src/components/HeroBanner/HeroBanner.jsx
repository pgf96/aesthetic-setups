import './HeroBanner.css'
import Spline from '@splinetool/react-spline';
import { Container } from '@mui/material';



export default function HeroBanner() {
  return (
    <Container maxWidth='xl'>
      <div className='hero-banner'>
        <div className='heading-words'>
          <h1>Discover. Share.<br /> <span className='color'> Inspire. </span></h1>
        </div>
        <div className='description'>
          {/* <p>Simplify your search to find the right accessories for your workspace and showcase inspirational designs. <br></br>Inspiration drawn from the best of r/Battlestations. */}
          <p>Simplify your search for workspace accessories. <br/>
          Showcase inspirational designs. <br />
          Find your <span className='accenuate'> aesthetic.</span><br />
          </p>
        </div>
      </div>
    </Container>
  )
}