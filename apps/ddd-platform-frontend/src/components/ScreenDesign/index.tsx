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
  Drawer,
  Row,
  Col,
  Statistic,
  Collapse,
  Switch,
  InputNumber,
  Checkbox,
  Tree,
  Transfer,
  Upload,
  Image,
  Badge,
  Progress,
  Timeline,
  Steps,
  Descriptions,
  Empty,
  Alert
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  EyeOutlined,
  SettingOutlined,
  ShareAltOutlined,
  CopyOutlined,
  DownloadOutlined,
  UploadOutlined,
  FileTextOutlined,
  LayoutOutlined,
  FormOutlined,
  TableOutlined,
  DashboardOutlined,
  WorkflowOutlined,
  CodeOutlined,
  ApiOutlined,
  DatabaseOutlined,
  SearchOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  ReloadOutlined,
  SaveOutlined,
  PlayCircleOutlined,
  StopOutlined,
  PauseCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
  ThunderboltOutlined,
  RocketOutlined,
  StarOutlined,
  HeartOutlined,
  LikeOutlined,
  DislikeOutlined,
  BookOutlined,
  ReadOutlined,
  EditFilled,
  DeleteFilled,
  EyeFilled,
  SettingFilled,
  ShareAltFilled,
  CopyFilled,
  DownloadFilled,
  UploadFilled,
  FileTextFilled,
  LayoutFilled,
  FormFilled,
  TableFilled,
  DashboardFilled,
  WorkflowFilled,
  CodeFilled,
  ApiFilled,
  DatabaseFilled,
  SearchFilled,
  FilterFilled,
  SortAscendingFilled,
  SortDescendingFilled,
  ReloadFilled,
  SaveFilled,
  PlayCircleFilled,
  StopFilled,
  PauseCircleFilled,
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled,
  QuestionCircleFilled,
  ThunderboltFilled,
  RocketFilled,
  StarFilled,
  HeartFilled,
  LikeFilled,
  DislikeFilled,
  BookFilled,
  ReadFilled
} from '@ant-design/icons';
import type { ScreenDefinition, ScreenTemplate, AmisSchema } from '../../types';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { Step } = Steps;

interface ScreenType {
  id: string;
  name: string;
  description: string;
  category: 'LIST' | 'FORM' | 'DETAIL' | 'DASHBOARD' | 'WORKFLOW';
  icon: string;
  features: string[];
  useCases: string[];
  complexity: 'SIMPLE' | 'MEDIUM' | 'COMPLEX';
  estimatedTime: string;
  createdAt: string;
  updatedAt: string;
  author: string;
}

interface ScreenField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'file' | 'image';
  required: boolean;
  placeholder: string;
  validation: string[];
  options: string[];
  defaultValue: any;
  mapping: string;
  createdAt: string;
  updatedAt: string;
}

