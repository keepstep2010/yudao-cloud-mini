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
  Collapse
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  TeamOutlined,
  ApartmentOutlined,
  GiftOutlined,
  ToolOutlined,
  ThunderboltOutlined,
  DatabaseOutlined,
  SearchOutlined,
  FileTextOutlined,
  LinkOutlined,
  EyeOutlined,
  SettingOutlined,
  ShareAltOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { Panel } = Collapse;

interface Aggregate {
  id: string;
  name: string;
  description: string;
  boundedContext: string;
  rootEntity: string;
  entities: string[];
  valueObjects: string[];
  domainServices: string[];
  domainEvents: string[];
  invariants: string[];
  businessRules: string[];
  createdAt: string;
  updatedAt: string;
  author: string;
  status: 'draft' | 'review' | 'approved' | 'deprecated';
}

interface Entity {
  id: string;
  name: string;
  description: string;
  aggregate: string;
  boundedContext: string;
  properties: string[];
  methods: string[];
  invariants: string[];
  relationships: string[];
  lifecycle: string[];
  createdAt: string;
  updatedAt: string;
  author: string;
  status: 'draft' | 'review' | 'approved' | 'deprecated';
}

interface ValueObject {
  id: string;
  name: string;
  description: string;
  aggregate: string;
  boundedContext: string;
  properties: string[];
  validationRules: string[];
  immutability: boolean;
  equalityRules: string[];
  createdAt: string;
  updatedAt: string;
  author: string;
  status: 'draft' | 'review' | 'approved' | 'deprecated';
}

interface DomainService {
  id: string;
  name: string;
  description: string;
  boundedContext: string;
  purpose: string;
  parameters: string[];
  returnType: string;
  businessLogic: string[];
  dependencies: string[];
  createdAt: string;
  updatedAt: string;
  author: string;
  status: 'draft' | 'review' | 'approved' | 'deprecated';
}

interface DomainEvent {
  id: string;
  name: string;
  description: string;
  aggregate: string;
  boundedContext: string;
  eventType: string;
  payload: string[];
  handlers: string[];
  triggers: string[];
  createdAt: string;
  updatedAt: string;
  author: string;
  status: 'draft' | 'review' | 'approved' | 'deprecated';
}

interface Repository {
  id: string;
  name: string;
  description: string;
  aggregate: string;
  boundedContext: string;
  interface: string[];
  implementation: string;
  queryMethods: string[];
  persistence: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  status: 'draft' | 'review' | 'approved' | 'deprecated';
}

