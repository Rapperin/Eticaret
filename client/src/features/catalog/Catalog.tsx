import { Fragment } from "react/jsx-runtime";
import { Product } from "../../app/models/product";
interface Props{
    musteriler:Product[];
    musteriEkle :()=> void;  
}
//burası typescriptin veri tipini illa belirtmemiz gereken değişiklikler..
export default function Catalog({musteriler, musteriEkle}: Props){
    return(
        <Fragment>
        <ul>
        {musteriler.map(product =>(<li key={product.id}>{product.name}-{product.price} </li> ) )}
        

        </ul>
  
  
        <button onClick={musteriEkle}>AddProduct</button>
        </Fragment>
    )
}