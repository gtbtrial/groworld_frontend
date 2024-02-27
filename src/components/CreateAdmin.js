import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
var CreateAdmin = () => {
    const [pname, setpname] = useState();
    const [phone, setphone] = useState();
    const [uname, setuname] = useState();
    const [pass, setpass] = useState();
    const [cpass, setcpass] = useState();
    const navigate = useNavigate();
    var onsignup = async (e) => {
        try {
            e.preventDefault();
            if (cpass === pass) {
                var signupdata = { pname, phone, uname, pass,utype:"admin" }
               var resp = await fetch(`${process.env.REACT_APP_APIURL}/signup`,
                    {
                        method: "post",
                        body: JSON.stringify(signupdata),
                        headers: { 'Content-type': 'application/json' }
                    })
                if (resp.ok) {
                    var result = await resp.json();//{statuscode:1 or 0}, converting json string to json object
                    if (result.statuscode === 1) {
                        toast.success("Admin Created Successfully")
                    }
                    else if (result.statuscode === -1) {
                        if (result.errcode === 11000) {
                            toast.info("You have already created an account. Please login");
                        }
                    }
                    else {
                        toast.error("Signup Failed")
                    }
                }
                else {
                    toast.error("Error Occured");
                }
            }
            else {
                toast.warning("Password and confirm password doesn't match");
            }
        }
        catch(e)
        {
            toast.error(e);
        }
    }
    return (
        <>

            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Create Admin</li>
                    </ol>
                </div>
            </div>
            <div className="register">
                <div className="container">
                    <h2>Create Admin</h2>
                    <div className="login-form-grids">
                        <h5>profile information</h5>
                        <form name="form1" onSubmit={onsignup} >
                            <input type="text" name="pname" onChange={(e) => setpname(e.target.value)} placeholder="Name..." required=" " />
                            <input type="text" name="phone" onChange={(e) => setphone(e.target.value)} placeholder="Phone..." required=" " />

                            <h6>Login information</h6>
                            <input type="email" name="email" onChange={(e) => setuname(e.target.value)} placeholder="Email Address(Username)" required=" " />
                            <input type="password" name="pass" onChange={(e) => setpass(e.target.value)} placeholder="Password" required=" " />
                            <input type="password" name="cpass" onChange={(e) => setcpass(e.target.value)} placeholder="Password Confirmation" required=" " />

                            <input type="submit" value="Create Admin" /><br /><br />
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}
export default CreateAdmin;