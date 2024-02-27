import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

var ActivateAccount = () => {
    const [params] = useSearchParams();
    const token=params.get("token");
    const [status,setstatus] = useState(false);
    useEffect(()=>
	{
		activateaccount();
	},[])
    var activateaccount=async()=>
    {
        try
        {
            var updatedata = {token};
           var resp = await fetch(`${process.env.REACT_APP_APIURL}/activateaccount`,
			{
				method:"put",
				body:JSON.stringify(updatedata),
				headers: {'Content-type': 'application/json'}
			})

            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===1)
                {
                  setstatus(true)
                }
                else if(result.statuscode===0)
                {
                  setstatus(false)
                }
                else
                {
                    setstatus(false)
                    toast.error("Error Occured");
                }
                
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
                    <li className="active">Activate Account</li>
                </ol>
            </div>
            </div>
            <div className="top-brands">
                <div className="container">
                    {
                    status?
                    <h2>Account activated successfully</h2>:<h2>Problem while activating</h2>
                    }
                </div>
            </div>
        </>
    )
}
export default ActivateAccount;