import { Form, Input, Button, Row, Col, Card } from "antd";
import { toast } from "sonner";

const ContactUs = () => {
  const [form] = Form.useForm();

  const onSubmit = () => {
    toast.success("Thank you for your message. We will reach out soon");
    form.resetFields();
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "4rem" }}>Contact Us</h1>
      <Row justify="center">
        <Col xs={24} sm={18} md={12} lg={10}>
          <Card
            style={{
              borderRadius: "8px",
              padding: "2rem",
            }}>
            <Form layout="vertical" onFinish={onSubmit} form={form}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}>
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}>
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                label="Message"
                name="message"
                rules={[
                  { required: true, message: "Please enter your message" },
                ]}>
                <Input.TextArea placeholder="Enter your message" rows={4} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ContactUs;
