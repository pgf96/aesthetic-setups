import { useState } from "react"
import * as battlestationsAPI from '../../utilities/battlestations-api'
import './NewBattlestationForm.css'

export default function NewBattlestationForm() {
    const [battlestationData, setBattlestationData] = useState({
        redditLink: '',
        redditUser: '',
        imageURL: '',
    })

    function handleChange(e) {
        setBattlestationData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
       
    }
    
    async function handleSubmit(e) {
        e.preventDefault()
        const formData = {...battlestationData}
        const battlestation = await battlestationsAPI.addBattlestation(formData)
    }



  return (
    <div className="NewBattlestationForm">
        <form autoComplete="off" onSubmit={handleSubmit}>
            <h1 style={{textAlign:'center', color:'white'}}>Create a Post</h1>
            <br />
            <br />
            <br />
            <label>Link to Reddit Post:</label>
            <input type="text" name="redditLink" onChange={handleChange} required />
            
            <label>Image URL:</label>
            <input type="text" name="imageURL" onChange={handleChange} required />

            <label>Reddit Username:</label>
            <input type="text" name="redditUser" onChange={handleChange} required />
           
            <button type="submit" >Submit</button>
        </form>
    </div>
  )
}