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
  Tree
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  BookOutlined,
  SettingOutlined,
  SafetyOutlined,
  LockOutlined,
  LinkOutlined,
  SearchOutlined,
  FileTextOutlined,
  TagsOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

interface BusinessTerm {
  id: string;
  name: string;
  definition: string;
  category: string;
  synonyms: string[];
  antonyms: string[];
  relatedTerms: string[];
  examples: string[];
  createdAt: string;
  updatedAt: string;
  author: string;
  status: 'draft' | 'review' | 'approved' | 'deprecated';
}

interface BusinessProperty {
  id: string;
  name: string;
  type: string;
  description: string;
  constraints: string[];
  defaultValue: string;
  isRequired: boolean;
  domain: string;
  createdAt: string;
  updatedAt: string;
}

interface BusinessRule {
  id: string;
  name: string;
  description: string;
  condition: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Constraint {
  id: string;
  name: string;
  type: 'validation' | 'business' | 'technical';
  description: string;
  expression: string;
  severity: 'error' | 'warning' | 'info';
  domain: string;
  createdAt: string;
  updatedAt: string;
}

const UnifiedLanguage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('terms');
  const [isTermModalVisible, setIsTermModalVisible] = useState(false);
  const [isPropertyModalVisible, setIsPropertyModalVisible] = useState(false);
  const [isRuleModalVisible, setIsRuleModalVisible] = useState(false);
  const [isConstraintModalVisible, setIsConstraintModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [termForm] = Form.useForm();
  const [propertyForm] = Form.useForm();
  const [ruleForm] = Form.useForm();
  const [constraintForm] = Form.useForm();

  // 模拟数据
  const mockTerms: BusinessTerm[] = [
    {
      id: '1',
      name: '用户',
      definition: '系统中使用服务的个人或组织',
      category: '核心概念',
      synonyms: ['客户', '使用者'],
      antonyms: ['系统', '管理员'],
      relatedTerms: ['账户', '权限', '角色'],
      examples: ['注册用户', 'VIP用户', '企业用户'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      author: '张三',
      status: 'approved'
    },
    {
      id: '2',
      name: '订单',
      definition: '用户购买商品或服务的交易记录',
      category: '业务概念',
      synonyms: ['交易', '购买记录'],
      antonyms: ['取消订单'],
      relatedTerms: ['商品', '支付', '配送'],
      examples: ['待支付订单', '已完成订单', '退款订单'],
      createdAt: '2024-01-02',
      updatedAt: '2024-01-16',
      author: '李四',
      status: 'approved'
    }
  ];

  const mockProperties: BusinessProperty[] = [
    {
      id: '1',
      name: '用户ID',
      type: 'string',
      description: '用户的唯一标识符',
      constraints: ['非空', '唯一', '长度不超过50'],
      defaultValue: '',
      isRequired: true,
      domain: '用户管理',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      name: '订单金额',
      type: 'decimal',
      description: '订单的总金额',
      constraints: ['非空', '大于0', '精度2位小数'],
      defaultValue: '0.00',
      isRequired: true,
      domain: '订单管理',
      createdAt: '2024-01-02',
      updatedAt: '2024-01-16'
    }
  ];

  const mockRules: BusinessRule[] = [
    {
      id: '1',
      name: '用户注册规则',
      description: '用户注册时必须提供有效的邮箱地址',
      condition: '用户注册时',
      action: '验证邮箱格式并发送确认邮件',
      priority: 'high',
      category: '用户管理',
      isActive: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      name: '订单金额限制',
      description: '单笔订单金额不能超过10000元',
      condition: '创建订单时',
      action: '检查订单金额，超过限制则拒绝',
      priority: 'medium',
      category: '订单管理',
      isActive: true,
      createdAt: '2024-01-02',
      updatedAt: '2024-01-16'
    }
  ];

  const mockConstraints: Constraint[] = [
    {
      id: '1',
      name: '邮箱格式验证',
      type: 'validation',
      description: '验证邮箱地址格式是否正确',
      expression: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
      severity: 'error',
      domain: '用户管理',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      name: '金额范围检查',
      type: 'business',
      description: '检查金额是否在合理范围内',
      expression: 'amount >= 0 && amount <= 10000',
      severity: 'warning',
      domain: '订单管理',
      createdAt: '2024-01-02',
      updatedAt: '2024-01-16'
    }
  ];

  const [terms, setTerms] = useState<BusinessTerm[]>(mockTerms);
  const [properties, setProperties] = useState<BusinessProperty[]>(mockProperties);
  const [rules, setRules] = useState<BusinessRule[]>(mockRules);
  const [constraints, setConstraints] = useState<Constraint[]>(mockConstraints);

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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'red';
      case 'warning': return 'orange';
      case 'info': return 'blue';
      default: return 'default';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'error': return '错误';
      case 'warning': return '警告';
      case 'info': return '信息';
      default: return '未知';
    }
  };

