import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
var ManageCategory=()=>
{
	const [catname,setcatname] = useState();
	const [pic,setpic] = useState(null);
	const [allcat,setallcat] = useState([]);

	const [picname,setpicname] = useState();
	const [editmode,seteditmode] = useState(false);
	const [catid,setcatid] = useState();

	var btnclick=async()=>
	{
		const formData = new FormData();
		if(editmode===false)
		{
			formData.append("cname",catname);
			if(pic!==null)
			{
				formData.append('catpic', pic);
			}
			try{
				var resp = await fetch(`${process.env.REACT_APP_APIURL}/savecategory`,
				{
					method:"post",
					body:formData,
					headers:{authorization:`bearer ${sessionStorage.getItem("token")}`}
				})
				if(resp.ok)
				{
					var result = await resp.json();
					if(result.statuscode===1)
					{
						toast.success("Category added successfully");
						fetchcategories();
					}
					else
					{
						toast.error("Category not added");
					}
				}

			}
			catch(e)
			{
				toast.error("Error Occured");
			}
		}
		else
		{
			formData.append("cname",catname);//either oldname or newname
			if(pic!==null)
			{
				formData.append('catpic', pic);
			}
			formData.append("oldpicname",picname);//if admin will choose new image then we will use oldpicname for deleting old image, else we will store oldpicname again in database

			formData.append("cid",catid);

			try{
				var resp = await fetch(`${process.env.REACT_APP_APIURL}/updatecategory`,
				{
					method:"put",
					body:formData
				})
				if(resp.ok)
				{
					result = await resp.json();
					if(result.statuscode===1)
					{
						toast.success("Category Updated successfully");
						fetchcategories();
						oncancel();
					}
					else
					{
						toast.error("Category not updated");
					}
				}

			}
			catch(e)
			{
				toast.error("Error Occured");
			}
		}
        
	}
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

	useEffect(()=>
	{
		fetchcategories();
	},[])

	var delcat=async(id)=>
	{
		var uchoice = window.confirm("Are you sure to delete?");
        if (uchoice === true) 
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/deletecat/${id}`,
            {
                method: "delete"
            })
            if (resp.ok)
            {
                var result = await resp.json();
                if (result.statuscode === 1) 
                {
                    toast.success("Category Deleted Successfully");
                    fetchcategories();
                }
                else if (result.statuscode === 0) 
                {
                    toast.info("Category not deleted");

                }
            }
            else {
                toast.error("Error Occured");
            }
        }
	}

	var onupdate=(catdata)=>
	{
		seteditmode(true);
		setcatname(catdata.catname)
		setpicname(catdata.picture)
		setcatid(catdata._id);
	}
	var oncancel=()=>
	{
		seteditmode(false);
		setcatname("")
		setpicname("")
	}

    return(
    <>
        <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Manage Category</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Manage Category</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				

	<input type="text" name="catname" value={catname} onChange={(e)=>setcatname(e.target.value)} placeholder="Category Name" required=" " />
				<br/>

				{editmode?
				<div>
					<img src={`uploads/${picname}`} height='75' alt="Category"/><br/>
					<b>Choose new image, if required</b>
				</div>:null
				}

                <input type="file" name="catpic" onChange={(e)=>setpic(e.target.files[0])} />

				<input type="submit" name="btn" value={editmode?"Update":"Add"} onClick={btnclick}/>
				{editmode?<input type="submit" name="btn" value="Cancel" onClick={oncancel}/>:null}
			
			</div><br/>
			{
			allcat.length>0?
			<div>
				<h2>Added Categories</h2><br/>
				<table className="timetable_sub">
					<tbody>
						<tr>
							<th>Picture</th>
							<th>Category Name</th>
							<th>Update</th>
							<th>Delete</th>
						</tr>
						{
							allcat.map((data,i)=>
							<tr key={i}>
								<td><img height='75' alt="Category" src={`uploads/${data.picture}`}/></td>
								<td>{data.catname}</td>
							<td><button className="btn btn-primary" onClick={()=>onupdate(data)}>Update</button></td>
								<td><button className="btn btn-danger" onClick={()=>delcat(data._id)}>Delete</button></td>
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
export default ManageCategory;