interface ScreenLayout {
  id: string;
  name: string;
  description: string;
  type: 'GRID' | 'FLEX' | 'CARD' | 'TAB' | 'ACCORDION' | 'STEPS';
  columns: number;
  responsive: boolean;
  spacing: number;
  padding: number;
  margin: number;
  backgroundColor: string;
  borderColor: string;
  borderRadius: number;
  shadow: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ScreenInteraction {
  id: string;
  name: string;
  type: 'CLICK' | 'HOVER' | 'FOCUS' | 'CHANGE' | 'SUBMIT' | 'RESET';
  target: string;
  action: string;
  parameters: string[];
  conditions: string[];
  createdAt: string;
  updatedAt: string;
}

interface ScreenValidation {
  id: string;
  name: string;
  type: 'REQUIRED' | 'FORMAT' | 'LENGTH' | 'RANGE' | 'CUSTOM';
  field: string;
  rule: string;
  message: string;
  severity: 'ERROR' | 'WARNING' | 'INFO';
  createdAt: string;
  updatedAt: string;
}

const ScreenDesign: React.FC = () => {
  const [activeTab, setActiveTab] = useState('types');
  const [isScreenTypeModalVisible, setIsScreenTypeModalVisible] = useState(false);
  const [isScreenModalVisible, setIsScreenModalVisible] = useState(false);
  const [isTemplateModalVisible, setIsTemplateModalVisible] = useState(false);
  const [isTemplateContentModalVisible, setIsTemplateContentModalVisible] = useState(false);
  const [isFieldModalVisible, setIsFieldModalVisible] = useState(false);
  const [isLayoutModalVisible, setIsLayoutModalVisible] = useState(false);
  const [isDetailDrawerVisible, setIsDetailDrawerVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [screenTypeForm] = Form.useForm();
  const [screenForm] = Form.useForm();
  const [templateForm] = Form.useForm();
  const [templateContentForm] = Form.useForm();
  const [fieldForm] = Form.useForm();
  const [layoutForm] = Form.useForm();

  // 模拟数据
  const mockScreenTypes: ScreenType[] = [
    {
      id: '1',
      name: '列表页面',
      description: '用于展示数据列表的页面类型',
      category: 'LIST',
      icon: 'TableOutlined',
      features: ['分页', '排序', '筛选', '搜索', '批量操作'],
      useCases: ['用户列表', '订单列表', '商品列表', '日志列表'],
      complexity: 'MEDIUM',
      estimatedTime: '2-4小时',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      author: '张三'
    },
    {
      id: '2',
      name: '表单页面',
      description: '用于数据录入和编辑的页面类型',
      category: 'FORM',
      icon: 'FormOutlined',
      features: ['字段验证', '自动保存', '草稿功能', '提交确认'],
      useCases: ['用户注册', '订单创建', '商品编辑', '设置配置'],
      complexity: 'MEDIUM',
      estimatedTime: '3-5小时',
      createdAt: '2024-01-02',
      updatedAt: '2024-01-16',
      author: '李四'
    },
    {
      id: '3',
      name: '详情页面',
      description: '用于展示详细信息的页面类型',
      category: 'DETAIL',
      icon: 'EyeOutlined',
      features: ['信息展示', '操作按钮', '相关链接', '历史记录'],
      useCases: ['用户详情', '订单详情', '商品详情', '系统信息'],
      complexity: 'SIMPLE',
      estimatedTime: '1-2小时',
      createdAt: '2024-01-03',
      updatedAt: '2024-01-17',
      author: '王五'
    },
    {
      id: '4',
      name: '仪表板页面',
      description: '用于数据可视化和统计的页面类型',
      category: 'DASHBOARD',
      icon: 'DashboardOutlined',
      features: ['图表展示', '实时数据', '多维度分析', '自定义布局'],
      useCases: ['业务概览', '数据统计', '性能监控', '运营分析'],
      complexity: 'COMPLEX',
      estimatedTime: '6-8小时',
      createdAt: '2024-01-04',
      updatedAt: '2024-01-18',
      author: '赵六'
    },
    {
      id: '5',
      name: '工作流页面',
      description: '用于流程管理和审批的页面类型',
      category: 'WORKFLOW',
      icon: 'WorkflowOutlined',
      features: ['流程设计', '状态管理', '审批功能', '流程监控'],
      useCases: ['审批流程', '业务流程', '工作流程', '状态流转'],
      complexity: 'COMPLEX',
      estimatedTime: '8-12小时',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-19',
      author: '孙七'
    }
  ];

  const mockScreens: ScreenDefinition[] = [
    {
      id: '1',
      name: '用户管理页面',
      description: '用户列表和管理的页面',
      type: 'LIST',
      sourceAggregateId: 'user-aggregate',
      amisSchema: {
        type: 'page',
        title: '用户管理',
        body: {
          type: 'crud',
          api: '/api/users',
          columns: [
            { name: 'id', label: 'ID' },
            { name: 'username', label: '用户名' },
            { name: 'email', label: '邮箱' },
            { name: 'status', label: '状态' }
          ]
        }
      },
      metadata: {
        fields: ['id', 'username', 'email', 'status'],
        actions: ['create', 'edit', 'delete', 'view'],
        filters: ['username', 'email', 'status']
      },
      isActive: true
    },
    {
      id: '2',
      name: '用户注册表单',
      description: '新用户注册的表单页面',
      type: 'FORM',
      sourceAggregateId: 'user-aggregate',
      amisSchema: {
        type: 'page',
        title: '用户注册',
        body: {
          type: 'form',
          api: '/api/users',
          body: [
            { type: 'input-text', name: 'username', label: '用户名', required: true },
            { type: 'input-email', name: 'email', label: '邮箱', required: true },
            { type: 'input-password', name: 'password', label: '密码', required: true }
          ]
        }
      },
      metadata: {
        fields: ['username', 'email', 'password'],
        validation: ['required', 'email-format', 'password-strength']
      },
      isActive: true
    }
  ];

  const mockTemplates: ScreenTemplate[] = [
    {
      id: '1',
      name: '标准列表模板',
      description: '包含基本CRUD操作的列表页面模板',
      type: 'LIST',
      template: {
        type: 'page',
        title: '数据列表',
        body: {
          type: 'crud',
          api: '/api/data',
          columns: [
            { name: 'id', label: 'ID' },
            { name: 'name', label: '名称' },
            { name: 'status', label: '状态' }
          ],
          headerToolbar: [
            { type: 'button', label: '新增', actionType: 'dialog', dialog: { title: '新增数据', body: { type: 'form' } } }
          ]
        }
      },
      isSystem: true
    },
    {
      id: '2',
      name: '标准表单模板',
      description: '包含基本字段验证的表单页面模板',
      type: 'FORM',
      template: {
        type: 'page',
        title: '数据表单',
        body: {
          type: 'form',
          api: '/api/data',
          body: [
            { type: 'input-text', name: 'name', label: '名称', required: true },
            { type: 'textarea', name: 'description', label: '描述' },
            { type: 'select', name: 'status', label: '状态', options: ['启用', '禁用'] }
          ]
        }
      },
      isSystem: true
    }
  ];

  const [screenTypes, setScreenTypes] = useState<ScreenType[]>(mockScreenTypes);
  const [screens, setScreens] = useState<ScreenDefinition[]>(mockScreens);
  const [templates, setTemplates] = useState<ScreenTemplate[]>(mockTemplates);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'LIST': return 'blue';
      case 'FORM': return 'green';
      case 'DETAIL': return 'orange';
      case 'DASHBOARD': return 'purple';
      case 'WORKFLOW': return 'red';
      default: return 'default';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'LIST': return '列表页面';
      case 'FORM': return '表单页面';
      case 'DETAIL': return '详情页面';
      case 'DASHBOARD': return '仪表板页面';
      case 'WORKFLOW': return '工作流页面';
      default: return '未知';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'SIMPLE': return 'green';
      case 'MEDIUM': return 'orange';
      case 'COMPLEX': return 'red';
      default: return 'default';
    }
  };

