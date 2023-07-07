import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import BASE_URL from "../../components/Shared/baseurl";
import TopNav from "../../components/Shared/TopNavBar";
import Footer from "../../components/Shared/Footer";

const CheckoutForm = ({ price, car, distance, fullObject }) => {
  console.log(fullObject._id, "fullObject");

  console.log(car, "From checkout form page ");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${BASE_URL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      Swal.fire("Error", "Payment confirmation failed.", "error");
    } else {
      // console.log("payment method ", paymentMethod);
    }

    setProcessing(true);

    const { paymentIntent, error: confirmationError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmationError) {
      Swal.fire("Error", "Payment confirmation failed.", "error");
    }
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      navigate("/dashboard/my-rides");
      // Save payment info to the server
      const payment = {
        rideId: car._id,
        userName: user?.displayName,
        userEmail: user?.email,
        transactionId: paymentIntent.id,
        price,
        carName: car.carName,
        distance,
        vehicleType: car.vehicleType,
        driverName: car.driverName,
        driverEmail: car.driverEmail,
        date: new Date().toLocaleString(),
      };

      // Create PaymentIntent as soon as the page loads
      fetch(`${BASE_URL}/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          fetch(`${BASE_URL}/pending-ride/${fullObject._id}`, {
            method: "DELETE",
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                console.log("Document deleted successfully");
                // Handle success, such as updating UI or refreshing data
              } else {
                console.log("Failed to delete document");
                // Handle failure, such as showing an error message
              }
            })
            .catch((error) => {
              console.error(error);
              // Handle error, such as showing an error message
            });

          Swal.fire(
            "Success",
            "Payment successful with transaction ID: ",
            "success"
          );
        });
    }
  };

  return (
    <>
      <TopNav />
      <form
        className="w-2/3 mx-auto border-2 p-5 my-10 bg-gray-100 rounded-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl my-3">Payment Info</h2>
        <div className="">
          <p>Name</p>
          <input
            type="text"
            placeholder="Type Your Name"
            className="input input-bordered input-accent w-full mb-2"
            value={user.displayName}
          />
          <p>Email</p>
          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered input-accent w-full mb-2"
            value={user.email}
          />
          <p>Car Name</p>
          <input
            type="text"
            placeholder="Your Email"
            className="input input-bordered input-accent w-full mb-2"
            value={car.carName}
          />
          <p>Price</p>
          <input
            type="number"
            placeholder="Your Email"
            className="input input-bordered input-accent w-full mb-5"
            value={price.toFixed(2)}
          />
        </div>

        {/* Card  Element */}
        <div className="border-2 p-2 rounded-md">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "20px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>

        <button
          className="btn btn-primary btn-sm my-4"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>

      <Footer />
    </>
  );
};

export default CheckoutForm;
