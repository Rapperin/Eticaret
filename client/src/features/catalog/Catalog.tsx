import { Fragment } from "react/jsx-runtime";
import { Product } from "../../app/models/product";

import ProductList from "./ProductList";
import { useState, useEffect } from "react";

//burası typescriptin veri tipini illa belirtmemiz gereken değişiklikler..
export default function Catalog(){
    const[musteriler , setMusteriler] = useState<Product[]>([]);
  //verileri react hooks ile çekmeye çalışıyorum
  // use effectte bağımlılık dizisini belirtmessen sonsuz döngü 
  useEffect(() => {fetch('http://localhost:5000/api/Products').then(response=>response.json()).then(data=>setMusteriler(data))},[])

    
    return(
        <Fragment>
        <ProductList musteriler={musteriler}/>
  
        
        </Fragment>
    )
}