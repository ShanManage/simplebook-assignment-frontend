import { 
  Card,
  Descriptions,
  DescriptionsProps,
} from "antd"

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'First Name',
    children: 'Zhou Maomao',
  },
  {
    key: '2',
    label: 'Last Name',
    children: '1810000000',
  },
  {
    key: '2',
    label: 'NIC',
    children: '1810000000',
  },
  {
    key: '4',
    label: 'Address',
    span: 3,
    children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
  },
  {
    key: '5',
    label: 'Telephone',
    children: 'empty',
  },
];

const ProfileManagement = () => {
  return (
    <Card>
      <Descriptions title="User Info" layout="horizontal" items={items} />
    </Card>
  )
}

export default ProfileManagement
