import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

var ProductDetails = () => {
    const [params] = useSearchParams();
    const prodid = params.get("pid");
    const [proddetails, setproddetails] = useState({});
    const [remcost, setremcost] = useState();
    const [stockavail, setstockavail] = useState([]);
    const [qty, setqty] = useState();
    const navigate = useNavigate();
    const {isLoggedIn, uname} = useSelector((state)=>state.auth)

    const [piclist,setpiclist] = useState([]);


    useEffect(() => {
        fetchproddetails();
    }, [])

    useEffect(() => {
        setremcost(proddetails.Rate - ((proddetails.Rate * proddetails.Discount) / 100));
    }, [proddetails])

    useEffect(() => {
        var availstock = [];
        if (proddetails.Stock > 10) {
            for (var x = 1; x <= 10; x++) {
                availstock.push(x)
            }
        }
        else {
            for (x = 1; x <= proddetails.Stock; x++) {
                availstock.push(x)
            }
        }
        setstockavail(availstock);
    }, [proddetails])

    var fetchproddetails = async () => {
        try {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchproductbyprodid?prodid=${prodid}`);

            if (resp.ok) {
                var result = await resp.json();
                if (result.statuscode === 1) {
                    setproddetails(result.proddata);            
                }
                else if (result.statuscode === 0) {
                    toast.error("No details of product available");
                }
                else {
                    toast.error("Error Occured");
                }

            }
        }
        catch (e) {
            toast.error("Error Occured");
        }
    }
    var savetocart = async () => {
        if (isLoggedIn===false) {
            toast.error("Please login to add item in cart")
            navigate("/login");
        }
        else {
            var tcost = remcost * qty;
            try {
                var cartdata = { picname: proddetails.Picture, prodid, pname: proddetails.ProdName, rate: remcost, qty, tcost, uname}
               var resp = await fetch("${process.env.REACT_APP_APIURL}/savetocart",
                    {
                        method: "post",
                        body: JSON.stringify(cartdata),
                        headers: { 'Content-type': 'application/json' }
                    })
                if (resp.ok) {
                    var result = await resp.json();//{statuscode:1 or 0}, converting json string to json object
                    if (result.statuscode === 1) {
                        navigate("/showcart");
                    }
                    else {
                        toast.error("Item not added to cart, try again")
                    }
                }
                else {
                    toast.error("Error Occured");
                }
            }
            catch (e) {
                toast.error(e);
            }
        }
    }

    useEffect(()=>
	{
		fetchproductpics();
	},[])
    var fetchproductpics=async()=>
    {
        try
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchproductimages/${prodid}`);

            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===1)
                {
                   setpiclist(result.pics);
                }
                else if(result.statuscode===-1)
                {
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
                        <li className="active">Product Details</li>
                    </ol>
                </div>
            </div>
            <div className="products">
                <div className="container">
                    <div className="agileinfo_single">

                        <div className="col-md-4 agileinfo_single_left">
                            <img id="example" src={`uploads/${proddetails.Picture}`} alt=" " className="img-responsive" />
                        </div>
                        <div className="col-md-8 agileinfo_single_right">
                            <h2>{proddetails.ProdName}</h2>

                            <div className="w3agile_description">
                                <h4>Description :</h4>
                                <p>{proddetails.Description}</p>
                            </div>
                            <div className="snipcart-item block">
                                <div className="snipcart-thumb agileinfo_single_right_snipcart">
                                    <h4 className="m-sing">Rs.{remcost}/- <span>Rs.{proddetails.Rate}/-</span></h4>
                                </div>
                                {
                                    proddetails.Stock >= 1 ?
                                        <div className="snipcart-details agileinfo_single_right_details">
                                            <select name="qty" className="form-control" onChange={(e) => setqty(e.target.value)}>
                                                <option value="">Choose Quantity</option>
                                                {
                                                    stockavail.map((data, i) =>
                                                        <option key={i}>{data}</option>)
                                                }
                                            </select>
                                            <br />
                                            <input type="submit" name="submit" value="Add to cart" onClick={savetocart} className="button" />

                                        </div> : "Out of Stock"
                                }
                            </div>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                </div>
            </div>

            <div className="top-brands">
                <div className="container">
                    <h2>Products Images</h2><br/>
                    {
                    piclist.length>0?
                    piclist.map((picname,index)=>
                    <div className="col-md-4 top_brand_left" key={index}>
                        <div className="hover14 column">
                            <div className="agile_top_brand_left_grid">
                                <div className="agile_top_brand_left_grid1">
                                    <figure>
                                        <div className="snipcart-item block" >
                                            <div className="snipcart-thumb">
                                                <img src={`uploads/${picname}`} height='125' alt="Product"/>
                                            </div>
                                        </div>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>):<h3>No extra images Found</h3>
                    }
                </div>
            </div>
        </>
    )
}
export default ProductDetails;