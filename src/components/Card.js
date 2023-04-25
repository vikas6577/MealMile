import React, { useState,useRef, useEffect } from "react";
import { useDispatchCart,useCart } from "./ContextReducer";
export default function Card(props) {
  let dispatch=useDispatchCart();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem=props.foodItems;
  let data=useCart()
  const priceRef=useRef();
  const [qty, setqty] = useState(1)
  const [size, setSize] = useState("")
  // const handleCart=async()=>{
  //   await dispatch({type:"ADD", id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
  //   console.log(data);
  // }
  let finalPrice=qty * parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])
  const handleCart = async () => {
    // let food = []
    // for (const item of data) {
    //   if (item.id === foodItem._id) {
    //     food = item;
    //     console.log(item);
    //     break;
    //   }
    // }
    // console.log(food)
    // console.log(new Date())
    // if (food !== []) {
    //   if (food.size === size) {
    //     await dispatch({ type: "UPDATE", id:props.foodItem._id, price: finalPrice, qty: qty })
    //     return
    //   }
    //   else if (food.size !== size) {
    //     await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
    //     console.log("Size different so simply ADD one more to the list")
    //     return
    //     //   await dispatch({type:"ADD", id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
    //   }
    //   return
    // }
    // await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })
    await dispatch({type:"ADD", id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
    console.log(data);
  //   console.log(data);
  }
  return (
    <div>
      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"120px",objectFit:"fill"}} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          {/* <p className="card-text">This is first food item</p> */}
          <div className="container w-100">
            <select className="m-2 h-100 bg-success " onChange={(e)=>setqty(e.target.value)}> 
              {Array.from(Array(8), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-success text-black rounded"
              style={{ select: "#FF0000" }} ref={priceRef} onChange={(e)=>setSize(e.target.value)}
            >
              {priceOptions.map((i) => {
                return (
                  <option key={i} value={i}>
                    {i}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
            <hr />
            <button
              className="btn bg-success text-white justify-center ms-2"
              onClick={handleCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
