import React, { Component } from 'react'
import logo from "../Images/logo.png"
import concept from "../Images/concept.png"
import Register from './Register'
import Login from './Login'


export class Welcome extends Component {

    constructor(){
        super()
        this.state={
            Load: true,
        }
    }

    loadLogin=()=>{
        this.setState({Load: false})
    }
    loadRegister=()=>{
        this.setState({Load: true})
    }

    RedirectHandler=(type)=>{
        if(type === "admin"){
            this.props.history.push("/admindashboard")
        }else if(type === "user"){
            this.props.history.push("/userdashboard")
        }
    }

    render() {
        return (
            <div className="container-fluid">
            <div className="row">
                <div className="col-lg-5"
                style={{backgroundColor: "#fed049"}}>
                    <img className="img-fluid" src={logo} alt="bluetech" ></img>
                    <img className="img-fluid pb-3" src={concept} alt="concept" ></img>
                </div>
                <div className="col-lg-7" style={{backgroundColor: "#007580"}}>
                    <h2 className="text-light mt-3 mx-5">BlueTech</h2>
                    <h4 className="text-light mx-5">Welcome... Explore your dreams with us.</h4>
                    <div className="d-flex justify-content-center">
                    <button className="btn btn-outline-light mt-5" onClick={this.loadLogin}>Login</button>
                    <button className="btn btn-outline-light mt-5 mx-5" onClick={this.loadRegister}>Register</button></div>
                    {
                        this.state.Load?
                           (<Register RedirectHandler={this.RedirectHandler} loadLogin={this.loadLogin}/>):
                           (<Login RedirectHandler={this.RedirectHandler} loadRegister={this.loadRegister}/>)
                    }
                </div>
            </div>
            </div>
        )
    }
}

export default Welcome
