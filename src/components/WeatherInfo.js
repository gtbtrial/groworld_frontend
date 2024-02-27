import { useState } from "react";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
var WeatherInfo=()=>
{
	const [city,setcity] = useState();
    const [wdata,setwdata] = useState({});
    const [flag,setflag] = useState();
	var onsearch=async(e)=>
	{
		e.preventDefault();
		try{
			var resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0cef9ce50886d905c871f0dd52775df4&units=metric`)
			if(resp.ok)
			{
				var result = await resp.json();
                setwdata(result)
                setflag(true);
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
				<li className="active">Search Member</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Search Weather</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form name="form1" method="post" onSubmit={onsearch}>
				<input type="text" name="city" onChange={(e)=>setcity(e.target.value)} placeholder="City Name" required=" " />
				
				<input type="submit" name="btn" value="Show Weather"/>
                <br/>
                {
                    flag?
                    <div>
                        Current Temp: {wdata.main.temp}<br/>
                        Humidity: {wdata.main.humidity}<br/>
                        Wind Speed: {wdata.wind.speed}
                    </div>:null
                }
				</form>
			</div>
		</div>
	</div> 
    </>)
}
export default WeatherInfo;