  const getComplexityText = (complexity: string) => {
    switch (complexity) {
      case 'SIMPLE': return '简单';
      case 'MEDIUM': return '中等';
      case 'COMPLEX': return '复杂';
      default: return '未知';
    }
  };

  const handleAddScreenType = async (values: any) => {
    try {
      if (editingItem) {
        // 编辑模式
        const updatedScreenType: ScreenType = {
          ...editingItem,
          name: values.name,
          description: values.description,
          category: values.category,
          icon: values.icon,
          features: values.features ? values.features.split(',').map((s: string) => s.trim()) : [],
          useCases: values.useCases ? values.useCases.split(',').map((s: string) => s.trim()) : [],
          complexity: values.complexity,
          estimatedTime: values.estimatedTime,
          updatedAt: new Date().toISOString().split('T')[0]
        };

        setScreenTypes(prev => prev.map(item => item.id === editingItem.id ? updatedScreenType : item));
        message.success('屏幕类型更新成功！');
      } else {
        // 添加模式
        const newScreenType: ScreenType = {
          id: Date.now().toString(),
          name: values.name,
          description: values.description,
          category: values.category,
          icon: values.icon,
          features: values.features ? values.features.split(',').map((s: string) => s.trim()) : [],
          useCases: values.useCases ? values.useCases.split(',').map((s: string) => s.trim()) : [],
          complexity: values.complexity,
          estimatedTime: values.estimatedTime,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          author: '当前用户'
        };

        setScreenTypes(prev => [...prev, newScreenType]);
        message.success('屏幕类型添加成功！');
      }
      
      setIsScreenTypeModalVisible(false);
      screenTypeForm.resetFields();
      setEditingItem(null);
    } catch (error) {
      message.error('操作失败！');
    }
  };

