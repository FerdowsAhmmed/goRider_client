import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./Dashboard/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Publishable_key);
const Payment = () => {
  const location = useLocation();
  const total = location.state.totalPrice;
  const car = location.state.car;
  const fullObject = location.state
  const distance = location.state.distance;
  const price = parseFloat(total.toFixed(2))

  console.log(location.state, "location")

  return (
    <div>
      <div className="">
        <Elements stripe={stripePromise}>
          <CheckoutForm price={price} car={car} distance={distance} fullObject={fullObject} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
