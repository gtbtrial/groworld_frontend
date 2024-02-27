import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
var ManageSubCategory=()=>
{
	const [cat,setcat] = useState("");
	const [subcat,setsubcat] = useState();
	const [pic,setpic] = useState(null);
    const [allcat,setallcat] = useState([]);
    
    const [subcatlist,setsubcatlist] = useState([]);

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
        formData.append("catid",cat);
        formData.append("scname",subcat);
        if(pic!==null)
        {
            formData.append('scatpic', pic);
        }
		try{
			var resp = await fetch(`${process.env.REACT_APP_APIURL}/savesubcategory`,
			{
				method:"post",
				body:formData
			})
			if(resp.ok)
			{
				var result = await resp.json();
				if(result.statuscode===1)
				{
					toast.success("Sub Category added successfully");
                    fetchsubcat();
				}
				else if(result.statuscode===0)
				{
					toast.error("Sub Category not added");
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
    var onupdate=(scid)=>
    {
        // navigate(`/updatesubcategory?subcatid=${scid}`);
        navigate({
            pathname: '/updatesubcategory',
            search: `?subcatid=${scid}`,
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
				<li className="active">Manage Sub Category</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Manage Sub Category</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				
                <select name="cat" className="form-control" onChange={(e)=>setcat(e.target.value)}>
                    <option value="">Choose Category</option>
                    {
                        allcat.map((cat,i)=>
                            <option value={cat._id} key={i}>{cat.catname}</option>
                        )
                    }
                    
                </select>

				<input type="text" name="scatname" onChange={(e)=>setsubcat(e.target.value)} placeholder="Sub Category Name" required=" " />
				<br/>
                <input type="file" name="scatpic" onChange={(e)=>setpic(e.target.files[0])} />

				<input type="submit" name="btn" value="Add" onClick={onadd}/>
			
			</div>
            {
			subcatlist.length>0?
			<div>
				<h2>Added Sub Categories</h2><br/>
				<table className="timetable_sub">
					<tbody>
						<tr>
							<th>Picture</th>
							<th>Sub Category Name</th>
							<th>Update</th>
							<th>Delete</th>
						</tr>
						{
							subcatlist.map((data,i)=>
							<tr key={i}>
								<td><img height='75' alt="Category" src={`uploads/${data.picture}`}/></td>
								<td>{data.subcatname}</td>
						<td><button className="btn btn-primary" onClick={()=>onupdate(data._id)}>Update</button></td>
								<td><button className="btn btn-danger" onClick={()=>ondel(data._id)}>Delete</button></td>
							</tr>
							)
						}
						
					</tbody>
				</table>
			</div>:null
			}
		</div>
	</div> 
    </>)
}
export default ManageSubCategory;