  const handleAddScreen = async (values: any) => {
    try {
      if (editingItem) {
        // 编辑模式
        const updatedScreen: ScreenDefinition = {
          ...editingItem,
          name: values.name,
          description: values.description,
          type: values.type,
          sourceAggregateId: values.sourceAggregateId,
          updatedAt: new Date().toISOString().split('T')[0]
        };

        setScreens(prev => prev.map(item => item.id === editingItem.id ? updatedScreen : item));
        message.success('屏幕定义更新成功！');
      } else {
        // 添加模式
        const newScreen: ScreenDefinition = {
          id: Date.now().toString(),
          name: values.name,
          description: values.description,
          type: values.type,
          sourceAggregateId: values.sourceAggregateId,
          amisSchema: {
            type: 'page',
            title: values.name,
            body: { type: 'container' }
          },
          metadata: {},
          isActive: true
        };

        setScreens(prev => [...prev, newScreen]);
        message.success('屏幕定义添加成功！');
      }
      
      setIsScreenModalVisible(false);
      screenForm.resetFields();
      setEditingItem(null);
    } catch (error) {
      message.error('操作失败！');
    }
  };

  const handleAddTemplate = async (values: any) => {
    try {
      if (editingItem) {
        // 编辑模式
        const updatedTemplate: ScreenTemplate = {
          ...editingItem,
          name: values.name,
          description: values.description,
          type: values.type,
          updatedAt: new Date().toISOString().split('T')[0]
        };

        setTemplates(prev => prev.map(item => item.id === editingItem.id ? updatedTemplate : item));
        message.success('屏幕模板更新成功！');
      } else {
        // 添加模式
        const newTemplate: ScreenTemplate = {
          id: Date.now().toString(),
          name: values.name,
          description: values.description,
          type: values.type,
          template: {
            type: 'page',
            title: values.name,
            body: { type: 'container' }
          },
          isSystem: false
        };

        setTemplates(prev => [...prev, newTemplate]);
        message.success('屏幕模板添加成功！');
      }
      
      setIsTemplateModalVisible(false);
      templateForm.resetFields();
      setEditingItem(null);
    } catch (error) {
      message.error('操作失败！');
    }
  };

  const handleEditScreenType = (record: ScreenType) => {
    setEditingItem(record);
    screenTypeForm.setFieldsValue({
      name: record.name,
      description: record.description,
      category: record.category,
      icon: record.icon,
      features: record.features.join(', '),
      useCases: record.useCases.join(', '),
      complexity: record.complexity,
      estimatedTime: record.estimatedTime
    });
    setIsScreenTypeModalVisible(true);
  };

  const handleDeleteScreenType = (record: ScreenType) => {
    setScreenTypes(prev => prev.filter(item => item.id !== record.id));
    message.success('屏幕类型删除成功！');
  };

  const handleEditScreen = (record: ScreenDefinition) => {
    setEditingItem(record);
    screenForm.setFieldsValue({
      name: record.name,
      description: record.description,
      type: record.type,
      sourceAggregateId: record.sourceAggregateId
    });
    setIsScreenModalVisible(true);
  };

  const handleDeleteScreen = (record: ScreenDefinition) => {
    setScreens(prev => prev.filter(item => item.id !== record.id));
    message.success('屏幕定义删除成功！');
  };

  const handleEditTemplate = (record: ScreenTemplate) => {
    setEditingItem(record);
    templateForm.setFieldsValue({
      name: record.name,
      description: record.description,
      type: record.type
    });
    setIsTemplateModalVisible(true);
  };

  const handleEditTemplateContent = (record: ScreenTemplate) => {
    setEditingItem(record);
    templateContentForm.setFieldsValue({
      name: record.name,
      description: record.description,
      type: record.type,
      templateContent: JSON.stringify(record.template, null, 2)
    });
    setIsTemplateContentModalVisible(true);
  };

  const handleDeleteTemplate = (record: ScreenTemplate) => {
    setTemplates(prev => prev.filter(item => item.id !== record.id));
    message.success('屏幕模板删除成功！');
  };

  const handleSaveTemplateContent = async (values: any) => {
    try {
      let templateContent;
      try {
        templateContent = JSON.parse(values.templateContent);
      } catch (error) {
        message.error('模板内容JSON格式错误，请检查语法！');
        return;
      }

      const updatedTemplate: ScreenTemplate = {
        ...editingItem,
        name: values.name,
        description: values.description,
        type: values.type,
        template: templateContent
      };

      setTemplates(prev => prev.map(item => item.id === editingItem.id ? updatedTemplate : item));
      message.success('模板内容更新成功！');
      
      setIsTemplateContentModalVisible(false);
      templateContentForm.resetFields();
      setEditingItem(null);
    } catch (error) {
      message.error('操作失败！');
    }
  };

