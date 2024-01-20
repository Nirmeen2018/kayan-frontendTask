import React, { Component } from "react";
import "./Doctor.css"
import axios from "axios"
class Doctor extends Component {
  constructor (props) {
    super(props)
    this.state={}
  }
  componentDidMount(){
   this. handleGetAllVisit();
   }
   handleChange=(e)=>{
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
    
      }
   handleAddTreatment=  async (e) =>{
   
    e.preventDefault();
    this.setState({
      updateMsg:""})
    let response = await axios.put("http://localhost:3300/updateVisit", {
    
     id: this.state.patient,
      daignosis: this.state.diagnosis,
     treatment: this.state.treatment,
     price:this.state.price,
    })
    if (response) {
      console.log(response)

      let { data } = response;
      if (data) {
        console.log(data)
        let {success}=data;
        if(success ){
          this.setState({updateMsg:'updated successfully'})
          

        }
        else 
        console.log(data.error)
      }}
    
 
  
    }
   handleGetAllVisit=  async () =>{
   
    let response = await axios.put("http://localhost:3300/getVisit", {
      doctor_id:this.props.DoctorId
      
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
    let {visits}=this.state
    console.log(this.state)
    let patientRows = [];
  if (visits && visits.length > 0) {
    patientRows = visits.map((element, index) => {
      return (
        <option value={element.id}>{element.patient_name}</option>
      )
    });
  }
  
    return (
      <div className="container">
        <div className="selectform">
        <label htmlFor="patientDropdown">Select a patient: </label>
    <select id="patientDropdown" onChange={this.handleChange} name="patient">
            <option value="0">select...</option>
            {patientRows}
        </select>  
   
         <div className="diagnosis">
         <label htmlFor="diagnosis">diagnosis: </label>
        <input type="text" id="diagnosis" onChange={this.handleChange} placeholder="enter diagnosis details" name="diagnosis"/>
         </div>
         <div className="tretment">
         <label htmlFor="treatment">treatment: </label>
         <input type="text" id="treatment" onChange={this.handleChange}  placeholder="enter treatment details" name="treatment"/> </div>
         <div className="price">
          <label htmlFor="price">price: </label>
         <input type="text" id="price" onChange={this.handleChange}  placeholder="enter price" name="price"/>
         <br />
         <button  className="add-tretment" onClick={this.handleAddTreatment} id="addTreatmentButton">Add Treatment</button>
         </div> 
         </div>
         { this.state.updateMsg ? (
          <h5 style={{textAlign:"center",color:"green"}}>{this.state.updateMsg}</h5> 
        ):null}
      </div>
    )
  }

}
export default Doctor;