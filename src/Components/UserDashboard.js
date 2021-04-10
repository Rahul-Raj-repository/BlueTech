import React, { Component } from 'react'
import firebase from "../Services/firebase"
import LoginString from "../Components/LoginStrings"
import logosm from "../Images/logosm.png"
import points from "../Images/points.png"
import moment from "moment"

export class UserDashboard extends Component {

    constructor(){
        super()
        
        this.currentUserDocumentId= localStorage.getItem(LoginString.FirebaseDocumentId)
        this.currentUserId = localStorage.getItem(LoginString.ID)
        this.currentUserName = localStorage.getItem(LoginString.Name)
        this.currentUserEmail = localStorage.getItem(LoginString.Email)
        this.currentUserType = localStorage.getItem(LoginString.Type)
        this.currentUserTime = localStorage.getItem(LoginString.Time)
        this.currentUserPoints = localStorage.getItem(LoginString.Points)
        this.state={
            completedList: [],
            ongoingList: [],
            todoList: [],
            points:this.currentUserPoints
        }

        // Dummy TestPaper Lists (passed as soon as the component loads)
        this.pushList("Test Paper 1", "Complete Test")  //
        this.pushList("Test Paper 2", "Complete Test")  //
        this.pushList("Test Paper 3", "Attempt Test")   //
        this.pushList("Test Paper 4", "Attempt Test")   //
    }

    logout=()=>{
        firebase.auth().signOut()
        this.props.history.push("/")
        localStorage.clear()
    }

    pushList=(name, section)=>{
        if(section === "Redeem Points"){
        this.state.completedList.push(
            <h6>{name}</h6>
        )}
        else if(section === "Complete Test"){
            this.state.ongoingList.push(
                    <h6>{name}</h6>
            )}
        else if(section === "Attempt Test"){
            this.state.todoList.push(
                    <h6>{name}</h6>
            )
        }
    }

    moveOngoing=(item)=>{
        let newList=[]
        newList = this.state.todoList.filter(el=>el !== item)
        this.setState({todoList: newList})

        this.state.ongoingList.push(item)

        this.setState({points: parseInt(this.state.points) + 30 })
        localStorage.setItem(LoginString.Points, parseInt(this.state.points)+30)
        firebase.firestore()
        .collection("users")
        .doc(this.currentUserDocumentId)
        .update({
            points: localStorage.getItem(LoginString.Points),
        })
    }

    moveCompleted=(item)=>{
        let newList=[]
        newList = this.state.ongoingList.filter(el=>el !== item)
        this.setState({ongoingList: newList})

        this.state.completedList.push(item)

        this.setState({points: parseInt(this.state.points) + 100 })
        localStorage.setItem(LoginString.Points, parseInt(this.state.points)+100)
        firebase.firestore()
        .collection("users")
        .doc(this.currentUserDocumentId)
        .update({
            points: localStorage.getItem(LoginString.Points),
        })
    }

    getCompletionTime=()=>{
        var timestamp = moment().valueOf().toString()
        return(
            <span>{moment(Number(timestamp)).format('MMM DD YYYY h:mm A')}</span>
        )
    }

    render() {
        return (
            <div style={{backgroundColor: "#184d47"}}>
                <div className="container card card-body"  style={{backgroundColor: "#96bb7c"}}>
                    <img className="img-fluid" src={logosm} alt="bluetech" width="150px" height="100px"/>
                    <div className="row d-flex justify-content-end">
                        <img src={points} alt="Earned" width="50px" height="60px"/>
                        <h5 className="mt-4" style={{color: "#184d47"}}>{this.state.points} Points</h5>
                        <div className="mx-5 my-3"> <b><u>Last Login</u></b> :
                         <h5><b style={{color: "#184d47"}}>
                         {moment(Number(this.currentUserTime)).format('MMM DD YYYY h:mm A')}</b></h5>
                        </div>
                        <button className="btn mx-3 my-3 text-light"
                        onClick={this.logout} style={{backgroundColor: "#c64756"}}>Logout</button></div>
                        <h2>Welcome, <b style={{color: "#184d47"}}>{this.currentUserName}</b></h2>
                        <h5>We hope you are doing well.</h5>
                </div>
                <div className="container pb-4"><div className="row mt-4"  style={{height: "400px "}}> 
                    <div className="col-md-3 card card-body m-3" style={{backgroundColor: "#96bb7c"}}>
                        <div className="text-light text-center mb-3 rounded" style={{backgroundColor: "#184d47"}}>
                        <h5>Tests Completed</h5></div>
                        {
                            
                        this.state.completedList.length>0?
                        (
                            this.state.completedList.map(item=>(
                            <div className="card m-2">
                            <div className="text-light bg-success p-1">{item}
                            <span className="text-warning">(<u>completed on</u>: {this.getCompletionTime()} )</span>
                            100 points rewarded
                            </div>
                            </div>))
                        ):
                        (<h4 className="text-secondary mt-5 mx-3">NO TESTS!!</h4>)
                        }
                        
                    </div>
                    <div className="col-md-3 card card-body m-3" style={{backgroundColor: "#96bb7c"}}>
                        <div className="text-light text-center rounded" style={{backgroundColor: "#184d47"}}>
                        <h5>Tests Ongoing</h5> </div>
                        <div className="p-2 m-1" >
                        <b>NOTE:</b> You will earn 100 points once you Complete a test.</div>
                        {
                            this.state.ongoingList.length>0?
                            (
                                this.state.ongoingList.map(item=>(
                                <div className="card p-2 m-2" style={{backgroundColor: "#184d47", color:"#96bb7c"}}>
                                {item}
                                <button className="btn btn-outline-light"
                                onClick={()=>this.moveCompleted(item)}>Complete Test</button>
                                </div>))
                            ):
                            (<h4 className="text-secondary mt-5 mx-3">NO TESTS!!</h4>)
                        }
                    </div>
                    <div className="col-md-3 card card-body m-3" style={{backgroundColor: "#96bb7c"}}>
                        <div className="text-light text-center rounded" style={{backgroundColor: "#184d47"}}>
                        <h5>Tests ToDo</h5></div>
                        <div className="p-3" >
                        <b>NOTE:</b> You will earn 30 points once you Attempt a test.</div>
                        {
                            this.state.todoList.length>0?
                            (   
                                this.state.todoList.map(item=>(
                                <div className="card p-2 m-2" style={{backgroundColor: "#184d47", color:"#96bb7c"}}>
                                {item}
                                <button className="btn btn-outline-light"
                                onClick={()=>this.moveOngoing(item)}>Attempt Test</button>
                                </div>))
                            ):
                            (<h4 className="text-secondary mt-5 mx-3">NO TESTS!!</h4>)
                        }
                    </div>
                </div>
                </div>
                
            </div>
        )
    }
}

export default UserDashboard
