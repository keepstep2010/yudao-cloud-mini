import React, { useState, useEffect } from 'react';
import { Layout, Card, Row, Col, Button, Typography, Space, Avatar, Tag, Progress, Statistic, List, Modal, Form, Input, Select, message } from 'antd';
import { 
  PlusOutlined, 
  SettingOutlined, 
  TeamOutlined, 
  FileTextOutlined,
  DashboardOutlined,
  ProjectOutlined,
  UserOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ProjectMetadata } from '@types';

const { Header, Content, Sider } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

interface ProjectWorkspaceProps {
  projects?: ProjectMetadata[];
  onCreateProject?: (project: Partial<ProjectMetadata>) => void;
  onUpdateProject?: (id: string, project: Partial<ProjectMetadata>) => void;
  onDeleteProject?: (id: string) => void;
}

const ProjectWorkspace: React.FC<ProjectWorkspaceProps> = ({
  projects = [],
  onCreateProject,
  onUpdateProject,
  onDeleteProject
}) => {
  const navigate = useNavigate();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectMetadata | null>(null);
  const [form] = Form.useForm();

  // 模拟数据
  const mockProjects: ProjectMetadata[] = [
    {
      id: '1',
      name: '电商系统',
      description: '基于DDD的电商平台项目',
      status: 'active',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      members: [
        { id: '1', name: '张三', role: 'owner', avatar: '' },
        { id: '2', name: '李四', role: 'developer', avatar: '' }
      ],
      domains: 3,
      boundedContexts: 8,
      aggregates: 15,
      entities: 45,
      screens: 12
    },
    {
      id: '2',
      name: 'CRM系统',
      description: '客户关系管理系统',
      status: 'active',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18',
      members: [
        { id: '3', name: '王五', role: 'owner', avatar: '' },
        { id: '4', name: '赵六', role: 'developer', avatar: '' }
      ],
      domains: 2,
      boundedContexts: 5,
      aggregates: 10,
      entities: 25,
      screens: 8
    }
  ];

  const [projectList, setProjectList] = useState<ProjectMetadata[]>(mockProjects);

  const handleCreateProject = async (values: any) => {
    try {
      const newProject: ProjectMetadata = {
        id: Date.now().toString(),
        name: values.name,
        description: values.description,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        members: [],
        domains: 0,
        boundedContexts: 0,
        aggregates: 0,
        entities: 0,
        screens: 0
      };

      setProjectList(prev => [...prev, newProject]);
      setIsCreateModalVisible(false);
      form.resetFields();
      message.success('项目创建成功！');
      
      if (onCreateProject) {
        onCreateProject(newProject);
      }
    } catch (error) {
      message.error('项目创建失败！');
    }
  };

  const handleProjectClick = (project: ProjectMetadata) => {
    navigate(`/project/${project.id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'inactive': return 'orange';
      case 'archived': return 'gray';
      default: return 'blue';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '进行中';
      case 'inactive': return '暂停';
      case 'archived': return '已归档';
      default: return '未知';
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Header style={{ 
        background: '#fff', 
        padding: '0 24px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <DashboardOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '12px' }} />
          <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
            DDD驱动开发平台
          </Title>
        </div>
        <Space>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setIsCreateModalVisible(true)}
          >
            新建项目
          </Button>
          <Button icon={<SettingOutlined />}>
            设置
          </Button>
        </Space>
      </Header>

      <Content style={{ padding: '24px' }}>
        {/* 统计概览 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col span={6}>
            <Card>
              <Statistic
                title="总项目数"
                value={projectList.length}
                prefix={<ProjectOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="活跃项目"
                value={projectList.filter(p => p.status === 'active').length}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="总领域数"
                value={projectList.reduce((sum, p) => sum + p.domains, 0)}
                prefix={<FileTextOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="总实体数"
                value={projectList.reduce((sum, p) => sum + p.entities, 0)}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#fa8c16' }}
              />
            </Card>
          </Col>
        </Row>

        {/* 项目列表 */}
        <Card title="我的项目" extra={
          <Search
            placeholder="搜索项目"
            style={{ width: 200 }}
            onSearch={(value) => console.log('搜索:', value)}
          />
        }>
          <Row gutter={[16, 16]}>
            {projectList.map((project) => (
              <Col span={8} key={project.id}>
                <Card
                  hoverable
                  style={{ height: '280px' }}
                  actions={[
                    <SettingOutlined key="setting" onClick={() => {
                      setSelectedProject(project);
                      setIsSettingsModalVisible(true);
                    }} />,
                    <TeamOutlined key="team" />,
                    <FileTextOutlined key="files" />
                  ]}
                  onClick={() => handleProjectClick(project)}
                >
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <Avatar 
                      size={48} 
                      icon={<ProjectOutlined />}
                      style={{ backgroundColor: '#1890ff' }}
                    />
                  </div>
                  
                  <Title level={4} style={{ textAlign: 'center', marginBottom: '8px' }}>
                    {project.name}
                  </Title>
                  
                  <Paragraph 
                    ellipsis={{ rows: 2 }} 
                    style={{ textAlign: 'center', marginBottom: '12px' }}
                  >
                    {project.description}
                  </Paragraph>

                  <div style={{ marginBottom: '12px' }}>
                    <Tag color={getStatusColor(project.status)}>
                      {getStatusText(project.status)}
                    </Tag>
                  </div>

                  <Row gutter={8} style={{ marginBottom: '8px' }}>
                    <Col span={12}>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        领域: {project.domains}
                      </Text>
                    </Col>
                    <Col span={12}>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        实体: {project.entities}
                      </Text>
                    </Col>
                  </Row>

                  <Row gutter={8} style={{ marginBottom: '8px' }}>
                    <Col span={12}>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        限界上下文: {project.boundedContexts}
                      </Text>
                    </Col>
                    <Col span={12}>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        屏幕: {project.screens}
                      </Text>
                    </Col>
                  </Row>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text type="secondary" style={{ fontSize: '11px' }}>
                      <CalendarOutlined /> {project.updatedAt}
                    </Text>
                    <Text type="secondary" style={{ fontSize: '11px' }}>
                      <TeamOutlined /> {project.members.length}
                    </Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

        {/* 创建项目模态框 */}
        <Modal
          title="创建新项目"
          open={isCreateModalVisible}
          onCancel={() => {
            setIsCreateModalVisible(false);
            form.resetFields();
          }}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateProject}
          >
            <Form.Item
              name="name"
              label="项目名称"
              rules={[{ required: true, message: '请输入项目名称' }]}
            >
              <Input placeholder="请输入项目名称" />
            </Form.Item>

            <Form.Item
              name="description"
              label="项目描述"
              rules={[{ required: true, message: '请输入项目描述' }]}
            >
              <Input.TextArea 
                rows={4} 
                placeholder="请输入项目描述"
              />
            </Form.Item>

            <Form.Item
              name="template"
              label="项目模板"
            >
              <Select placeholder="选择项目模板（可选）">
                <Select.Option value="ecommerce">电商系统模板</Select.Option>
                <Select.Option value="crm">CRM系统模板</Select.Option>
                <Select.Option value="erp">ERP系统模板</Select.Option>
                <Select.Option value="blank">空白项目</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
              <Space>
                <Button onClick={() => {
                  setIsCreateModalVisible(false);
                  form.resetFields();
                }}>
                  取消
                </Button>
                <Button type="primary" htmlType="submit">
                  创建项目
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* 项目设置模态框 */}
        <Modal
          title="项目设置"
          open={isSettingsModalVisible}
          onCancel={() => setIsSettingsModalVisible(false)}
          footer={null}
          width={800}
        >
          {selectedProject && (
            <div>
              <Title level={4}>{selectedProject.name}</Title>
              <Paragraph>{selectedProject.description}</Paragraph>
              
              <Title level={5}>项目统计</Title>
              <Row gutter={16}>
                <Col span={6}>
                  <Statistic title="领域数" value={selectedProject.domains} />
                </Col>
                <Col span={6}>
                  <Statistic title="限界上下文" value={selectedProject.boundedContexts} />
                </Col>
                <Col span={6}>
                  <Statistic title="聚合" value={selectedProject.aggregates} />
                </Col>
                <Col span={6}>
                  <Statistic title="实体" value={selectedProject.entities} />
                </Col>
              </Row>

              <Title level={5} style={{ marginTop: '24px' }}>项目成员</Title>
              <List
                dataSource={selectedProject.members}
                renderItem={(member) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={member.name}
                      description={member.role}
                    />
                  </List.Item>
                )}
              />
            </div>
          )}
        </Modal>
      </Content>
    </Layout>
  );
};

export default ProjectWorkspace;




