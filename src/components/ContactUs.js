import { useState } from "react";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
var ContactUs=()=>
{
	const [pname,setpname] = useState();
	const [email,setemail] = useState();
	const [phone,setphone] = useState();
	const [msg,setmsg] = useState();

	var onsubmit=async(e)=>
	{
		e.preventDefault();
		try{
			var contactdata = {pname,email,phone,msg};
			var resp = await fetch(`${process.env.REACT_APP_APIURL}/contactus`,
			{
				method:"post",
				body:JSON.stringify(contactdata),
				headers: {'Content-type': 'application/json'}
			})
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
    return(
    <>
        <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Contact Us</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Contact Us</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form name="form1" method="post" onSubmit={onsubmit}>
				<input type="text" name="pname" onChange={(e)=>setpname(e.target.value)} placeholder="Name" required=" " />
				<input type="text" name="phone" onChange={(e)=>setphone(e.target.value)} placeholder="Phone" required=" " />
				<input type="email" name="email" onChange={(e)=>setemail(e.target.value)} placeholder="Email Address" required=" " /><br/>
				<textarea name="msg" className="form-control" placeholder="Message" onChange={(e)=>setmsg(e.target.value)}></textarea>
				
				<input type="submit" name="btn" value="Send Message"/>
				</form>
			</div>
			
			
		</div>
	</div> 
    </>)
}
export default ContactUs;