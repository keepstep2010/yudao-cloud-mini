import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Tag, 
  Space, 
  Typography, 
  message, 
  Popconfirm,
  Tooltip,
  Tabs,
  List,
  Divider,
  Tree,
  Drawer,
  Row,
  Col,
  Statistic
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  GlobalOutlined,
  NodeIndexOutlined,
  ShareAltOutlined,
  CrownOutlined,
  SearchOutlined,
  FileTextOutlined,
  LinkOutlined,
  EyeOutlined,
  SettingOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

interface Domain {
  id: string;
  name: string;
  description: string;
  type: 'core' | 'supporting' | 'generic';
  priority: 'high' | 'medium' | 'low';
  boundedContexts: string[];
  stakeholders: string[];
  businessValue: string;
  complexity: 'high' | 'medium' | 'low';
  createdAt: string;
  updatedAt: string;
  author: string;
  status: 'draft' | 'review' | 'approved' | 'deprecated';
}

interface BoundedContext {
  id: string;
  name: string;
  description: string;
  domain: string;
  purpose: string;
  responsibilities: string[];
  interfaces: string[];
  aggregates: string[];
  entities: string[];
  valueObjects: string[];
  domainServices: string[];
  domainEvents: string[];
  repositories: string[];
  createdAt: string;
  updatedAt: string;
  author: string;
  status: 'draft' | 'review' | 'approved' | 'deprecated';
}

interface ContextMapping {
  id: string;
  sourceContext: string;
  targetContext: string;
  relationship: 'upstream' | 'downstream' | 'peer' | 'conformist' | 'anticorruption' | 'open-host' | 'published-language' | 'shared-kernel';
  description: string;
  protocols: string[];
  contracts: string[];
  createdAt: string;
  updatedAt: string;
  author: string;
}

