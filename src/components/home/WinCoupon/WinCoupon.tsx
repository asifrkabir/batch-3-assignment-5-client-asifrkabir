import { Button, Card, Modal } from "antd";
import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { Link } from "react-router-dom";
import { selectCurrentToken } from "../../../redux/features/auth/authSlice";
import {
  useAssignCouponToUserMutation,
  useGetAllCouponsQuery,
  useGetUserCouponByUserIdQuery,
} from "../../../redux/features/coupon/couponApi";
import { useAppSelector } from "../../../redux/hooks";
import { TAuthUser } from "../../../types";
import { verifyToken } from "../../../utils/verifyToken";
import { FaClipboard } from "react-icons/fa";

const WinCoupon = () => {
  const [assignCouponToUser] = useAssignCouponToUserMutation();

  const token = useAppSelector(selectCurrentToken);
  let user = null;

  if (token) {
    user = verifyToken(token) as TAuthUser;
  }

  const { data: userCouponData } = useGetUserCouponByUserIdQuery(user?.userId, {
    skip: !user,
  });
  const existingCouponData = userCouponData?.data?.coupon;

  const { data, isFetching } = useGetAllCouponsQuery([]);
  const coupons = data?.data || [];

  const couponItems = coupons.map((coupon) => ({
    key: coupon.code,
    option: coupon.code,
    style: { backgroundColor: "rgb(24, 144, 255)", textColor: "#fff" },
  }));

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [wonCoupon, setWonCoupon] = useState({ code: "", discount: 0 });

  const handleSpinClick = () => {
    if (existingCouponData) {
      setWonCoupon({
        code: existingCouponData.code,
        discount: existingCouponData.discountPercentage,
      });
      setModalVisible(true);
    } else {
      const newPrizeNumber = Math.floor(Math.random() * couponItems.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const handleCouponWin = async (prizeIndex: number) => {
    const selectedCoupon = coupons[prizeIndex];

    const userCouponData = {
      user: user?.userId,
      coupon: selectedCoupon._id,
    };

    try {
      await assignCouponToUser(userCouponData);

      setWonCoupon({
        code: selectedCoupon.code,
        discount: selectedCoupon.discountPercentage,
      });
      setModalVisible(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "4rem" }}>Win Coupon</h1>

      {!user && (
        <Card
          style={{
            textAlign: "center",
            padding: "2rem",
            borderRadius: "8px",
          }}>
          <h2>This feature is locked</h2>
          <p>
            Please <Link to="/login">log in</Link> to spin the wheel and win a
            coupon!
          </p>
        </Card>
      )}

      {user && (
        <>
          {isFetching && <p>Loading coupons...</p>}

          {!isFetching && couponItems.length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={couponItems}
                spinDuration={0.1}
                onStopSpinning={() => {
                  setMustSpin(false);
                  handleCouponWin(prizeNumber);
                }}
              />
              <Button
                type="primary"
                onClick={handleSpinClick}
                style={{
                  marginTop: "2rem",
                  padding: "1rem 2rem",
                }}>
                Spin the Wheel!
              </Button>
            </div>
          )}

          {!isFetching && couponItems.length === 0 && (
            <p style={{ textAlign: "center" }}>
              No coupons available at the moment.
            </p>
          )}
        </>
      )}

      <Modal
        title="Congratulations! You won a coupon!"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button
            type="primary"
            onClick={() => {
              navigator.clipboard.writeText(wonCoupon.code);
            }}>
            Copy Coupon Code to Clipboard <FaClipboard />
          </Button>,
          <Button key="ok" onClick={() => setModalVisible(false)}>
            OK
          </Button>,
        ]}>
        <p>
          Coupon Code: <strong>{wonCoupon.code}</strong>
        </p>
        <p>
          Discount: <strong>{wonCoupon.discount}%</strong>
        </p>
      </Modal>
    </>
  );
};

export default WinCoupon;
