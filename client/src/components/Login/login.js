import React from 'react';
import axios from 'axios';
import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img from './adminpic.jpg';
import img1 from './userpic.jpg';

class Login extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            type:"",
            username: "", 
            password:"",
            popupEnable:true,loginEnable:false,signupEnable:false,
            s_username:"",
            s_password:"",
            s_repassword:"",
            s_gender:"",
            s_dob:"",
            s_email:"",
        }
    }

    onhandlechange=(event)=>
    {
        const {name,value}= event.target;
        this.setState({[name]:value})
    }

    getLoginDetails = async () => 
    {
        const {type,username,password} = this.state;
        const  post = {type:type,name :username,password:password}
        let res = await axios.request(
            {
                method: 'POST',
                url: `http://localhost:2000/login`,
                data : post,
            }); 
        if(res.data.length>0)
        {

            this.setState({type:"",username:"",password:""})
            this.setState({signupEnable:false,loginEnable:false,popupEnable:true})
            return (toast.success('Login Sucessful', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                }))
        }
        else
        {
            this.setState({type:"",username:"",password:""})
            return (toast.error('Invalid User', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                }));
        }
    }

    getSignupDetails = async () => 
    {   
        const {s_username,s_password,s_repassword,s_gender,s_dob,s_email} =this.state;
        const  post = {type:"user",name :s_username,password:s_password,s_repassword,gender:s_gender,DOB:s_dob,email:s_email}
        if(s_password!==s_repassword)
        {
            this.setState({s_password:"",s_repassword:""})
            return (toast.error('Password and Confirm-Password not matching', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                }));
        }
        await axios.request(
        {
            method: 'POST',
            url: `http://localhost:2000/signup`,
            data : post,
        }); 
        this.setState({s_username:"",s_password:"",s_repassword:"",s_gender:"",s_dob:"",s_email:""})
        this.setState({signupEnable:false,loginEnable:false,popupEnable:true})
        return (toast.success('Sign-Up Sucessful', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            }))
    }

    loginFormEnable=()=>{
       this.setState({loginEnable:true,signupEnable:false,popupEnable:false})
    }
    signupFormEnable=()=>{
        this.setState({signupEnable:true,loginEnable:false,popupEnable:false})
    }
    cancelButton=()=>{
        this.setState({signupEnable:false,loginEnable:false,popupEnable:true})
        this.setState({type:"",username:"",password:"",s_username:"",s_password:"",s_repassword:"",s_gender:"",s_dob:"",s_email:""})
    }

    render() 
    { 
        const {type,username,password,popupEnable,loginEnable,signupEnable,s_username,s_password,s_repassword,s_gender,s_dob,s_email} =this.state;
        const logginbutton = (username.length===0 || password.length===0)
        const signupbutton = (s_username.length===0 || s_password.length===0 || s_repassword.length === 0 || s_gender.length===0 || s_dob.length===0 || s_email.length===0)
        return(
        <div className="bg">
            <h1 className="card card-body" id="h1">Vehicle Management System</h1>
            <div className>
                <div  className="column1" id="sign-log" >
                    <article style={{height:"641px"}} >   
                        <h2 className="h2" style={{textAlign:"center",marginTop:"15px"}}>OUR DETAIL</h2><br/>
                        <p id="a1">Vehicle Management System application provides an easy and simple way to purchase vehicles online. Customers can view all the details of the vehicles and can purchase the vehicle.</p>
                        <p id="a1">Features are listed below:-</p>
                        <p id="a1"> • The main objective of the Project on Vehicle Management System is to manage the details of the vehicles, its features and its cost.</p>
                        <p id="a1"> • Vehicle Management System provides the searching facilities based on various factors such as vehicle name. </p>
                        <p id="a1"> • It tracks all the information of different types and brands of vehicles.</p>
                        <p id="a1"> • It also helps in increasing the efficiency of managing the Vehicle info.</p>
                        <p id="a1"> • Editing, adding and updating of Record is improved and simplified, resulting in proper resource management of Vehicle data.</p>
                    </article>
                </div>
                {
                    popupEnable &&
                    <div className="column2 "> 
                        <article className="col" style={{height:"654px"}} id="col2">
                            <div className="form-group col" style={{textAlign:"center",paddingBottom:"50px"}}><br/>
                                <img src={img} style={{width:"150px",height:"150px"}} alt="i am"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <div className="col"><button className="btn btn-dark col-4" onClick={this.loginFormEnable}>Login</button></div>
                                <br/><br/><br/>
                                <img src={img1} style={{width:"150px",height:"150px"}} alt="i am" /><br/>
                                <div className="col"><button className="btn btn-dark col-5" onClick={this.signupFormEnable}>Sign up</button></div>
                            </div>
                        </article>
                    </div>
                }
                {
                loginEnable &&  
                    <div className="column3"  >
                        <article className="col card card-body"style={{height:"654px"}} id="column-3" >
                            <div><h2 className="login" style={{textAlign:"center",marginBottom:"40px",fontWeight:"bold"}}>LOGIN<hr/></h2></div>
                            <div className="form-group">
                                <strong><label>Sign-in As:</label></strong>
                                <select className="btn btn-info w-100" value={type} onChange={this.onhandlechange} name="type">
                                    <option value="" selected disabled hidden>Select an Option</option>
                                    <option style={{backgroundColor:"white",color:"black"}} value="user" defaultValue>User</option>
                                    <option style={{backgroundColor:"white",color:"black"}} value="admin">Admin</option>
                                </select> 
                            </div>
                            <div className="form-group">
                                <strong><label>Username</label></strong>
                                <input type="text" autocomplete="off" className="form-control" name="username" value={username} onChange={this.onhandlechange} />
                            </div>
                            <div className="form-group">
                                <strong><label>Password</label></strong>
                                <input type ="password" className="form-control" name="password" value={password} onChange={this.onhandlechange }/>
                            </div>
                            <div className="form-group row">
                                <button className="btn btn-success col-5 container" onClick={this.getLoginDetails} disabled={logginbutton}>Login</button>
                                <button className="btn btn-danger col-5 container" onClick={this.cancelButton}>Cancel</button>
                            </div> 
                        </article>
                    </div>
                } 
                {
                signupEnable && 
                <div className="column4">
                    <article className="col card-body"  id="sign-log" style={{height:"654px"}} >
                        <div className="form-group">
                            <h2 style={{textAlign:"center",marginTop:"2px",fontWeight:"bold"}}>SIGN UP</h2><hr/>
                        </div>
                        <div className="form-group">
                            <label><strong>Username</strong></label>
                            <input type="text" autocomplete="off" className="form-control" name="s_username" value={s_username} onChange={this.onhandlechange} />
                        </div>
                        <div className="form-group">
                            <label><strong>Password</strong></label>
                            <input type ="password" className="form-control" name="s_password" value={s_password} onChange={this.onhandlechange }/>
                        </div>
                        <div className="form-group">
                            <label><strong>Confirm Password</strong></label>
                            <input type ="password" className="form-control" name="s_repassword" value={s_repassword} onChange={this.onhandlechange }/>
                        </div>
                        <div className="form-group">
                            <label><strong>Gender</strong></label>
                            <div className="form-control">
                                <input type ="radio" className="col-2" name="s_gender" value="Male" checked={s_gender==="Male"} onChange={this.onhandlechange }/>Male
                                <input type ="radio" className="col-2" name="s_gender" value="Female" checked={s_gender==="Female"} onChange={this.onhandlechange }/>Female
                            </div>
                        </div>
                        <div className="form-group">
                            <label><strong>DOB</strong></label>
                            <input type ="date" className="form-control" name="s_dob" value={s_dob} onChange={this.onhandlechange }/>
                        </div>
                        <div className="form-group">
                            <label><strong>Email</strong></label>   
                            <input type ="email" autocomplete="off" className="form-control" name="s_email" value={s_email} onChange={this.onhandlechange }/>
                        </div>
                        <div className="form-group row">
                            <button className="btn btn-success col-5 container" onClick={this.getSignupDetails} disabled={signupbutton} >SignUp</button>
                            <button className="btn btn-danger col-5 container" onClick={this.cancelButton}>Cancel</button>
                        </div> 
                    </article>
                </div>
                }
            </div>
                <ToastContainer />
        </div>
        );}
    }
 
export default Login ;    



