import React,{ useState } from 'react';
import { useNavigate } from 'react-router'
import {useCookies} from 'react-cookie'
import axios from 'axios'



const Login = () => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({email: '', password: ''});
    const [cookies, setCookie] = useCookies(['userId'])

    const handleSubmit = async(e)=>{
      e.preventDefault()
      await axios.post('/auth/login', {email: credentials.email, password: credentials.password}).then(x=>{
        setCookie('userId', x.data._id, {path: '/'})
        navigate('/', {replace:true})
      }).catch(x=>{
        console.log(x)
      })
    }
    const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            aria-describedby='emailHelp'
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
