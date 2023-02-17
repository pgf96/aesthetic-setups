import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import './SignUpForm.css'
import { Link } from '@mui/material';



const theme = createTheme();

export default function SignUpForm({showLogin ,setShowLogin, setUser}) {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
    })
    const [error, setError] = useState('')

    function handleChange(e) {
        setUserData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const formData = {...userData}
            const user = await usersService.signUp(formData)
            setUser(user)
        } catch {
            setError('');
        }
    }

  function handleToggle() {
    setShowLogin(!showLogin)
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{backgroundColor:'rgb(11, 17, 27)'}}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <Avatar src="/broken-image.jpg" />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: '#fff' }}>
              Register
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                onChange={handleChange} 
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleChange} 
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                onChange={handleChange} 
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirm"
                onChange={handleChange} 
                label="confirm password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: '#6587c2',
                ':hover': {
                  bgcolor: '#4FC03F'
                }}}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link onClick={handleToggle}> Have an Account?</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}