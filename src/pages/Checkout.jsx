import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/features/cartSlice";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { userRequest } from '../requestMethods'


const Checkout = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const data = location.state.stripeData;
  const cart = location.state.orderData;
  const currentUser = useSelector((store) => store.user.currentUser);
  const [orderId, setOrderId] = useState(null);


  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post(
          'http://localhost:4000/api/order',
          {
            userId: currentUser.other._id,
            products: cart.products.map((item) => ({
              productId: item._id,
              quantity: item.quantity,
            })),
            amount: cart.total,
            address: data.billing_details.address,
          });
        setOrderId(res.data._id);
      } catch (err) {
        console.error(err)
      }
    };
    data && createOrder();
  }, [cart, data, currentUser]);


  if (location.state.err) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Your payment has been rejected. Please try again.
        <Link to='/'>
          <button style={{ padding: 10, marginTop: 20 }} onClick={() => dispatch(clearCart())}>Go to Homepage</button>
        </Link>
      </div>
    )
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {
        orderId
          ? `Order has been created successfully. Your order number is ${orderId}`
          : `Something went wrong with your order. Please contact the assistance`
      }
      <Link to='/'>
        <button style={{ padding: 10, marginTop: 20 }} onClick={() => dispatch(clearCart())}>Go to Homepage</button>
      </Link>
    </div>
  );
};

export default Checkout;