import { useContext, useEffect, useState } from "react";
import BASE_URL from "../../../../components/Shared/baseurl";
import { AuthContext } from "../../../../Providers/AuthProvider";

const PaymentHistory = () => {
  const {user} = useContext(AuthContext)
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/payment`)
      .then((res) => res.json())
      .then((data) => {
        const driverRider = data.filter(
          (rider) => rider.userEmail === user?.email
        );
        setPaymentHistory(driverRider);
      });
  }, []);

  console.log(paymentHistory);

  return (
    <>
      <h2 className="m-8 text-2xl">Payment History</h2>

      <div className="overflow-x-auto">
        <div className="md:inline-block min-w-full">
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr className="z-0">
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>TransactionId</th>
                <th>Cost</th>
                <th>Time</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => {
                const paymentDate = new Date(payment.date);
                const formattedDate = paymentDate.toLocaleDateString("en-GB");
                const formattedTime = paymentDate.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{payment.userName}</td>
                    <td>{payment.userEmail}</td>
                    <td>{payment.transactionId}</td>
                    <td className="text-blue-500">${payment.price}</td>
                    <td>{formattedTime}</td>
                    <td>{formattedDate}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="z-0">
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>TransactionId</th>
                <th>Cost</th>
                <th>Time</th>
                <th>Date</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default PaymentHistory;
