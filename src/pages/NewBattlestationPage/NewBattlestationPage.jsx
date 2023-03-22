import './NewBattlestationPage.css'
import { Container } from "react-bootstrap";
import NewBattlestationForm from "../../components/NewBattlestationForm/NewBattlestationForm"
import { useNavigate } from "react-router-dom";
import * as battlestationsAPI from '../../utilities/battlestations-api'

export default function NewBattlestationPage() {

  const navigate = useNavigate()

  async function handleAddNewBattlestation(formData) {
    await battlestationsAPI.addBattlestation(formData)
    navigate('/')
    // alert('submitted')
  }

  return (
    <div className="NewBattlestationPage">
      <Container>
        <NewBattlestationForm handleAddNewBattlestation={handleAddNewBattlestation} />
      </Container>
    </div>
  )
}