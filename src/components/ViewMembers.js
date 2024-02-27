import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
var ViewMembers = () => {
    const [userdata, setuserdata] = useState([]);
    const [flag, setflag] = useState();
    useEffect(() => {
        fetchmembers();
    }, [])
    var fetchmembers = async () => {
        try {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchmembers`)
            if (resp.ok) {
                var result = await resp.json();
                if (result.statuscode === 0) {
                    toast.error("No Members found");
                    setuserdata([]);
                    setflag(false);
                }
                else if (result.statuscode === 1) {
                    setuserdata(result.udata)
                    setflag(true);
                }
            }
        }
        catch (e) {
            toast.error("Error Occured");
        }
    }
    var deluser = async (id) => {
        var uchoice = window.confirm("Are you sure to delete?");
        if (uchoice === true) 
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/deleteuser/${id}`,
            {
                method: "delete"
            })
            if (resp.ok)
            {
                var result = await resp.json();
                if (result.statuscode === 1) 
                {
                    toast.success("User Deleted Successfully");
                    fetchmembers();
                }
                else if (result.statuscode === 0) 
                {
                    toast.info("User not deleted");

                }
            }
            else {
                toast.error("Error Occured");
            }
        }
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">View Members</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    {
                        flag ?
                            <div>
                                <h2>List of Members</h2><br />
                                <table className="timetable_sub">
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Username</th>
                                            <th>Delete</th>
                                        </tr>
                                        {
                                            userdata.map((data, i) =>
                                                <tr key={i}>
                                                    <td>{data.name}</td>
                                                    <td>{data.phone}</td>
                                                    <td>{data.username}</td>
                                                    <td><button className="btn btn-danger" onClick={() => deluser(data._id)}>Delete</button></td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table><br />
                                {userdata.length} member(s) found
                            </div> : null
                    }
                </div>
            </div>
        </>)
}
export default ViewMembers;