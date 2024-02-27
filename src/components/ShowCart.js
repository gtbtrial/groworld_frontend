import {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

var ShowCart = () => {
    const [cartdata, setcartdata] = useState([]);
    const [flag, setflag] = useState();
    const [billamt,setbillamt] = useState();
    const {isLoggedIn, uname} = useSelector((state)=>state.auth)
    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn)
        {
            fetchcart();
        }
    }, [])

    useEffect(()=>
    {
        var totcost=0;
        for(var x=0;x<cartdata.length;x++)
        {
            totcost = totcost + cartdata[x].tcost;//2400+707.52
        }
        setbillamt(totcost);
        sessionStorage.setItem("tbill",totcost);
    },[cartdata])

    var fetchcart = async () => {
        try {

            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchcart/${uname}`)
            if (resp.ok) {
                var result = await resp.json();
                if (result.statuscode === 0) {
                    setcartdata([]);
                    setflag(false);
                }
                else if (result.statuscode === 1) {
                    setcartdata(result.cdata)
                    setflag(true);
                }
            }
        }
        catch (e) {
            toast.error("Error Occured fetching cart " + e);
        }
    }
    var delitem = async (id) => {
        var uchoice = window.confirm("Are you sure to delete?");
        if (uchoice === true) 
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/delcartprod/${id}`,
            {
                method: "delete"
            })
            if (resp.ok)
            {
                var result = await resp.json();
                if (result.statuscode === 1) 
                {
                    toast.success("Item Deleted from cart");
                    fetchcart();
                }
                else if (result.statuscode === 0) 
                {
                    toast.info("Item not deleted");

                }
            }
            else {
                toast.error("Error Occured");
            }
        }
    }

    var oncheckout=()=>
    {
        navigate("/checkout");
    }


    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Cart</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    {
                        flag ?
                            <div>
                                <h2>Your shopping cart</h2><br />
                                <table className="timetable_sub">
                                    <tbody>
                                        <tr>
                                            <th>Picture</th>
                                            <th>Name</th>
                                            <th>Rate</th>
                                            <th>Quantity</th>
                                            <th>Total Cost</th>
                                            <th>Delete</th>
                                        </tr>
                                        {
                                            cartdata.map((data, i) =>
                                                <tr key={i}>
                                                    <td><img height='75' alt="Product" src={`uploads/${data.picture}`}/></td>
                                                    <td>{data.pname}</td>
                                                    <td>{data.rate}</td>
                                                    <td>{data.qty}</td>
                                                    <td>{data.tcost}</td>
                                                    <td><button className="btn btn-danger" onClick={() => delitem(data._id)}>Delete</button></td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table><br />
                                {cartdata.length} products(s) added in your cart<br/><br/>

                                Your total bill amount is Rs.{billamt}<br/><br/>

                                <button className="btn btn-primary" onClick={() => oncheckout()}>Checkout</button>
                            </div> : <h2>No product added in cart yet</h2>
                    }
                </div>
            </div>
        </>)
}
export default ShowCart;