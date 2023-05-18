import './HomePageBanner.css'
import { useRef, useEffect, useState } from 'react';
import { Container } from '@mui/material';

export default function HomePageBanner() {
    const [isLoaded, setIsLoaded] = useState(false);
    const videoRef = useRef(null);
    const video = 'https://res.cloudinary.com/db6jsod0y/video/upload/q_50/v1676621248/pexels-rostislav-uzunov-7670836_2_vodywu.mp4'


    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = .89;
            setTimeout(() => {
                setIsLoaded(true)
            }, 100)
        }
    }, []);



    return (
        <div className='banner'>
            <video ref={videoRef} src={video} autoPlay loop muted
                style={{ opacity: isLoaded ? 1 : 0, 
                transition: 'opacity 1s ease-in-out' }}/>
            <div className='cover' ></div>
            <Container>
                <div className='content'
                    style={{ opacity: isLoaded ? 1 : 0, 
                    transition: 'opacity 1s ease-in-out' }}>
                    <h1>Discover Share Inspire</h1>
                    <h2> <span className='accenuate'>Simplify your search </span> to find the right accessories for your perfect workspace and <span className='accenuate'>showcase inspirational designs</span>. Inspiration drawn from the best of r/Battlestations.</h2>
                    <h2>Inspiration drawn  from the best of r/Battlestations</h2>
                    <h2>Inspiration drawn from the best of r/Battlestations </h2>
                </div>
            </Container>
        </div>




    );
}
