import {
  Button,
  Card,
  Space,
  Table,
  TableProps,
  Tag,
} from "antd"
import { ProductsTableDataDto } from "../../interfaces/table";
import { APP_ROUTES, TESTING_SUMMARY_DUMMY_DATA } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()
  return (
    <>
      <Card
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Testing Summary</span>
            <Button type="primary" size="large" onClick={() => navigate(APP_ROUTES.CREATE_PRODUCT)}>Create Product</Button>
          </div>
        }
        style={{ width: '100%', marginTop: '20px' }}
      >
        <Table
          size="small"
          columns={columns}
          dataSource={TESTING_SUMMARY_DUMMY_DATA}
          pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 50, 100] }}
        />
      </Card>
    </>
  )
}

export default ProductManagement
