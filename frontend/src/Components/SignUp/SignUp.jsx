import React, { useEffect, useState } from "react";
import "./SignUp.css";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { signUpUser } from "../../Actions/User";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  
  const {loading, error} = useSelector((state)=>state.user);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signUpUser(name, email, password));
  };

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch({type: "clearErrors"});
    }
  }, [dispatch, error, alert]);

  return (
    <div className="signup-form">
      <div className="container">
        <div className="header">
          <h1>SIGN UP</h1>
        </div>
        <form onSubmit={submitHandler}>
          <div className="input">
            <PersonIcon/>
            <input type="text" placeholder="Username" required value={name} onChange={(e)=>setName(e.target.value)} />
          </div>
          <div className="input">
            <EmailIcon/>
            <input type="email" placeholder="Email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="input">
            <LockIcon/>
            <input type="password" placeholder="Password" required value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <button className="signup-btn" disabled={loading} type="submit">SignUp</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
