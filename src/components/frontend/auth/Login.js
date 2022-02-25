  import React, {useState} from "react";
import Navbar from "../../../layout/frontend/Navbar";
import { axios } from 'axios';

function Login() {

  const [loginInput, setLogin] = useState({
    email: '',
    password: '',
    error_list: [],

  });
  const handleInput = (e) => {
    e.persist();
    setLogin({...loginInput, [e.target.name]: e.target.value});
  }

  const loginSubmit = (e) => {
    e.preventDeafault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    }
    axios.get('/sanctum/csrf-cookie').then(response => {
    axios.post('api/login', data).then(res =>{
      if(res.data.status === 200)
      {

      }
      else if(res.data.status === 401)
      {

      }
      else
      {
        setLogin({...loginInput, error_list: res.data.validation_errors});
      }
    });
  });
  }
  
   
    return (
        <div>
            <Navbar/>
            <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h4>Register</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={loginSubmit}>
                    <div className="form-group mb-3">
                      <label>Email ID</label>
                      <input type="email" name="email" onChange={handleInput} value={loginInput.email} className="form-control" />
                      <span>{loginInput.error_list.email}</span>
                    </div>

                    <div className="form-group mb-3">
                      <label>Password</label>
                      <input type="password" name="password" onChange={handleInput} value={loginInput.password} className="form-control"/>
                      <span>{loginInput.error_list.password}</span>
                    </div>

                    <div className="form-group mb-3">
                      <button type="submit" className="btn btn-primary btn-sm">Login</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default Login;