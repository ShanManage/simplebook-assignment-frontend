import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Row,
  Space,
  Spin,
  Upload,
} from "antd"
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/action";
import { InboxOutlined } from '@ant-design/icons';
import {
  EditUserInfoPayloadDto,
  UserFormFields,
} from "../../interfaces";
import { useForm } from "antd/es/form/Form";
import { FAULT_TOLERANT } from "../../utils/constants";

const ProfileManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = useForm<UserFormFields>();
  const [file, setFile] = useState<File | null>(null)

  const isLoading = useSelector((state: RootState) => state.user.isLoading)
  const user = useSelector((state: RootState) => state.user.user)

  useEffect(() => {
    dispatch(userAction.getUserInfo())
  }, [])

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
        address: user.address,
        phone: user.phone,
        image: user.image,
      });
    }
  }, [user, form]);

  const onFinish = (values: UserFormFields) => {
    const payload: EditUserInfoPayloadDto = {
      bodyParam: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        image: user.image
      }
    };

    dispatch(userAction.editProfile(payload))
  }

  const onUploadUserProfile = () => {
    if (file === null) {
      form.setFields([
        { name: 'image', errors: ['Please upload product image!'] }
      ]);
      return;
    }
    const formData = new FormData();
    formData.append('image', file);

    // const payload: EditProductImagePayloadDto = {
    //   pathParam: {
    //     productId: id ?? ''
    //   },
    //   bodyParam: formData
    // };

    // dispatch(productAction.editProductImage(payload))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const handleBeforeUpload = (file: File): boolean | string => {
    setFile(file)
    return Upload.LIST_IGNORE
  }
  return (
    <Spin spinning={isLoading}>
      <Card className="full-width">
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 4 }}
        >
          <Space direction="vertical" className="full-width">
            <Row gutter={24}>
              <Col xs={{ span: 12, offset: 6 }} >
                <Row gutter={24}>
                  <Col xs={24} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <Image
                      width={200}
                      style={{ border: '1px dotted gray' }}
                      src={user.image ?? FAULT_TOLERANT}
                    />
                  </Col>
                  <Col xs={24} >
                    <Form.Item<UserFormFields> name="email">
                      <Input size='large' disabled={true}/>
                    </Form.Item>
                  </Col>
                  <Col xs={12} >
                    <Form.Item<UserFormFields>
                      name="firstName"
                      rules={[
                        { required: true, message: 'Please enter first name!' },
                      ]}
                    >
                      <Input
                        size='large'
                        placeholder='Enter First Name'
                      // disabled={}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={12} >
                    <Form.Item<UserFormFields>
                      name="lastName"
                      rules={[
                        { required: true, message: 'Please enter last name!' },
                      ]}
                    >
                      <Input
                        size='large'
                        placeholder='Enter Last Name'
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={12} >
                    <Form.Item<UserFormFields> name="phone">
                      <Input
                        size='large'
                        placeholder='Enter Your Phone Number'
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={12} >
                    <Form.Item<UserFormFields> name="address">
                      <Input
                        size='large'
                        placeholder='Enter Your Address'
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 6, offset: 18 }} >
                    <Button
                      type="primary"
                      size='large'
                      htmlType="submit"
                      className="full-width"
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Space>
        </Form>
        <Divider />
        <Row>
          <Col xs={{ span: 12, offset: 6 }} >
        <Row gutter={[24, 24]}>
          <Col xs={24} >
            <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <Upload.Dragger name="image" showUploadList={false} beforeUpload={handleBeforeUpload}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag image to this area to update profile image</p>
                <p className="ant-upload-hint">Support for a single upload.</p>
              </Upload.Dragger>
            </Form.Item>
          </Col>
          <Col xs={{ span: 6, offset: 18 }} >
            <Button
              type="primary"
              size='large'
              htmlType="submit"
              className="full-width"
              onClick={onUploadUserProfile}
            >
              Upload
            </Button>
          </Col>
        </Row>
          </Col>
        </Row>
      </Card>
    </Spin>
  )
}

export default ProfileManagement
