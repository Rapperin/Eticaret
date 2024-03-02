import { Fragment, useEffect, useState } from "react"
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Container, CssBaseline  } from "@mui/material";
import Header from "./Header";


function App() {
  
  const[musteriler , setMusteriler] = useState<Product[]>([]);
  //verileri react hooks ile çekmeye çalışıyorum
  // use effectte bağımlılık dizisini belirtmessen sonsuz döngü 
  useEffect(() => {fetch('http://localhost:5000/API/products').then(Response=>Response.json()).then(data=>setMusteriler(data))},[])

    function musteriEkle(){
      setMusteriler(prevState => [...prevState, {name:'product' + (prevState.length+1),price:(prevState.length*100)+100,id:prevState.length
    +101,brand:'some brand',description:'some description',pictureUrl:'http://picsum.photos/200'}])
    }
  return (
    <Fragment> 
      <CssBaseline/>
      <Header/>
      <Container>
      <Catalog musteriler={musteriler} musteriEkle={musteriEkle} />
      </Container>
      
    </Fragment>
  )
}

export default App
