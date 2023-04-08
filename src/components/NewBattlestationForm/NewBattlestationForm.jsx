import { useState } from "react"
import './NewBattlestationForm.css'

export default function NewBattlestationForm({handleAddNewBattlestation}) {
    const [formData, setFormData] = useState({
        redditLink: '',
        redditUser: '',
        imageURL: '',
    })

    

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
       
    }
    
    async function handleSubmit(e) {
        e.preventDefault()
        await handleAddNewBattlestation(formData)

    }



  return (
    <div className="NewBattlestationForm">
        <form onSubmit={handleSubmit}>
            <h1 style={{textAlign:'center', color:'white'}}>Create a Post</h1>
            <br />
            <br />
            <br />
            <label>Link to Reddit Post:</label>
            <input type="url" name="redditLink" value={formData.redditLink} onChange={handleChange} required />
            
            <label>Image URL:</label>
            <input type="url" name="imageURL" value={formData.imageURL} onChange={handleChange} required />

            <label>Reddit Username:</label>
            <input type="text" name="redditUser" value={formData.redditUser} onChange={handleChange} required />
           
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}