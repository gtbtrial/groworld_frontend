import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
var Checkout=()=>
{
	const [saddr,setsaddr] = useState();
	const [city,setcity] = useState();
	const [state,setstate] = useState();
	const [phone,setphone] = useState();
	const navigate = useNavigate();
	const [cartdata, setcartdata] = useState([]);
	const {isLoggedIn,uname} = useSelector((state)=>state.auth)
	useEffect(() => {
		if(isLoggedIn)
		{
			fetchcart();
		}
    }, [])

	var fetchcart = async () => {
        try {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchcart/${uname}`)
            if (resp.ok) {
                var result = await resp.json();
                if (result.statuscode === 0) {
                    setcartdata([]);
                }
                else if (result.statuscode === 1) 
				{
                    setcartdata(result.cdata)
                }
            }
        }
        catch (e) {
            toast.error("Error Occured fetching cart " + e);
        }
    }

	var oncheckout=async(e)=>
	{
		e.preventDefault();
		try{
            var billamount = sessionStorage.getItem("tbill");
			var orderdata = {saddr,city,state,phone,uname,billamount,cartdata};
			var resp = await fetch(`${process.env.REACT_APP_APIURL}/saveorder`,
			{
				method:"post",
				body:JSON.stringify(orderdata),
				headers: {'Content-type': 'application/json'}
			})
			if(resp.ok)
			{
				var result = await resp.json();
				if(result.statuscode===0)
				{
					toast.error("Problem while confirming order");
				}
				else if(result.statuscode===1)
				{
					navigate("/ordersummary");
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
				<li className="active">Checkout</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Checkout</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form name="form1" method="post" onSubmit={oncheckout}>
				<textarea className="form-control" onChange={(e)=>setsaddr(e.target.value)} placeholder="Shipping Address"></textarea><br/>
                <input type="text" name="city" onChange={(e)=>setcity(e.target.value)} placeholder="City" required=" " /><br/>
                <input type="text" name="state" onChange={(e)=>setstate(e.target.value)} placeholder="State" required=" " /><br/>
                <input type="text" name="phone" onChange={(e)=>setphone(e.target.value)} placeholder="Phone" required=" " /><br/>
                Payment Mode will be Cash on Delivery<br/>
				<input type="submit" name="btn" value="Checkout"/>


				</form>
			</div>
			
			
		</div>
	</div> 
    </>)
}
export default Checkout;