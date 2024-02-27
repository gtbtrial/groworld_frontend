import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { toast } from 'react-toastify';
var Home = () => {
    const spanStyle = {
        padding: '20px',
        background: '#efefef',
        color: '#000000'
      }
      
      const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '400px'
      }
      const slideImages = [
        {
          url: 'images/11.jpg',
          caption: 'Slide 1'
        },
        {
          url: 'images/22.jpg',
          caption: 'Slide 2'
        },
        {
          url: 'images/44.jpg',
          caption: 'Slide 3'
        },
      ];

      const [prodslist,setprodslist] = useState([]);
      useEffect(()=>
      {
          fetchlatestproducts();
      },[])
      var fetchlatestproducts=async()=>
      {
          try
          {
              var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchlatestprods`);
  
              if(resp.ok)
              {
                  var result = await resp.json();
                  if(result.statuscode===1)
                  {
                     setprodslist(result.prodsdata);
                  }
                  else if(result.statuscode===0)
                  {
                      setprodslist([]);
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
            <div className="slide-container">
                <Slide>
                {slideImages.map((slideImage, index)=> (
                    <div key={index}>
                    <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                    </div>
                    </div>
                ))} 
                </Slide>
            </div>

            <div className="top-brands">
                <div className="container">
                    <h2>Latest Products</h2><br/>
                    {
                    prodslist.length>0?
                    prodslist.map((data,index)=>
                    <div className="col-md-4 top_brand_left" key={index}>
                        <div className="hover14 column">
                            <div className="agile_top_brand_left_grid">
                                <div className="agile_top_brand_left_grid1">
                                    <figure>
                                        <div className="snipcart-item block" >
                                            <div className="snipcart-thumb">
                                                <Link to={`/productdetails?pid=${data._id}`}>
                                                <img src={`uploads/${data.Picture}`} height='125' alt="Product"/>
                                                </Link>
                                                <p>{data.ProdName}</p>
                                            </div>
                                        </div>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>):<h3>No products Found</h3>
                    }
                </div>
            </div>
        </>
    )
}
export default Home;