import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { login } from "../reducers/authSlice";

var Login=()=>
{
	const [uname,setuname] = useState();
	const [pass,setpass] = useState();
	const navigate = useNavigate();
	// const {setuserinfo} = useContext(usercontext);
	const [cverified,setcverified] = useState(false);
	const [rembme,setrembme] = useState();
	const cookieobj = new Cookies();
	const dispatch = useDispatch();
	function onCaptChange(value) {
		console.log("Captcha value:", value);
		if(value)
		{
			setcverified(true)
		}
		else
		{
			setcverified(false)
		}
	  }
	var onlogin=async(e)=>
	{
		e.preventDefault();
		if(cverified===true)
		{
			try
			{
				var logindata = {uname,pass};
				var resp = await fetch(`${process.env.REACT_APP_APIURL}/login`,
				{
					method:"post",
					body:JSON.stringify(logindata),
					headers: {'Content-type': 'application/json'}
				})
				if(resp.ok)
				{
					var result = await resp.json();
					if(result.statuscode===0)
					{
						toast.error("Incorrect Username/Password");
					}
					else if(result.statuscode===1)
					{
						dispatch(login(result.udata))
						// setuserinfo(result.udata);//state variable of app component
						sessionStorage.setItem("userdata", JSON.stringify(result.udata));

						if(rembme===true)
						{
							cookieobj.set("usercookie",result.udata._id,{maxAge: 60*60*24*7})
						}
					
						if(result.udata.usertype==="normal")
						{
							navigate("/");
						}
						else if(result.udata.usertype==="admin")
						{
							sessionStorage.setItem("token",result.jtoken);
							navigate("/adminpanel");
						}
					}
					else if(result.statuscode===-2)
					{
						toast.error("Your account is not activated. Please check your email and activate your account to login")
					}
					else if(result.statuscode===-1)
					{
						toast.error("Some Error Occured, try again")
					}
				}
				
			}
			catch(e)
			{
				toast.error("Error Occured");
			}
		}
		else
		{
			toast.error("Captcha Verification Failed");
		}
	}
    return(
    <>
        <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Login Page</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Login Form</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form name="form1" method="post" onSubmit={onlogin}>
				<input type="email" name="email" onChange={(e)=>setuname(e.target.value)} placeholder="Email Address" required=" " />
				<input type="password" name="pass"  onChange={(e)=>setpass(e.target.value)} placeholder="Password" required=" "/ >
				<div className="forgot">
					<Link to="/forgotpassword">Forgot Password?</Link>
				</div>
				<br/>
				<ReCAPTCHA sitekey="6LdjumspAAAAAO3bW8wWX3rOAI72_GTN5mBBzT7a" onChange={onCaptChange}/>
				<br/>
				<label><input type="checkbox" name="remb" onChange={(e)=>setrembme(e.target.checked)}/>Remember Me</label>

				<input type="submit" name="btn" value="Login"/>
				</form>
			</div>
			
			
		</div>
	</div> 
    </>)
}
export default Login;