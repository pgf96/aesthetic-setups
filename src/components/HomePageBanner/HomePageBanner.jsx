import './HomePageBanner.css'
import { useRef, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';


export default function HomePageBanner() {
    const [isLoaded, setIsLoaded] = useState(false);
    const videoRef = useRef(null);
    const video = 'https://res.cloudinary.com/db6jsod0y/video/upload/v1676061588/Organic_Lines_4K_Motion_Background_Loop_a7sdke.mp4'

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = .75;
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
            <div className='content'
                style={{ opacity: isLoaded ? 1 : 0, 
                transition: 'opacity 1s ease-in-out' }}>
                <h1>Aesthetic Setups </h1>
                <h2>Inspiration taken from the best of r/Battlestations</h2>
            </div>
        </div>




    );
}
