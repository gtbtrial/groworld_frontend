import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
var ViewOrders = () => {
    const [ordersdata, setordersdata] = useState([]);
    const [flag, setflag] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        fetchorders();
    }, [])
    var fetchorders = async () => {
        try {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchorders`)
            if (resp.ok) {
                var result = await resp.json();
                if (result.statuscode === 0) {
                    toast.error("No orders found");
                    setordersdata([]);
                    setflag(false);
                }
                else if (result.statuscode === 1) {
                    setordersdata(result.odata)
                    setflag(true);
                }
            }
        }
        catch (e) {
            toast.error("Error Occured");
        }
    }
    var updatestatus=(id,st)=>
    {
        navigate(`/updatestatus?oid=${id}&currst=${st}`)
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">View Orders</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    {
                        flag ?
                            <div>
                                <h2>List of Orders</h2><br />
                                <table className="timetable_sub">
                                    <tbody>
                                        <tr>
                                            <th>OrderID</th>
                                            <th>Full Address</th>
                                            <th>Amount</th>
                                            <th>Username</th>
                                            <th>OrderDate</th>
                                            <th>Status</th>
                                            <th>Update</th>
                                        </tr>
                                        {
                                            ordersdata.map((data, i) =>
                                                <tr key={i}>
                                                    <td><Link to={`/orderitems?oid=${data._id}`}>{data._id}</Link></td>
                                                    <td>{data.address}, {data.city}, {data.state}, {data.phone}</td>
                                                    <td>{data.billamount}</td>
                                                    <td>{data.username}</td>
                                                    <td>{data.orderdt}</td>
                                                    <td>{data.status}</td>
                                                    <td><button className="btn btn-danger" onClick={() => updatestatus(data._id,data.status)}>Update</button></td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table><br />
                                {ordersdata.length} orders(s) found
                            </div> : null
                    }
                </div>
            </div>
        </>)
}
export default ViewOrders;