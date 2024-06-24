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
  Image,
  Spin
} from "antd"
import { EditProductImagePayloadDto, EditProductPayloadDto, GetProductPayloadDto, ProductsFormFields } from "../../interfaces"
import { InboxOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { AppDispatch, RootState } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { productAction } from "../../redux/action";
import { APP_ROUTES } from "../../utils/constants";
import { clearProductStatus } from "../../redux/slice/product";
const { Title } = Typography

const EditProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>()
  const [form] = useForm<ProductsFormFields>();
  const [file, setFile] = useState<File | null>(null)

  const isLoading = useSelector((state: RootState) => state.product.isLoading)
  const product = useSelector((state: RootState) => state.product.product)
  const status = useSelector((state: RootState) => state.product.status)

  useEffect(() => {
    const payload: GetProductPayloadDto = {
      pathParam: {
        productId: id ?? ''
      }
    }
    dispatch(productAction.getProduct(payload))

    return () => {
      dispatch(clearProductStatus())
    }
  }, [])

  useEffect(() => {
    if (!isLoading && status === 'success') {
      dispatch(clearProductStatus())
      const payload: GetProductPayloadDto = {
        pathParam: {
          productId: id ?? ''
        }
      }
      dispatch(productAction.getProduct(payload))
    }
  }, [isLoading, status])

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name,
        price: product.price,
        description: product.description,
      });
    }
  }, [product, form]);

  const onFinish = (values: ProductsFormFields) => {
    const payload: EditProductPayloadDto = {
      pathParam: {
        productId: id ?? ''
      },
      bodyParam: {
        name: values.name,
        description: values.description,
        image: product.image,
        price: values.price
      }
    };

    dispatch(productAction.editProduct(payload))
  }

  const onUploadProductImage = () => {
    if (file === null) {
      form.setFields([
        { name: 'image', errors: ['Please upload product image!'] }
      ]);
      return;
    }
    const formData = new FormData();
    formData.append('image', file);

    const payload: EditProductImagePayloadDto = {
      pathParam: {
        productId: id ?? ''
      },
      bodyParam: formData
    };

    dispatch(productAction.editProductImage(payload))
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
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={4}>Edit Product</Title>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(APP_ROUTES.PRODUCT_MANAGEMENT)}>Back</Button>
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
            <Col xs={{ span: 6, offset: 18 }} >
              <Button
                type="primary"
                size='large'
                htmlType="submit"
                className="full-width"
              >
                Edit Product
              </Button>
            </Col>
          </Row>
        </Space>
      </Form>
      <Divider />
      <Row gutter={[24, 24]}>
        <Col xs={6} >
          <Image
            width={200}
            style={{ border: '1px dotted gray' }}
            src={product.image}
          />
        </Col>
        <Col xs={18} >
          <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <Upload.Dragger name="image" showUploadList={false} beforeUpload={handleBeforeUpload}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag image to this area to update product image</p>
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
            onClick={onUploadProductImage}
          >
            Upload
          </Button>
        </Col>
      </Row>
    </Card>
    </Spin>
  )
}

export default EditProduct
