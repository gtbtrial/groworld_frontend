import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

var Categories = () => {
    const [allcat,setallcat] = useState([]);
    useEffect(()=>
	{
		fetchcategories();
	},[])
    var fetchcategories=async ()=>
    {
        try
        {
           var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchallcat`);

            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===1)
                {
                   setallcat(result.catdata);
                }
                else if(result.statuscode===0)
                {
                   toast.error("No Categories available");
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
                    <h2>Categories</h2><br/>
                    {
                    allcat.length>0?
                    allcat.map((data,index)=>
                    <div className="col-md-4 top_brand_left" key={index}>
                        <div className="hover14 column">
                            <div className="agile_top_brand_left_grid">
                                <div className="agile_top_brand_left_grid1">
                                    <figure>
                                        <div className="snipcart-item block" >
                                            <div className="snipcart-thumb">
                                                <Link to={`/subcategories?id=${data._id}`}>
                                                <img src={`uploads/${data.picture}`} height='125' alt="Category"/>
                                                </Link>
                                                <p>{data.catname}</p>
                                            </div>
                                        </div>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>):<h3>No Categories found</h3>
                    }
                </div>
            </div>
        </>
    )
}
export default Categories;