import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import backgroundphoto from './bgphoto.png'
import './LoginForm.css'
import { Link } from '@mui/material';

export default function LoginForm({showLogin ,setShowLogin, setUser}) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate()

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user);
      navigate('/')
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  function handleToggle() {
    setShowLogin(!showLogin)
  }

  return (

      <Grid className='LoginForm' container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundImage: `url(${backgroundphoto})`,
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
            <Avatar sx={{ m: 1, color: '#fff' }}>
              <Avatar src="/broken-image.jpg" />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: '#fff' }}>
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={credentials.email}
                onChange={handleChange} 
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={credentials.password}
                onChange={handleChange} 
                label="Password"
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
                Sign In
              </Button>
              <Grid container>
                <Grid item >
                <Link variant="body1" onClick={handleToggle}>
                    Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}