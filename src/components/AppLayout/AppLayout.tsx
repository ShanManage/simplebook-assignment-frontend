import { Layout, Menu, theme, Button, Grid, Flex, Image, Typography } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { useState, useEffect } from 'react'
import { Content, Header } from 'antd/es/layout/layout'
import {
  AppstoreOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '../../utils/constants'
import logo from '../../assets/react.svg'
import { useAuth } from '../../utils/helpers'

const { useBreakpoint } = Grid
const { Title } = Typography

const AppLayout = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const matches = useBreakpoint()
  const isLg = matches.lg ?? false
  const isMd = matches.md ?? false

  useEffect(() => {
    if (!isLg && isMd) {
      if (!collapsed) setCollapsed(!collapsed)
    }
    if (isLg && isMd) {
      if (collapsed) setCollapsed(!collapsed)
    }
  }, [collapsed, isLg, isMd, matches])

  const APP_SIDEBAR_ITEMS = [
    {
      key: 1,
      label: 'Product Management',
      title: 'Product Management',
      link: APP_ROUTES.PRODUCT_MANAGEMENT,
      icon: <AppstoreOutlined />,
    },
    {
      key: 2,
      label: 'Profile Management',
      title: 'Profile Management',
      link: APP_ROUTES.PROFILE_MANAGEMENT,
      icon: <AppstoreOutlined />,
    }
  ]

  const location = useLocation()
  const [current, setCurrent] = useState(
    location.pathname === '/' || location.pathname === ''
      ? APP_ROUTES.PRODUCT_MANAGEMENT
      : location.pathname
  )
  useEffect(() => {
    if (current !== location.pathname) {
      setCurrent(location.pathname)
    }
  }, [location, current])

  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const signOut = () => {
    logout().then((value) => { if (value) navigate(APP_ROUTES.ROOT) })
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{ background: colorBgContainer, borderRight: '1px solid #d9d9d9' }}
      >
        {!collapsed &&
          <Flex justify="center" align='center'>
            <Image
              width={50}
              src={logo}
              preview={false}
              style={{ padding: '20px 5px' }}
            />
            <Title level={3} style={{ margin: 5 }}>
              Simplebooks
            </Title>
          </Flex>
        }
        {collapsed &&
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => { setCollapsed(!collapsed) }}
            style={{
              fontSize: '16px',
              width: 75,
              height: 75
            }}
          />
        }
        <Menu
          mode="inline"
          defaultSelectedKeys={[current]}
        >
          {APP_SIDEBAR_ITEMS.map((sidebar) => (
            <Menu.Item key={sidebar.link} icon={sidebar.icon}>
              <NavLink to={sidebar.link}>{sidebar.label}</NavLink>
            </Menu.Item>
          ))}
          <Menu.Item className='signOut' icon={<LogoutOutlined />} key="7" onClick={signOut}
            style={{
              position: 'absolute',
              bottom: 0
            }}
          >
            Sign out
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, borderBottom: '1px solid #d9d9d9' }}>
          <Flex>
            <Title level={2} className='page-title'>
              {APP_SIDEBAR_ITEMS.find((item) => item.link === current)?.title}
            </Title>
          </Flex>
        </Header>
        <Content className="site-layout">
          <div className='app-content'>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
