import { useState } from "react"
import './NewBattlestationPage.css'
import { Container } from "react-bootstrap";
import NewBattlestationForm from "../../components/NewBattlestationForm/NewBattlestationForm"

export default function NewBattlestationPage() {
  return (
    <div className="NewBattlestationPage">
      <Container>
          <NewBattlestationForm />
      </Container>
    </div>
  )
}