import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

var ShowProdImages = () => {
    const [piclist,setpiclist] = useState([]);
    useEffect(()=>
	{
		fetchproductpics();
	},[])
    var fetchproductpics=async()=>
    {
        try
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchproductimages/658be25b9fc503972ce88c21`);

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
            <div className="top-brands">
                <div className="container">
                    <h2>Products</h2><br/>
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
                    </div>):<h3>No images Found</h3>
                    }
                </div>
            </div>
        </>
    )
}
export default ShowProdImages;