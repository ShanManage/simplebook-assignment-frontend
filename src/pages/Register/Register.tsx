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
import { SignUpFormFields } from "../../interfaces/auth";
import { useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux";
import { useEffect } from "react";
import { createAlert } from "../../redux/slice";

const { Title, Text } = Typography;

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const { createUser, isAuthorizing } = useAuth()

  const isLoading = useSelector((state: RootState) => state.auth.isLoading)
  const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized)

  useEffect(() => {
    if (!isLoading && isAuthorized) {
      dispatch(createAlert({
        message: 'Successfully Logged in',
        type: 'error',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      }));
      navigate(APP_ROUTES.PRODUCT_MANAGEMENT)
    }
  }, [isLoading, isAuthorized, navigate, dispatch])

  const onFinish = (values: SignUpFormFields) => {
    createUser(values)
  }

  const onNavigateToSignIn = () => {
    navigate(APP_ROUTES.ROOT)
  }
  return (
    <Flex justify="center">
      <Card styles={{ body: { padding: '30px 60px' } }}>
        <Flex justify="center"><Title level={3} style={{ margin: '0px' }}>Simplebooks</Title></Flex>
        <Flex justify="center"><Title level={3} style={{ margin: '0px' }}>Take Home Assignment</Title></Flex><br />
        <Flex justify="center"><Text disabled>Create your account</Text></Flex><br /><br />

        <Form onFinish={onFinish}>
          <Space direction="vertical" className="full-width">

            <Space direction="horizontal">
              <Form.Item<SignUpFormFields>
                name="firstName"
                rules={[
                  { required: true, message: 'Please enter your first name!' },
                ]}
              >
                <Input
                  size='large'
                  prefix={<UserOutlined className='prefix-icon' />}
                  placeholder='First Name'
                // disabled={}
                />
              </Form.Item>
              <Form.Item<SignUpFormFields> name="lastName">
                <Input
                  size='large'
                  prefix={<UserOutlined className='prefix-icon' />}
                  placeholder='Last Name'
                // disabled={}
                />
              </Form.Item>
            </Space>
            <Form.Item<SignUpFormFields>
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
            <Form.Item<SignUpFormFields>
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
            <Form.Item<SignUpFormFields>
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                size='large'
                prefix={<LockOutlined className='prefix-icon' />}
                placeholder='Confirm Password'
              // disabled={}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                size='large'
                htmlType="submit"
                className='full-width'
                loading={isAuthorizing || isLoading}
              >
                Sign up
              </Button>
            </Form.Item>

          </Space>
        </Form>

        <Flex justify="center"><Text strong>Already have an account.?</Text></Flex>
        <Flex justify="center">
          <Button type="link" onClick={onNavigateToSignIn}>Sign in</Button>
        </Flex>
      </Card>
    </Flex>
  )
}

export default Register
