import React from 'react';
import { Card, Row, Col, Statistic, Button, List, Avatar, Typography } from 'antd';
import {
  ProjectOutlined,
  ApartmentOutlined,
  FileTextOutlined,
  CodeOutlined,
  PlusOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const recentProjects = [
    {
      id: '1',
      name: '电商系统',
      description: '基于DDD的电商平台设计',
      updatedAt: '2025-09-14 10:30',
      status: 'active',
    },
    {
      id: '2',
      name: '用户管理系统',
      description: '用户聚合和权限管理',
      updatedAt: '2025-09-13 15:20',
      status: 'active',
    },
    {
      id: '3',
      name: '订单处理系统',
      description: '订单聚合和支付流程',
      updatedAt: '2025-09-12 09:15',
      status: 'draft',
    },
  ];

  const quickActions = [
    {
      title: '创建新项目',
      description: '开始一个新的DDD项目',
      icon: <ProjectOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
      action: () => navigate('/project/create'),
    },
    {
      title: '设计领域模型',
      description: '创建领域和限界上下文',
      icon: <ApartmentOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
      action: () => navigate('/ddd/domain'),
    },
    {
      title: '生成界面',
      description: '基于聚合生成AMIS界面',
      icon: <FileTextOutlined style={{ fontSize: '24px', color: '#faad14' }} />,
      action: () => navigate('/screen/generate'),
    },
    {
      title: '代码生成',
      description: '生成前后端代码',
      icon: <CodeOutlined style={{ fontSize: '24px', color: '#722ed1' }} />,
      action: () => navigate('/generation'),
    },
  ];

  return (
    <div>
      <Title level={2}>工作台</Title>
      <Text type="secondary">欢迎使用DDD驱动开发平台</Text>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="项目总数"
              value={12}
              prefix={<ProjectOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="领域数量"
              value={8}
              prefix={<ApartmentOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="聚合数量"
              value={24}
              prefix={<ApartmentOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="界面数量"
              value={36}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <Card
            title="最近项目"
            extra={
              <Button type="link" onClick={() => navigate('/project')}>
                查看全部 <ArrowRightOutlined />
              </Button>
            }
          >
            <List
              dataSource={recentProjects}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button type="link" key="edit" onClick={() => navigate(`/project/${item.id}`)}>
                      编辑
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<ProjectOutlined />} />}
                    title={item.name}
                    description={item.description}
                  />
                  <div>
                    <Text type="secondary">{item.updatedAt}</Text>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="快速操作">
            <Row gutter={[16, 16]}>
              {quickActions.map((action, index) => (
                <Col xs={24} sm={12} key={index}>
                  <Card
                    hoverable
                    onClick={action.action}
                    style={{ textAlign: 'center', cursor: 'pointer' }}
                  >
                    <div style={{ marginBottom: '12px' }}>{action.icon}</div>
                    <Title level={5}>{action.title}</Title>
                    <Text type="secondary">{action.description}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card title="快速开始">
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <ProjectOutlined style={{ fontSize: '64px', color: '#d9d9d9', marginBottom: '16px' }} />
              <Title level={3}>开始您的DDD之旅</Title>
              <Text type="secondary" style={{ display: 'block', marginBottom: '24px' }}>
                创建您的第一个项目，体验DDD驱动的可视化开发
              </Text>
              <Button type="primary" size="large" icon={<PlusOutlined />} onClick={() => navigate('/project/create')}>
                创建新项目
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;


