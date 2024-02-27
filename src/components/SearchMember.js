import { useState } from "react";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
var SearchMember=()=>
{
	const [uname,setuname] = useState();
    const [userdata,setuserdata] = useState({});
    const [flag,setflag] = useState();
	var onsearch=async(e)=>
	{
		e.preventDefault();
		try{
			var resp = await fetch(`${process.env.REACT_APP_APIURL}/searchuser?un=${uname}`)
			if(resp.ok)
			{
				var result = await resp.json();
				if(result.statuscode===0)
				{
					toast.error("Incorrect Username");
                    setuserdata({});
                    setflag(false);
				}
				else if(result.statuscode===1)
				{
                    setuserdata(result.udata)
                    setflag(true);
				}
			}

		}
		catch(e)
		{
			toast.error("Error Occured");
		}
	}
    return(
    <>
        <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Search Member</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Search Member</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form name="form1" method="post" onSubmit={onsearch}>
				<input type="email" name="email" onChange={(e)=>setuname(e.target.value)} placeholder="Email Address" required=" " />
				
				<input type="submit" name="btn" value="Search"/>
                <br/>
                {
                    flag?
                    <div>
                        Name: {userdata.name}<br/>
                        Username: {userdata.username}<br/>
                        Phone: {userdata.phone}
                    </div>:null
                }
				</form>
			</div>
		</div>
	</div> 
    </>)
}
export default SearchMember;