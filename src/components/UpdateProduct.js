import { useEffect, useState } from "react";
import { Link, useSearchParams} from "react-router-dom";
import { toast } from "react-toastify";
var UpdateProduct=()=>
{
	const [cat,setcat] = useState("");
	const [subcat,setsubcat] = useState("");
	const [pname,setpname] = useState();
    const [rate,setrate] = useState();
	const [dis,setdis] = useState();
	const [stock,setstock] = useState();
    const [descrip,setdescrip] = useState();
    const [feat,setfeat] = useState();
	const [pic,setpic] = useState(null);

    const [allcat,setallcat] = useState([]);
    const [subcatlist,setsubcatlist] = useState([]);

    const [params] = useSearchParams();
    const pid = params.get("prodid");

    const [picname,setpicname] = useState();

    var fetchcategories=async ()=>
    {
        try
        {
           var resp = await fetch("${process.env.REACT_APP_APIURL}/fetchallcat");

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

    useEffect(()=>
    {
        fetchproddetails();
    },[])

    var fetchproddetails=async()=>
    {
        try
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchproductbyprodid?prodid=${pid}`);

            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===1)
                {
                    setcat(result.proddata.CatID);
                    setsubcat(result.proddata.SubCatID);
                    setpname(result.proddata.ProdName);
                    setrate(result.proddata.Rate);
                    setdis(result.proddata.Discount);
                    setstock(result.proddata.Stock);
                    setdescrip(result.proddata.Description);
                    setfeat(result.proddata.Featured);
                    setpicname(result.proddata.Picture);                
                }
                else if(result.statuscode===0)
                {
                   toast.error("No details of product available");
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

	var onupdate=async()=>
	{
        const formData = new FormData();
        formData.append("catid",cat);
        formData.append("scid",subcat);
        formData.append("prodname",pname);
        formData.append("rate",rate);
        formData.append("discount",dis);
        formData.append("stock",stock);
        formData.append("descrip",descrip);
        formData.append("featured",feat);
        if(pic!==null)
        {
            formData.append('prodpic', pic);
        }
        formData.append("oldpicname",picname);
        formData.append("pid",pid);
		try
        {
			var resp = await fetch(`${process.env.REACT_APP_APIURL}/updateproduct`,
			{
				method:"put",
				body:formData
			})
			if(resp.ok)
			{
				var result = await resp.json();
				if(result.statuscode===1)
				{
					toast.success("Product updated successfully");
				}
				else if(result.statuscode===0)
				{
					toast.error("Product not updated");
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
        if(cat!=="")
        {
            fetchsubcat();
        }
    },[cat])

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
    return(
    <>
        <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Update Product</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Update Product</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				
                <select name="cat" className="form-control" value={cat} onChange={(e)=>setcat(e.target.value)}>
                    <option value="">Choose Category</option>
                    {
                        allcat.map((cat,i)=>
                            <option value={cat._id} key={i}>{cat.catname}</option>
                        )
                    }
                </select><br/>

                <select name="subcat" className="form-control" value={subcat} onChange={(e)=>setsubcat(e.target.value)}>
                    <option value="">Choose Sub Category</option>
                    {
                        subcatlist.map((data,i)=>
                            <option value={data._id} key={i}>{data.subcatname}</option>
                        )
                    }
                </select><br/>
                
                <input type="text" name="pname" value={pname} onChange={(e)=>setpname(e.target.value)} placeholder="Product Name" required=" " /><br/>

				<input type="text" name="rate" value={rate} onChange={(e)=>setrate(e.target.value)} placeholder="Rate" required=" " /><br/>

				<input type="text" name="dis" value={dis} onChange={(e)=>setdis(e.target.value)} placeholder="Discount" required=" " /><br/>

				<input type="text" name="stock" value={stock} onChange={(e)=>setstock(e.target.value)} placeholder="Stock" required=" " /><br/>
                
				<textarea name="descp" onChange={(e)=>setdescrip(e.target.value)} placeholder="Description" className="form-control" value={descrip} required=" "></textarea><br/>

                Featured &nbsp;
            <label><input type="radio" name="featured" checked={feat==='yes'}  value="yes" onChange={(e)=>setfeat(e.target.value)}/>Yes</label>&nbsp;
            <label><input type="radio" name="featured" checked={feat==='no'} value="no" onChange={(e)=>setfeat(e.target.value)}/>No</label><br/><br/>
            
            <img height='75' alt="Product" src={`uploads/${picname}`}/><br/>
				<br/>
                <b>Choose new image, if required</b><br/>
                <input type="file" name="ppic" onChange={(e)=>setpic(e.target.files[0])} />

				<input type="submit" name="btn" value="Update" onClick={onupdate}/>
			</div>
		</div>
	</div> 
    </>)
}
export default UpdateProduct;