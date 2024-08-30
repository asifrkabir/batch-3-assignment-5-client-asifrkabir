/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, Card, Form, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { FaCreditCard } from "react-icons/fa6";
import { toast } from "sonner";
import { useCreatePaymentIntentMutation } from "../../redux/features/payment/paymentApi";
import {
  useCreateRentalMutation,
  useUpdateRentalMutation,
} from "../../redux/features/rental/rentalApi";
import { isFetchBaseQueryError } from "../../utils/isFetchBaseQueryError";
import { TError, TUser } from "../../types";
import { useNavigate } from "react-router-dom";
import { useGetUserProfileQuery } from "../../redux/features/user/userApi";

const { Title, Text } = Typography;

type TCheckoutFormProps = {
  paymentData: {
    paymentType: "booking" | "return";
    paymentAmount: number;
    bikeId?: string;
    startTime?: string;
    rentalId?: string;
  };
};

const CheckoutForm = ({ paymentData }: TCheckoutFormProps) => {
  const { paymentType, paymentAmount, bikeId, startTime, rentalId } =
    paymentData;

  const { data: userData, isLoading: isGetUserLoading } =
    useGetUserProfileQuery([], {
      refetchOnMountOrArgChange: true,
    });
  const user: TUser = userData?.data;
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [createRental] = useCreateRentalMutation();
  const [updateRental] = useUpdateRentalMutation();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const userName = user?.name || "anonymous";
  const userEmail = user?.email || "anonymous";

  useEffect(() => {
    const handleCreatePaymentIntent = async () => {
      setLoading(true);
      const paymentIntentData = { amount: paymentAmount };

      try {
        const res = await createPaymentIntent(paymentIntentData);
        setClientSecret(res.data.data.clientSecret);
      } catch (err) {
        console.log(err);
        toast.error("Failed to create payment intent. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    handleCreatePaymentIntent();
  }, [createPaymentIntent, paymentAmount]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Processing...");

    if (!stripe || !elements) {
      toast.error("An unexpected error occurred. Please try again later", {
        id: toastId,
        duration: 2000,
      });
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      toast.error("An unexpected error occurred. Please try again later", {
        id: toastId,
        duration: 2000,
      });
      setLoading(false);
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error("[error]", error);
      toast.error(error.message, { id: toastId, duration: 2000 });
      setLoading(false);
      return;
    }

    // Confirm Payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userName,
            email: userEmail,
          },
        },
      });

    if (confirmError) {
      console.log("Confirm Error: ", confirmError);
      toast.error(confirmError.message, { id: toastId, duration: 2000 });
    } else {
      if (paymentIntent.status === "succeeded") {
        if (paymentType === "booking") {
          const paymentDetails = {
            bikeId,
            startTime,
            paymentAmount: 0,
          };

          try {
            const res = await createRental(paymentDetails);

            if ("data" in res && res.data) {
              toast.success("Payment successful", {
                id: toastId,
                duration: 2000,
              });
              navigate("/payment-success", { replace: true });
            } else if (isFetchBaseQueryError(res.error)) {
              const error = res.error as TError;

              toast.error(error.data.message, { id: toastId, duration: 2000 });
            } else {
              toast.error("Something went wrong", {
                id: toastId,
                duration: 2000,
              });
            }
          } catch (err) {
            console.error(err);
            toast.error("Something went wrong", {
              id: toastId,
              duration: 2000,
            });
          }
        } else if (paymentType === "return") {
          const rentalDetails = {
            id: rentalId,
            data: {
              paymentAmount,
              paymentStatus: "paid",
            },
          };

          try {
            const res = await updateRental(rentalDetails);

            if ("data" in res && res.data) {
              toast.success("Payment successful", {
                id: toastId,
                duration: 2000,
              });
              navigate("/my-rentals", { replace: true });
            } else if (isFetchBaseQueryError(res.error)) {
              const error = res.error as TError;

              toast.error(error.data.message, { id: toastId, duration: 2000 });
            } else {
              toast.error("Something went wrong", {
                id: toastId,
                duration: 2000,
              });
            }
          } catch (err) {
            console.error(err);
            toast.error("Something went wrong", {
              id: toastId,
              duration: 2000,
            });
          }
        }
      }
    }

    setLoading(false);
  };

  if (isGetUserLoading) {
    return <Spin size="large" />;
  }

  return (
    <Card
      style={{
        maxWidth: "800px",
        margin: "auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}>
      <Spin spinning={loading}>
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          Complete Your Payment
        </Title>
        <Title
          level={5}
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#1890ff",
          }}>
          Amount to Pay: Tk. {paymentAmount}{" "}
        </Title>
        <Form layout="vertical" onSubmitCapture={handleSubmit}>
          <Form.Item label="Card Details">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
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
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<FaCreditCard />}
              disabled={!stripe || !clientSecret || loading}
              style={{ width: "100%", marginTop: "20px" }}>
              {loading ? "Processing..." : "Pay Now"}
            </Button>
          </Form.Item>
          <Text type="secondary">Your payment is secure and encrypted.</Text>
        </Form>
      </Spin>
    </Card>
  );
};

export default CheckoutForm;
