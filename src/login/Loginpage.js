import React, { Component } from "react";
import style from "./Loginpage.module.css"
import axios from "axios"
import Doctor from '../doctor/Doctor'
import Patient from "../patient/Patient"
import Fainance from "../finance/Fainance";
class Login extends Component {
  constructor (props) {
    super(props)
    this.state={
      doctorScreen:false, 
      patientScreen:false,
      financeScreen:false,
      loginScreen:true
    }
    
  }
  handleChange=(e)=>{
console.log(e.target.value)
this.setState({
  [e.target.name]: e.target.value
})

  }
  handleSubmet=  async (e) =>{
   
    e.preventDefault();
    let response = await axios.put("http://localhost:3300/login", {
    
      role: this.state.role,
      username: this.state.username,
      password: this.state.password,
    })
    if (response) {
      console.log(response)

      let { data } = response;
      if (data) {
        console.log(data)
        let {user}=data;
        console.log(user,'user')
        if(user && user.length>0){
          this.setState({loginScreen:false})
          if(user[0].role=="doctor"){
            this.setState({
              doctorScreen:true,doctorId:user[0].id
            })
          }
          else if(user[0].role=="patient"){
            this.setState({
              patientScreen:true,patientName:user[0].name
            })
          }
          else if(user[0].role=="finance"){
            this.setState({
              financeScreen:true 
            })
          }

        }
        else 
        console.log(data.error)
      }}
    
 
  
    }
  
  render() {
    console.log(this.state)
  return (
    <div>
         {this.state.loginScreen ?(
    <div className={style.loginpage}>

<h2> Login Form</h2>
<div className={style.content}>
  <div>
  
    <p >Login As:</p>
   
    <input className={style.button} type="radio"  name="role" onChange={this.handleChange} value="doctor" />
   <label htmlFor="doctor">Doctor</label><br />
    <input  className={style.button}  name="role" onChange={this.handleChange}type="radio" value="patient" />
    <label htmlFor="patient">Patient</label><br />
     <input className={style.button} type="radio" name="role" onChange={this.handleChange}  value="finance" />
     <label htmlFor="financet">Finance</label>
   
     </div>
     <div>
  
      <input className={style.button} onChange={this.handleChange} type="text" name="username" placeholder="username" required /><br />
      <input className={style.button}   onChange={this.handleChange} type="password" name="password" placeholder="password" required /><br />
      <button className={style.button}  onClick={this.handleSubmet} type="submit">Login</button>
    </div></div>
    

  
</div>
   ):null}

   {this.state.doctorScreen ?(
    <Doctor DoctorId={this.state.doctorId} />
  ): this.state.patientScreen ?(
    <Patient patientName={this.state.patientName} />

  ): this.state.financeScreen ?(
    <Fainance />
  ):null}

    </div>

  )
}}
export default Login;
