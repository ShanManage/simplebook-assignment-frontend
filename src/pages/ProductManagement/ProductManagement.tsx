import {
  Button,
  Card,
  Space,
  Table,
  TableProps,
  Image,
  Typography,
  Modal,
} from "antd"
import { ProductsTableDataDto } from "../../interfaces/table";
import { APP_ROUTES, TABLE_DEFAULT_PAGE_SIZE, getEditProductRoute } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux";
import { productAction } from "../../redux/action";
import { DeleteProductPayloadDto } from "../../interfaces";
import { clearProductStatus } from "../../redux/slice/product";

const { Title } = Typography

const ProductManagement = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();

  const [image, setImage] = useState('')
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('')

  const allProducts = useSelector((state: RootState) => state.product.allProducts)
  const isLoading = useSelector((state: RootState) => state.product.isLoading)
  const status = useSelector((state: RootState) => state.product.status)

  const onClickPreview = (product: ProductsTableDataDto) => {
    setImage(product.image)
    setVisible(true)
  }

  const columns: TableProps<ProductsTableDataDto>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => { onClickPreview(record) }}>Preview</Button>
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => { navigate(getEditProductRoute(record.key)) }}>Edit</Button>
          <Button type="link" onClick={() => { showModal(record.key) }}>Delete</Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(productAction.getAllProducts())
  }, [])

  useEffect(() => {
    if (!isLoading && status === 'success') {
      dispatch(clearProductStatus())
      dispatch(productAction.getAllProducts())
    }
  }, [isLoading, status])

  const showModal = (id: string) => {
    setSelectedProductId(id)
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
    
    const payload: DeleteProductPayloadDto = {
      pathParam: {
        productId: selectedProductId
      }
    }
    dispatch(productAction.deleteProduct(payload))
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={4}>Product List</Title>
            <Button type="primary" onClick={() => navigate(APP_ROUTES.CREATE_PRODUCT)}>Create Product</Button>
          </div>
        }
        style={{ width: '100%', marginTop: '20px' }}
      >
        <Table
          size="small"
          loading={isLoading}
          columns={columns}
          dataSource={allProducts.map((product) => {
            return {
              key: product.id,
              name: product.name,
              description: product.description,
              price: product.price,
              image: product.image
            }
          })}
          pagination={{ defaultPageSize: TABLE_DEFAULT_PAGE_SIZE, showSizeChanger: true, pageSizeOptions: [10, 50, 100] }}
        />
      </Card>
      
      <Image
        width={200}
        style={{ display: 'none' }}
        src={image}
        preview={{
          visible,
          onVisibleChange: (value) => {
            setVisible(value);
            setImage('')
          },
        }}
      />
      
      <Modal
        open={open}
        title="Delete Product"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <p>Are you sure, you want to delete this product</p>
      </Modal>
    </>
  )
}

export default ProductManagement