  const handleAddTerm = async (values: any) => {
    try {
      if (editingItem) {
        // 编辑模式
        const updatedTerm: BusinessTerm = {
          ...editingItem,
          name: values.name,
          definition: values.definition,
          category: values.category,
          synonyms: values.synonyms ? values.synonyms.split(',').map((s: string) => s.trim()) : [],
          antonyms: values.antonyms ? values.antonyms.split(',').map((s: string) => s.trim()) : [],
          relatedTerms: values.relatedTerms ? values.relatedTerms.split(',').map((s: string) => s.trim()) : [],
          examples: values.examples ? values.examples.split(',').map((s: string) => s.trim()) : [],
          updatedAt: new Date().toISOString().split('T')[0]
        };

        setTerms(prev => prev.map(item => item.id === editingItem.id ? updatedTerm : item));
        message.success('业务术语更新成功！');
      } else {
        // 添加模式
        const newTerm: BusinessTerm = {
          id: Date.now().toString(),
          name: values.name,
          definition: values.definition,
          category: values.category,
          synonyms: values.synonyms ? values.synonyms.split(',').map((s: string) => s.trim()) : [],
          antonyms: values.antonyms ? values.antonyms.split(',').map((s: string) => s.trim()) : [],
          relatedTerms: values.relatedTerms ? values.relatedTerms.split(',').map((s: string) => s.trim()) : [],
          examples: values.examples ? values.examples.split(',').map((s: string) => s.trim()) : [],
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          author: '当前用户',
          status: 'draft'
        };

        setTerms(prev => [...prev, newTerm]);
        message.success('业务术语添加成功！');
      }
      
      setIsTermModalVisible(false);
      termForm.resetFields();
      setEditingItem(null);
    } catch (error) {
      message.error('操作失败！');
    }
  };

  const handleAddProperty = async (values: any) => {
    try {
      const newProperty: BusinessProperty = {
        id: Date.now().toString(),
        name: values.name,
        type: values.type,
        description: values.description,
        constraints: values.constraints ? values.constraints.split(',').map((s: string) => s.trim()) : [],
        defaultValue: values.defaultValue || '',
        isRequired: values.isRequired || false,
        domain: values.domain,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };

      setProperties(prev => [...prev, newProperty]);
      setIsPropertyModalVisible(false);
      propertyForm.resetFields();
      message.success('业务属性添加成功！');
    } catch (error) {
      message.error('添加业务属性失败！');
    }
  };

  const handleAddRule = async (values: any) => {
    try {
      const newRule: BusinessRule = {
        id: Date.now().toString(),
        name: values.name,
        description: values.description,
        condition: values.condition,
        action: values.action,
        priority: values.priority,
        category: values.category,
        isActive: values.isActive || true,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };

      setRules(prev => [...prev, newRule]);
      setIsRuleModalVisible(false);
      ruleForm.resetFields();
      message.success('业务规则添加成功！');
    } catch (error) {
      message.error('添加业务规则失败！');
    }
  };

  const handleAddConstraint = async (values: any) => {
    try {
      const newConstraint: Constraint = {
        id: Date.now().toString(),
        name: values.name,
        type: values.type,
        description: values.description,
        expression: values.expression,
        severity: values.severity,
        domain: values.domain,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };

      setConstraints(prev => [...prev, newConstraint]);
      setIsConstraintModalVisible(false);
      constraintForm.resetFields();
      message.success('约束条件添加成功！');
    } catch (error) {
      message.error('添加约束条件失败！');
    }
  };

  const handleEditTerm = (record: BusinessTerm) => {
    setEditingItem(record);
    termForm.setFieldsValue({
      name: record.name,
      definition: record.definition,
      category: record.category,
      synonyms: record.synonyms.join(', '),
      antonyms: record.antonyms.join(', '),
      relatedTerms: record.relatedTerms.join(', '),
      examples: record.examples.join(', ')
    });
    setIsTermModalVisible(true);
  };

