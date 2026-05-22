  "use client"
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { FaRegUser } from "react-icons/fa";

export default function Home() {
  const [count,setCount] =useState(0);
  const [products,setProducts] =useState([])

  useEffect(()=>{
     const fetchProducts = async ()=>{
       const response =await fetch("https://dummyjson.com/products");
       const data = await response.json();
       console.log(data.products);
       setProducts(data.products);
     }
     fetchProducts();
  },[]);
  return (
    <main>
      <div className="bg-[url(/bg.jpg)] h-screen bg-cover bg-no-repeat">
         <h1 className="text-4xl text-white text-center font-bold font-roboto">This is a background Image</h1>
      </div>
      <div className="my-5 grid grid-cols-4">
          <Link href="https://www.earlycode.net"><div className="w-80 h-80 rounded-md shadow-md">
              <Image 
               src="/bg.jpg"
               alt="image"
               width={400}
               height={400}
               className="w-80 h-80 rounded-md"
              />
          </div>
          </Link>
          <div className="w-80 h-80 rounded-md shadow-md">
              <Image 
               src="/bg.jpg"
               alt="image"
               width={400}
               height={400}
               className="w-80 h-80 rounded-md"
              />
          </div>
          <div className="w-80 h-80 rounded-md shadow-md">
              <Image 
               src="/bg.jpg"
               alt="image"
               width={400}
               height={400}
               className="w-80 h-80 rounded-md"
              />
          </div>
          <div className="w-80 h-80 rounded-md shadow-md">
              <Image 
               src="/bg.jpg"
               alt="image"
               width={400}
               height={400}
               className="w-80 h-80 rounded-md"
              />
          </div>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center mt-4">
         <h1 className="text-2xl font-bold">{count}</h1>
         <button onClick={()=>setCount(count + 1)} className="w-20 h-10 cursor-pointer bg-blue-500 text-white rounded-md">Increment</button>
         <button className="w-20 h-10 cursor-pointer bg-blue-500 text-white rounded-md">Decrement</button>
         <FaRegUser className="text-4xl text-blue-500" />
         <Button variant="contained">Click me</Button>
      </div>
      <div className="ml-5 grid grid-cols-4 gap-4">
        {products.map(product =>
          <div key={product.id} className="w-70 h-80 rounded-md shadow-md ">
             <img
             src={product.images[0]}
              alt="image"
              width={100}
              height={100}
              className="mb-3"
             />
               <div className="px-3">
                <p className="text-2zl font-semibold">{product.title}</p>
                <p className="text-xs text-gray-700">{product.description}</p>
                <p className="text-green-500 ">$ {product.price}</p>
              </div>

          </div>
          )}
      </div>
    </main>
  );
}
