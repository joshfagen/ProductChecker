import React,{useState} from 'react';
import './Product.css';
import { Link } from 'react-router-dom';

let fieldsetID=0;

const Product = ({asin,image,parentAsin,goodChecked}) => {

//const [goodIsChecked,setGoodIsChecked]=useState(false);


    fieldsetID++;




    const handleOptionChange = (e) => {
         changeStatus(e.target.value);   
         if(goodChecked===true) {
           goodChecked=false
         }
        console.log("You have submitted option:", e.target.value);
      };


      const changeStatus = async (value) => {
          console.log(value,parentAsin);
        try {
          const resp = await fetch(`asins/changeStatus`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: value,parentAsin,asin })
          });
    
          if (!resp.ok) {
            return console.error(resp.statusText);
          }
        } catch (e) {
          console.error(e);
        }
      }

    //  if(goodChecked){
    //    changeStatus(1,true);
    //  }

      return(
<div key={asin} id="productDiv">
       {/*  <div key={id} style={{ height: "13rem",width: "13rem" ,paddingBottom:"1rem"}}> */}
        <form>
  <fieldset id={fieldsetID} className="fieldset">


    <label className='setStatusRadio'>
    <input
     type="radio"
       name="status"
       checked={goodChecked == true ? true: null}
        value="1"
        onChange={handleOptionChange}
        >     
        </input>
        ✔️</label>

     <label   className='setStatusRadio'>
    <input
     type="radio"
       name="status"
        value="2"

        onChange={handleOptionChange}
        >     
        </input>
        ❌</label>


        <label id="qLabel" className='setStatusRadio'>

    <input
     type="radio"
       name="status"
        value="3"

        onChange={handleOptionChange}
        >     
        </input>
        ❔</label>
        </fieldset>
        </form>
        <a href={`https://www.amazon.com/dp/${asin}` } target="_blank">
        <img  src={image} style={{height: "100%",width: "95%"}}></img>
        </a>
        </div>
        // </div>
        )
    
    }

export default Product;