  const handleViewDetails = (item: any, type: string) => {
    setSelectedItem({ ...item, type });
    setIsDetailDrawerVisible(true);
  };

  const screenTypeColumns = [
    {
      title: '屏幕类型',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: ScreenType) => (
        <Space>
          <Tag color={getCategoryColor(record.category)}>
            {getCategoryText(record.category)}
          </Tag>
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
      title: '预估时间',
      dataIndex: 'estimatedTime',
      key: 'estimatedTime',
      render: (time: string) => <Tag color="blue">{time}</Tag>,
    },
    {
      title: '功能数量',
      dataIndex: 'features',
      key: 'features',
      render: (features: string[]) => (
        <Tag color="green">{features.length}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      render: (record: ScreenType) => (
        <Space>
          <Tooltip title="查看详情">
            <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewDetails(record, 'screenType')} />
          </Tooltip>
          <Tooltip title="编辑">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEditScreenType(record)} />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm title="确定要删除这个屏幕类型吗？" onConfirm={() => handleDeleteScreenType(record)}>
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const screenColumns = [
    {
      title: '屏幕名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: ScreenDefinition) => (
        <Space>
          <Tag color={getCategoryColor(record.type)}>
            {getCategoryText(record.type)}
          </Tag>
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
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={getCategoryColor(type)}>
          {getCategoryText(type)}
        </Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      render: (record: ScreenDefinition) => (
        <Space>
          <Tooltip title="查看详情">
            <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewDetails(record, 'screen')} />
          </Tooltip>
          <Tooltip title="编辑">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEditScreen(record)} />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm title="确定要删除这个屏幕定义吗？" onConfirm={() => handleDeleteScreen(record)}>
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const templateColumns = [
    {
      title: '模板名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: ScreenTemplate) => (
        <Space>
          <Tag color={getCategoryColor(record.type)}>
            {getCategoryText(record.type)}
          </Tag>
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
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={getCategoryColor(type)}>
          {getCategoryText(type)}
        </Tag>
      ),
    },
    {
      title: '来源',
      dataIndex: 'isSystem',
      key: 'isSystem',
      render: (isSystem: boolean) => (
        <Tag color={isSystem ? 'blue' : 'green'}>
          {isSystem ? '系统模板' : '自定义模板'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      render: (record: ScreenTemplate) => (
        <Space>
          <Tooltip title="查看详情">
            <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewDetails(record, 'template')} />
          </Tooltip>
          <Tooltip title="编辑基本信息">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEditTemplate(record)} />
          </Tooltip>
          <Tooltip title="编辑模板内容">
            <Button type="link" icon={<CodeOutlined />} onClick={() => handleEditTemplateContent(record)} />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm title="确定要删除这个屏幕模板吗？" onConfirm={() => handleDeleteTemplate(record)}>
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
            <LayoutOutlined style={{ marginRight: '8px' }} />
            屏幕设计
          </Title>
          <Button 
            icon={<ShareAltOutlined />}
            onClick={() => setIsDetailDrawerVisible(true)}
          >
            设计器
          </Button>
        </div>

        {/* 统计概览 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="屏幕类型数量"
                value={screenTypes.length}
                prefix={<LayoutOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="屏幕定义数量"
                value={screens.length}
                prefix={<FileTextOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="屏幕模板数量"
                value={templates.length}
                prefix={<CodeOutlined />}
                valueStyle={{ color: '#fa8c16' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="活跃屏幕数量"
                value={screens.filter(s => s.isActive).length}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>
        
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="屏幕类型管理" key="types">
            <div style={{ marginBottom: '16px' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsScreenTypeModalVisible(true)}
              >
                添加屏幕类型
              </Button>
            </div>
            
            <Table
              columns={screenTypeColumns}
              dataSource={screenTypes}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              }}
            />
          </TabPane>

          <TabPane tab="屏幕定义管理" key="screens">
            <div style={{ marginBottom: '16px' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsScreenModalVisible(true)}
              >
                添加屏幕定义
              </Button>
            </div>
            
            <Table
              columns={screenColumns}
              dataSource={screens}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              }}
            />
          </TabPane>

          <TabPane tab="屏幕模板管理" key="templates">
            <div style={{ marginBottom: '16px' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsTemplateModalVisible(true)}
              >
                添加屏幕模板
              </Button>
            </div>
            
            <Table
              columns={templateColumns}
              dataSource={templates}
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

      {/* 添加屏幕类型模态框 */}
      <Modal
        title={editingItem ? "编辑屏幕类型" : "添加屏幕类型"}
        open={isScreenTypeModalVisible}
        onCancel={() => {
          setIsScreenTypeModalVisible(false);
          screenTypeForm.resetFields();
          setEditingItem(null);
        }}
        footer={null}
        width={800}
      >
        <Form
          form={screenTypeForm}
          layout="vertical"
          onFinish={handleAddScreenType}
        >
          <Form.Item
            name="name"
            label="屏幕类型名称"
            rules={[{ required: true, message: '请输入屏幕类型名称' }]}
          >
            <Input placeholder="请输入屏幕类型名称" />
          </Form.Item>

          <Form.Item
            name="description"
            label="屏幕类型描述"
            rules={[{ required: true, message: '请输入屏幕类型描述' }]}
          >
            <TextArea rows={3} placeholder="请输入屏幕类型描述" />
          </Form.Item>

          <Form.Item
            name="category"
            label="屏幕分类"
            rules={[{ required: true, message: '请选择屏幕分类' }]}
          >
            <Select placeholder="请选择屏幕分类">
              <Option value="LIST">列表页面</Option>
              <Option value="FORM">表单页面</Option>
              <Option value="DETAIL">详情页面</Option>
              <Option value="DASHBOARD">仪表板页面</Option>
              <Option value="WORKFLOW">工作流页面</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="icon"
            label="图标"
            rules={[{ required: true, message: '请选择图标' }]}
          >
            <Select placeholder="请选择图标">
              <Option value="TableOutlined">表格图标</Option>
              <Option value="FormOutlined">表单图标</Option>
              <Option value="EyeOutlined">详情图标</Option>
              <Option value="DashboardOutlined">仪表板图标</Option>
              <Option value="WorkflowOutlined">工作流图标</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="features"
            label="功能特性"
          >
            <Input placeholder="请输入功能特性，用逗号分隔" />
          </Form.Item>

          <Form.Item
            name="useCases"
            label="使用场景"
          >
            <Input placeholder="请输入使用场景，用逗号分隔" />
          </Form.Item>

          <Form.Item
            name="complexity"
            label="复杂度"
            rules={[{ required: true, message: '请选择复杂度' }]}
          >
            <Select placeholder="请选择复杂度">
              <Option value="SIMPLE">简单</Option>
              <Option value="MEDIUM">中等</Option>
              <Option value="COMPLEX">复杂</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="estimatedTime"
            label="预估时间"
            rules={[{ required: true, message: '请输入预估时间' }]}
          >
            <Input placeholder="请输入预估时间，如：2-4小时" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => {
                setIsScreenTypeModalVisible(false);
                screenTypeForm.resetFields();
                setEditingItem(null);
              }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                {editingItem ? "更新屏幕类型" : "添加屏幕类型"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 添加屏幕定义模态框 */}
      <Modal
        title={editingItem ? "编辑屏幕定义" : "添加屏幕定义"}
        open={isScreenModalVisible}
        onCancel={() => {
          setIsScreenModalVisible(false);
          screenForm.resetFields();
          setEditingItem(null);
        }}
        footer={null}
        width={800}
      >
        <Form
          form={screenForm}
          layout="vertical"
          onFinish={handleAddScreen}
        >
          <Form.Item
            name="name"
            label="屏幕名称"
            rules={[{ required: true, message: '请输入屏幕名称' }]}
          >
            <Input placeholder="请输入屏幕名称" />
          </Form.Item>

          <Form.Item
            name="description"
            label="屏幕描述"
            rules={[{ required: true, message: '请输入屏幕描述' }]}
          >
            <TextArea rows={3} placeholder="请输入屏幕描述" />
          </Form.Item>

          <Form.Item
            name="type"
            label="屏幕类型"
            rules={[{ required: true, message: '请选择屏幕类型' }]}
          >
            <Select placeholder="请选择屏幕类型">
              <Option value="LIST">列表页面</Option>
              <Option value="FORM">表单页面</Option>
              <Option value="DETAIL">详情页面</Option>
              <Option value="DASHBOARD">仪表板页面</Option>
              <Option value="WORKFLOW">工作流页面</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="sourceAggregateId"
            label="源聚合ID"
            rules={[{ required: true, message: '请输入源聚合ID' }]}
          >
            <Input placeholder="请输入源聚合ID" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => {
                setIsScreenModalVisible(false);
                screenForm.resetFields();
                setEditingItem(null);
              }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                {editingItem ? "更新屏幕定义" : "添加屏幕定义"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 添加屏幕模板模态框 */}
      <Modal
        title={editingItem ? "编辑屏幕模板" : "添加屏幕模板"}
        open={isTemplateModalVisible}
        onCancel={() => {
          setIsTemplateModalVisible(false);
          templateForm.resetFields();
          setEditingItem(null);
        }}
        footer={null}
        width={800}
      >
        <Form
          form={templateForm}
          layout="vertical"
          onFinish={handleAddTemplate}
        >
          <Form.Item
            name="name"
            label="模板名称"
            rules={[{ required: true, message: '请输入模板名称' }]}
          >
            <Input placeholder="请输入模板名称" />
          </Form.Item>

          <Form.Item
            name="description"
            label="模板描述"
            rules={[{ required: true, message: '请输入模板描述' }]}
          >
            <TextArea rows={3} placeholder="请输入模板描述" />
          </Form.Item>

          <Form.Item
            name="type"
            label="模板类型"
            rules={[{ required: true, message: '请选择模板类型' }]}
          >
            <Select placeholder="请选择模板类型">
              <Option value="LIST">列表页面</Option>
              <Option value="FORM">表单页面</Option>
              <Option value="DETAIL">详情页面</Option>
              <Option value="DASHBOARD">仪表板页面</Option>
              <Option value="WORKFLOW">工作流页面</Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => {
                setIsTemplateModalVisible(false);
                templateForm.resetFields();
                setEditingItem(null);
              }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                {editingItem ? "更新屏幕模板" : "添加屏幕模板"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 编辑模板内容模态框 */}
      <Modal
        title="编辑模板内容"
        open={isTemplateContentModalVisible}
        onCancel={() => {
          setIsTemplateContentModalVisible(false);
          templateContentForm.resetFields();
          setEditingItem(null);
        }}
        footer={null}
        width={1200}
        style={{ top: 20 }}
      >
        <Form
          form={templateContentForm}
          layout="vertical"
          onFinish={handleSaveTemplateContent}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="name"
                label="模板名称"
                rules={[{ required: true, message: '请输入模板名称' }]}
              >
                <Input placeholder="请输入模板名称" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="type"
                label="模板类型"
                rules={[{ required: true, message: '请选择模板类型' }]}
              >
                <Select placeholder="请选择模板类型">
                  <Option value="LIST">列表页面</Option>
                  <Option value="FORM">表单页面</Option>
                  <Option value="DETAIL">详情页面</Option>
                  <Option value="DASHBOARD">仪表板页面</Option>
                  <Option value="WORKFLOW">工作流页面</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="description"
                label="模板描述"
              >
                <Input placeholder="请输入模板描述" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="templateContent"
            label="AMIS模板内容 (JSON格式)"
            rules={[{ required: true, message: '请输入模板内容' }]}
          >
            <TextArea
              rows={20}
              placeholder="请输入AMIS模板的JSON内容"
              style={{ fontFamily: 'Monaco, Consolas, "Courier New", monospace' }}
            />
          </Form.Item>

          <Alert
            message="模板内容说明"
            description="请按照AMIS的JSON Schema格式编写模板内容。支持页面、表单、列表等组件类型。"
            type="info"
            showIcon
            style={{ marginBottom: '16px' }}
          />

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => {
                setIsTemplateContentModalVisible(false);
                templateContentForm.resetFields();
                setEditingItem(null);
              }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                保存模板内容
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
                          <Tag color={selectedItem.isActive ? 'green' : 'red'}>
                            {selectedItem.isActive ? '启用' : '禁用'}
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
                ...(selectedItem.features ? [{
                  key: 'features',
                  label: '功能特性',
                  children: (
                    <List
                      dataSource={selectedItem.features}
                      renderItem={(feature: string) => (
                        <List.Item>
                          <Tag color="blue">{feature}</Tag>
                        </List.Item>
                      )}
                    />
                  )
                }] : []),
                ...(selectedItem.useCases ? [{
                  key: 'useCases',
                  label: '使用场景',
                  children: (
                    <List
                      dataSource={selectedItem.useCases}
                      renderItem={(useCase: string) => (
                        <List.Item>
                          <Tag color="green">{useCase}</Tag>
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

export default ScreenDesign;
