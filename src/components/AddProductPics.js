import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
var AddProductPics=()=>
{
	const [cat,setcat] = useState("");
	const [subcat,setsubcat] = useState("");
	const [prodid,setprodid] = useState();

    const [allcat,setallcat] = useState([]);
    const [subcatlist,setsubcatlist] = useState([]);
    const [prodslist,setprodslist] = useState([]);

    const [images, setImages] = useState([]);


    const navigate = useNavigate();

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

	var onadd=async()=>
	{
        const formData = new FormData();
        formData.append("productId",prodid);
       
        images.forEach((image) => 
        {
            formData.append('images', image);
        });

		try
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/prodimages`,
			{
				method:"post",
				body:formData
			})
			if(resp.ok)
			{
				var result = await resp.json();
				if(result.statuscode===1)
				{
					toast.success("Product images added successfully");
				}
				else if(result.statuscode===0)
				{
					toast.error("Product images not added");
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

    useEffect(()=>
    {
        fetchcategories();
    },[])

    useEffect(()=>
    {
        setsubcatlist([]);
        setprodslist([]);
        if(cat!=="")
        {
            fetchsubcat();
        }
    },[cat])

    useEffect(()=>
    {
        setprodslist([]);
        if(subcat!=="")
        {
            fetchproductsbysubcat();
        }
    },[subcat])


    var fetchproductsbysubcat=async()=>
    {
        try
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchproductsbysubcat/${subcat}`);

            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===1)
                {
                   setprodslist(result.prodsdata);
                }
                else if(result.statuscode===0)
                {
                   toast.error("No Products available");
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
                   toast.error("No Sub Categories available");
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
    var onupdate=(pid)=>
    {
        // navigate(`/updatesubcategory?subcatid=${scid}`);
        navigate({
            pathname: '/updateproduct',
            search: `?prodid=${pid}`,
        });
    }
    var ondel=()=>
    {
        
    }
    return(
    <>
        <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Add Product Images</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Manage Product</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				
                <select name="cat" className="form-control" onChange={(e)=>setcat(e.target.value)}>
                    <option value="">Choose Category</option>
                    {
                        allcat.map((cat,i)=>
                            <option value={cat._id} key={i}>{cat.catname}</option>
                        )
                    }
                </select><br/>

                <select name="subcat" className="form-control" onChange={(e)=>setsubcat(e.target.value)}>
                    <option value="">Choose Sub Category</option>
                    {
                        subcatlist.map((data,i)=>
                            <option value={data._id} key={i}>{data.subcatname}</option>
                        )
                    }
                </select><br/>

                <select name="prod" className="form-control" onChange={(e)=>setprodid(e.target.value)}>
                    <option value="">Choose Product</option>
                    {
                        prodslist.map((data,i)=>
                            <option value={data._id} key={i}>{data.ProdName}</option>
                        )
                    }
                </select><br/>

                <input type="file" name="ppic" multiple onChange={(e)=>setImages([...e.target.files])} /><br/>

				<input type="button" name="btn" value="Add" onClick={onadd}/>
			</div>
		</div>
	</div> 
    </>)
}
export default AddProductPics;