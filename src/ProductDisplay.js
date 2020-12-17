import React, { useState, useEffect } from 'react';
import Product from './Product';
import FilterDropdown from './FilterDropdown';
import DisplayStatusRadio from './DisplayStatusRadio';
import CountDisplay from './CountDisplay';
import './ProductDisplay.css'
import { Accordion, Icon, Button,Flag } from 'semantic-ui-react'


const ProductDisplay = () => {

    const [products, setProducts] = useState([]);
    const [desc, setDesc] = useState('');
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [status,setStatus] = useState(0);
    const [statusName,setStatusName] = useState();
    const [brand,setBrand] = useState();
    const [category,setCategory] = useState();
    const [filter,setFilter] =useState();
    const [skip,setSkip] = useState(0);
    const[titleDisplay,setTitleDisplay]=useState(true);
    const [count,setCount] = useState();
    



    useEffect(() => {
      try {
        changeStatusName();
manageFetch();

fetchBrands();
fetchCategories();
        } catch (e) {
          console.error(e);
        }
  }, [brand,category,filter,skip,status,desc]);


    const manageFetch = ()=>{
      console.log('in manage fetch!')

 switch(filter){
   case 'brands':
     console.log('filterByBrand')
     fetchCount();
    fetchProductsByBrand();
 break;
 case 'categories':
   fetchProductsByCategory();
   fetchCount();
   break;
   default:
     fetchProductsByStatus();
     fetchCount();
    } 
  }

  const changeStatusName=()=>{
    console.log('changeStatusName',status)
    switch(+status){
      case 0:
        setStatusName("Not Reviewed");
      break;
      case 1:
        setStatusName("Approved");
      break;
      case 2:
        setStatusName("Not Approved");
      break;
      case 3:
        setStatusName("Question");
      break;
    }      
  }


  const getValue=(value,type)=>{
        console.log('in set value')
if(type==='categories'){
  setCategory(value)
  setBrand('')
}
else if (type==='brands'){
  setBrand(value)
  setCategory('')}
  else{
    console.log('in set value')
    setCategory('')
    setBrand('')
  }
  };

const filterSettings = (filter)=>{
  setSkip(0);
  setFilter(filter);
  console.log('filter',filter)
}

const fetchCount = async()=>{
  console.log('fetchCount','status',status)
  let uriEncodedCategory = category?encodeURIComponent(category.trim().replace(/ /g, '%20')):undefined;
    const resp = await fetch(`asins/count?status=${status}&&brand=${brand}&&category=${uriEncodedCategory}`, {
      credentials: 'include',
    });
    console.log(resp)
    if (!resp.ok) {

      return console.error(resp.statusText)
    }
    console.log('logging the count pre response');
    const theCount = await resp.json();
    if(theCount) {
      setCount(theCount[0].count);
      console.log('logging count')
      console.log(theCount)
    } else {
      setCount(0);
    }
    
    // console.log('theCount',theCount[0].count)
    }

    const fetchProductsByStatus = async()=>{
      console.log('fetchProductsByStatus','status',status,'skip',skip)
        const resp = await fetch(`asins/byStatus/${status}/${skip}?desc=${desc}`, {
          credentials: 'include',
        });
        if (!resp.ok) {
          return console.error(resp.statusText)
        }
        const products = await resp.json();
        setProducts(
          products.map(p => ({...p, goodChecked: false}))
        );
        console.log(products)
        }

        const fetchProductsByBrand = async()=>{
          console.log('fetchProductsByBrand','status',status,'skip',skip)
          let uriEncodedBrand = encodeURIComponent(brand.trim().replace(/ /g, '%20'));
          const resp = await fetch(`/asins/byBrand/${status}/${skip}?brand=${uriEncodedBrand}&desc=${desc}`, {
            credentials: 'include',
          });
          if (!resp.ok) {
            return console.error(resp.statusText)
          }
          console.log(resp)
         const products = await resp.json();
         setProducts(
           products.map(p => ({...p, goodChecked: false}))
         );
          }

          const fetchProductsByCategory = async()=>{
            console.log('category',category)
            console.log('fetchProductsByCategory','status',status,'skip',skip)

            let uriEncodedCategory = encodeURIComponent(category.trim().replace(/ /g, '%20'));
            const resp = await fetch(`asins/byCategory/${status}/${skip}?category=${uriEncodedCategory}&desc=${desc}`, {
              credentials: 'include',
            });
            if (!resp.ok) {
              return console.error(resp.statusText)
            }
            const products = await resp.json();
            setProducts(
              products.map(p => ({...p, goodChecked: false}))
            );
            }



        const fetchBrands = async()=>{
          const resp = await fetch('asins/brands', {
            credentials: 'include'
          });
          if (!resp.ok) {
            return console.error(resp.statusText)
          }
          const brands = await resp.json();
          setBrands(
            brands
          );
          // console.log(brands)
          }

          const fetchCategories = async()=>{
            const resp = await fetch('asins/categories', {
              credentials: 'include'
            });
            if (!resp.ok) {
              return console.error(resp.statusText)
            }
            const categories = await resp.json();
            setCategories(
              categories
            );
            }

        
    // const fetchdescProducts = async()=>{
    //   const resp = await fetch('asins/desc/:status/:skip?filter', {
    //     credentials: 'include'
    //   });
    //   if (!resp.ok) {
    //     return console.error(resp.statusText)
    //   }
    //   const products = await resp.json();
    //   setProducts(
    //     products.map(p => ({...p, goodChecked: false}))
    //   );
    //   }

  



     const markAllGoodInServer = async()=>{
        console.log(products);
      try {
        const resp = await fetch(`asins`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productArray: products })
        });
  
        if (!resp.ok) {
          return console.error(resp.statusText);
        }
      } catch (e) {
        console.error(e);
      }
    
}

