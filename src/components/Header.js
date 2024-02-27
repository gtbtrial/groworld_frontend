import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usercontext } from "../App";
import Cookies from "universal-cookie";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../reducers/authSlice";
var Header = () => {
    // const {userinfo,setuserinfo} = useContext(usercontext);
    const navigate = useNavigate();
    const [term,setterm] = useState();
    const cookieobj = new Cookies();

    const {isLoggedIn,personName} = useSelector((state)=>state.auth)

    const dispatch = useDispatch();

    var onlogout=()=>
    {
        dispatch(logout())
        // setuserinfo(null);
        sessionStorage.clear();
        cookieobj.remove("usercookie");
        navigate("/login");
    }
    var gotocart=()=>
    {
        navigate("/showcart");
    }
    var onsearch=(e)=>
    {
        e.preventDefault();
        navigate(`/search?q=${term}`);
    }
    return (
        <>
            <div className="agileits_header">
                <div className="container">
                    <div className="w3l_offers">
                        <p>Welcome {
                            personName                        
                        }</p>
                    </div>
                    <div className="agile-login">
                        {
                        isLoggedIn===false?
                        <ul>
                            <li><Link to="/signup"> Create Account </Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </ul>:
                        <ul>
                            <li><Link to="/orderhistory"> Order History </Link></li>
                            <li><Link to="/changepassword"> Change Password </Link></li>
                            <li><button className="btn btn-primary" onClick={onlogout}>Logout</button></li>
                        </ul>
                        }
                    </div>
                    {
                    isLoggedIn===true?
                    <div className="product_list_header">
                            <button className="w3view-cart" type="submit" onClick={gotocart} name="submit" value="">
                                <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
                            </button>
                    </div>:null
                    }
                    <div className="clearfix"> </div>
                </div>
            </div>

            <div className="logo_products">
                <div className="container">
                    <div className="w3ls_logo_products_left1">
                        <ul className="phone_email">
                            <li><i className="fa fa-phone" aria-hidden="true"></i>Order online or call us : (+0123) 234 567</li>

                        </ul>
                    </div>
                    <div className="w3ls_logo_products_left">
                        <h1><a href="index.html">super Market</a></h1>
                    </div>
                    <div className="w3l_search">
                        <form name="form1" onSubmit={onsearch}>
                            <input type="search" name="q" placeholder="Search for a Product..." required="" onChange={(e)=>setterm(e.target.value)} />
                            <button type="submit" className="btn btn-default search" aria-label="Left Align">
                                <i className="fa fa-search" aria-hidden="true"> </i>
                            </button>
                            <div className="clearfix"></div>
                        </form>
                    </div>

                    <div className="clearfix"> </div>
                </div>
            </div>
            <div className="navigation-agileits">
                <div className="container">
                    <nav className="navbar navbar-default">
                        <div className="navbar-header nav_2">
                            <button type="button" className="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-megadropdown-tabs">
                            <ul className="nav navbar-nav">
                                <li><Link to="/" className="act">Home</Link></li>
                                <li><Link to="/categories" className="act">Products</Link></li>
                                <li><Link to="/contactus" className="act">Contact Us</Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}
export default Header;