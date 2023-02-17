import { useState } from "react"
import './AuthPage.css';
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";


const Authpage = ({setUser}) => {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <main className="AuthPage">
      {showLogin ? 
      <LoginForm setUser ={setUser} setShowLogin={setShowLogin} showLogin={showLogin}/> 
      : 
      <SignUpForm setUser ={setUser} setShowLogin={setShowLogin} showLogin={showLogin}/>}
    </main>
  )
}
export default Authpage