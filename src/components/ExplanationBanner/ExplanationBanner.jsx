import './ExplanationBanner.css'
import { Container } from '@mui/material'
import { BsGraphUp } from 'react-icons/bs'

export default function ExplanationBanner() {
    return (
        <Container maxWidth='xl'>
            <div className='explanation-banner'>
                {/* productivity */}
                <div className='productivity-icon'>
                    <BsGraphUp />
                </div>
                <div className='productivity-desc'>
                    <p>productivity</p>
                    <p>asdf</p>
                </div>
                {/* organization */}
                <div className='organization-icon'>
                    <BsGraphUp />
                </div>
                <div className='organization-desc'>
                    <p>organization</p>
                </div>
                {/* creativity */}
                <div className='creativity-icon'>
                    <BsGraphUp />
                </div>
                <div className='creativity-desc'>
                    <p>creativity</p>
                </div>
                {/* comfort */}
                <div className='comfort-icon'>
                    <BsGraphUp />
                </div>
                <div className='comfort-desc'>
                    <p>comfort</p>
                </div>

            </div>
        </Container>
    )
}