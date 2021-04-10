import React, { Component } from 'react'
import firebase from "../Services/firebase"
import logosm from "../Images/logosm.png"
import LoginString from "./LoginStrings"
import moment from "moment"

export class AdminDashboard extends Component {

    constructor(){
        super()
        this.state={
            displayedContacts: [],
            isLoading: true
        }
        this.currentUserId = localStorage.getItem(LoginString.ID)
        this.currentUserName = localStorage.getItem(LoginString.Name)
        this.currentUserEmail = localStorage.getItem(LoginString.Email)
        this.currentUserType = localStorage.getItem(LoginString.Type)
        this.currentUserTime = localStorage.getItem(LoginString.Time)
    
        this.searchUsers=[]
        this.getListUser = this.getListUser.bind(this)
        this.renderListUser = this.renderListUser.bind(this)
   
        this.getListUser()
    }

    logout=()=>{
        firebase.auth().signOut()
        this.props.history.push("/")
        localStorage.clear()
    }

    getListUser= async()=>{
        const result = await firebase.firestore().collection("users").get()
        if(result.docs.length>0){
            let ListUsers=[]
            ListUsers=[...result.docs]
            ListUsers.forEach((item, index)=>{
                this.searchUsers.push({
                    key: index,
                    documentKey: item.id,
                    id: item.data().id,
                    name: item.data().name,
                    type: item.data().type,
                    points: item.data().points
                })
            })
            this.setState({
                isLoading: false
            })
        }
        this.renderListUser()
    }
    renderListUser=()=>{
        if(this.searchUsers.length>0){
            let viewListUser=[]
                this.searchUsers.map((item)=>{
                    if(item.id !== this.currentUserId && item.documentKey!= "gE3W2ywCnEBDxwGMteZT"){
                        viewListUser.push(
                          <div className="card card-body mb-1" style={{backgroundColor: "#96bb7c"}} id={item.key}>
                            <h6>{item.name}
                            <span className="text-light">{` (${item.type} user)`}</span>
                            <span className="bg-warning mx-3 rounded">
                             {item.type==="normal"?(`${item.points} points`):null}
                            </span></h6>
                          </div>
                        )
                    }
                })
            this.setState({
                displayedContacts: viewListUser
            })
        }else{
            console.log("No user is present")
        }
    }

    searchHandler=(event)=>{
        let searchQuery = event.target.value.toLowerCase(),
        displayedContacts = this.searchUsers.filter((el)=>{
            let SearchValue = el.name.toLowerCase()
            return SearchValue.indexOf(searchQuery) !== -1;
        })
        this.displayedContacts = displayedContacts
        this.displayedSearchedContacts() 
    }
    displayedSearchedContacts=()=>{
        if(this.searchUsers.length>0){
            let viewListUser=[]
                this.displayedContacts.map((item)=>{
                    if(item.id !== this.currentUserId && item.documentKey!= "gE3W2ywCnEBDxwGMteZT"){
                        viewListUser.push(
                            <div className="card card-body mb-1" style={{backgroundColor: "#96bb7c"}} id={item.key}>
                            <h6>{item.name}
                             <span className="text-light">{` (${item.type} user)`}</span>
                             <span className="bg-warning mx-3 rounded">
                             {item.type==="normal"?(`${item.points} points`):null}
                            </span></h6>
                          </div>
                        )
                    }
                })
            this.setState({
                displayedContacts: viewListUser
            })
        }else{
            console.log("No user is present")
        }
    }

    render() {
        return (
            <div style={{backgroundColor: "#184d47"}}>
                <div className="container card card-body" style={{backgroundColor: "#96bb7c"}}>
                    <img className="img-fluid" src={logosm} alt="bluetech" width="150px" height="100px"/>
                    <h3 className="text-light text-center rounded" style={{backgroundColor: "#184d47"}}>
                    Admin Account</h3>
                    <div className="d-flex justify-content-end">
                        <div className=" my-3"> <b><u>Last Login</u></b> :
                         <h5  style={{color: "#184d47"}}><b>
                         {moment(Number(this.currentUserTime)).format('MMM DD YYYY h:mm A')}</b></h5>
                         </div>
                        <button className="btn btn-danger mx-5 my-3"
                        onClick={this.logout}>Logout</button></div>
                        <h2>Welcome, <b >{this.currentUserName}</b></h2>
                        <h5>We hope you are doing well.</h5>
                        <div class="input-group mb-1 mt-2">
                         <input type="text" className="form-control"
                          onChange={this.searchHandler}
                          placeholder="Search Username" aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                </div>
                <div className="container mt-3 pb-5">
                {
                    this.state.isLoading? (<h5 className="text-light">Loading...</h5>)
                    :(this.state.displayedContacts)
                }
                </div>
            </div>
        )
    }
}

export default AdminDashboard
