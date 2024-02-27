import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './AppRoutes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from './components/AdminHeader';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './reducers/authSlice';
import { useEffect, useState } from 'react';

function App() {
  const [utype,setutype] = useState("guest");
  const [uid,setuid] = useState(null);
  const cookieobj = new Cookies();
  const dispatch = useDispatch();
  const {isLoggedIn,usertype} = useSelector((state)=>state.auth)
  useEffect(()=>
  {
    if(sessionStorage.getItem("userdata")!==null)
    {
      dispatch(login((JSON.parse(sessionStorage.getItem("userdata")))))
    }
  },[])

  useEffect(()=>
  {
    if(cookieobj.get("usercookie")!==undefined)
    {
      setuid(cookieobj.get("usercookie"));
    }
  },[])

  useEffect(()=>
  {
    if(uid!==null)
    {
      fetchdetailsbyid();
    }
  },[uid])

  var fetchdetailsbyid=async()=>
  {
    try
			{
				var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchbyuid/${uid}`)
				if(resp.ok)
				{
					var result = await resp.json();
					if(result.statuscode===1)
					{
            dispatch(login(result.udata));//state variable of app component
						sessionStorage.setItem("userdata", JSON.stringify(result.udata));
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
    if(isLoggedIn)
    {
      if(usertype==="admin")
      {
        setutype("admin");
      }
      else if(usertype==="normal")
      {
        setutype("normal");
      }
    }
    else
    {
      setutype("guest");
    }
  },[isLoggedIn])

  return (
    <>

          <ToastContainer theme="colored" />
          {
          utype==="admin"?
          <AdminHeader/>:<Header />
          }
          <AppRoutes />
          <Footer />
    </>
  );
}
export default App;
