import axios from "axios";
import "./HomePage.css";
import { Header } from "../../components/Header";
import { useState,useEffect } from "react";
import { ProductsGrid } from "./ProductsGrid";

export function HomePage({cart,loadCart}) {
  const [products,setProducts]=useState([])
  useEffect(()=>{
    const fetchHomeData= async()=>{
      const response= await axios.get("/api/products")
      setProducts(response.data);
    }
    fetchHomeData()
  },[])
  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <Header cart={cart}/>

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart}/>
      </div>
    </>
  );
}
