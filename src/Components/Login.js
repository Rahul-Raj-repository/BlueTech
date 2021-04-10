import React, { Component } from 'react'
import firebase from "../Services/firebase"
import LoginString from './LoginStrings'
import moment from "moment"

export class Login extends Component {

    constructor(){
        super()
        this.state={
            isLoading: true,
            email:"",
            password:"",
        }
        this.handleChange= this.handleChange.bind(this)
        this.onSubmitHandler= this.onSubmitHandler.bind(this)
    }

    handleChange= event=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount(){
        if(localStorage.getItem(LoginString.ID)){
           this.setState({isLoading:false},()=>{
                this.setState({isLoading: false})
                if(localStorage.getItem(LoginString.Type) === "admin"){
                  this.props.RedirectHandler("admin")
                }else{
                    this.props.RedirectHandler("user")
                }
            })
        }else{
            this.setState({isLoading: false})
        }
    }
    
    async onSubmitHandler(event){
        event.preventDefault()

        await firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(async result=>{
            let user = result.user
            if(user){
                await firebase.firestore().collection("users")
                .where("id","==",user.uid)
                .get()
                .then(function(querySnapshot){
                    querySnapshot.forEach(function(doc){
                        const currentdata= doc.data();
                        localStorage.setItem(LoginString.FirebaseDocumentId, doc.id)
                        localStorage.setItem(LoginString.ID, currentdata.id)
                        localStorage.setItem(LoginString.Name, currentdata.name)
                        localStorage.setItem(LoginString.Email, currentdata.email)
                        localStorage.setItem(LoginString.Password, currentdata.password)
                        localStorage.setItem(LoginString.Type, currentdata.type)
                        localStorage.setItem(LoginString.Time, currentdata.timestamp)
                        localStorage.setItem(LoginString.Points, currentdata.points)
                        firebase.firestore()
                        .collection("users")
                        .doc(doc.id)
                        .update({
                            timestamp: moment().valueOf().toString(),
                        })
                    })
                })
            }
            if(localStorage.getItem(LoginString.Type) === "admin"){
                    this.props.RedirectHandler("admin")
                }else{
                    this.props.RedirectHandler("user")
                }
        }).catch(function(error){
            document.getElementById("2").innerHTML=""
            document.getElementById("1").innerHTML="Error occured while logging in!! TRY AGAIN"
        })
    }

    Wait=(event)=>{
        document.getElementById("1").innerHTML=""
        document.getElementById("2").innerHTML="Loading..."
      }

    render() {
        return (
            <div>
                <div className="row">
                  <div className="col-md-5 offset-sm-4 text-left">
                    <form className="pb-3" onSubmit={this.onSubmitHandler}>
                        <div className="form-group pt-3">
                            <label className="text-light">Email *</label>
                            <input onChange={this.handleChange} placeholder="enter your email address"
                            value={this.state.email} id="email" name="email" className="form-control" type="text"/>
                        </div>
                        <div className="form-group mb-5">
                            <label className="text-light">Password *</label>
                            <input onChange={this.handleChange} placeholder="enter your password"
                            value={this.state.password} id="password" name="password" className="form-control" type="password"/>
                        </div>
                        <p id="1" className="text-danger"></p>
                        <h6 id="2" className="text-light"></h6>
                        <button onClick={this.Wait} className="btn btn-success btn-block mb-2">LOGIN</button>
                        <p className="text-light"> New user? 
                            <span
                            onClick={this.props.loadRegister}
                            style={{cursor: "pointer", color:"#fed049"}}><u> Register here</u></span>
                        </p>
                    </form>
                  </div>
                </div> 
            </div>
        )
    }
}

export default Login

