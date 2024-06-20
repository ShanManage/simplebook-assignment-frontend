import {
  Flex, 
  Card, 
  Space, 
  Input, 
  Button, 
  Typography,
  Image,
  Form
} from "antd"
import logo from '../../assets/react.svg'
import { APP_ROUTES } from "../../utils/constants";
import { LoginFormFields } from "../../interfaces/auth";
import { useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import styles from './Login.module.scss'

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate()
  const onFinish = (values: LoginFormFields) => {
    console.log(values)
    navigate(APP_ROUTES.PRODUCT_MANAGEMENT)
  }
  return (
  <Flex justify="center">
    <Card styles={{ body: { padding: '30px 60px', width: 550 } }}>
      <Flex justify="center">
        <Image
          width={250}
          src={logo}
          preview={false}
        />
      </Flex>
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
              prefix={<MailOutlined className={styles.prefix} />}
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
              prefix={<LockOutlined className={styles.prefix} />}
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
              Login
            </Button>
          </Form.Item>

        </Space>
      </Form>
    </Card>
  </Flex>
  )
}

export default Login
