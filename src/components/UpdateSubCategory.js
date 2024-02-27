import { useEffect, useState } from "react";
import { Link, useSearchParams} from "react-router-dom";
import { toast } from "react-toastify";
var UpdateSubCategory=()=>
{
	const [cat,setcat] = useState("");
	const [subcat,setsubcat] = useState();
	const [pic,setpic] = useState(null);
    const [allcat,setallcat] = useState([]);

    const [params] = useSearchParams();
    const scid = params.get("subcatid");
    
    const [subcatinfo,setsubcatinfo]=useState({});

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
    var fetchsubcatdetails=async()=>
    {
        try
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchsubcatdetails?subcatid=${scid}`);

            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===1)
                {
                   setsubcatinfo(result.subcatdata);
                   setcat(result.subcatdata.catid);
                   setsubcat(result.subcatdata.subcatname);
                }
                else if(result.statuscode===0)
                {
                   toast.error("No details of sub category available");
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
        formData.append("scname",subcat);
        if(pic!==null)
        {
            formData.append('scatpic', pic);
        }
        formData.append("oldpicname",subcatinfo.picture);
        formData.append("subcatid",scid);
		try{
			var resp = await fetch(`${process.env.REACT_APP_APIURL}/updatesubcategory`,
			{
				method:"put",
				body:formData
			})
			if(resp.ok)
			{
				var result = await resp.json();
				if(result.statuscode===1)
				{
					toast.success("Sub Category updated successfully");
				}
				else if(result.statuscode===0)
				{
					toast.error("Sub Category not updated");
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
        fetchsubcatdetails();
    },[])

    return(
    <>
        <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Update Sub Category</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Update Sub Category</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				
                <select name="cat" className="form-control" value={cat} onChange={(e)=>setcat(e.target.value)}>
                    <option value="">Choose Category</option>
                    {
                        allcat.map((cat,i)=>
                            <option value={cat._id} key={i}>{cat.catname}</option>
                        )
                    }
                    
                </select>

				<input type="text" value={subcat} name="scatname" onChange={(e)=>setsubcat(e.target.value)} placeholder="Sub Category Name" required=" " />
				<br/>

                <img height='75' alt="SubCategory" src={`uploads/${subcatinfo.picture}`}/><br/>
                Choose new image, if required<br/><br/>

                <input type="file" name="scatpic" onChange={(e)=>setpic(e.target.files[0])} />

				<input type="submit" name="btn" value="Update" onClick={onupdate}/>
			
			</div>
		</div>
	</div> 
    </>)
}
export default UpdateSubCategory;