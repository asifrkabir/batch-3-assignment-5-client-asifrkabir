import { Button, Col, Row } from "antd";
import AppForm from "../components/form/AppForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import AppInput from "../components/form/AppInput";
import { LoginOutlined } from "@ant-design/icons";
import loginImage from "../assets/images/login/login-image.jpg";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { verifyToken } from "../utils/verifyToken";
import {
  TAuthUser,
  TErrorApiResponse,
  TSuccessApiResponse,
  TUser,
} from "../types";
import { setUser } from "../redux/features/auth/authSlice";
import { isFetchBaseQueryError } from "../utils/isFetchBaseQueryError";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Logging in");

    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await login(userInfo);

      if ("data" in res && res.data) {
        const data = res.data as TSuccessApiResponse<TUser>;

        const user = verifyToken(data.token!) as TAuthUser;

        dispatch(setUser({ user, token: data.token! }));

        toast.success("Logged in", { id: toastId, duration: 2000 });
        navigate(`/`);
      } else if (isFetchBaseQueryError(res.error)) {
        const error = res.error.data as TErrorApiResponse;

        toast.error(error.message, { id: toastId, duration: 2000 });
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 2000 });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ height: "100vh", background: "#f5f5f5", padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "800px",
          background: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}>
        <Col
          xs={0}
          md={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
          }}>
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src={loginImage}
            alt="Login visual"
          />
        </Col>
        <Col xs={24} md={12} style={{ padding: "2rem" }}>
          <h1
            style={{
              textAlign: "center",
              marginBottom: "1.5em",
            }}>
            Login
          </h1>
          <AppForm onSubmit={onSubmit}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <AppInput
                  type="text"
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  size="large"
                  required
                />
              </Col>
              <Col span={24}>
                <AppInput
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  size="large"
                  required
                />
              </Col>
            </Row>

            <Button
              htmlType="submit"
              type="primary"
              size="large"
              style={{
                width: "100%",
                marginTop: "3rem",
                backgroundColor: "#1890ff",
                borderColor: "#1890ff",
              }}>
              Login <LoginOutlined />
            </Button>
          </AppForm>
        </Col>
      </div>
    </Row>
  );
};

export default Login;
