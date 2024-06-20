import {
  Button,
  Card,
  Form,
  Input,
  Space,
  Table,
  TableProps,
  Tag,
  Upload,
} from "antd"
import { ProductsFormFields } from "../../interfaces"
import { UploadOutlined } from '@ant-design/icons';
import { ProductsTableDataDto } from "../../interfaces/table";
import { TESTING_SUMMARY_DUMMY_DATA } from "../../utils/constants";

const columns: TableProps<ProductsTableDataDto>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const ProductManagement = () => {
  const onFinish = (values: ProductsFormFields) => {
    console.log(values)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const handleBeforeUpload = (file: File): boolean | string => {
    console.log('handleBeforeUpload', file)
    return Upload.LIST_IGNORE
  }
  return (
    <>
      <Card title="Add Product" className="full-width">
        <Form
          onFinish={onFinish}
          labelCol={{ span: 4 }}
        >
          <Space direction="vertical" className="full-width">
            <Form.Item<ProductsFormFields>
              name="name"
              label="Product Name"
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
            <Form.Item<ProductsFormFields>
              name="image"
              label="Product Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                { required: true, message: 'Please upload product image!' },
              ]}
            >
              <Upload
                showUploadList={false}
                beforeUpload={handleBeforeUpload}
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item<ProductsFormFields>
              name="description"
              label="Product Description"
              rules={[{ required: true, message: 'Please enter product description!' }]}
            >
              <Input.TextArea
                size='large'
                placeholder='Enter Product description'
                rows={2}
                // disabled={}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 6, offset: 18 }}>
              <Button
                type="primary"
                size='large'
                htmlType="submit"
                className="full-width"
                // loading={}
              >
                Add Product
              </Button>
            </Form.Item>

          </Space>
        </Form>
      </Card>
      <Card 
        title="Products"
        style={{ width: '100%', marginTop: '20px' }}
      >
        <Table
          size="small"
          columns={columns}
          dataSource={TESTING_SUMMARY_DUMMY_DATA}
          pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions:[5,10,50,100] }}
        />
      </Card>
    </>
  )
}

export default ProductManagement
