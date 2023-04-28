import React, { useState, useRef, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
export default function Card(props) {
  let dispatch = useDispatchCart();
  let options = props.options;
  let priceOptions = Object.keys(options);
  // let foodItem=props.foodItems;
  let data = useCart();
  const priceRef = useRef();
  const [qty, setqty] = useState(1);
  const [size, setSize] = useState("");

  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  const handleCart = async () => {
    let food = [];
    for (const item of data) {
      // console.log(item);
      if (item.id === props.foodItem._id) {
        food.push(item);
      }
    }
    // console.log(food);
    // console.log(new Date());
    if (food.length !== 0) {
      if (food.length === 1 && food[0].size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
          size:size
        });
        return;
      }
      else if (food.length === 2 && (food[0].size === size || food[1].size===size)) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
          size:size
        });
        return;
      }
      else if (food.length === 3 && (food[0].size === size || food[1].size===size || food[2].size===size)) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
          size:size
        });
        return;
      }      
      else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.img,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };
  return (
    <div>
      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          {/* <p className="card-text">This is first food item</p> */}
          <div className="container w-100">
            <select
              className="m-2 h-100 bg-success "
              onChange={(e) => setqty(e.target.value)}
            >
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
              style={{ select: "#FF0000" }}
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
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
