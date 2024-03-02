import { List } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
    musteriler:Product[]
}
    export default function ProductList({musteriler}:Props){
        return(
            <List>
        {musteriler.map(product =>(
            <ProductCard key={product.id} product={product}/>
        ) )}
        

        </List>
  
        )
    }