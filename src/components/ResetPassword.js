import {  useEffect, useState } from "react";
import { Link, useSearchParams, } from "react-router-dom";
import { toast } from "react-toastify";

var ResetPassword = () => {
    const [myparams] = useSearchParams();
	const token = myparams.get("token");

    const [uname,setuname] = useState();
    const [newp,setnewp] = useState();
    const [cnewp,setcnewp] = useState();
    const [flag,setflag] = useState();
    const [msg,setmsg] = useState();

    useEffect(()=>
    {
        fetchdata()
    },[])

    var fetchdata = async()=>
    {
        try
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/checktoken?token=${token}`)

            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===1)
				{
					setuname(result.username);
					setflag(true);
				}
				else
				{
					setmsg(result.msg)
					setflag(false);
				}
                
            }
		}
		catch(e)
		{
			toast.error("Error Occured");
		}
	}



    var onsubmit=async(e)=>
    {
        e.preventDefault();
        try
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/resetpassword`)
            //put api call, send username,password. Encrypt password in api and update the record

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
                    <li className="active">Reset Password</li>
                </ol>
            </div>
            </div>
            <div className="login">
		<div className="container">
            {
            flag?
            <>
			<h2>Reset Password</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form name="form1" method="post" onSubmit={onsubmit}>
				<input type="password" name="newp" onChange={(e)=>setnewp(e.target.value)} placeholder="New Password" required=" " />
				<input type="password" name="cnewp" onChange={(e)=>setcnewp(e.target.value)} placeholder="Confirm New Password" required=" " />
				
				<input type="submit" name="btn" value="Submit"/>
				</form>
			</div>
            </>:<h2>{msg}</h2>
            }
			
			
		</div>
	</div> 
        </>
    )
}
export default ResetPassword;