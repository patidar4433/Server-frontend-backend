import React, { useState } from "react";

const ValidationForm = () => {

  const values = {username: "", email: "", password: ""};
  const [formValues, setFormValues] = useState(values);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const onchangeHandler = (e) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value});

  }

  const formSubmithandler = (e) => {
    e.preventDefault();
    setFormErrors(Validate(formValues));
    setIsSubmit(true);
    setFormValues(values);
  };

  const Validate = (fValues) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!fValues.username){
      error.username = "Username is required"
    }
    if(!fValues.email){
      error.email = "Email is required"
    }else if(!regex.test(fValues.email)){
      error.email = "Email format is invalid"
    }
    if(!fValues.password){
      error.password = "Password is required"
    }else if(fValues.password.length < 4){
      error.password = "Password must be at least 4 characters long."
    }else if(fValues.password.length > 12){
      error.password = "Password must be at most 12 characters long."
    }
    return error;
  }

  return (
    <div>
    {isSubmit ? (<span>Login Successfully...!</span>):""}
    <pre>{JSON.stringify(formValues)}</pre>
      <form onSubmit={formSubmithandler}>
        <h3>Login form</h3>
        <div>
          <label htmlFor="username">Username</label><br/>
          <input onChange={onchangeHandler} type="text" name="username" value={formValues.username}/>
        </div>
        <p>{formErrors.username}</p>
        <div>
          <label htmlFor="email">Email</label><br/>
          <input onChange={onchangeHandler} type="text" name="email" value={formValues.email}/>
        </div>
        <p>{formErrors.email}</p>
        <div>
          <label htmlFor="password">Password</label><br/>
          <input onChange={onchangeHandler} type="password" name="password" value={formValues.password}/>
        </div>
        <p>{formErrors.password}</p>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ValidationForm;
