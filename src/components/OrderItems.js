import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
var OrderItems = () => {
    const [itemsdata, setitemsdata] = useState([]);
    const [flag, setflag] = useState();
    const [params] = useSearchParams();
    const orderid=params.get("oid");
    useEffect(() => {
        fetchitems();
    },[])

    var fetchitems = async () => {
        try {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchitems/${orderid}`)
            if (resp.ok) {
                var result = await resp.json();
                if (result.statuscode === 0) {
                    setitemsdata([]);
                    setflag(false);
                }
                else if (result.statuscode === 1) {
                    setitemsdata(result.idata.items)
                    setflag(true);
                }
            }
        }
        catch (e) {
            toast.error("Error Occured fetching cart " + e);
        }
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Items</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    {
                        flag ?
                            <div>
                                <h2>Order Items</h2><br />
                                <table className="timetable_sub">
                                    <tbody>
                                        <tr>
                                            <th>Picture</th>
                                            <th>Name</th>
                                            <th>Rate</th>
                                            <th>Quantity</th>
                                            <th>Total Cost</th>
                                        </tr>
                                        {
                                            itemsdata.map((data, i) =>
                                                <tr key={i}>
                                                    <td><img height='75' alt="Product" src={`uploads/${data.picture}`}/></td>
                                                    <td>{data.pname}</td>
                                                    <td>{data.rate}</td>
                                                    <td>{data.qty}</td>
                                                    <td>{data.tcost}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table><br />
                                </div> :null
                    }
                </div>
            </div>
        </>)
}
export default OrderItems;