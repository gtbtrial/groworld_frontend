import {  useState } from "react";
import { Link, } from "react-router-dom";
import { toast } from "react-toastify";

var ForgotPassword = () => {

    const [uname,setuname] = useState();
    var onsubmit=async(e)=>
    {
        e.preventDefault();
        try
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/forgotpassword?username=${uname}`)

            if(resp.ok)
            {
                var result = await resp.json();
                toast.info(result.msg);
                
            }
		}
		catch(e)
		{
			toast.error("Error Occured");
		}
    }
    return (
        <>
            <div className="breadcrumbs">
            <div className="container">
                <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                    <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                    <li className="active">Forgot Password</li>
                </ol>
            </div>
            </div>
            <div className="login">
		<div className="container">
			<h2>Forgot Password</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form name="form1" method="post" onSubmit={onsubmit}>
				<input type="email" name="email" onChange={(e)=>setuname(e.target.value)} placeholder="Email Address(username)" required=" " />
				
				<input type="submit" name="btn" value="Submit"/>
				</form>
			</div>
			
			
		</div>
	</div> 
        </>
    )
}
export default ForgotPassword;