const TacticalDesign: React.FC = () => {
  const [activeTab, setActiveTab] = useState('aggregates');
  const [isAggregateModalVisible, setIsAggregateModalVisible] = useState(false);
  const [isEntityModalVisible, setIsEntityModalVisible] = useState(false);
  const [isValueObjectModalVisible, setIsValueObjectModalVisible] = useState(false);
  const [isDomainServiceModalVisible, setIsDomainServiceModalVisible] = useState(false);
  const [isDomainEventModalVisible, setIsDomainEventModalVisible] = useState(false);
  const [isRepositoryModalVisible, setIsRepositoryModalVisible] = useState(false);
  const [isDetailDrawerVisible, setIsDetailDrawerVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [aggregateForm] = Form.useForm();
  const [entityForm] = Form.useForm();
  const [valueObjectForm] = Form.useForm();
  const [domainServiceForm] = Form.useForm();
  const [domainEventForm] = Form.useForm();
  const [repositoryForm] = Form.useForm();

  // 模拟数据
  const mockAggregates: Aggregate[] = [
    {
      id: '1',
      name: '用户聚合',
      description: '管理用户相关的所有业务逻辑',
      boundedContext: '用户认证',
      rootEntity: '用户',
      entities: ['用户', '用户档案'],
      valueObjects: ['邮箱', '密码', '用户ID'],
      domainServices: ['认证服务', '密码服务'],
      domainEvents: ['用户注册事件', '用户登录事件'],
      invariants: ['用户ID唯一', '邮箱格式正确'],
      businessRules: ['密码强度要求', '用户状态验证'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      author: '张三',
      status: 'approved'
    },
    {
      id: '2',
      name: '订单聚合',
      description: '管理订单的完整生命周期',
      boundedContext: '订单处理',
      rootEntity: '订单',
      entities: ['订单', '订单项'],
      valueObjects: ['订单号', '金额', '地址'],
      domainServices: ['订单服务', '状态服务'],
      domainEvents: ['订单创建事件', '订单状态变更事件'],
      invariants: ['订单号唯一', '金额大于0'],
      businessRules: ['订单状态流转规则', '订单取消规则'],
      createdAt: '2024-01-02',
      updatedAt: '2024-01-16',
      author: '李四',
      status: 'approved'
    }
  ];

  const mockEntities: Entity[] = [
    {
      id: '1',
      name: '用户',
      description: '系统中的用户实体',
      aggregate: '用户聚合',
      boundedContext: '用户认证',
      properties: ['用户ID', '用户名', '邮箱', '密码', '状态'],
      methods: ['注册', '登录', '更新密码', '激活账户'],
      invariants: ['用户ID唯一', '邮箱格式正确', '密码强度符合要求'],
      relationships: ['用户档案', '用户角色'],
      lifecycle: ['创建', '激活', '禁用', '删除'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      author: '张三',
      status: 'approved'
    },
    {
      id: '2',
      name: '订单',
      description: '订单实体',
      aggregate: '订单聚合',
      boundedContext: '订单处理',
      properties: ['订单ID', '用户ID', '订单号', '金额', '状态', '创建时间'],
      methods: ['创建订单', '更新状态', '取消订单', '完成订单'],
      invariants: ['订单ID唯一', '订单号唯一', '金额大于0'],
      relationships: ['订单项', '用户', '支付记录'],
      lifecycle: ['待支付', '已支付', '配送中', '已完成', '已取消'],
      createdAt: '2024-01-02',
      updatedAt: '2024-01-16',
      author: '李四',
      status: 'approved'
    }
  ];

  const mockValueObjects: ValueObject[] = [
    {
      id: '1',
      name: '邮箱',
      description: '用户邮箱地址值对象',
      aggregate: '用户聚合',
      boundedContext: '用户认证',
      properties: ['地址', '验证状态'],
      validationRules: ['邮箱格式验证', '域名白名单检查'],
      immutability: true,
      equalityRules: ['地址相等'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      author: '张三',
      status: 'approved'
    },
    {
      id: '2',
      name: '订单号',
      description: '订单唯一标识值对象',
      aggregate: '订单聚合',
      boundedContext: '订单处理',
      properties: ['编号', '前缀', '时间戳'],
      validationRules: ['格式验证', '唯一性检查'],
      immutability: true,
      equalityRules: ['编号相等'],
      createdAt: '2024-01-02',
      updatedAt: '2024-01-16',
      author: '李四',
      status: 'approved'
    }
  ];

  const mockDomainServices: DomainService[] = [
    {
      id: '1',
      name: '认证服务',
      description: '处理用户认证相关业务逻辑',
      boundedContext: '用户认证',
      purpose: '验证用户身份',
      parameters: ['用户名', '密码'],
      returnType: '认证结果',
      businessLogic: ['密码验证', '账户状态检查', '登录日志记录'],
      dependencies: ['用户仓储', '密码服务'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      author: '张三',
      status: 'approved'
    },
    {
      id: '2',
      name: '订单服务',
      description: '处理订单相关业务逻辑',
      boundedContext: '订单处理',
      purpose: '管理订单生命周期',
      parameters: ['订单信息', '用户ID'],
      returnType: '订单结果',
      businessLogic: ['订单创建', '状态验证', '业务规则检查'],
      dependencies: ['订单仓储', '用户服务'],
      createdAt: '2024-01-02',
      updatedAt: '2024-01-16',
      author: '李四',
      status: 'approved'
    }
  ];

  const mockDomainEvents: DomainEvent[] = [
    {
      id: '1',
      name: '用户注册事件',
      description: '用户成功注册后触发的事件',
      aggregate: '用户聚合',
      boundedContext: '用户认证',
      eventType: 'UserRegistered',
      payload: ['用户ID', '邮箱', '注册时间'],
      handlers: ['发送欢迎邮件', '创建用户档案', '记录注册日志'],
      triggers: ['用户注册成功'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      author: '张三',
      status: 'approved'
    },
    {
      id: '2',
      name: '订单创建事件',
      description: '订单创建成功后触发的事件',
      aggregate: '订单聚合',
      boundedContext: '订单处理',
      eventType: 'OrderCreated',
      payload: ['订单ID', '用户ID', '订单金额', '创建时间'],
      handlers: ['发送订单确认邮件', '更新库存', '记录订单日志'],
      triggers: ['订单创建成功'],
      createdAt: '2024-01-02',
      updatedAt: '2024-01-16',
      author: '李四',
      status: 'approved'
    }
  ];

  const mockRepositories: Repository[] = [
    {
      id: '1',
      name: '用户仓储',
      description: '用户实体的数据访问接口',
      aggregate: '用户聚合',
      boundedContext: '用户认证',
      interface: ['findById', 'findByEmail', 'save', 'delete'],
      implementation: 'UserRepositoryImpl',
      queryMethods: ['findByStatus', 'findByCreateDate'],
      persistence: 'MySQL',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      author: '张三',
      status: 'approved'
    },
    {
      id: '2',
      name: '订单仓储',
      description: '订单实体的数据访问接口',
      aggregate: '订单聚合',
      boundedContext: '订单处理',
      interface: ['findById', 'findByUserId', 'save', 'delete'],
      implementation: 'OrderRepositoryImpl',
      queryMethods: ['findByStatus', 'findByDateRange'],
      persistence: 'MySQL',
      createdAt: '2024-01-02',
      updatedAt: '2024-01-16',
      author: '李四',
      status: 'approved'
    }
  ];

  const [aggregates, setAggregates] = useState<Aggregate[]>(mockAggregates);
  const [entities, setEntities] = useState<Entity[]>(mockEntities);
  const [valueObjects, setValueObjects] = useState<ValueObject[]>(mockValueObjects);
  const [domainServices, setDomainServices] = useState<DomainService[]>(mockDomainServices);
  const [domainEvents, setDomainEvents] = useState<DomainEvent[]>(mockDomainEvents);
  const [repositories, setRepositories] = useState<Repository[]>(mockRepositories);

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

  const handleAddAggregate = async (values: any) => {
    try {
      if (editingItem) {
        // 编辑模式
        const updatedAggregate: Aggregate = {
          ...editingItem,
          name: values.name,
          description: values.description,
          boundedContext: values.boundedContext,
          rootEntity: values.rootEntity,
          invariants: values.invariants ? values.invariants.split(',').map((s: string) => s.trim()) : [],
          businessRules: values.businessRules ? values.businessRules.split(',').map((s: string) => s.trim()) : [],
          updatedAt: new Date().toISOString().split('T')[0]
        };

        setAggregates(prev => prev.map(item => item.id === editingItem.id ? updatedAggregate : item));
        message.success('聚合更新成功！');
      } else {
        // 添加模式
        const newAggregate: Aggregate = {
          id: Date.now().toString(),
          name: values.name,
          description: values.description,
          boundedContext: values.boundedContext,
          rootEntity: values.rootEntity,
          entities: [],
          valueObjects: [],
          domainServices: [],
          domainEvents: [],
          invariants: values.invariants ? values.invariants.split(',').map((s: string) => s.trim()) : [],
          businessRules: values.businessRules ? values.businessRules.split(',').map((s: string) => s.trim()) : [],
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          author: '当前用户',
          status: 'draft'
        };

        setAggregates(prev => [...prev, newAggregate]);
        message.success('聚合添加成功！');
      }
      
      setIsAggregateModalVisible(false);
      aggregateForm.resetFields();
      setEditingItem(null);
    } catch (error) {
      message.error('操作失败！');
    }
  };

  const handleAddEntity = async (values: any) => {
    try {
      if (editingItem) {
        // 编辑模式
        const updatedEntity: Entity = {
          ...editingItem,
          name: values.name,
          description: values.description,
          aggregate: values.aggregate,
          boundedContext: values.boundedContext,
          properties: values.properties ? values.properties.split(',').map((s: string) => s.trim()) : [],
          methods: values.methods ? values.methods.split(',').map((s: string) => s.trim()) : [],
          invariants: values.invariants ? values.invariants.split(',').map((s: string) => s.trim()) : [],
          relationships: values.relationships ? values.relationships.split(',').map((s: string) => s.trim()) : [],
          lifecycle: values.lifecycle ? values.lifecycle.split(',').map((s: string) => s.trim()) : [],
          updatedAt: new Date().toISOString().split('T')[0]
        };

        setEntities(prev => prev.map(item => item.id === editingItem.id ? updatedEntity : item));
        message.success('实体更新成功！');
      } else {
        // 添加模式
        const newEntity: Entity = {
          id: Date.now().toString(),
          name: values.name,
          description: values.description,
          aggregate: values.aggregate,
          boundedContext: values.boundedContext,
          properties: values.properties ? values.properties.split(',').map((s: string) => s.trim()) : [],
          methods: values.methods ? values.methods.split(',').map((s: string) => s.trim()) : [],
          invariants: values.invariants ? values.invariants.split(',').map((s: string) => s.trim()) : [],
          relationships: values.relationships ? values.relationships.split(',').map((s: string) => s.trim()) : [],
          lifecycle: values.lifecycle ? values.lifecycle.split(',').map((s: string) => s.trim()) : [],
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          author: '当前用户',
          status: 'draft'
        };

        setEntities(prev => [...prev, newEntity]);
        message.success('实体添加成功！');
      }
      
      setIsEntityModalVisible(false);
      entityForm.resetFields();
      setEditingItem(null);
    } catch (error) {
      message.error('操作失败！');
    }
  };

  const handleAddValueObject = async (values: any) => {
    try {
      const newValueObject: ValueObject = {
        id: Date.now().toString(),
        name: values.name,
        description: values.description,
        aggregate: values.aggregate,
        boundedContext: values.boundedContext,
        properties: values.properties ? values.properties.split(',').map((s: string) => s.trim()) : [],
        validationRules: values.validationRules ? values.validationRules.split(',').map((s: string) => s.trim()) : [],
        immutability: values.immutability || true,
        equalityRules: values.equalityRules ? values.equalityRules.split(',').map((s: string) => s.trim()) : [],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        author: '当前用户',
        status: 'draft'
      };

      setValueObjects(prev => [...prev, newValueObject]);
      setIsValueObjectModalVisible(false);
      valueObjectForm.resetFields();
      message.success('值对象添加成功！');
    } catch (error) {
      message.error('添加值对象失败！');
    }
  };

  const handleAddDomainService = async (values: any) => {
    try {
      const newDomainService: DomainService = {
        id: Date.now().toString(),
        name: values.name,
        description: values.description,
        boundedContext: values.boundedContext,
        purpose: values.purpose,
        parameters: values.parameters ? values.parameters.split(',').map((s: string) => s.trim()) : [],
        returnType: values.returnType,
        businessLogic: values.businessLogic ? values.businessLogic.split(',').map((s: string) => s.trim()) : [],
        dependencies: values.dependencies ? values.dependencies.split(',').map((s: string) => s.trim()) : [],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        author: '当前用户',
        status: 'draft'
      };

      setDomainServices(prev => [...prev, newDomainService]);
      setIsDomainServiceModalVisible(false);
      domainServiceForm.resetFields();
      message.success('领域服务添加成功！');
    } catch (error) {
      message.error('添加领域服务失败！');
    }
  };

  const handleAddDomainEvent = async (values: any) => {
    try {
      const newDomainEvent: DomainEvent = {
        id: Date.now().toString(),
        name: values.name,
        description: values.description,
        aggregate: values.aggregate,
        boundedContext: values.boundedContext,
        eventType: values.eventType,
        payload: values.payload ? values.payload.split(',').map((s: string) => s.trim()) : [],
        handlers: values.handlers ? values.handlers.split(',').map((s: string) => s.trim()) : [],
        triggers: values.triggers ? values.triggers.split(',').map((s: string) => s.trim()) : [],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        author: '当前用户',
        status: 'draft'
      };

      setDomainEvents(prev => [...prev, newDomainEvent]);
      setIsDomainEventModalVisible(false);
      domainEventForm.resetFields();
      message.success('领域事件添加成功！');
    } catch (error) {
      message.error('添加领域事件失败！');
    }
  };

  const handleAddRepository = async (values: any) => {
    try {
      const newRepository: Repository = {
        id: Date.now().toString(),
        name: values.name,
        description: values.description,
        aggregate: values.aggregate,
        boundedContext: values.boundedContext,
        interface: values.interface ? values.interface.split(',').map((s: string) => s.trim()) : [],
        implementation: values.implementation,
        queryMethods: values.queryMethods ? values.queryMethods.split(',').map((s: string) => s.trim()) : [],
        persistence: values.persistence,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        author: '当前用户',
        status: 'draft'
      };

      setRepositories(prev => [...prev, newRepository]);
      setIsRepositoryModalVisible(false);
      repositoryForm.resetFields();
      message.success('仓储添加成功！');
    } catch (error) {
      message.error('添加仓储失败！');
    }
  };

  const handleEditAggregate = (record: Aggregate) => {
    setEditingItem(record);
    aggregateForm.setFieldsValue({
      name: record.name,
      description: record.description,
      boundedContext: record.boundedContext,
      rootEntity: record.rootEntity,
      invariants: record.invariants.join(', '),
      businessRules: record.businessRules.join(', ')
    });
    setIsAggregateModalVisible(true);
  };

  const handleDeleteAggregate = (record: Aggregate) => {
    setAggregates(prev => prev.filter(item => item.id !== record.id));
    message.success('聚合删除成功！');
  };

  const handleEditEntity = (record: Entity) => {
    setEditingItem(record);
    entityForm.setFieldsValue({
      name: record.name,
      description: record.description,
      aggregate: record.aggregate,
      boundedContext: record.boundedContext,
      properties: record.properties.join(', '),
      methods: record.methods.join(', '),
      invariants: record.invariants.join(', '),
      relationships: record.relationships.join(', '),
      lifecycle: record.lifecycle.join(', ')
    });
    setIsEntityModalVisible(true);
  };

  const handleDeleteEntity = (record: Entity) => {
    setEntities(prev => prev.filter(item => item.id !== record.id));
    message.success('实体删除成功！');
  };

  const handleEditValueObject = (record: ValueObject) => {
    setEditingItem(record);
    valueObjectForm.setFieldsValue({
      name: record.name,
      description: record.description,
      aggregate: record.aggregate,
      boundedContext: record.boundedContext,
      properties: record.properties.join(', '),
      validationRules: record.validationRules.join(', '),
      immutability: record.immutability,
      equalityRules: record.equalityRules.join(', ')
    });
    setIsValueObjectModalVisible(true);
  };

  const handleDeleteValueObject = (record: ValueObject) => {
    setValueObjects(prev => prev.filter(item => item.id !== record.id));
    message.success('值对象删除成功！');
  };

  const handleEditDomainService = (record: DomainService) => {
    setEditingItem(record);
    domainServiceForm.setFieldsValue({
      name: record.name,
      description: record.description,
      boundedContext: record.boundedContext,
      purpose: record.purpose,
      parameters: record.parameters.join(', '),
      returnType: record.returnType,
      businessLogic: record.businessLogic.join(', '),
      dependencies: record.dependencies.join(', ')
    });
    setIsDomainServiceModalVisible(true);
  };

  const handleDeleteDomainService = (record: DomainService) => {
    setDomainServices(prev => prev.filter(item => item.id !== record.id));
    message.success('领域服务删除成功！');
  };

  const handleEditDomainEvent = (record: DomainEvent) => {
    setEditingItem(record);
    domainEventForm.setFieldsValue({
      name: record.name,
      description: record.description,
      aggregate: record.aggregate,
      boundedContext: record.boundedContext,
      eventType: record.eventType,
      payload: record.payload.join(', '),
      handlers: record.handlers.join(', '),
      triggers: record.triggers.join(', ')
    });
    setIsDomainEventModalVisible(true);
  };

  const handleDeleteDomainEvent = (record: DomainEvent) => {
    setDomainEvents(prev => prev.filter(item => item.id !== record.id));
    message.success('领域事件删除成功！');
  };

  const handleEditRepository = (record: Repository) => {
    setEditingItem(record);
    repositoryForm.setFieldsValue({
      name: record.name,
      description: record.description,
      aggregate: record.aggregate,
      boundedContext: record.boundedContext,
      interface: record.interface.join(', '),
      implementation: record.implementation,
      queryMethods: record.queryMethods.join(', '),
      persistence: record.persistence
    });
    setIsRepositoryModalVisible(true);
  };

  const handleDeleteRepository = (record: Repository) => {
    setRepositories(prev => prev.filter(item => item.id !== record.id));
    message.success('仓储删除成功！');
  };

  const handleViewDetails = (item: any, type: string) => {
    setSelectedItem({ ...item, type });
    setIsDetailDrawerVisible(true);
  };

  const aggregateColumns = [
    {
      title: '聚合名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Aggregate) => (
        <Space>
          <TeamOutlined />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '限界上下文',
      dataIndex: 'boundedContext',
      key: 'boundedContext',
      render: (context: string) => <Tag color="purple">{context}</Tag>,
    },
    {
      title: '根实体',
      dataIndex: 'rootEntity',
      key: 'rootEntity',
      render: (entity: string) => <Tag color="blue">{entity}</Tag>,
    },
    {
      title: '实体数量',
      dataIndex: 'entities',
      key: 'entities',
      render: (entities: string[]) => (
        <Tag color="green">{entities.length}</Tag>
      ),
    },
    {
      title: '值对象数量',
      dataIndex: 'valueObjects',
      key: 'valueObjects',
      render: (valueObjects: string[]) => (
        <Tag color="orange">{valueObjects.length}</Tag>
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
      render: (record: Aggregate) => (
        <Space>
          <Tooltip title="查看详情">
            <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewDetails(record, 'aggregate')} />
          </Tooltip>
          <Tooltip title="编辑">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEditAggregate(record)} />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm title="确定要删除这个聚合吗？" onConfirm={() => handleDeleteAggregate(record)}>
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const entityColumns = [
    {
      title: '实体名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <ApartmentOutlined />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '所属聚合',
      dataIndex: 'aggregate',
      key: 'aggregate',
      render: (aggregate: string) => <Tag color="blue">{aggregate}</Tag>,
    },
    {
      title: '限界上下文',
      dataIndex: 'boundedContext',
      key: 'boundedContext',
      render: (context: string) => <Tag color="purple">{context}</Tag>,
    },
    {
      title: '属性数量',
      dataIndex: 'properties',
      key: 'properties',
      render: (properties: string[]) => (
        <Tag color="green">{properties.length}</Tag>
      ),
    },
    {
      title: '方法数量',
      dataIndex: 'methods',
      key: 'methods',
      render: (methods: string[]) => (
        <Tag color="orange">{methods.length}</Tag>
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
      render: (record: Entity) => (
        <Space>
          <Tooltip title="查看详情">
            <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewDetails(record, 'entity')} />
          </Tooltip>
          <Tooltip title="编辑">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEditEntity(record)} />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm title="确定要删除这个实体吗？" onConfirm={() => handleDeleteEntity(record)}>
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const valueObjectColumns = [
    {
      title: '值对象名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <GiftOutlined />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '所属聚合',
      dataIndex: 'aggregate',
      key: 'aggregate',
      render: (aggregate: string) => <Tag color="blue">{aggregate}</Tag>,
    },
    {
      title: '限界上下文',
      dataIndex: 'boundedContext',
      key: 'boundedContext',
      render: (context: string) => <Tag color="purple">{context}</Tag>,
    },
    {
      title: '属性数量',
      dataIndex: 'properties',
      key: 'properties',
      render: (properties: string[]) => (
        <Tag color="green">{properties.length}</Tag>
      ),
    },
    {
      title: '不可变性',
      dataIndex: 'immutability',
      key: 'immutability',
      render: (immutability: boolean) => (
        <Tag color={immutability ? 'green' : 'red'}>
          {immutability ? '不可变' : '可变'}
        </Tag>
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
      render: (record: ValueObject) => (
        <Space>
          <Tooltip title="查看详情">
            <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewDetails(record, 'valueObject')} />
          </Tooltip>
          <Tooltip title="编辑">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEditValueObject(record)} />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm title="确定要删除这个值对象吗？" onConfirm={() => handleDeleteValueObject(record)}>
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const domainServiceColumns = [
    {
      title: '服务名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <ToolOutlined />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '限界上下文',
      dataIndex: 'boundedContext',
      key: 'boundedContext',
      render: (context: string) => <Tag color="purple">{context}</Tag>,
    },
    {
      title: '目的',
      dataIndex: 'purpose',
      key: 'purpose',
      ellipsis: true,
    },
    {
      title: '参数数量',
      dataIndex: 'parameters',
      key: 'parameters',
      render: (parameters: string[]) => (
        <Tag color="blue">{parameters.length}</Tag>
      ),
    },
    {
      title: '依赖数量',
      dataIndex: 'dependencies',
      key: 'dependencies',
      render: (dependencies: string[]) => (
        <Tag color="orange">{dependencies.length}</Tag>
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
      render: (record: DomainService) => (
        <Space>
          <Tooltip title="查看详情">
            <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewDetails(record, 'domainService')} />
          </Tooltip>
          <Tooltip title="编辑">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEditDomainService(record)} />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm title="确定要删除这个领域服务吗？" onConfirm={() => handleDeleteDomainService(record)}>
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const domainEventColumns = [
    {
      title: '事件名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <ThunderboltOutlined />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '所属聚合',
      dataIndex: 'aggregate',
      key: 'aggregate',
      render: (aggregate: string) => <Tag color="blue">{aggregate}</Tag>,
    },
    {
      title: '限界上下文',
      dataIndex: 'boundedContext',
      key: 'boundedContext',
      render: (context: string) => <Tag color="purple">{context}</Tag>,
    },
    {
      title: '事件类型',
      dataIndex: 'eventType',
      key: 'eventType',
      render: (eventType: string) => <Tag color="green">{eventType}</Tag>,
    },
    {
      title: '处理器数量',
      dataIndex: 'handlers',
      key: 'handlers',
      render: (handlers: string[]) => (
        <Tag color="orange">{handlers.length}</Tag>
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
      render: (record: DomainEvent) => (
        <Space>
          <Tooltip title="查看详情">
            <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewDetails(record, 'domainEvent')} />
          </Tooltip>
          <Tooltip title="编辑">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEditDomainEvent(record)} />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm title="确定要删除这个领域事件吗？" onConfirm={() => handleDeleteDomainEvent(record)}>
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const repositoryColumns = [
    {
      title: '仓储名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <DatabaseOutlined />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '所属聚合',
      dataIndex: 'aggregate',
      key: 'aggregate',
      render: (aggregate: string) => <Tag color="blue">{aggregate}</Tag>,
    },
    {
      title: '限界上下文',
      dataIndex: 'boundedContext',
      key: 'boundedContext',
      render: (context: string) => <Tag color="purple">{context}</Tag>,
    },
    {
      title: '接口数量',
      dataIndex: 'interface',
      key: 'interface',
      render: (interfaceList: string[]) => (
        <Tag color="green">{interfaceList.length}</Tag>
      ),
    },
    {
      title: '持久化',
      dataIndex: 'persistence',
      key: 'persistence',
      render: (persistence: string) => <Tag color="orange">{persistence}</Tag>,
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
      render: (record: Repository) => (
        <Space>
          <Tooltip title="查看详情">
            <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewDetails(record, 'repository')} />
          </Tooltip>
          <Tooltip title="编辑">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEditRepository(record)} />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm title="确定要删除这个仓储吗？" onConfirm={() => handleDeleteRepository(record)}>
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
            <TeamOutlined style={{ marginRight: '8px' }} />
            战术设计工具
          </Title>
          <Button 
            icon={<ShareAltOutlined />}
            onClick={() => setIsDetailDrawerVisible(true)}
          >
            聚合关系图
          </Button>
        </div>

        {/* 统计概览 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col span={4}>
            <Card size="small">
              <Statistic
                title="聚合数量"
                value={aggregates.length}
                prefix={<TeamOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card size="small">
              <Statistic
                title="实体数量"
                value={entities.length}
                prefix={<ApartmentOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card size="small">
              <Statistic
                title="值对象数量"
                value={valueObjects.length}
                prefix={<GiftOutlined />}
                valueStyle={{ color: '#fa8c16' }}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card size="small">
              <Statistic
                title="领域服务数量"
                value={domainServices.length}
                prefix={<ToolOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card size="small">
              <Statistic
                title="领域事件数量"
                value={domainEvents.length}
                prefix={<ThunderboltOutlined />}
                valueStyle={{ color: '#eb2f96' }}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card size="small">
              <Statistic
                title="仓储数量"
                value={repositories.length}
                prefix={<DatabaseOutlined />}
                valueStyle={{ color: '#13c2c2' }}
              />
            </Card>
          </Col>
        </Row>
        
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="聚合设计" key="aggregates">
            <div style={{ marginBottom: '16px' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsAggregateModalVisible(true)}
              >
                添加聚合
              </Button>
            </div>
            
            <Table
              columns={aggregateColumns}
              dataSource={aggregates}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              }}
            />
          </TabPane>

          <TabPane tab="实体建模" key="entities">
            <div style={{ marginBottom: '16px' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsEntityModalVisible(true)}
              >
                添加实体
              </Button>
            </div>
            
            <Table
              columns={entityColumns}
              dataSource={entities}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              }}
            />
          </TabPane>

          <TabPane tab="值对象定义" key="valueObjects">
            <div style={{ marginBottom: '16px' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsValueObjectModalVisible(true)}
              >
                添加值对象
              </Button>
            </div>
            
            <Table
              columns={valueObjectColumns}
              dataSource={valueObjects}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              }}
            />
          </TabPane>

          <TabPane tab="领域服务设计" key="domainServices">
            <div style={{ marginBottom: '16px' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsDomainServiceModalVisible(true)}
              >
                添加领域服务
              </Button>
            </div>
            
            <Table
              columns={domainServiceColumns}
              dataSource={domainServices}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              }}
            />
          </TabPane>

          <TabPane tab="领域事件设计" key="domainEvents">
            <div style={{ marginBottom: '16px' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsDomainEventModalVisible(true)}
              >
                添加领域事件
              </Button>
            </div>
            
            <Table
              columns={domainEventColumns}
              dataSource={domainEvents}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              }}
            />
          </TabPane>

          <TabPane tab="仓储设计" key="repositories">
            <div style={{ marginBottom: '16px' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsRepositoryModalVisible(true)}
              >
                添加仓储
              </Button>
            </div>
            
            <Table
              columns={repositoryColumns}
              dataSource={repositories}
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

      {/* 添加聚合模态框 */}
      <Modal
        title={editingItem ? "编辑聚合" : "添加聚合"}
        open={isAggregateModalVisible}
        onCancel={() => {
          setIsAggregateModalVisible(false);
          aggregateForm.resetFields();
          setEditingItem(null);
        }}
        footer={null}
        width={800}
      >
        <Form
          form={aggregateForm}
          layout="vertical"
          onFinish={handleAddAggregate}
        >
          <Form.Item
            name="name"
            label="聚合名称"
            rules={[{ required: true, message: '请输入聚合名称' }]}
          >
            <Input placeholder="请输入聚合名称" />
          </Form.Item>

          <Form.Item
            name="description"
            label="聚合描述"
            rules={[{ required: true, message: '请输入聚合描述' }]}
          >
            <TextArea rows={3} placeholder="请输入聚合描述" />
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
            </Select>
          </Form.Item>

          <Form.Item
            name="rootEntity"
            label="根实体"
            rules={[{ required: true, message: '请输入根实体' }]}
          >
            <Input placeholder="请输入根实体" />
          </Form.Item>

          <Form.Item
            name="invariants"
            label="不变性"
          >
            <Input placeholder="请输入不变性，用逗号分隔" />
          </Form.Item>

          <Form.Item
            name="businessRules"
            label="业务规则"
          >
            <Input placeholder="请输入业务规则，用逗号分隔" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => {
                setIsAggregateModalVisible(false);
                aggregateForm.resetFields();
                setEditingItem(null);
              }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                {editingItem ? "更新聚合" : "添加聚合"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 添加实体模态框 */}
      <Modal
        title={editingItem ? "编辑实体" : "添加实体"}
        open={isEntityModalVisible}
        onCancel={() => {
          setIsEntityModalVisible(false);
          entityForm.resetFields();
          setEditingItem(null);
        }}
        footer={null}
        width={800}
      >
        <Form
          form={entityForm}
          layout="vertical"
          onFinish={handleAddEntity}
        >
          <Form.Item
            name="name"
            label="实体名称"
            rules={[{ required: true, message: '请输入实体名称' }]}
          >
            <Input placeholder="请输入实体名称" />
          </Form.Item>

          <Form.Item
            name="description"
            label="实体描述"
            rules={[{ required: true, message: '请输入实体描述' }]}
          >
            <TextArea rows={3} placeholder="请输入实体描述" />
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
            </Select>
          </Form.Item>

          <Form.Item
            name="properties"
            label="属性"
          >
            <Input placeholder="请输入属性，用逗号分隔" />
          </Form.Item>

          <Form.Item
            name="methods"
            label="方法"
          >
            <Input placeholder="请输入方法，用逗号分隔" />
          </Form.Item>

          <Form.Item
            name="invariants"
            label="不变性"
          >
            <Input placeholder="请输入不变性，用逗号分隔" />
          </Form.Item>

          <Form.Item
            name="relationships"
            label="关系"
          >
            <Input placeholder="请输入关系，用逗号分隔" />
          </Form.Item>

          <Form.Item
            name="lifecycle"
            label="生命周期"
          >
            <Input placeholder="请输入生命周期，用逗号分隔" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => {
                setIsEntityModalVisible(false);
                entityForm.resetFields();
                setEditingItem(null);
              }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                {editingItem ? "更新实体" : "添加实体"}
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
                ...(selectedItem.properties ? [{
                  key: 'properties',
                  label: '属性',
                  children: (
                    <List
                      dataSource={selectedItem.properties}
                      renderItem={(property: string) => (
                        <List.Item>
                          <Tag color="blue">{property}</Tag>
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
                      renderItem={(method: string) => (
                        <List.Item>
                          <Tag color="green">{method}</Tag>
                        </List.Item>
                      )}
                    />
                  )
                }] : []),
                ...(selectedItem.invariants ? [{
                  key: 'invariants',
                  label: '不变性',
                  children: (
                    <List
                      dataSource={selectedItem.invariants}
                      renderItem={(invariant: string) => (
                        <List.Item>
                          <Tag color="orange">{invariant}</Tag>
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

export default TacticalDesign;

