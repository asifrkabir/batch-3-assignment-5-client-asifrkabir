import { LoginOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AppForm from "../components/form/AppForm";
import AppInput from "../components/form/AppInput";
import AppTextArea from "../components/form/AppTextArea";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import { registerSchema } from "../schemas/auth/auth.schema";
import { TErrorApiResponse } from "../types";
import { isFetchBaseQueryError } from "../utils/isFetchBaseQueryError";

const Register = () => {
  const navigate = useNavigate();

  const [register] = useRegisterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Processing...");

    const registrationData = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      role: "user",
    };

    try {
      const res = await register(registrationData);

      if ("data" in res && res.data) {
        toast.success("Registration successful", {
          id: toastId,
          duration: 2000,
        });
        navigate(`/login`);
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
          maxWidth: "1200px",
          background: "#fff",
          borderRadius: "5px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}>
        <Col span={24} style={{ padding: "2rem" }}>
          <h1
            style={{
              textAlign: "center",
              marginBottom: "1.5em",
            }}>
            Register
          </h1>
          <AppForm onSubmit={onSubmit} schema={registerSchema}>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12} lg={12}>
                <AppInput
                  type="text"
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                  size="large"
                  required
                />
              </Col>
              <Col xs={24} md={12} lg={12}>
                <AppInput
                  type="text"
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  size="large"
                  required
                />
              </Col>
              <Col xs={24} md={12} lg={12}>
                <AppInput
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  size="large"
                  required
                />
              </Col>
              <Col xs={24} md={12} lg={12}>
                <AppInput
                  type="text"
                  name="phone"
                  label="Phone"
                  placeholder="Enter your phone number"
                  size="large"
                  required
                />
              </Col>
              <Col span={24}>
                <AppTextArea
                  name="address"
                  label="Address"
                  placeholder="Enter your address"
                  size="large"
                  rows={3}
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
              Register <LoginOutlined />
            </Button>

            <p style={{ textAlign: "center", marginTop: "1rem" }}>
              Already have an account?{" "}
              <span>
                <Link to="/login">Login</Link>
              </span>
            </p>
          </AppForm>
        </Col>
      </div>
    </Row>
  );
};

export default Register;
