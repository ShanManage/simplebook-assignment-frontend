import {
  Flex, 
  Card, 
  Space, 
  Input, 
  Button, 
  Typography,
  Form
} from "antd"
import { APP_ROUTES } from "../../utils/constants";
import { LoginFormFields } from "../../interfaces/auth";
import { useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate()
  const onFinish = (values: LoginFormFields) => {
    console.log(values)
    navigate(APP_ROUTES.PRODUCT_MANAGEMENT)
  }

  const onNavigateToSignUp = () => {
    navigate(APP_ROUTES.SIGN_UP)
  }
  return (
  <Flex justify="center">
    <Card styles={{ body: { padding: '30px 60px', width: 550 } }}>
      <Flex justify="center"><Title level={3} style={{ margin: '0px' }}>Simplebooks</Title></Flex>
      <Flex justify="center"><Title level={3} style={{ margin: '0px' }}>Take Home Assignment</Title></Flex><br />
      <Flex justify="center"><Text disabled>Login to your account</Text></Flex><br /><br />

      <Form onFinish={onFinish}>
        <Space direction="vertical" className="full-width">
          <Form.Item<LoginFormFields>
            name="username"
            rules={[
              { required: true, message: 'Please enter your Email!' },
              { type: 'email', message: 'Please enter valid Email!' },
            ]}
          >
            <Input
              size='large'
              prefix={<MailOutlined className='prefix-icon' />}
              placeholder='Email Address'
              // disabled={}
            />
          </Form.Item>
          <Form.Item<LoginFormFields>
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              size='large'
              prefix={<LockOutlined className='prefix-icon' />}
              placeholder='Password'
              // disabled={}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              size='large'
              htmlType="submit"
              className='full-width'
              // loading={}
            >
              Sign in
            </Button>
          </Form.Item>

        </Space>
      </Form>

      <Flex justify="center"><Text strong>Don't have an account.?</Text></Flex>
      <Flex justify="center">
        <Button type="link" onClick={onNavigateToSignUp}>Sign up</Button>
      </Flex>
    </Card>
  </Flex>
  )
}

export default Login
