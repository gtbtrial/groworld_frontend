import { useState } from "react";
import { Link,  useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
var UpdateStatus=()=>
{
    const [params] = useSearchParams();
    const orderid=params.get("oid");
    const status=params.get("currst");
    const [newst,setnewst] = useState();
	var onupdate=async(e)=>
	{
		e.preventDefault();
		try{
			var updateata = {orderid,newst};
			var resp = await fetch(`${process.env.REACT_APP_APIURL}/updatestatus`,
			{
				method:"put",
				body:JSON.stringify(updateata),
				headers: {'Content-type': 'application/json'}
			})
			if(resp.ok)
			{
				var result = await resp.json();
				if(result.statuscode===0)
				{
					toast.error("Error while updating status")
				}
				else if(result.statuscode===1)
				{
					toast.success("Status updated successfully");
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
				<li className="active">Update Status</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Update Status</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form name="form1" method="post" onSubmit={onupdate}>
                    <b>Order ID:</b> {orderid}<br/>
                    <b>Current Status:</b> {status}<br/>
                    <b>Choose New Status </b>
                    <select name="newst" onChange={(e)=>setnewst(e.target.value)}>
                        <option value="">Choose</option>
                        <option>Confirmed</option>
                        <option>Shipped</option>
                        <option>In-Transit</option>
                        <option>Out for Delivery</option>
                        <option>Delivered</option>
                        <option>Rejected</option>
                        <option>Cancelled</option>
                    </select>
				<input type="submit" name="btn" value="Update Status"/>
				</form>
			</div>
			
			
		</div>
	</div> 
    </>)
}
export default UpdateStatus;