const allGood = ()=>{
  setProducts(
    products.map(p => ({...p, goodChecked: true}))
  );
  markAllGoodInServer()
}


const handleDisplayOptionChange = (e)=>{
  console.log(e.target.value)
  setSkip(0)
setStatus(e.target.value)
}

const forwardClicked = ()=>{
  setSkip(prevSkip => prevSkip + 24)

};


const backClicked = ()=>{

  setSkip(prevSkip => prevSkip - 24)

}

const nextClicked = ()=>{
  manageFetch()
}

const hideTitle =()=>{
  setTitleDisplay(!titleDisplay);
}

const descButton = desc===''?<Button icon="angle double up" onClick={()=>setDesc('desc')}/>:<Button icon="angle double down" onClick={()=>setDesc('')}/>;    

const backButton=skip>0?<Button  icon='left arrow'  onClick={backClicked}/>:<Button  icon='left arrow'  onClick={backClicked} disabled/>;

const title=titleDisplay?  <h3 style={{margin:"auto",transform: "translateX(3rem)",fontWeight:"bolder", textDecoration:"underline"}}>CA Restricted Check</h3>:null;

const countDisplay=titleDisplay?<CountDisplay count={count} statusName={statusName} brand={brand} category={category}/>:null;


           console.log('statusName',statusName)
    return (<>
    <div id="titleAndDrop">
  <FilterDropdown brands={brands} categories={categories} onFiltersettings={filterSettings} onGetValue={getValue} onHideTitle={hideTitle}/>
  {title}
  {countDisplay}

  </div>
<DisplayStatusRadio onHandleDisplayOptionChange={handleDisplayOptionChange}/>


<div className="buttonDiv">
        <div id="buttonDiv1">

{descButton}
</div>
<div id="buttonDiv2">
<Button content='✔️ All' onClick={allGood}/>
<Button content='Next' onClick={nextClicked}/>
</div>
<div id="buttonDiv3">


{backButton}
<Button icon='right arrow' onClick={forwardClicked}/>
</div>

</div>

                <div id="productsGrid" className="container">
    { products.map(p => <Product name={p.name} title={p.title} asin={p.asin} image={p.imageUrl} parentAsin={p.parent_asin} goodChecked={p.goodChecked}/>)}

    </div>
    </>
    );

    }
 
export default ProductDisplay;
