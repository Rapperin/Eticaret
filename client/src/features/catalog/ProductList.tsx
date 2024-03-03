import { Grid} from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
    musteriler:Product[]
}
    export default function ProductList({musteriler}:Props){
        return(
          <Grid container spacing={4}>
            {musteriler.map(product=>(<Grid item xs={3} key={product.id}> 
            <ProductCard product={product}/>
            </Grid>
            
            ))}


          </Grid>
  
        )
    }