  const handleDeleteTerm = (record: BusinessTerm) => {
    setTerms(prev => prev.filter(item => item.id !== record.id));
    message.success('业务术语删除成功！');
  };

  const handleEditProperty = (record: BusinessProperty) => {
    setEditingItem(record);
    propertyForm.setFieldsValue({
      name: record.name,
      type: record.type,
      description: record.description,
      domain: record.domain,
      constraints: record.constraints.join(', '),
      defaultValue: record.defaultValue,
      isRequired: record.isRequired
    });
    setIsPropertyModalVisible(true);
  };

  const handleDeleteProperty = (record: BusinessProperty) => {
    setProperties(prev => prev.filter(item => item.id !== record.id));
    message.success('业务属性删除成功！');
  };

  const handleEditRule = (record: BusinessRule) => {
    setEditingItem(record);
    ruleForm.setFieldsValue({
      name: record.name,
      description: record.description,
      condition: record.condition,
      action: record.action,
      priority: record.priority,
      category: record.category,
      isActive: record.isActive
    });
    setIsRuleModalVisible(true);
  };

  const handleDeleteRule = (record: BusinessRule) => {
    setRules(prev => prev.filter(item => item.id !== record.id));
    message.success('业务规则删除成功！');
  };

  const handleEditConstraint = (record: Constraint) => {
    setEditingItem(record);
    constraintForm.setFieldsValue({
      name: record.name,
      type: record.type,
      description: record.description,
      expression: record.expression,
      severity: record.severity,
      domain: record.domain
    });
    setIsConstraintModalVisible(true);
  };

  const handleDeleteConstraint = (record: Constraint) => {
    setConstraints(prev => prev.filter(item => item.id !== record.id));
    message.success('约束条件删除成功！');
  };

