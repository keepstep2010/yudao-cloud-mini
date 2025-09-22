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
  Statistic,
  Collapse,
  Switch,
  InputNumber,
  Checkbox
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  ApiOutlined,
  DatabaseOutlined,
  SwapOutlined,
  CodeOutlined,
  FileTextOutlined,
  LinkOutlined,
  SearchOutlined,
  EyeOutlined,
  SettingOutlined,
  ShareAltOutlined,
  CopyOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import type { DTOField, DTO, APIMethod, APIEndpoint, DataMapping } from '../../types';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const DataTransfer: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dto');
  const [isDTOModalVisible, setIsDTOModalVisible] = useState(false);
  const [isAPIModalVisible, setIsAPIModalVisible] = useState(false);
  const [isMappingModalVisible, setIsMappingModalVisible] = useState(false);
  const [isFieldModalVisible, setIsFieldModalVisible] = useState(false);
  const [isMethodModalVisible, setIsMethodModalVisible] = useState(false);
  const [isDetailDrawerVisible, setIsDetailDrawerVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [dtoForm] = Form.useForm();
  const [apiForm] = Form.useForm();
  const [mappingForm] = Form.useForm();
  const [fieldForm] = Form.useForm();
  const [methodForm] = Form.useForm();

  // 模拟数据
  const mockDTOs: DTO[] = [
    {
      id: '1',
      name: 'UserCreateDTO',
      description: '用户创建数据传输对象',
      domain: '用户管理域',
      aggregate: '用户聚合',
      entity: '用户',
      fields: [
        {
          id: '1',
          name: 'username',
          type: 'string',
          description: '用户名',
          isRequired: true,
          defaultValue: '',
          validation: ['非空', '长度3-20'],
          mapping: 'user.username',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15'
        },
        {
          id: '2',
          name: 'email',
          type: 'string',
          description: '邮箱地址',
          isRequired: true,
          defaultValue: '',
          validation: ['非空', '邮箱格式'],
          mapping: 'user.email',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15'
        }
      ],
      version: '1.0.0',
      status: 'approved',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      author: '张三'
    },
    {
      id: '2',
      name: 'OrderQueryDTO',
      description: '订单查询数据传输对象',
      domain: '订单管理域',
      aggregate: '订单聚合',
      entity: '订单',
      fields: [
        {
          id: '3',
          name: 'orderId',
          type: 'string',
          description: '订单ID',
          isRequired: false,
          defaultValue: '',
          validation: ['长度不超过50'],
          mapping: 'order.id',
          createdAt: '2024-01-02',
          updatedAt: '2024-01-16'
        },
        {
          id: '4',
          name: 'status',
          type: 'string',
          description: '订单状态',
          isRequired: false,
          defaultValue: 'PENDING',
          validation: ['枚举值'],
          mapping: 'order.status',
          createdAt: '2024-01-02',
          updatedAt: '2024-01-16'
        }
      ],
      version: '1.0.0',
      status: 'approved',
      createdAt: '2024-01-02',
      updatedAt: '2024-01-16',
      author: '李四'
    }
  ];

  const mockAPIs: APIEndpoint[] = [
    {
      id: '1',
      name: '用户管理API',
      description: '用户相关的API接口',
      domain: '用户管理域',
      boundedContext: '用户认证',
      basePath: '/api/v1/users',
      methods: [
        {
          id: '1',
          name: '创建用户',
          httpMethod: 'POST',
          path: '/',
          description: '创建新用户',
          requestDTO: 'UserCreateDTO',
          responseDTO: 'UserResponseDTO',
          parameters: ['body'],
          headers: ['Content-Type: application/json'],
          statusCodes: ['201 Created', '400 Bad Request', '409 Conflict'],
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15'
        },
        {
          id: '2',
          name: '查询用户',
          httpMethod: 'GET',
          path: '/{id}',
          description: '根据ID查询用户',
          requestDTO: '',
          responseDTO: 'UserResponseDTO',
          parameters: ['path:id'],
          headers: [],
          statusCodes: ['200 OK', '404 Not Found'],
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15'
        }
      ],
      version: '1.0.0',
      status: 'approved',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      author: '张三'
    },
    {
      id: '2',
      name: '订单管理API',
      description: '订单相关的API接口',
      domain: '订单管理域',
      boundedContext: '订单处理',
      basePath: '/api/v1/orders',
      methods: [
        {
          id: '3',
          name: '创建订单',
          httpMethod: 'POST',
          path: '/',
          description: '创建新订单',
          requestDTO: 'OrderCreateDTO',
          responseDTO: 'OrderResponseDTO',
          parameters: ['body'],
          headers: ['Content-Type: application/json'],
          statusCodes: ['201 Created', '400 Bad Request'],
          createdAt: '2024-01-02',
          updatedAt: '2024-01-16'
        }
      ],
      version: '1.0.0',
      status: 'approved',
      createdAt: '2024-01-02',
      updatedAt: '2024-01-16',
      author: '李四'
    }
  ];

  const mockMappings: DataMapping[] = [
    {
      id: '1',
      name: '用户实体到DTO映射',
      description: '用户实体转换为UserCreateDTO',
      sourceType: 'entity',
      targetType: 'dto',
      sourceId: 'user-entity',
      targetId: 'user-create-dto',
      mappingRules: ['username -> username', 'email -> email', 'password -> password'],
      transformationRules: ['密码加密', '邮箱小写转换'],
      validationRules: ['用户名长度检查', '邮箱格式验证'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      author: '张三'
    },
    {
      id: '2',
      name: '订单DTO到API映射',
      description: 'OrderQueryDTO转换为API参数',
      sourceType: 'dto',
      targetType: 'api',
      sourceId: 'order-query-dto',
      targetId: 'order-query-api',
      mappingRules: ['orderId -> query.orderId', 'status -> query.status'],
      transformationRules: ['状态值转换', '日期格式转换'],
      validationRules: ['订单ID格式检查'],
      createdAt: '2024-01-02',
      updatedAt: '2024-01-16',
      author: '李四'
    }
  ];

  const [dtos, setDTOs] = useState<DTO[]>(mockDTOs);
  const [apis, setAPIs] = useState<APIEndpoint[]>(mockAPIs);
  const [mappings, setMappings] = useState<DataMapping[]>(mockMappings);

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

  const getHTTPMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'blue';
      case 'POST': return 'green';
      case 'PUT': return 'orange';
      case 'DELETE': return 'red';
      case 'PATCH': return 'purple';
      default: return 'default';
    }
  };

  const handleAddDTO = async (values: any) => {
    try {
      if (editingItem) {
        // 编辑模式
        const updatedDTO: DTO = {
          ...editingItem,
          name: values.name,
          description: values.description,
          domain: values.domain,
          aggregate: values.aggregate,
          entity: values.entity,
          version: values.version,
          updatedAt: new Date().toISOString().split('T')[0]
        };

        setDTOs(prev => prev.map(item => item.id === editingItem.id ? updatedDTO : item));
        message.success('DTO更新成功！');
      } else {
        // 添加模式
        const newDTO: DTO = {
          id: Date.now().toString(),
          name: values.name,
          description: values.description,
          domain: values.domain,
          aggregate: values.aggregate,
          entity: values.entity,
          fields: [],
          version: values.version || '1.0.0',
          status: 'draft',
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          author: '当前用户'
        };

        setDTOs(prev => [...prev, newDTO]);
        message.success('DTO添加成功！');
      }
      
      setIsDTOModalVisible(false);
      dtoForm.resetFields();
      setEditingItem(null);
    } catch (error) {
      message.error('操作失败！');
    }
  };

  const handleAddAPI = async (values: any) => {
    try {
      if (editingItem) {
        // 编辑模式
        const updatedAPI: APIEndpoint = {
          ...editingItem,
          name: values.name,
          description: values.description,
          domain: values.domain,
          boundedContext: values.boundedContext,
          basePath: values.basePath,
          version: values.version,
          updatedAt: new Date().toISOString().split('T')[0]
        };

        setAPIs(prev => prev.map(item => item.id === editingItem.id ? updatedAPI : item));
        message.success('API更新成功！');
      } else {
        // 添加模式
        const newAPI: APIEndpoint = {
          id: Date.now().toString(),
          name: values.name,
          description: values.description,
          domain: values.domain,
          boundedContext: values.boundedContext,
          basePath: values.basePath,
          methods: [],
          version: values.version || '1.0.0',
          status: 'draft',
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          author: '当前用户'
        };

        setAPIs(prev => [...prev, newAPI]);
        message.success('API添加成功！');
      }
      
      setIsAPIModalVisible(false);
      apiForm.resetFields();
      setEditingItem(null);
    } catch (error) {
      message.error('操作失败！');
    }
  };

  const handleAddMapping = async (values: any) => {
    try {
      if (editingItem) {
        // 编辑模式
        const updatedMapping: DataMapping = {
          ...editingItem,
          name: values.name,
          description: values.description,
          sourceType: values.sourceType,
          targetType: values.targetType,
          sourceId: values.sourceId,
          targetId: values.targetId,
          mappingRules: values.mappingRules ? values.mappingRules.split(',').map((s: string) => s.trim()) : [],
          transformationRules: values.transformationRules ? values.transformationRules.split(',').map((s: string) => s.trim()) : [],
          validationRules: values.validationRules ? values.validationRules.split(',').map((s: string) => s.trim()) : [],
          updatedAt: new Date().toISOString().split('T')[0]
        };

        setMappings(prev => prev.map(item => item.id === editingItem.id ? updatedMapping : item));
        message.success('数据映射更新成功！');
      } else {
        // 添加模式
        const newMapping: DataMapping = {
          id: Date.now().toString(),
          name: values.name,
          description: values.description,
          sourceType: values.sourceType,
          targetType: values.targetType,
          sourceId: values.sourceId,
          targetId: values.targetId,
          mappingRules: values.mappingRules ? values.mappingRules.split(',').map((s: string) => s.trim()) : [],
          transformationRules: values.transformationRules ? values.transformationRules.split(',').map((s: string) => s.trim()) : [],
          validationRules: values.validationRules ? values.validationRules.split(',').map((s: string) => s.trim()) : [],
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          author: '当前用户'
        };

        setMappings(prev => [...prev, newMapping]);
        message.success('数据映射添加成功！');
      }
      
      setIsMappingModalVisible(false);
      mappingForm.resetFields();
      setEditingItem(null);
    } catch (error) {
      message.error('操作失败！');
    }
  };

  const handleEditDTO = (record: DTO) => {
    setEditingItem(record);
    dtoForm.setFieldsValue({
      name: record.name,
      description: record.description,
      domain: record.domain,
      aggregate: record.aggregate,
      entity: record.entity,
      version: record.version
    });
    setIsDTOModalVisible(true);
  };

  const handleDeleteDTO = (record: DTO) => {
    setDTOs(prev => prev.filter(item => item.id !== record.id));
    message.success('DTO删除成功！');
  };

  const handleEditAPI = (record: APIEndpoint) => {
    setEditingItem(record);
    apiForm.setFieldsValue({
      name: record.name,
      description: record.description,
      domain: record.domain,
      boundedContext: record.boundedContext,
      basePath: record.basePath,
      version: record.version
    });
    setIsAPIModalVisible(true);
  };

  const handleDeleteAPI = (record: APIEndpoint) => {
    setAPIs(prev => prev.filter(item => item.id !== record.id));
    message.success('API删除成功！');
  };

  const handleEditMapping = (record: DataMapping) => {
    setEditingItem(record);
    mappingForm.setFieldsValue({
      name: record.name,
      description: record.description,
      sourceType: record.sourceType,
      targetType: record.targetType,
      sourceId: record.sourceId,
      targetId: record.targetId,
      mappingRules: record.mappingRules.join(', '),
      transformationRules: record.transformationRules.join(', '),
      validationRules: record.validationRules.join(', ')
    });
    setIsMappingModalVisible(true);
  };

  const handleDeleteMapping = (record: DataMapping) => {
    setMappings(prev => prev.filter(item => item.id !== record.id));
    message.success('数据映射删除成功！');
  };

  const handleViewDetails = (item: any, type: string) => {
    setSelectedItem({ ...item, type });
    setIsDetailDrawerVisible(true);
  };

  const dtoColumns = [
    {
      title: 'DTO名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <CodeOutlined />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '领域',
      dataIndex: 'domain',
      key: 'domain',
      render: (domain: string) => <Tag color="purple">{domain}</Tag>,
    },
    {
      title: '聚合',
      dataIndex: 'aggregate',
      key: 'aggregate',
      render: (aggregate: string) => <Tag color="blue">{aggregate}</Tag>,
    },
    {
      title: '字段数量',
      dataIndex: 'fields',
      key: 'fields',
      render: (fields: DTOField[]) => (
        <Tag color="green">{fields.length}</Tag>
      ),
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
      render: (version: string) => <Tag color="orange">{version}</Tag>,
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
      render: (record: DTO) => (
        <Space>
          <Tooltip title="查看详情">
            <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewDetails(record, 'dto')} />
          </Tooltip>
          <Tooltip title="编辑">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEditDTO(record)} />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm title="确定要删除这个DTO吗？" onConfirm={() => handleDeleteDTO(record)}>
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const apiColumns = [
    {
      title: 'API名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <ApiOutlined />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '领域',
      dataIndex: 'domain',
      key: 'domain',
      render: (domain: string) => <Tag color="purple">{domain}</Tag>,
    },
    {
      title: '限界上下文',
      dataIndex: 'boundedContext',
      key: 'boundedContext',
      render: (context: string) => <Tag color="blue">{context}</Tag>,
    },
    {
      title: '基础路径',
      dataIndex: 'basePath',
      key: 'basePath',
      render: (path: string) => <Text code>{path}</Text>,
    },
    {
      title: '方法数量',
      dataIndex: 'methods',
      key: 'methods',
      render: (methods: APIMethod[]) => (
        <Tag color="green">{methods.length}</Tag>
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
      render: (record: APIEndpoint) => (
        <Space>
          <Tooltip title="查看详情">
            <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewDetails(record, 'api')} />
          </Tooltip>
          <Tooltip title="编辑">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEditAPI(record)} />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm title="确定要删除这个API吗？" onConfirm={() => handleDeleteAPI(record)}>
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const mappingColumns = [
    {
      title: '映射名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <SwapOutlined />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '源类型',
      dataIndex: 'sourceType',
      key: 'sourceType',
      render: (type: string) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: '目标类型',
      dataIndex: 'targetType',
      key: 'targetType',
      render: (type: string) => <Tag color="green">{type}</Tag>,
    },
    {
      title: '映射规则数量',
      dataIndex: 'mappingRules',
      key: 'mappingRules',
      render: (rules: string[]) => (
        <Tag color="orange">{rules.length}</Tag>
      ),
    },
    {
      title: '转换规则数量',
      dataIndex: 'transformationRules',
      key: 'transformationRules',
      render: (rules: string[]) => (
        <Tag color="purple">{rules.length}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      render: (record: DataMapping) => (
        <Space>
          <Tooltip title="查看详情">
            <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewDetails(record, 'mapping')} />
          </Tooltip>
          <Tooltip title="编辑">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEditMapping(record)} />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm title="确定要删除这个映射吗？" onConfirm={() => handleDeleteMapping(record)}>
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
            <DatabaseOutlined style={{ marginRight: '8px' }} />
            数据传输设计
          </Title>
          <Button 
            icon={<ShareAltOutlined />}
            onClick={() => setIsDetailDrawerVisible(true)}
          >
            数据流图
          </Button>
        </div>

        {/* 统计概览 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="DTO数量"
                value={dtos.length}
                prefix={<CodeOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="API数量"
                value={apis.length}
                prefix={<ApiOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="数据映射数量"
                value={mappings.length}
                prefix={<SwapOutlined />}
                valueStyle={{ color: '#fa8c16' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="总字段数量"
                value={dtos.reduce((sum, dto) => sum + dto.fields.length, 0)}
                prefix={<FileTextOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>
        
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="DTO设计器" key="dto">
            <div style={{ marginBottom: '16px' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsDTOModalVisible(true)}
              >
                添加DTO
              </Button>
            </div>
            
            <Table
              columns={dtoColumns}
              dataSource={dtos}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              }}
            />
          </TabPane>

          <TabPane tab="API接口设计" key="api">
            <div style={{ marginBottom: '16px' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsAPIModalVisible(true)}
              >
                添加API
              </Button>
            </div>
            
            <Table
              columns={apiColumns}
              dataSource={apis}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              }}
            />
          </TabPane>

          <TabPane tab="数据映射管理" key="mapping">
            <div style={{ marginBottom: '16px' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsMappingModalVisible(true)}
              >
                添加映射
              </Button>
            </div>
            
            <Table
              columns={mappingColumns}
              dataSource={mappings}
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

      {/* 添加DTO模态框 */}
      <Modal
        title={editingItem ? "编辑DTO" : "添加DTO"}
        open={isDTOModalVisible}
        onCancel={() => {
          setIsDTOModalVisible(false);
          dtoForm.resetFields();
          setEditingItem(null);
        }}
        footer={null}
        width={800}
      >
        <Form
          form={dtoForm}
          layout="vertical"
          onFinish={handleAddDTO}
        >
          <Form.Item
            name="name"
            label="DTO名称"
            rules={[{ required: true, message: '请输入DTO名称' }]}
          >
            <Input placeholder="请输入DTO名称" />
          </Form.Item>

          <Form.Item
            name="description"
            label="DTO描述"
            rules={[{ required: true, message: '请输入DTO描述' }]}
          >
            <TextArea rows={3} placeholder="请输入DTO描述" />
          </Form.Item>

          <Form.Item
            name="domain"
            label="所属领域"
            rules={[{ required: true, message: '请选择所属领域' }]}
          >
            <Select placeholder="请选择所属领域">
              <Option value="用户管理域">用户管理域</Option>
              <Option value="订单管理域">订单管理域</Option>
              <Option value="商品管理域">商品管理域</Option>
              <Option value="支付管理域">支付管理域</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="aggregate"
            label="所属聚合"
            rules={[{ required: true, message: '请选择所属聚合' }]}
          >
            <Select placeholder="请选择所属聚合">
              <Option value="用户聚合">用户聚合</Option>
              <Option value="订单聚合">订单聚合</Option>
              <Option value="商品聚合">商品聚合</Option>
              <Option value="支付聚合">支付聚合</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="entity"
            label="关联实体"
            rules={[{ required: true, message: '请选择关联实体' }]}
          >
            <Select placeholder="请选择关联实体">
              <Option value="用户">用户</Option>
              <Option value="订单">订单</Option>
              <Option value="商品">商品</Option>
              <Option value="支付">支付</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="version"
            label="版本号"
          >
            <Input placeholder="请输入版本号，如：1.0.0" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => {
                setIsDTOModalVisible(false);
                dtoForm.resetFields();
                setEditingItem(null);
              }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                {editingItem ? "更新DTO" : "添加DTO"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 添加API模态框 */}
      <Modal
        title={editingItem ? "编辑API" : "添加API"}
        open={isAPIModalVisible}
        onCancel={() => {
          setIsAPIModalVisible(false);
          apiForm.resetFields();
          setEditingItem(null);
        }}
        footer={null}
        width={800}
      >
        <Form
          form={apiForm}
          layout="vertical"
          onFinish={handleAddAPI}
        >
          <Form.Item
            name="name"
            label="API名称"
            rules={[{ required: true, message: '请输入API名称' }]}
          >
            <Input placeholder="请输入API名称" />
          </Form.Item>

          <Form.Item
            name="description"
            label="API描述"
            rules={[{ required: true, message: '请输入API描述' }]}
          >
            <TextArea rows={3} placeholder="请输入API描述" />
          </Form.Item>

          <Form.Item
            name="domain"
            label="所属领域"
            rules={[{ required: true, message: '请选择所属领域' }]}
          >
            <Select placeholder="请选择所属领域">
              <Option value="用户管理域">用户管理域</Option>
              <Option value="订单管理域">订单管理域</Option>
              <Option value="商品管理域">商品管理域</Option>
              <Option value="支付管理域">支付管理域</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="boundedContext"
            label="限界上下文"
            rules={[{ required: true, message: '请选择限界上下文' }]}
          >
            <Select placeholder="请选择限界上下文">
              <Option value="用户认证">用户认证</Option>
              <Option value="订单处理">订单处理</Option>
              <Option value="商品管理">商品管理</Option>
              <Option value="支付管理">支付管理</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="basePath"
            label="基础路径"
            rules={[{ required: true, message: '请输入基础路径' }]}
          >
            <Input placeholder="请输入基础路径，如：/api/v1/users" />
          </Form.Item>

          <Form.Item
            name="version"
            label="版本号"
          >
            <Input placeholder="请输入版本号，如：1.0.0" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => {
                setIsAPIModalVisible(false);
                apiForm.resetFields();
                setEditingItem(null);
              }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                {editingItem ? "更新API" : "添加API"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 添加数据映射模态框 */}
      <Modal
        title={editingItem ? "编辑数据映射" : "添加数据映射"}
        open={isMappingModalVisible}
        onCancel={() => {
          setIsMappingModalVisible(false);
          mappingForm.resetFields();
          setEditingItem(null);
        }}
        footer={null}
        width={800}
      >
        <Form
          form={mappingForm}
          layout="vertical"
          onFinish={handleAddMapping}
        >
          <Form.Item
            name="name"
            label="映射名称"
            rules={[{ required: true, message: '请输入映射名称' }]}
          >
            <Input placeholder="请输入映射名称" />
          </Form.Item>

          <Form.Item
            name="description"
            label="映射描述"
            rules={[{ required: true, message: '请输入映射描述' }]}
          >
            <TextArea rows={3} placeholder="请输入映射描述" />
          </Form.Item>

          <Form.Item
            name="sourceType"
            label="源类型"
            rules={[{ required: true, message: '请选择源类型' }]}
          >
            <Select placeholder="请选择源类型">
              <Option value="entity">实体</Option>
              <Option value="dto">DTO</Option>
              <Option value="api">API</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="targetType"
            label="目标类型"
            rules={[{ required: true, message: '请选择目标类型' }]}
          >
            <Select placeholder="请选择目标类型">
              <Option value="entity">实体</Option>
              <Option value="dto">DTO</Option>
              <Option value="api">API</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="sourceId"
            label="源ID"
            rules={[{ required: true, message: '请输入源ID' }]}
          >
            <Input placeholder="请输入源ID" />
          </Form.Item>

          <Form.Item
            name="targetId"
            label="目标ID"
            rules={[{ required: true, message: '请输入目标ID' }]}
          >
            <Input placeholder="请输入目标ID" />
          </Form.Item>

          <Form.Item
            name="mappingRules"
            label="映射规则"
          >
            <Input placeholder="请输入映射规则，用逗号分隔" />
          </Form.Item>

          <Form.Item
            name="transformationRules"
            label="转换规则"
          >
            <Input placeholder="请输入转换规则，用逗号分隔" />
          </Form.Item>

          <Form.Item
            name="validationRules"
            label="验证规则"
          >
            <Input placeholder="请输入验证规则，用逗号分隔" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => {
                setIsMappingModalVisible(false);
                mappingForm.resetFields();
                setEditingItem(null);
              }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                {editingItem ? "更新映射" : "添加映射"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 详情抽屉 */}
      <Drawer
        title="详细信息"
        placement="right"
        width={800}
        open={isDetailDrawerVisible}
        onClose={() => setIsDetailDrawerVisible(false)}
      >
        {selectedItem && (
          <div>
            <Title level={4}>{selectedItem.name}</Title>
            <Paragraph>{selectedItem.description}</Paragraph>
            
            <Collapse 
              defaultActiveKey={['basic']}
              items={[
                {
                  key: 'basic',
                  label: '基本信息',
                  children: (
                    <>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Text strong>类型：</Text>{selectedItem.type}
                        </Col>
                        <Col span={12}>
                          <Text strong>状态：</Text>
                          <Tag color={getStatusColor(selectedItem.status)}>
                            {getStatusText(selectedItem.status)}
                          </Tag>
                        </Col>
                      </Row>
                      <Row gutter={16} style={{ marginTop: '8px' }}>
                        <Col span={12}>
                          <Text strong>作者：</Text>{selectedItem.author}
                        </Col>
                        <Col span={12}>
                          <Text strong>更新时间：</Text>{selectedItem.updatedAt}
                        </Col>
                      </Row>
                    </>
                  )
                },
                ...(selectedItem.fields ? [{
                  key: 'fields',
                  label: '字段',
                  children: (
                    <List
                      dataSource={selectedItem.fields}
                      renderItem={(field: DTOField) => (
                        <List.Item>
                          <Space>
                            <Tag color="blue">{field.name}</Tag>
                            <Tag color="green">{field.type}</Tag>
                            {field.isRequired && <Tag color="red">必需</Tag>}
                          </Space>
                        </List.Item>
                      )}
                    />
                  )
                }] : []),
                ...(selectedItem.methods ? [{
                  key: 'methods',
                  label: '方法',
                  children: (
                    <List
                      dataSource={selectedItem.methods}
                      renderItem={(method: APIMethod) => (
                        <List.Item>
                          <Space>
                            <Tag color={getHTTPMethodColor(method.httpMethod)}>{method.httpMethod}</Tag>
                            <Text code>{method.path}</Text>
                            <Text>{method.name}</Text>
                          </Space>
                        </List.Item>
                      )}
                    />
                  )
                }] : [])
              ]}
            />
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default DataTransfer;
