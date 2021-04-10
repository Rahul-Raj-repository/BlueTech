import React, { Component } from 'react'
import firebase from "../Services/firebase"
import LoginString from "./LoginStrings"
import moment from "moment"

export class Register extends Component {

    constructor(){
        super()
        this.state={
            email:"",
            password:"",
            name:"",
            type:"",
            points: 0,
        }
        this.handleChange= this.handleChange.bind(this)
        this.handleSubmit= this.handleSubmit.bind(this)
    }
    
    handleChange= event=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async handleSubmit(event){
        const {name,password,email,type,points} = this.state
        event.preventDefault();
        const timestamp = moment()
        .valueOf()
        .toString()

      try{
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async result => {
          firebase.firestore().collection("users")
          .add({
              name,
              id:result.user.uid,
              email,
              password,
              type,
              timestamp,
              points,

          }).then((docRef)=>{
            localStorage.setItem(LoginString.FirebaseDocumentId, docRef.id)
            localStorage.setItem(LoginString.ID, result.user.uid)
            localStorage.setItem(LoginString.Name, name)
            localStorage.setItem(LoginString.Email, email)
            localStorage.setItem(LoginString.Password, password)
            localStorage.setItem(LoginString.Type,type)
            localStorage.setItem(LoginString.Time, timestamp)
            localStorage.setItem(LoginString.Points, points)

            this.setState({
              name: "",
              email: "",
              password: "",
            });
            if(this.state.type === "admin"){
              this.props.RedirectHandler("admin")
            }else{
              this.props.RedirectHandler("user")
            }
          })
          .catch((error)=>{
            console.error("Error adding document",error)
          })
        }).catch((error)=>{
            document.getElementById("1").innerHTML="Error in signing up please try again!!"
            document.getElementById("2").innerHTML=""
        })
        }
        catch(error){
            document.getElementById("1").innerHTML="Error in signing up please try again!!"
        }
      }

      Wait=(event)=>{
        document.getElementById("2").innerHTML="Loading..."
      }
  
    render() {
        return (
          <div>
            <div className="row ">
              <div className="col-md-5 offset-sm-4 text-left  ">
                <form className="pb-3" onSubmit={this.handleSubmit}>
                    <div className="form-group pt-3">
                        <label className="text-light">Full Name *</label>
                        <input onChange={this.handleChange} placeholder="enter your full-name"
                         value={this.state.name} id="name" name="name" className="form-control" type="text"/>
                    </div>
                    <div className="form-group">
                        <label className="text-light">Email *</label>
                        <input onChange={this.handleChange} placeholder="enter your email address"
                         value={this.state.email} id="email" name="email" className="form-control" type="text"/>
                    </div>
                    <div className="form-group">
                        <label className="text-light">Password *</label>
                        <input onChange={this.handleChange} placeholder="enter a new password"
                         value={this.state.password} id="password" name="password" className="form-control" type="password"/>
                    </div>
                    <label className="text-light">User Type *</label>
                    <div className="form-check  mb-3">
                        <input className="form-check-input" type="radio" name="type"
                         onChange={this.handleChange} id="exampleRadios1" value="normal"/>
                        <label className="form-check-label text-light" for="exampleRadios1">Normal User</label>
                        <input className="form-check-input mx-4" type="radio" name="type"
                         onChange={this.handleChange} id="exampleRadios1" value="admin"/>
                        <label className="form-check-label text-light mx-5" for="exampleRadios1">Admin</label>
                    </div>
                    <h5 className="text-light" id="2"></h5>
                    <button type="submit" onClick={this.Wait} className="btn btn-success btn-block">Register</button>
                    <p className="mb-2" id="1" style={{color:"red"}}></p>
                    <p className="text-light"> Already have an account? 
                      <span
                      onClick={this.props.loadLogin}
                      style={{cursor: "pointer", color:"#fed049"}}><u> Login here</u></span>
                    </p>
                </form>
              </div>
            </div> 
        </div>
        )
    }
}

export default Register

