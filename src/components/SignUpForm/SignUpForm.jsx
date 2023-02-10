import { useState } from "react"
import { signUp } from "../../utilities/users-service"

const SignUpForm = ({setUser}) => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
    })
    const [error, setError] = useState('')

    const disable = userData.password !== userData.confirm

    function handleChange(evt) {
        setUserData((prevData) => ({
            ...prevData,
            [evt.target.name]: evt.target.value,
        }))
    }

    async function handleSubmit(evt) {
        evt.preventDefault()
        try {
            const formData = {...userData}
            const user = await signUp(formData)
            console.log(user)
            setUser(user)
        } catch {
            setError('');
        }
    }
    return (
        <div>
            <div className="form-container">
            <form autoComplete="off" onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" onChange={handleChange} required />
                <label>Email</label>
                <input type="email" name="email" onChange={handleChange} required />
                <label>Password</label>
                <input type="password" name="password"  onChange={handleChange} required />
                <label>Confirm</label>
                <input type="password" name="confirm" onChange={handleChange} required />
                <button type="submit" disabled={disable}>SIGN UP</button>
            </form>
            </div>
            <p className="error-message">&nbsp;{error}</p>
        </div>
    )
}
export default SignUpForm