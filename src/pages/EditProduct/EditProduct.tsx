import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Typography,
  Upload,
  Image
} from "antd"
import { GetProductPayloadDto, ProductsFormFields } from "../../interfaces"
import { InboxOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { AppDispatch, RootState } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productAction } from "../../redux/action";
const { Title } = Typography

const EditProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>()
  const [form] = useForm<ProductsFormFields>();
  const [file, setFile] = useState<File | null>(null)
  const [visible, setVisible] = useState(false);

  const isLoading = useSelector((state: RootState) => state.product.isLoading)
  const product = useSelector((state: RootState) => state.product.product)

  useEffect(() => {
    const payload: GetProductPayloadDto = {
      pathParam: {
        productId: id ?? ''
      }
    }
    dispatch(productAction.getProduct(payload))
  }, [])

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name,
        price: product.price,
        description: product.description,
      });
    }
  }, [product, form]);

  const onClickPreview = () => {
    setVisible(true)
  }

  const onFinish = (values: ProductsFormFields) => {
    console.log(values)
    if (file === null) {
      form.setFields([
        { name: 'image', errors: ['Please upload product image!'] }
      ]);
      return;
    }

    const formData = new FormData();
    // formData.append('name', values.name);
    // formData.append('description', values.description);
    // formData.append('price', values.price);
    formData.append('image', file);

    // const payload = { bodyParam: formData };

    // dispatch(productAction.createProduct(payload))
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
    <Card 
    title={
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={4}>Edit Product</Title>
        <Button type="link" size="large" onClick={onClickPreview}>Preview Product Image</Button>
      </div>
    }
    className="full-width"
    >
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 4 }}
      >
        <Space direction="vertical" className="full-width">
          <Row gutter={24}>
            <Col xs={12} >
              <Form.Item<ProductsFormFields>
                name="name"
                rules={[
                  { required: true, message: 'Please enter product name!' },
                ]}
              >
                <Input
                  size='large'
                  placeholder='Enter Product Name'
                // disabled={}
                />
              </Form.Item>
            </Col>
            <Col xs={12} >
              <Form.Item<ProductsFormFields>
                name="price"
                rules={[
                  { required: true, message: 'Please enter product price!' },
                ]}
              >
                <Input
                  size='large'
                  placeholder='Enter Product Price'
                // disabled={}
                />
              </Form.Item>
            </Col>
            <Col xs={24} >
              <Form.Item<ProductsFormFields>
                name="description"
                rules={[{ required: true, message: 'Please enter product description!' }]}
              >
                <Input.TextArea
                  size='large'
                  placeholder='Enter Product description'
                  rows={2}
                // disabled={}
                />
              </Form.Item>
            </Col>
            <Col xs={24} >
              <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                <Upload.Dragger name="image" showUploadList={false} beforeUpload={handleBeforeUpload}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag new image to this area to upload</p>
                  <p className="ant-upload-hint">Support for a single upload.</p>
                </Upload.Dragger>
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Form.Item wrapperCol={{ span: 6, offset: 18 }}>
            <Button
              type="primary"
              size='large'
              htmlType="submit"
              className="full-width"
              loading={isLoading}
            >
              Edit Product
            </Button>
          </Form.Item>

        </Space>
      </Form>
      <Image
        width={200}
        style={{ display: 'none' }}
        src={product.image}
        preview={{
          visible,
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      />
    </Card>
  )
}

export default EditProduct
