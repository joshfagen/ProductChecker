
import React, { useState } from 'react';


import { Accordion, Icon, Button,Label,Dropdown } from 'semantic-ui-react'
//import './FilterDropdown.css';


const FilterDropdown = ({brands,categories,onFiltersettings,onGetValue,onHideTitle}) =>{
const [brandVal,setBrandVal]=useState();
const [categoryVal,setCategoryVal]=useState();

let brandOptions = brands!==null? brands.map(b=>({key:b.brand,text:b.brand,value:b.brand})):null;
let categoryOptions = categories!==null? categories.map(c=>({key:c.category,text:c.category,value:c.category})):null;


const handleSelect=(e,data)=>{
    switch(data.placeholder){
        case 'Select Brand':
        console.log(data.placeholder)
        setCategoryVal('')
        setBrandVal(data.value)
        onGetValue(data.value,'brands');
        onFiltersettings('brands')
        //setActiveIndex(1);
        break;
        case 'Select Category':
            console.log(data.placeholder)  
            setBrandVal('') 
            setCategoryVal(data.value)
            onGetValue(data.value,'categories');
            console.log('data.value',data.value)
            onFiltersettings('categories')
            //setActiveIndex(1);
            break;
    }
}

const clearFilters = (e)=>{
    onFiltersettings('');
    setBrandVal('');
    setCategoryVal('');
    setActiveIndex(1);
    onHideTitle()
    onGetValue( '','');
}



    const [activeIndex, setActiveIndex] = useState(1)
    
        const handleClick = (e, titleProps) => {
          const { index } = titleProps
          const newIndex = activeIndex === index ? -1 : index
          onHideTitle()
      
          setActiveIndex(newIndex)
        }

  return (
 
    <Accordion>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name='dropdown' />
Filters
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
        <Label>
Filter by brand:
  </Label>
        <Dropdown style={{marginBottom:'1rem'}}
    placeholder='Select Brand'
    fluid
    selection
    value={brandVal}
    options={brandOptions}
    onChange={handleSelect}
  />
          <Label>
Filter by category:
  </Label>
          <Dropdown style={{marginBottom:'1rem'}}
    placeholder='Select Category'
    fluid
    selection
    value={categoryVal}
    options={categoryOptions}
    onChange={handleSelect}
  />
  <Button style={{marginBottom:'1rem'}} content='Clear Filters' onClick={clearFilters}/>
        </Accordion.Content>


      </Accordion>
  );
}

export default FilterDropdown;