const StrategicDesign: React.FC = () => {
  const [activeTab, setActiveTab] = useState('domains');
  const [isDomainModalVisible, setIsDomainModalVisible] = useState(false);
  const [isContextModalVisible, setIsContextModalVisible] = useState(false);
  const [isMappingModalVisible, setIsMappingModalVisible] = useState(false);
  const [isMappingDrawerVisible, setIsMappingDrawerVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [domainForm] = Form.useForm();
  const [contextForm] = Form.useForm();
  const [mappingForm] = Form.useForm();

  // 模拟数据
  const mockDomains: Domain[] = [
    {
      id: '1',
      name: '用户管理域',
      description: '负责用户注册、认证、权限管理等核心功能',
      type: 'core',
      priority: 'high',
      boundedContexts: ['用户认证', '权限管理', '用户档案'],
      stakeholders: ['产品经理', '开发团队', '安全团队'],
      businessValue: '提供用户身份认证和权限控制，保障系统安全',
      complexity: 'medium',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      author: '张三',
      status: 'approved'
    },
    {
      id: '2',
      name: '订单管理域',
      description: '处理订单创建、支付、配送等业务流程',
      type: 'core',
      priority: 'high',
      boundedContexts: ['订单处理', '支付管理', '配送管理'],
      stakeholders: ['业务分析师', '开发团队', '运营团队'],
      businessValue: '实现订单全生命周期管理，提升业务效率',
      complexity: 'high',
      createdAt: '2024-01-02',
      updatedAt: '2024-01-16',
      author: '李四',
      status: 'approved'
    },
    {
      id: '3',
      name: '商品管理域',
      description: '管理商品信息、库存、分类等商品相关功能',
      type: 'supporting',
      priority: 'medium',
      boundedContexts: ['商品信息', '库存管理', '分类管理'],
      stakeholders: ['商品经理', '开发团队'],
      businessValue: '维护商品信息完整性，支持业务运营',
      complexity: 'medium',
      createdAt: '2024-01-03',
      updatedAt: '2024-01-17',
      author: '王五',
      status: 'review'
    }
  ];

  const mockBoundedContexts: BoundedContext[] = [
    {
      id: '1',
      name: '用户认证',
      description: '负责用户登录、注册、密码管理等认证功能',
      domain: '用户管理域',
      purpose: '提供安全的用户身份认证服务',
      responsibilities: ['用户注册', '用户登录', '密码管理', '会话管理'],
      interfaces: ['REST API', 'GraphQL'],
      aggregates: ['用户聚合', '会话聚合'],
      entities: ['用户', '会话', '密码'],
      valueObjects: ['邮箱', '密码', '令牌'],
      domainServices: ['认证服务', '密码服务'],
      domainEvents: ['用户注册事件', '登录成功事件'],
      repositories: ['用户仓储', '会话仓储'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      author: '张三',
      status: 'approved'
    },
    {
      id: '2',
      name: '订单处理',
      description: '处理订单创建、状态变更、取消等订单操作',
      domain: '订单管理域',
      purpose: '管理订单全生命周期',
      responsibilities: ['订单创建', '订单状态管理', '订单查询', '订单取消'],
      interfaces: ['REST API', '消息队列'],
      aggregates: ['订单聚合', '订单项聚合'],
      entities: ['订单', '订单项', '订单状态'],
      valueObjects: ['订单号', '金额', '地址'],
      domainServices: ['订单服务', '状态服务'],
      domainEvents: ['订单创建事件', '订单状态变更事件'],
      repositories: ['订单仓储', '订单项仓储'],
      createdAt: '2024-01-02',
      updatedAt: '2024-01-16',
      author: '李四',
      status: 'approved'
    }
  ];

  const mockContextMappings: ContextMapping[] = [
    {
      id: '1',
      sourceContext: '用户认证',
      targetContext: '订单处理',
      relationship: 'upstream',
      description: '用户认证为订单处理提供用户身份验证',
      protocols: ['JWT', 'OAuth2'],
      contracts: ['用户信息接口', '认证状态接口'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      author: '张三'
    },
    {
      id: '2',
      sourceContext: '订单处理',
      targetContext: '支付管理',
      relationship: 'downstream',
      description: '订单处理触发支付流程',
      protocols: ['HTTP', '消息队列'],
      contracts: ['支付请求接口', '支付状态接口'],
      createdAt: '2024-01-02',
      updatedAt: '2024-01-16',
      author: '李四'
    }
  ];

  const [domains, setDomains] = useState<Domain[]>(mockDomains);
  const [boundedContexts, setBoundedContexts] = useState<BoundedContext[]>(mockBoundedContexts);
  const [contextMappings, setContextMappings] = useState<ContextMapping[]>(mockContextMappings);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'core': return 'red';
      case 'supporting': return 'blue';
      case 'generic': return 'green';
      default: return 'default';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'core': return '核心域';
      case 'supporting': return '支撑域';
      case 'generic': return '通用域';
      default: return '未知';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'default';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return '未知';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'default';
    }
  };

  const getComplexityText = (complexity: string) => {
    switch (complexity) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return '未知';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'green';
      case 'review': return 'orange';
      case 'draft': return 'blue';
      case 'deprecated': return 'red';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return '已批准';
      case 'review': return '审核中';
      case 'draft': return '草稿';
      case 'deprecated': return '已废弃';
      default: return '未知';
    }
  };

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'upstream': return 'blue';
      case 'downstream': return 'green';
      case 'peer': return 'orange';
      case 'conformist': return 'purple';
      case 'anticorruption': return 'red';
      case 'open-host': return 'cyan';
      case 'published-language': return 'magenta';
      case 'shared-kernel': return 'gold';
      default: return 'default';
    }
  };

  const getRelationshipText = (relationship: string) => {
    switch (relationship) {
      case 'upstream': return '上游';
      case 'downstream': return '下游';
      case 'peer': return '对等';
      case 'conformist': return '顺从者';
      case 'anticorruption': return '防腐层';
      case 'open-host': return '开放主机';
      case 'published-language': return '发布语言';
      case 'shared-kernel': return '共享内核';
      default: return '未知';
    }
  };

  const handleAddDomain = async (values: any) => {
    try {
      const newDomain: Domain = {
        id: Date.now().toString(),
        name: values.name,
        description: values.description,
        type: values.type,
        priority: values.priority,
        boundedContexts: [],
        stakeholders: values.stakeholders ? values.stakeholders.split(',').map((s: string) => s.trim()) : [],
        businessValue: values.businessValue,
        complexity: values.complexity,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        author: '当前用户',
        status: 'draft'
      };

      setDomains(prev => [...prev, newDomain]);
      setIsDomainModalVisible(false);
      domainForm.resetFields();
      message.success('领域添加成功！');
    } catch (error) {
      message.error('添加领域失败！');
    }
  };

  const handleAddBoundedContext = async (values: any) => {
    try {
      const newContext: BoundedContext = {
        id: Date.now().toString(),
        name: values.name,
        description: values.description,
        domain: values.domain,
        purpose: values.purpose,
        responsibilities: values.responsibilities ? values.responsibilities.split(',').map((s: string) => s.trim()) : [],
        interfaces: values.interfaces ? values.interfaces.split(',').map((s: string) => s.trim()) : [],
        aggregates: [],
        entities: [],
        valueObjects: [],
        domainServices: [],
        domainEvents: [],
        repositories: [],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        author: '当前用户',
        status: 'draft'
      };

      setBoundedContexts(prev => [...prev, newContext]);
      setIsContextModalVisible(false);
      contextForm.resetFields();
      message.success('限界上下文添加成功！');
    } catch (error) {
      message.error('添加限界上下文失败！');
    }
  };

  const handleAddContextMapping = async (values: any) => {
    try {
      const newMapping: ContextMapping = {
        id: Date.now().toString(),
        sourceContext: values.sourceContext,
        targetContext: values.targetContext,
        relationship: values.relationship,
        description: values.description,
        protocols: values.protocols ? values.protocols.split(',').map((s: string) => s.trim()) : [],
        contracts: values.contracts ? values.contracts.split(',').map((s: string) => s.trim()) : [],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        author: '当前用户'
      };

      setContextMappings(prev => [...prev, newMapping]);
      setIsMappingModalVisible(false);
      mappingForm.resetFields();
      message.success('上下文映射添加成功！');
    } catch (error) {
      message.error('添加上下文映射失败！');
    }
  };

  const handleEditDomain = (record: Domain) => {
    setEditingItem(record);
    domainForm.setFieldsValue({
      name: record.name,
      description: record.description,
      type: record.type,
      priority: record.priority,
      complexity: record.complexity,
      stakeholders: record.stakeholders.join(', '),
      businessValue: record.businessValue
    });
    setIsDomainModalVisible(true);
  };

  const handleDeleteDomain = (record: Domain) => {
    setDomains(prev => prev.filter(item => item.id !== record.id));
    message.success('领域删除成功！');
  };

  const handleEditBoundedContext = (record: BoundedContext) => {
    setEditingItem(record);
    contextForm.setFieldsValue({
      name: record.name,
      description: record.description,
      domain: record.domain,
      purpose: record.purpose,
      responsibilities: record.responsibilities.join(', '),
      interfaces: record.interfaces.join(', ')
    });
    setIsContextModalVisible(true);
  };

  const handleDeleteBoundedContext = (record: BoundedContext) => {
    setBoundedContexts(prev => prev.filter(item => item.id !== record.id));
    message.success('限界上下文删除成功！');
  };

  const handleEditContextMapping = (record: ContextMapping) => {
    setEditingItem(record);
    mappingForm.setFieldsValue({
      sourceContext: record.sourceContext,
      targetContext: record.targetContext,
      relationship: record.relationship,
      description: record.description,
      protocols: record.protocols.join(', '),
      contracts: record.contracts.join(', ')
    });
    setIsMappingModalVisible(true);
  };

  const handleDeleteContextMapping = (record: ContextMapping) => {
    setContextMappings(prev => prev.filter(item => item.id !== record.id));
    message.success('上下文映射删除成功！');
  };

  const domainColumns = [
    {
      title: '领域名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Domain) => (
        <Space>
          <GlobalOutlined />
          <Text strong>{text}</Text>
          {record.type === 'core' && <CrownOutlined style={{ color: '#faad14' }} />}
        </Space>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={getTypeColor(type)}>
          {getTypeText(type)}
        </Tag>
      ),
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => (
        <Tag color={getPriorityColor(priority)}>
          {getPriorityText(priority)}
        </Tag>
      ),
    },
    {
      title: '复杂度',
      dataIndex: 'complexity',
      key: 'complexity',
      render: (complexity: string) => (
        <Tag color={getComplexityColor(complexity)}>
          {getComplexityText(complexity)}
        </Tag>
      ),
    },
    {
      title: '限界上下文数量',
      dataIndex: 'boundedContexts',
      key: 'boundedContexts',
      render: (contexts: string[]) => (
        <Tag color="blue">{contexts.length}</Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '操作',
      key: 'actions',
      render: (record: Domain) => (
        <Space>
          <Tooltip title="查看详情">
            <Button type="link" icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="编辑">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEditDomain(record)} />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm title="确定要删除这个领域吗？" onConfirm={() => handleDeleteDomain(record)}>
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const contextColumns = [
    {
      title: '上下文名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <NodeIndexOutlined />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '所属领域',
      dataIndex: 'domain',
      key: 'domain',
      render: (domain: string) => <Tag color="purple">{domain}</Tag>,
    },
    {
      title: '目的',
      dataIndex: 'purpose',
      key: 'purpose',
      ellipsis: true,
    },
    {
      title: '职责数量',
      dataIndex: 'responsibilities',
      key: 'responsibilities',
      render: (responsibilities: string[]) => (
        <Tag color="blue">{responsibilities.length}</Tag>
      ),
    },
    {
      title: '聚合数量',
      dataIndex: 'aggregates',
      key: 'aggregates',
      render: (aggregates: string[]) => (
        <Tag color="green">{aggregates.length}</Tag>
      ),
    },
    {
      title: '实体数量',
      dataIndex: 'entities',
      key: 'entities',
      render: (entities: string[]) => (
        <Tag color="orange">{entities.length}</Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      render: (record: BoundedContext) => (
        <Space>
          <Tooltip title="查看详情">
            <Button type="link" icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="编辑">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEditBoundedContext(record)} />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm title="确定要删除这个限界上下文吗？" onConfirm={() => handleDeleteBoundedContext(record)}>
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const mappingColumns = [
    {
      title: '源上下文',
      dataIndex: 'sourceContext',
      key: 'sourceContext',
      render: (text: string) => (
        <Space>
          <LinkOutlined />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '目标上下文',
      dataIndex: 'targetContext',
      key: 'targetContext',
      render: (text: string) => (
        <Space>
          <LinkOutlined />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '关系类型',
      dataIndex: 'relationship',
      key: 'relationship',
      render: (relationship: string) => (
        <Tag color={getRelationshipColor(relationship)}>
          {getRelationshipText(relationship)}
        </Tag>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '协议数量',
      dataIndex: 'protocols',
      key: 'protocols',
      render: (protocols: string[]) => (
        <Tag color="blue">{protocols.length}</Tag>
      ),
    },
    {
      title: '合约数量',
      dataIndex: 'contracts',
      key: 'contracts',
      render: (contracts: string[]) => (
        <Tag color="green">{contracts.length}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      render: (record: ContextMapping) => (
        <Space>
          <Tooltip title="查看详情">
            <Button type="link" icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="编辑">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEditContextMapping(record)} />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm title="确定要删除这个映射吗？" onConfirm={() => handleDeleteContextMapping(record)}>
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Title level={2}>
            <GlobalOutlined style={{ marginRight: '8px' }} />
            战略设计工具
          </Title>
          <Button 
            icon={<ShareAltOutlined />}
            onClick={() => setIsMappingDrawerVisible(true)}
          >
            上下文映射图
          </Button>
        </div>

        {/* 统计概览 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="总领域数"
                value={domains.length}
                prefix={<GlobalOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="核心域数量"
                value={domains.filter(d => d.type === 'core').length}
                prefix={<CrownOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="限界上下文数"
                value={boundedContexts.length}
                prefix={<NodeIndexOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="上下文映射数"
                value={contextMappings.length}
                prefix={<LinkOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>
        
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="领域识别" key="domains">
            <div style={{ marginBottom: '16px' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsDomainModalVisible(true)}
              >
                添加领域
              </Button>
            </div>
            
            <Table
              columns={domainColumns}
              dataSource={domains}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              }}
            />
          </TabPane>

          <TabPane tab="限界上下文设计" key="contexts">
            <div style={{ marginBottom: '16px' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsContextModalVisible(true)}
              >
                添加限界上下文
              </Button>
            </div>
            
            <Table
              columns={contextColumns}
              dataSource={boundedContexts}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              }}
            />
          </TabPane>

          <TabPane tab="上下文映射" key="mappings">
            <div style={{ marginBottom: '16px' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsMappingModalVisible(true)}
              >
                添加映射关系
              </Button>
            </div>
            
            <Table
              columns={mappingColumns}
              dataSource={contextMappings}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              }}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* 添加领域模态框 */}
      <Modal
        title="添加领域"
        open={isDomainModalVisible}
        onCancel={() => {
          setIsDomainModalVisible(false);
          domainForm.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Form
          form={domainForm}
          layout="vertical"
          onFinish={handleAddDomain}
        >
          <Form.Item
            name="name"
            label="领域名称"
            rules={[{ required: true, message: '请输入领域名称' }]}
          >
            <Input placeholder="请输入领域名称" />
          </Form.Item>

          <Form.Item
            name="description"
            label="领域描述"
            rules={[{ required: true, message: '请输入领域描述' }]}
          >
            <TextArea rows={3} placeholder="请输入领域描述" />
          </Form.Item>

          <Form.Item
            name="type"
            label="领域类型"
            rules={[{ required: true, message: '请选择领域类型' }]}
          >
            <Select placeholder="请选择领域类型">
              <Option value="core">核心域</Option>
              <Option value="supporting">支撑域</Option>
              <Option value="generic">通用域</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="priority"
            label="优先级"
            rules={[{ required: true, message: '请选择优先级' }]}
          >
            <Select placeholder="请选择优先级">
              <Option value="high">高</Option>
              <Option value="medium">中</Option>
              <Option value="low">低</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="complexity"
            label="复杂度"
            rules={[{ required: true, message: '请选择复杂度' }]}
          >
            <Select placeholder="请选择复杂度">
              <Option value="high">高</Option>
              <Option value="medium">中</Option>
              <Option value="low">低</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="stakeholders"
            label="利益相关者"
          >
            <Input placeholder="请输入利益相关者，用逗号分隔" />
          </Form.Item>

          <Form.Item
            name="businessValue"
            label="业务价值"
            rules={[{ required: true, message: '请输入业务价值' }]}
          >
            <TextArea rows={2} placeholder="请输入业务价值描述" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => {
                setIsDomainModalVisible(false);
                domainForm.resetFields();
              }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                添加领域
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 添加上下文映射模态框 */}
      <Modal
        title="添加上下文映射"
        open={isMappingModalVisible}
        onCancel={() => {
          setIsMappingModalVisible(false);
          mappingForm.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={mappingForm}
          layout="vertical"
          onFinish={handleAddContextMapping}
        >
          <Form.Item
            name="sourceContext"
            label="源上下文"
            rules={[{ required: true, message: '请选择源上下文' }]}
          >
            <Select placeholder="请选择源上下文">
              {boundedContexts.map(context => (
                <Option key={context.id} value={context.name}>{context.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="targetContext"
            label="目标上下文"
            rules={[{ required: true, message: '请选择目标上下文' }]}
          >
            <Select placeholder="请选择目标上下文">
              {boundedContexts.map(context => (
                <Option key={context.id} value={context.name}>{context.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="relationship"
            label="关系类型"
            rules={[{ required: true, message: '请选择关系类型' }]}
          >
            <Select placeholder="请选择关系类型">
              <Option value="upstream">上游</Option>
              <Option value="downstream">下游</Option>
              <Option value="peer">对等</Option>
              <Option value="conformist">顺从者</Option>
              <Option value="anticorruption">防腐层</Option>
              <Option value="open-host">开放主机</Option>
              <Option value="published-language">发布语言</Option>
              <Option value="shared-kernel">共享内核</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="映射描述"
            rules={[{ required: true, message: '请输入映射描述' }]}
          >
            <TextArea rows={3} placeholder="请输入映射描述" />
          </Form.Item>

          <Form.Item
            name="protocols"
            label="通信协议"
          >
            <Input placeholder="请输入通信协议，用逗号分隔" />
          </Form.Item>

          <Form.Item
            name="contracts"
            label="接口合约"
          >
            <Input placeholder="请输入接口合约，用逗号分隔" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => {
                setIsMappingModalVisible(false);
                mappingForm.resetFields();
              }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                添加映射
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 上下文映射图抽屉 */}
      <Drawer
        title="上下文映射图"
        placement="right"
        width={800}
        open={isMappingDrawerVisible}
        onClose={() => setIsMappingDrawerVisible(false)}
      >
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Title level={4}>上下文映射关系图</Title>
          <Paragraph>
            这里将显示上下文之间的映射关系图，包括上游、下游、对等关系等。
          </Paragraph>
          <div style={{ 
            border: '2px dashed #d9d9d9', 
            borderRadius: '8px', 
            padding: '40px',
            background: '#fafafa'
          }}>
            <Text type="secondary">映射关系图将在这里显示</Text>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default StrategicDesign;

