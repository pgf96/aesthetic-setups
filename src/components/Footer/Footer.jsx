import { Container } from 'react-bootstrap'
import './Footer.css'
import {FaLinkedinIn, FaGithub} from "react-icons/fa";

export default function Footer() {
    return (
        <Container fluid className='footer-container'>
            <footer className="footer-bs">
                <div className="row">
                    {/* <div class="col-md-2 footer-brand animated fadeInLeft">
                        <img className='logo-footer' src='https://res.cloudinary.com/db6jsod0y/image/upload/v1676591418/The_world_studios-removebg-preview_p1rfcf.png'></img>
                    </div> */}
                    <div class="col-md-5 footer-social animated fadeInDown">
                        <h4>Contact Me</h4>
                        <ul>
                            <li><a href="https://www.linkedin.com/in/patrickfeliciano/"><FaLinkedinIn /> </a></li>
                            <li><a href="https://github.com/pgf96"><FaGithub /></a></li>
                        </ul>
                    </div>
                    {/* <div class="col-md-3 footer-ns animated fadeInRight">
                        <h4>Newsletter</h4>
                        <p>A rover wearing a fuzzy suit doest alarm the real penguins</p>
                        <p>
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Search for..." />
                                <span class="input-group-btn">
                                    <button class="btn btn-default" type="button"><span class="glyphicon glyphicon-envelope"></span></button>
                                </span>
                            </div>
                        </p>
                    </div> */}
                </div>
            </footer>
        </Container>
    )
}