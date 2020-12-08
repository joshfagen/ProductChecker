import React from 'react';

const CountDisplay =({count,statusName,brand,category,})=> {
    //let brandOrCategory=category!==''?category:brand;
    console.log('brandOrCategory category',category)
    console.log('brandOrCategory brand',brand)
    //console.log('brandOrCategory',brandOrCategory)
    const showCategory=category?'Category:' + category + '-':'';
    const showBrand=brand? 'Brand:' + '' + brand + '-' + '':'';
  return (
<div>
<b>{` ${showCategory} ${showBrand}  ${statusName}: ${count}`}</b>
</div>
  );
}

export default CountDisplay;