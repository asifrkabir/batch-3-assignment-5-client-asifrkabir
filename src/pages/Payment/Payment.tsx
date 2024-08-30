import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "../../components/payment/CheckoutForm";
import { Empty, Typography } from "antd";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const location = useLocation();
  const paymentData = location.state;

  if (!paymentData) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <Empty
          description={
            <Typography.Text>No payment details found</Typography.Text>
          }
        />
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Elements stripe={stripePromise}>
        <CheckoutForm paymentData={paymentData} />
      </Elements>
    </div>
  );
};

export default Payment;
