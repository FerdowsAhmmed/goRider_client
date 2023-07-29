import React, { useEffect, useState } from "react";
import BASE_URL from "../../../../components/Shared/baseurl";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);

  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  useEffect(() => {
    // Fetch all coupons when the component mounts
    getAllCoupons();
  }, []);

  const getAllCoupons = async () => {
    try {
      const response = await fetch(`${BASE_URL}/coupons`);
      if (!response.ok) {
        throw new Error("Failed to fetch coupons");
      }
      const data = await response.json();
      setCoupons(data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
      // Handle the error here (e.g., show an error message to the user)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data before submitting (you can add your validation logic here)

    const couponData = {
      name,
      discount: parseInt(discount),
      expiryDate,
    };

    try {
      const response = await fetch(`${BASE_URL}/coupons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(couponData),
      });

      if (response.status === 400) {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorData.message,
        });
      } else if (!response.ok) {
        throw new Error("Failed to create coupon");
      } else {
        Swal.fire("Good job!", "Coupon Created Successfully!", "success");
      }
    } catch (error) {
      console.error("Error creating coupon:", error);
      // Handle the error here (e.g., show an error message to the user)
    }

    window.my_modal_1.close();
  };

  const createCoupon = () => {
    window.my_modal_1.showModal();
  };

  const handleDelete = (coupon) => {
    // Show confirmation alert
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this coupon.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Send a DELETE request to delete the coupon
        fetch(`${BASE_URL}/coupons/${coupon._id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              Swal.fire("Done!", "coupon Delete Successfully!", "success");
              // Refresh the coupon list
              getAllCoupons();
            } else {
              // Failed to delete the coupon
              console.error("Error deleting coupon:", data.error);
            }
          })
          .catch((error) => console.error("Error deleting coupon:", error));
      }
    });
  };

  return (
    <div>
      <h2 className="my-10 text-center text-3xl font-bold border-b-2 pb-3">
        All Coupon - 0
      </h2>

      <div className="flex justify-center">
        <button
          onClick={() => createCoupon()}
          className="text-center border-4 border-dashed mx-5 text-green-500 p-5 w-full"
        >
          Create a new coupon +
        </button>
      </div>
      <div className="m-8">
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">Coupon Name</th>
              <th className="border-b px-4 py-2">Discount</th>
              <th className="border-b px-4 py-2">Expiry Date</th>
              <th className="border-b px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id} className="text-center">
                <td className="border-b px-4 py-2">{coupon.name}</td>
                <td className="border-b px-4 py-2">{coupon.discount}%</td>
                <td className="border-b px-4 py-2">{coupon.expiryDate}</td>
                <td className="border-b px-4 py-2 text-success">
                  <div className="flex item-center justify-center gap-3">
                    <button onClick={() => handleDelete(coupon)}>
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Open the modal using ID.showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-8 rounded-md"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Coupon Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered input-accent w-full max-w-xs"
            />
          </div>

          <div>
            <label
              htmlFor="discount"
              className="block text-sm font-medium text-gray-700"
            >
              Discount Percentage
            </label>
            <input
              type="number"
              id="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="input input-bordered input-accent w-full max-w-xs"
            />
          </div>

          <div>
            <label
              htmlFor="expiryDate"
              className="block text-sm font-medium text-gray-700"
            >
              Expiry Date
            </label>
            <input
              type="date"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="input input-bordered input-accent w-full max-w-xs"
            />
          </div>
          <div className="modal-action">
            <button
              type="submit"
              className="btn inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Coupon
            </button>
            <button
              onClick={() => {
                window.my_modal_1.close();
              }}
              className="btn ml-3"
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default Coupon;
