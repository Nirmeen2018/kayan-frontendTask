import React, { Component } from "react";
import "./Fainance.css"
import axios from "axios"
class Fainance extends Component {
  constructor (props) {
    super(props)
    this.state={}
  }
  componentDidMount(){
    
   this.handleGetDoctors();
  
  }
  handleChange=(e)=>{
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
    this.handleGetAllVisit(e.target.value)
    
      }
  handleGetDoctors=  async (e) =>{
   
    let response = await axios.get("http://localhost:3300/getDoctors", {
    })
    if (response) {
      console.log(response)

      let { data } = response;
      if (data) {
        console.log(data)
        let {doctors}=data;
        if(doctors && doctors.length >0){
          this.setState({doctors:doctors})
         
        }
        else 

        console.log(data.error)
      }}
    

  
    }
    handleGetAllVisit=  async (doctor_id) =>{
   
      let response = await axios.put("http://localhost:3300/getVisit", {
        doctor_id:doctor_id
        
      })
      if (response) {
        console.log(response)
  
        let { data } = response;
        if (data) {
          console.log(data)
          let {visits}=data;
          if(visits && visits.length >0){
            this.setState({visits:visits})
           
          }
          else 
  
        this.setState({visits:visits})
        }}
      
  
    
      }
   render(){
    let {doctors,visits}=this.state
    console.log(visits,"visits")
  let doctorRows = [];
  let  visitRows=[];
  if (doctors && doctors.length > 0) {
    doctorRows = doctors.map((element, index) => {
      return (
        <option value={element.id}>{element.name}</option>
      )
    });
  }
  if (visits && visits.length > 0) {
    visitRows = visits.map((element, index) => {
      return (
        <tr key={index}>
          <td>{element.patient_name}</td>
          <td>{element.daignosis}</td>
          <td>{element.treatment}</td>
          <td>{element.amount}</td>
          <td>{element.visit_date}</td>
        </tr>
      )
    });
  }
    return (
      <div>
    
  
  <div className="selectform">
            <label htmlFor="doctorDropdown">Select a doctor: </label>
            <select id="doctorDropdown" onChange={this.handleChange}  name="doctor"><br/>
            <option value="0">select...</option>
            {doctorRows}
           
    </select>
    {visits && visits.length>0 ? (
        <table >
        <thead>
          <tr>
            <th>Patient_name</th>
            <th>daignosis</th>
            <th>treatment</th>
            <th>price</th>
            <th>visit_date</th>
    
          </tr>
        </thead>
    
        <tbody>
        {visitRows}
        </tbody>
      </table>
         ):null}
    </div>

      </div>
      )}
    }
      export default Fainance;