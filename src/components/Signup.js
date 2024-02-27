import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
var Signup = () => {
    const [pname, setpname] = useState("");
    const [phone, setphone] = useState("");
    const [uname, setuname] = useState("");
    const [pass, setpass] = useState("");
    const [cpass, setcpass] = useState("");
    const [terms, setterms] = useState();
    const navigate = useNavigate();
    const [verrors, setverrors] = useState({});
    var validateForm=()=>
    {
        const errors = {};
        if(pname.length<3)
        {
            errors.pname = 'Name must be at least 3 characters long';
        }

        if (!/^\d{10}$/.test(phone)) {
			errors.phone = 'Phone must be a 10-digit number';
		}

        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(uname)) {
			errors.email = 'Invalid email format';
		}

        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}/.test(pass)) {
			errors.password =
				'Password must contain at least 1 uppercase, 1 number, 1 special character, and be at least 6 characters long';
		}

        if (pass !== cpass) 
        {
			errors.passmatch = 'Password and confirm password does not match';
		}

        if (terms!==true) 
        {
			errors.terms = 'Please accept terms and conditions';
		}

        setverrors(errors);
        if(Object.keys(errors).length>0)
        {
            return false
        }
        else
        {
            return true
        }

        // return Object.keys(errors).length !== 0 ? false : true;
    }



    var onsignup = async (e) => {
        try 
        {
            e.preventDefault();
            if (validateForm() === true) 
            {
                var signupdata = { pname, phone, uname, pass,utype:"normal" }
                var resp = await fetch(`${process.env.REACT_APP_APIURL}/signup`,
                    {
                        method: "post",
                        body: JSON.stringify(signupdata),
                        headers: { 'Content-type': 'application/json' }
                    })
                if (resp.ok) {
                    var result = await resp.json();//{statuscode:1 or 0}, converting json string to json object
                    if (result.statuscode === 1) {
                        toast.success("Signup Successfull")
                        navigate("/login");
                    }
                    else if (result.statuscode === -1) {
                        if (result.errcode === 11000) {
                            toast.info("You have already created an account. Please login");
                        }
                        else
                        {
                            toast.error("Error Occured while signing up");
                        }
                    }
                    else if(result.statuscode===-2)
                    {
                        toast.info("Error while sending mail");
                    }
                    else 
                    {
                        toast.error("Signup Failed")
                    }
                }
                else {
                    toast.error("Error Occured");
                }
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
                        <li className="active">Register Page</li>
                    </ol>
                </div>
            </div>
            <div className="register">
                <div className="container">
                    <h2>Register Here</h2>
                    <div className="login-form-grids">
                        <h5>profile information</h5>
                        <form name="form1" onSubmit={onsignup} >
                            <input type="text" name="pname" onChange={(e) => setpname(e.target.value)} placeholder="Name..." required=" " />
                            {verrors.pname?<span>{verrors.pname}</span>:null}

                            <input type="text" name="phone" onChange={(e) => setphone(e.target.value)} placeholder="Phone..." required=" " />
                            {verrors.phone?<span>{verrors.phone}</span>:null}

                            <h6>Login information</h6>
                            <input type="email" name="email" onChange={(e) => setuname(e.target.value)} placeholder="Email Address(Username)" required=" " />
                            
                            {verrors.email?<span>{verrors.email}</span>:null}

                            <input type="password" name="pass" onChange={(e) => setpass(e.target.value)} placeholder="Password" required=" " />
                            
                            {verrors.password?<span>{verrors.password}</span>:null}

                            <input type="password" name="cpass" onChange={(e) => setcpass(e.target.value)} placeholder="Password Confirmation" required=" " />
                            
                            {verrors.passmatch?<span>{verrors.passmatch}</span>:null}

                            <div class="register-check-box">
                            <div class="check">
                                <label class="checkbox">
                                <input type="checkbox" onChange={(e)=>setterms(e.target.checked)}  name="checkbox"/><i> </i>I accept the terms and conditions</label>
                                {verrors.terms?<span>{verrors.terms}</span>:null}
                            </div>
                            </div>

                            <input type="submit" value="Register"/><br /><br />
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Signup;