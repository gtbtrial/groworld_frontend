import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

var SubCategories = () => {
    const [params] = useSearchParams();
    const cat=params.get("id");
    const [subcatlist,setsubcatlist] = useState([]);
    useEffect(()=>
	{
		fetchsubcat();
	},[])
    var fetchsubcat=async()=>
    {
        try
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchsubcat/${cat}`);

            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===1)
                {
                   setsubcatlist(result.subcatdata);
                }
                else if(result.statuscode===0)
                {
                   setsubcatlist([])
                }
                else
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
            <div className="top-brands">
                <div className="container">
                    <h2>Sub Categories</h2><br/>
                    {
                    subcatlist.length>0?
                    subcatlist.map((data,index)=>
                    <div className="col-md-4 top_brand_left" key={index}>
                        <div className="hover14 column">
                            <div className="agile_top_brand_left_grid">
                                <div className="agile_top_brand_left_grid1">
                                    <figure>
                                        <div className="snipcart-item block" >
                                            <div className="snipcart-thumb">
                                                <Link to={`/products?id=${data._id}`}>
                                                <img src={`uploads/${data.picture}`} height='125' alt="Category"/>
                                                </Link>
                                                <p>{data.subcatname}</p>
                                            </div>
                                        </div>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>):<h3>No Sub Categories Found</h3>
                    }
                </div>
            </div>
        </>
    )
}
export default SubCategories;