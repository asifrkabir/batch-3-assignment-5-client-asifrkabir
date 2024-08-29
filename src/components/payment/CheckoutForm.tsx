/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { FaCreditCard } from "react-icons/fa6";
import { useCreatePaymentIntentMutation } from "../../redux/features/payment/paymentApi";

const CheckoutForm = () => {
  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  //TODO: Need to remove hardcoded amount
  const totalPrice = 100;

  useEffect(() => {
    const handleCreatePaymentIntent = async () => {
      const paymentIntentData = {
        amount: totalPrice,
      };

      try {
        const res = await createPaymentIntent(paymentIntentData);
        setClientSecret(res.data.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };

    handleCreatePaymentIntent();
  }, [createPaymentIntent]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message!);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // Confirm Payment
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <Button
        type="primary"
        htmlType="submit"
        disabled={!stripe || !clientSecret}>
        Pay <FaCreditCard />
      </Button>
      <p style={{ color: "red" }}>{error}</p>
    </form>
  );
};

export default CheckoutForm;
