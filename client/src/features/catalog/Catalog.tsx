import { Fragment } from "react/jsx-runtime";
import { Product } from "../../app/models/product";
import { Button } from "@mui/material";
import ProductList from "./ProductList";
interface Props{
    musteriler:Product[];
    musteriEkle :()=> void;  
}
//burası typescriptin veri tipini illa belirtmemiz gereken değişiklikler..
export default function Catalog({musteriler, musteriEkle}: Props){
    return(
        <Fragment>
        <ProductList musteriler={musteriler}/>
  
        <Button variant='contained' onClick={musteriEkle}>AddProduct</Button>
        </Fragment>
    )
}