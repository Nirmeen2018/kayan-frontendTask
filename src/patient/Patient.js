import React, { Component } from "react";
import "./Patient.css"
import axios from "axios"
class Patient extends Component {
  constructor (props) {
    super(props)
    this.state={}
  }
  handleChange=(e)=>{
   
    console.log(e.target.value)
   
    if(e.target.name==="doctor"){
      this.setState({
        [e.target.name]: e.target.value
      })
  
    }
    else if(e.target.name==="dov"){


  this.setState({
    [e.target.name]: e.target.value
  })

    }
      }
      
  componentDidMount(){
    console.log(this.props.patientName)
   this.handleGetDoctors();
  
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
    handeleReserve=  async (e) =>{
      
      e.preventDefault();
       
      const response= await this.handleGetAllVisit(this.state.doctor)
      let visits=await response
     
      console.log(visits,'here')
      let dateOfVisit
      this.setState({
        dateOfVisitMessage:"",addMasseg:""
      })
      if(visits && visits.length>0){
        console.log("here")
        visits.forEach(element => {
          if(this.state.dov==element.visit_date){
            console.log('found')
            dateOfVisit=true
          }
        });
      }
     
if( dateOfVisit){
  this.setState({
    dateOfVisitMessage:"please enter another visit date"
  })
}
else {
  let response = await axios.post("http://localhost:3300/addVisit", {
      
  doctor_id: this.state.doctor,
   visit_date: this.state.dov,
   patient_name: this.props.patientName,
  })
  if (response) {
    console.log(response)

    let { data } = response;
    if (data) {
      console.log(data)
      let {success}=data;
     
      if(success ){
      this.setState({
        addMasseg:'added successfully'
      })

      }
      else 
      console.log(data.error)
    }}
  
}
     
   
    
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
           return(visits)
          }
          else 
        this.setState({visits:visits})
        }}
      }
render(){
  let {doctors}=this.state
  console.log(doctors)
  console.log(this.state)

  let doctorRows = [];
  if (doctors && doctors.length > 0) {
    doctorRows = doctors.map((element, index) => {
      return (
        <option value={element.id}>{element.name}</option>
      )
    });
  }
  

    return(
        <div>
            <div className="selectform">
            <label htmlFor="doctorDropdown">Select a doctor: </label>
            <select id="doctorDropdown" onChange={this.handleChange}  name="doctor"><br/>
            <option value="0">select...</option>
            {doctorRows}
           
    </select>
    
        <div className="visit_date">
            <label htmlFor="dov">visit_date: </label>
             <input type="date" id="dov" onChange={this.handleChange} name="dov"/>
             {this.state.dateOfVisitMessage ?(
                        <h6 style={{textAlign:"center",color:"red"}}>{this.state.dateOfVisitMessage}</h6>

             ):null}
            </div>
            <div className="reserve"> 
            <button  className="reserve-button" id="reserveButton" onClick={this.handeleReserve}>Reserve</button>
            </div>

            </div>
            { this.state.addMasseg ? (
          <h5 style={{textAlign:"center",color:"green"}}>{this.state.addMasseg}</h5> 
        ):null}
        </div>
        
          
    )
    
}


}
export default Patient