  const termColumns = [
    {
      title: '术语名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: BusinessTerm) => (
        <Space>
          <BookOutlined />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '定义',
      dataIndex: 'definition',
      key: 'definition',
      ellipsis: true,
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag color="blue">{category}</Tag>,
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
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: '操作',
      key: 'actions',
      render: (record: BusinessTerm) => (
        <Space>
          <Tooltip title="编辑">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEditTerm(record)} />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm title="确定要删除这个术语吗？" onConfirm={() => handleDeleteTerm(record)}>
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const propertyColumns = [
    {
      title: '属性名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <SettingOutlined />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="green">{type}</Tag>,
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
      title: '是否必需',
      dataIndex: 'isRequired',
      key: 'isRequired',
      render: (isRequired: boolean) => (
        <Tag color={isRequired ? 'red' : 'green'}>
          {isRequired ? '必需' : '可选'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      render: (record: BusinessProperty) => (
        <Space>
          <Tooltip title="编辑">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEditProperty(record)} />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm title="确定要删除这个属性吗？" onConfirm={() => handleDeleteProperty(record)}>
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const ruleColumns = [
    {
      title: '规则名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <SafetyOutlined />
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
      title: '条件',
      dataIndex: 'condition',
      key: 'condition',
      ellipsis: true,
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
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: '状态',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? '激活' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      render: (record: BusinessRule) => (
        <Space>
          <Tooltip title="编辑">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEditRule(record)} />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm title="确定要删除这个规则吗？" onConfirm={() => handleDeleteRule(record)}>
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const constraintColumns = [
    {
      title: '约束名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <LockOutlined />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="orange">{type}</Tag>,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '表达式',
      dataIndex: 'expression',
      key: 'expression',
      ellipsis: true,
    },
    {
      title: '严重程度',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: string) => (
        <Tag color={getSeverityColor(severity)}>
          {getSeverityText(severity)}
        </Tag>
      ),
    },
    {
      title: '领域',
      dataIndex: 'domain',
      key: 'domain',
      render: (domain: string) => <Tag color="purple">{domain}</Tag>,
    },
    {
      title: '操作',
      key: 'actions',
      render: (record: Constraint) => (
        <Space>
          <Tooltip title="编辑">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEditConstraint(record)} />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm title="确定要删除这个约束吗？" onConfirm={() => handleDeleteConstraint(record)}>
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
        <Title level={2}>
          <BookOutlined style={{ marginRight: '8px' }} />
          统一语言管理
        </Title>
        
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="业务术语" key="terms">
            <div style={{ marginBottom: '16px' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsTermModalVisible(true)}
              >
                添加术语
              </Button>
            </div>
            
            <Table
              columns={termColumns}
              dataSource={terms}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              }}
            />
          </TabPane>

          <TabPane tab="业务属性" key="properties">
            <div style={{ marginBottom: '16px' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsPropertyModalVisible(true)}
              >
                添加属性
              </Button>
            </div>
            
            <Table
              columns={propertyColumns}
              dataSource={properties}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              }}
            />
          </TabPane>

          <TabPane tab="业务规则" key="rules">
            <div style={{ marginBottom: '16px' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsRuleModalVisible(true)}
              >
                添加规则
              </Button>
            </div>
            
            <Table
              columns={ruleColumns}
              dataSource={rules}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              }}
            />
          </TabPane>

          <TabPane tab="约束条件" key="constraints">
            <div style={{ marginBottom: '16px' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsConstraintModalVisible(true)}
              >
                添加约束
              </Button>
            </div>
            
            <Table
              columns={constraintColumns}
              dataSource={constraints}
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

      {/* 添加业务术语模态框 */}
      <Modal
        title={editingItem ? "编辑业务术语" : "添加业务术语"}
        open={isTermModalVisible}
        onCancel={() => {
          setIsTermModalVisible(false);
          termForm.resetFields();
          setEditingItem(null);
        }}
        footer={null}
        width={800}
      >
        <Form
          form={termForm}
          layout="vertical"
          onFinish={handleAddTerm}
        >
          <Form.Item
            name="name"
            label="术语名称"
            rules={[{ required: true, message: '请输入术语名称' }]}
          >
            <Input placeholder="请输入术语名称" />
          </Form.Item>

          <Form.Item
            name="definition"
            label="术语定义"
            rules={[{ required: true, message: '请输入术语定义' }]}
          >
            <TextArea rows={3} placeholder="请输入术语定义" />
          </Form.Item>

          <Form.Item
            name="category"
            label="分类"
            rules={[{ required: true, message: '请选择分类' }]}
          >
            <Select placeholder="请选择分类">
              <Option value="核心概念">核心概念</Option>
              <Option value="业务概念">业务概念</Option>
              <Option value="技术概念">技术概念</Option>
              <Option value="其他">其他</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="synonyms"
            label="同义词"
          >
            <Input placeholder="请输入同义词，用逗号分隔" />
          </Form.Item>

          <Form.Item
            name="antonyms"
            label="反义词"
          >
            <Input placeholder="请输入反义词，用逗号分隔" />
          </Form.Item>

          <Form.Item
            name="relatedTerms"
            label="相关术语"
          >
            <Input placeholder="请输入相关术语，用逗号分隔" />
          </Form.Item>

          <Form.Item
            name="examples"
            label="示例"
          >
            <Input placeholder="请输入示例，用逗号分隔" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => {
                setIsTermModalVisible(false);
                termForm.resetFields();
                setEditingItem(null);
              }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                {editingItem ? "更新术语" : "添加术语"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 添加业务属性模态框 */}
      <Modal
        title="添加业务属性"
        open={isPropertyModalVisible}
        onCancel={() => {
          setIsPropertyModalVisible(false);
          propertyForm.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={propertyForm}
          layout="vertical"
          onFinish={handleAddProperty}
        >
          <Form.Item
            name="name"
            label="属性名称"
            rules={[{ required: true, message: '请输入属性名称' }]}
          >
            <Input placeholder="请输入属性名称" />
          </Form.Item>

          <Form.Item
            name="type"
            label="数据类型"
            rules={[{ required: true, message: '请选择数据类型' }]}
          >
            <Select placeholder="请选择数据类型">
              <Option value="string">字符串</Option>
              <Option value="number">数字</Option>
              <Option value="decimal">小数</Option>
              <Option value="boolean">布尔值</Option>
              <Option value="date">日期</Option>
              <Option value="datetime">日期时间</Option>
              <Option value="array">数组</Option>
              <Option value="object">对象</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="属性描述"
            rules={[{ required: true, message: '请输入属性描述' }]}
          >
            <TextArea rows={3} placeholder="请输入属性描述" />
          </Form.Item>

          <Form.Item
            name="domain"
            label="所属领域"
            rules={[{ required: true, message: '请选择所属领域' }]}
          >
            <Select placeholder="请选择所属领域">
              <Option value="用户管理">用户管理</Option>
              <Option value="订单管理">订单管理</Option>
              <Option value="商品管理">商品管理</Option>
              <Option value="支付管理">支付管理</Option>
              <Option value="其他">其他</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="constraints"
            label="约束条件"
          >
            <Input placeholder="请输入约束条件，用逗号分隔" />
          </Form.Item>

          <Form.Item
            name="defaultValue"
            label="默认值"
          >
            <Input placeholder="请输入默认值" />
          </Form.Item>

          <Form.Item
            name="isRequired"
            label="是否必需"
            valuePropName="checked"
          >
            <input type="checkbox" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => {
                setIsPropertyModalVisible(false);
                propertyForm.resetFields();
              }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                添加属性
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 添加业务规则模态框 */}
      <Modal
        title="添加业务规则"
        open={isRuleModalVisible}
        onCancel={() => {
          setIsRuleModalVisible(false);
          ruleForm.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={ruleForm}
          layout="vertical"
          onFinish={handleAddRule}
        >
          <Form.Item
            name="name"
            label="规则名称"
            rules={[{ required: true, message: '请输入规则名称' }]}
          >
            <Input placeholder="请输入规则名称" />
          </Form.Item>

          <Form.Item
            name="description"
            label="规则描述"
            rules={[{ required: true, message: '请输入规则描述' }]}
          >
            <TextArea rows={3} placeholder="请输入规则描述" />
          </Form.Item>

          <Form.Item
            name="condition"
            label="触发条件"
            rules={[{ required: true, message: '请输入触发条件' }]}
          >
            <TextArea rows={2} placeholder="请输入触发条件" />
          </Form.Item>

          <Form.Item
            name="action"
            label="执行动作"
            rules={[{ required: true, message: '请输入执行动作' }]}
          >
            <TextArea rows={2} placeholder="请输入执行动作" />
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
            name="category"
            label="规则分类"
            rules={[{ required: true, message: '请选择规则分类' }]}
          >
            <Select placeholder="请选择规则分类">
              <Option value="用户管理">用户管理</Option>
              <Option value="订单管理">订单管理</Option>
              <Option value="商品管理">商品管理</Option>
              <Option value="支付管理">支付管理</Option>
              <Option value="其他">其他</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="isActive"
            label="是否激活"
            valuePropName="checked"
          >
            <input type="checkbox" defaultChecked />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => {
                setIsRuleModalVisible(false);
                ruleForm.resetFields();
              }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                添加规则
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 添加约束条件模态框 */}
      <Modal
        title="添加约束条件"
        open={isConstraintModalVisible}
        onCancel={() => {
          setIsConstraintModalVisible(false);
          constraintForm.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={constraintForm}
          layout="vertical"
          onFinish={handleAddConstraint}
        >
          <Form.Item
            name="name"
            label="约束名称"
            rules={[{ required: true, message: '请输入约束名称' }]}
          >
            <Input placeholder="请输入约束名称" />
          </Form.Item>

          <Form.Item
            name="type"
            label="约束类型"
            rules={[{ required: true, message: '请选择约束类型' }]}
          >
            <Select placeholder="请选择约束类型">
              <Option value="validation">验证约束</Option>
              <Option value="business">业务约束</Option>
              <Option value="technical">技术约束</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="约束描述"
            rules={[{ required: true, message: '请输入约束描述' }]}
          >
            <TextArea rows={3} placeholder="请输入约束描述" />
          </Form.Item>

          <Form.Item
            name="expression"
            label="约束表达式"
            rules={[{ required: true, message: '请输入约束表达式' }]}
          >
            <TextArea rows={2} placeholder="请输入约束表达式" />
          </Form.Item>

          <Form.Item
            name="severity"
            label="严重程度"
            rules={[{ required: true, message: '请选择严重程度' }]}
          >
            <Select placeholder="请选择严重程度">
              <Option value="error">错误</Option>
              <Option value="warning">警告</Option>
              <Option value="info">信息</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="domain"
            label="所属领域"
            rules={[{ required: true, message: '请选择所属领域' }]}
          >
            <Select placeholder="请选择所属领域">
              <Option value="用户管理">用户管理</Option>
              <Option value="订单管理">订单管理</Option>
              <Option value="商品管理">商品管理</Option>
              <Option value="支付管理">支付管理</Option>
              <Option value="其他">其他</Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => {
                setIsConstraintModalVisible(false);
                constraintForm.resetFields();
              }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                添加约束
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UnifiedLanguage;

