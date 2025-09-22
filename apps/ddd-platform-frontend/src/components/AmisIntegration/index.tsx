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
  Drawer,
  Row,
  Col,
  Statistic,
  Collapse,
  Progress,
  Empty,
  Alert,
  Steps
} from 'antd';
import AmisPreview from './AmisPreview';
import SimpleAmisTest from './SimpleAmisTest';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  EyeOutlined,
  ShareAltOutlined,
  SwapOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  PlayCircleOutlined,
  RocketOutlined
} from '@ant-design/icons';
import type { ScreenDefinition, ScreenTemplate, AmisSchema, Entity, Aggregate, DTO, APIEndpoint } from '../../types';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { Step } = Steps;

interface AmisMapping {
  id: string;
  name: string;
  description: string;
  sourceType: 'entity' | 'aggregate' | 'dto' | 'api' | 'screen';
  targetType: 'amis-component' | 'amis-page' | 'amis-form' | 'amis-table';
  sourceId: string;
  targetId: string;
  mappingRules: MappingRule[];
  transformationRules: TransformationRule[];
  validationRules: ValidationRule[];
  createdAt: string;
  updatedAt: string;
  author: string;
}

interface MappingRule {
  id: string;
  name: string;
  sourceField: string;
  targetField: string;
  dataType: string;
  isRequired: boolean;
  defaultValue: any;
  description: string;
}

interface TransformationRule {
  id: string;
  name: string;
  type: 'FORMAT' | 'CALCULATE' | 'CONVERT' | 'FILTER' | 'SORT';
  expression: string;
  parameters: string[];
  description: string;
}

interface ValidationRule {
  id: string;
  name: string;
  type: 'REQUIRED' | 'FORMAT' | 'LENGTH' | 'RANGE' | 'CUSTOM';
  field: string;
  rule: string;
  message: string;
  severity: 'ERROR' | 'WARNING' | 'INFO';
}

interface ConversionTask {
  id: string;
  name: string;
  description: string;
  sourceType: 'entity' | 'aggregate' | 'dto' | 'api';
  sourceId: string;
  targetType: 'amis-page' | 'amis-form' | 'amis-table' | 'amis-dashboard';
  mappingId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  result?: AmisSchema;
  error?: string;
  createdAt: string;
  updatedAt: string;
  author: string;
}

interface AmisPreview {
  id: string;
  name: string;
  schema: AmisSchema;
  sourceType: string;
  sourceId: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

const AmisIntegration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('converter');
  const [isMappingModalVisible, setIsMappingModalVisible] = useState(false);
  const [isConversionModalVisible, setIsConversionModalVisible] = useState(false);
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [isDetailDrawerVisible, setIsDetailDrawerVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [mappingForm] = Form.useForm();
  const [conversionForm] = Form.useForm();
  const [previewSchema, setPreviewSchema] = useState<AmisSchema | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  // 模拟数据
  const mockMappings: AmisMapping[] = [
    {
      id: '1',
      name: '用户实体到AMIS表单映射',
      description: '将用户实体转换为AMIS表单组件',
      sourceType: 'entity',
      targetType: 'amis-form',
      sourceId: 'user-entity',
      targetId: 'user-form',
      mappingRules: [
        {
          id: '1',
          name: '用户名映射',
          sourceField: 'username',
          targetField: 'name',
          dataType: 'string',
          isRequired: true,
          defaultValue: '',
          description: '用户名字段映射'
        },
        {
          id: '2',
          name: '邮箱映射',
          sourceField: 'email',
          targetField: 'email',
          dataType: 'string',
          isRequired: true,
          defaultValue: '',
          description: '邮箱字段映射'
        }
      ],
      transformationRules: [
        {
          id: '1',
          name: '邮箱格式转换',
          type: 'FORMAT',
          expression: 'toLowerCase',
          parameters: ['email'],
          description: '邮箱转换为小写'
        }
      ],
      validationRules: [
        {
          id: '1',
          name: '用户名长度验证',
          type: 'LENGTH',
          field: 'username',
          rule: 'min:3,max:20',
          message: '用户名长度必须在3-20个字符之间',
          severity: 'ERROR'
        }
      ],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      author: '张三'
    },
    {
      id: '2',
      name: '订单DTO到AMIS表格映射',
      description: '将订单DTO转换为AMIS表格组件',
      sourceType: 'dto',
      targetType: 'amis-table',
      sourceId: 'order-dto',
      targetId: 'order-table',
      mappingRules: [
        {
          id: '3',
          name: '订单ID映射',
          sourceField: 'orderId',
          targetField: 'id',
          dataType: 'string',
          isRequired: true,
          defaultValue: '',
          description: '订单ID字段映射'
        },
        {
          id: '4',
          name: '订单状态映射',
          sourceField: 'status',
          targetField: 'status',
          dataType: 'string',
          isRequired: true,
          defaultValue: 'PENDING',
          description: '订单状态字段映射'
        }
      ],
      transformationRules: [
        {
          id: '2',
          name: '状态值转换',
          type: 'CONVERT',
          expression: 'statusMap',
          parameters: ['status'],
          description: '状态值转换为中文'
        }
      ],
      validationRules: [
        {
          id: '2',
          name: '订单ID格式验证',
          type: 'FORMAT',
          field: 'orderId',
          rule: 'uuid',
          message: '订单ID必须是有效的UUID格式',
          severity: 'ERROR'
        }
      ],
      createdAt: '2024-01-02',
      updatedAt: '2024-01-16',
      author: '李四'
    }
  ];

  const mockConversionTasks: ConversionTask[] = [
    {
      id: '1',
      name: '用户管理页面转换',
      description: '将用户实体转换为用户管理页面',
      sourceType: 'entity',
      sourceId: 'user-entity',
      targetType: 'amis-page',
      mappingId: '1',
      status: 'completed',
      progress: 100,
      result: {
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
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      author: '张三'
    },
    {
      id: '2',
      name: '订单列表页面转换',
      description: '将订单DTO转换为订单列表页面',
      sourceType: 'dto',
      sourceId: 'order-dto',
      targetType: 'amis-page',
      mappingId: '2',
      status: 'running',
      progress: 65,
      createdAt: '2024-01-02',
      updatedAt: '2024-01-16',
      author: '李四'
    },
    {
      id: '3',
      name: '商品表单转换',
      description: '将商品实体转换为商品表单',
      sourceType: 'entity',
      sourceId: 'product-entity',
      targetType: 'amis-form',
      mappingId: '1',
      status: 'failed',
      progress: 0,
      error: '映射规则配置错误',
      createdAt: '2024-01-03',
      updatedAt: '2024-01-17',
      author: '王五'
    }
  ];

  const mockPreviews: AmisPreview[] = [
    {
      id: '1',
      name: '简单测试页面',
      schema: {
        type: 'page',
        title: 'AMIS测试页面',
        body: {
          type: 'form',
          title: '测试表单',
          body: [
            {
              type: 'input-text',
              name: 'name',
              label: '姓名',
              placeholder: '请输入姓名'
            },
            {
              type: 'input-email',
              name: 'email',
              label: '邮箱',
              placeholder: '请输入邮箱'
            },
            {
              type: 'button',
              label: '提交',
              level: 'primary',
              actionType: 'submit'
            }
          ]
        }
      },
      sourceType: 'entity',
      sourceId: 'test-entity',
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      name: '用户管理页面预览',
      schema: {
        type: 'page',
        title: '用户管理系统',
        subTitle: '基于DDD实体生成的用户管理界面',
        body: [
          {
            type: 'form',
            title: '搜索条件',
            mode: 'inline',
            body: [
              {
                type: 'input-text',
                name: 'keyword',
                placeholder: '请输入用户名或邮箱',
                clearable: true
              },
              {
                type: 'select',
                name: 'status',
                placeholder: '用户状态',
                options: [
                  { label: '全部', value: '' },
                  { label: '正常', value: 'active' },
                  { label: '禁用', value: 'disabled' }
                ]
              },
              {
                type: 'button',
                label: '搜索',
                level: 'primary',
                actionType: 'submit'
              }
            ]
          },
          {
            type: 'crud',
            title: '用户列表',
            api: '/api/users',
            syncLocation: false,
            columns: [
              { 
                name: 'id', 
                label: 'ID',
                width: 80
              },
              { 
                name: 'username', 
                label: '用户名',
                searchable: true
              },
              { 
                name: 'email', 
                label: '邮箱',
                searchable: true
              },
              { 
                name: 'phone', 
                label: '手机号'
              },
              { 
                name: 'status', 
                label: '状态',
                type: 'mapping',
                map: {
                  'active': '<span class="label label-success">正常</span>',
                  'disabled': '<span class="label label-danger">禁用</span>'
                }
              },
              { 
                name: 'createdAt', 
                label: '创建时间',
                type: 'datetime'
              }
            ],
            headerToolbar: [
              {
                type: 'button',
                label: '新增用户',
                level: 'primary',
                actionType: 'dialog',
                dialog: {
                  title: '新增用户',
                  body: {
                    type: 'form',
                    api: '/api/users',
                    body: [
                      {
                        type: 'input-text',
                        name: 'username',
                        label: '用户名',
                        required: true
                      },
                      {
                        type: 'input-email',
                        name: 'email',
                        label: '邮箱',
                        required: true
                      },
                      {
                        type: 'input-text',
                        name: 'phone',
                        label: '手机号'
                      }
                    ]
                  }
                }
              }
            ]
          }
        ]
      },
      sourceType: 'entity',
      sourceId: 'user-entity',
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      name: '订单管理页面预览',
      schema: {
        type: 'page',
        title: '订单管理系统',
        subTitle: '基于DDD聚合根生成的订单管理界面',
        body: [
          {
            type: 'grid',
            columns: [
              {
                md: 6,
                body: {
                  type: 'card',
                  header: {
                    title: '今日订单',
                    subTitle: 'Today Orders'
                  },
                  body: {
                    type: 'tpl',
                    tpl: '<div class="text-center"><div class="text-2xl font-bold text-blue-600">${todayOrders}</div><div class="text-sm text-gray-500">个订单</div></div>'
                  }
                }
              },
              {
                md: 6,
                body: {
                  type: 'card',
                  header: {
                    title: '本月订单',
                    subTitle: 'This Month'
                  },
                  body: {
                    type: 'tpl',
                    tpl: '<div class="text-center"><div class="text-2xl font-bold text-green-600">${monthOrders}</div><div class="text-sm text-gray-500">个订单</div></div>'
                  }
                }
              },
              {
                md: 6,
                body: {
                  type: 'card',
                  header: {
                    title: '待处理',
                    subTitle: 'Pending'
                  },
                  body: {
                    type: 'tpl',
                    tpl: '<div class="text-center"><div class="text-2xl font-bold text-orange-600">${pendingOrders}</div><div class="text-sm text-gray-500">个订单</div></div>'
                  }
                }
              },
              {
                md: 6,
                body: {
                  type: 'card',
                  header: {
                    title: '已完成',
                    subTitle: 'Completed'
                  },
                  body: {
                    type: 'tpl',
                    tpl: '<div class="text-center"><div class="text-2xl font-bold text-purple-600">${completedOrders}</div><div class="text-sm text-gray-500">个订单</div></div>'
                  }
                }
              }
            ]
          },
          {
            type: 'crud',
            title: '订单列表',
            api: '/api/orders',
            syncLocation: false,
            columns: [
              { 
                name: 'id', 
                label: '订单号',
                width: 120
              },
              { 
                name: 'customerName', 
                label: '客户姓名',
                searchable: true
              },
              { 
                name: 'productName', 
                label: '产品名称'
              },
              { 
                name: 'amount', 
                label: '金额',
                type: 'money'
              },
              { 
                name: 'status', 
                label: '状态',
                type: 'mapping',
                map: {
                  'pending': '<span class="label label-warning">待处理</span>',
                  'processing': '<span class="label label-info">处理中</span>',
                  'completed': '<span class="label label-success">已完成</span>',
                  'cancelled': '<span class="label label-danger">已取消</span>'
                }
              },
              { 
                name: 'createdAt', 
                label: '创建时间',
                type: 'datetime'
              }
            ],
            headerToolbar: [
              {
                type: 'button',
                label: '导出订单',
                level: 'default',
                actionType: 'ajax',
                api: '/api/orders/export'
              }
            ]
          }
        ]
      },
      sourceType: 'dto',
      sourceId: 'order-dto',
      status: 'active',
      createdAt: '2024-01-02',
      updatedAt: '2024-01-16'
    }
  ];

  const [mappings, setMappings] = useState<AmisMapping[]>(mockMappings);
  const [conversionTasks, setConversionTasks] = useState<ConversionTask[]>(mockConversionTasks);
  const [previews, setPreviews] = useState<AmisPreview[]>(mockPreviews);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'running': return 'blue';
      case 'pending': return 'orange';
      case 'failed': return 'red';
      case 'active': return 'green';
      case 'inactive': return 'gray';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'running': return '运行中';
      case 'pending': return '等待中';
      case 'failed': return '失败';
      case 'active': return '活跃';
      case 'inactive': return '非活跃';
      default: return '未知';
    }
  };

  const getSourceTypeColor = (type: string) => {
    switch (type) {
      case 'entity': return 'blue';
      case 'aggregate': return 'green';
      case 'dto': return 'orange';
      case 'api': return 'purple';
      case 'screen': return 'red';
      default: return 'default';
    }
  };

  const getTargetTypeColor = (type: string) => {
    switch (type) {
      case 'amis-component': return 'blue';
      case 'amis-page': return 'green';
      case 'amis-form': return 'orange';
      case 'amis-table': return 'purple';
      default: return 'default';
    }
  };

  const handleAddMapping = async (values: any) => {
    try {
      if (editingItem) {
        // 编辑模式
        const updatedMapping: AmisMapping = {
          ...editingItem,
          name: values.name,
          description: values.description,
          sourceType: values.sourceType,
          targetType: values.targetType,
          sourceId: values.sourceId,
          targetId: values.targetId,
          updatedAt: new Date().toISOString().split('T')[0]
        };

        setMappings(prev => prev.map(item => item.id === editingItem.id ? updatedMapping : item));
        message.success('AMIS映射更新成功！');
      } else {
        // 添加模式
        const newMapping: AmisMapping = {
          id: Date.now().toString(),
          name: values.name,
          description: values.description,
          sourceType: values.sourceType,
          targetType: values.targetType,
          sourceId: values.sourceId,
          targetId: values.targetId,
          mappingRules: [],
          transformationRules: [],
          validationRules: [],
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          author: '当前用户'
        };

        setMappings(prev => [...prev, newMapping]);
        message.success('AMIS映射添加成功！');
      }
      
      setIsMappingModalVisible(false);
      mappingForm.resetFields();
      setEditingItem(null);
    } catch (error) {
      message.error('操作失败！');
    }
  };

  const handleAddConversionTask = async (values: any) => {
    try {
      const newTask: ConversionTask = {
        id: Date.now().toString(),
        name: values.name,
        description: values.description,
        sourceType: values.sourceType,
        sourceId: values.sourceId,
        targetType: values.targetType,
        mappingId: values.mappingId,
        status: 'pending',
        progress: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        author: '当前用户'
      };

      setConversionTasks(prev => [...prev, newTask]);
      setIsConversionModalVisible(false);
      conversionForm.resetFields();
      message.success('转换任务创建成功！');
    } catch (error) {
      message.error('操作失败！');
    }
  };

  const handleStartConversion = async (task: ConversionTask) => {
    setIsConverting(true);
    
    // 模拟转换过程
    const updateProgress = (progress: number) => {
      setConversionTasks(prev => prev.map(item => 
        item.id === task.id 
          ? { ...item, progress, status: progress === 100 ? 'completed' : 'running' }
          : item
      ));
    };

    // 模拟转换进度
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      updateProgress(i);
    }

    // 设置转换结果
    const result: AmisSchema = {
      type: 'page',
      title: task.name,
      body: {
        type: 'crud',
        api: `/api/${task.sourceId}`,
        columns: [
          { name: 'id', label: 'ID' },
          { name: 'name', label: '名称' },
          { name: 'status', label: '状态' }
        ]
      }
    };

    setConversionTasks(prev => prev.map(item => 
      item.id === task.id 
        ? { ...item, result, status: 'completed' }
        : item
    ));

    setIsConverting(false);
    message.success('转换任务完成！');
  };

  const handlePreviewSchema = (schema: AmisSchema) => {
    setPreviewSchema(schema);
    setIsPreviewModalVisible(true);
  };

  const handleEditMapping = (record: AmisMapping) => {
    setEditingItem(record);
    mappingForm.setFieldsValue({
      name: record.name,
      description: record.description,
      sourceType: record.sourceType,
      targetType: record.targetType,
      sourceId: record.sourceId,
      targetId: record.targetId
    });
    setIsMappingModalVisible(true);
  };

  const handleDeleteMapping = (record: AmisMapping) => {
    setMappings(prev => prev.filter(item => item.id !== record.id));
    message.success('AMIS映射删除成功！');
  };

  const handleDeleteTask = (record: ConversionTask) => {
    setConversionTasks(prev => prev.filter(item => item.id !== record.id));
    message.success('转换任务删除成功！');
  };

  const handleViewDetails = (item: any, type: string) => {
    setSelectedItem({ ...item, type });
    setIsDetailDrawerVisible(true);
  };

  const mappingColumns = [
    {
      title: '映射名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: AmisMapping) => (
        <Space>
          <Tag color={getSourceTypeColor(record.sourceType)}>
            {record.sourceType}
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
      title: '源类型',
      dataIndex: 'sourceType',
      key: 'sourceType',
      render: (type: string) => <Tag color={getSourceTypeColor(type)}>{type}</Tag>,
    },
    {
      title: '目标类型',
      dataIndex: 'targetType',
      key: 'targetType',
      render: (type: string) => <Tag color={getTargetTypeColor(type)}>{type}</Tag>,
    },
    {
      title: '映射规则数量',
      dataIndex: 'mappingRules',
      key: 'mappingRules',
      render: (rules: MappingRule[]) => (
        <Tag color="blue">{rules.length}</Tag>
      ),
    },
    {
      title: '转换规则数量',
      dataIndex: 'transformationRules',
      key: 'transformationRules',
      render: (rules: TransformationRule[]) => (
        <Tag color="green">{rules.length}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      render: (record: AmisMapping) => (
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

  const taskColumns = [
    {
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: ConversionTask) => (
        <Space>
          <Tag color={getSourceTypeColor(record.sourceType)}>
            {record.sourceType}
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
      title: '源类型',
      dataIndex: 'sourceType',
      key: 'sourceType',
      render: (type: string) => <Tag color={getSourceTypeColor(type)}>{type}</Tag>,
    },
    {
      title: '目标类型',
      dataIndex: 'targetType',
      key: 'targetType',
      render: (type: string) => <Tag color={getTargetTypeColor(type)}>{type}</Tag>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: ConversionTask) => (
        <Space>
          <Tag color={getStatusColor(status)}>
            {getStatusText(status)}
          </Tag>
          {status === 'running' && (
            <Progress percent={record.progress} size="small" style={{ width: 60 }} />
          )}
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      render: (record: ConversionTask) => (
        <Space>
          {record.status === 'pending' && (
            <Tooltip title="开始转换">
              <Button 
                type="link" 
                icon={<PlayCircleOutlined />} 
                onClick={() => handleStartConversion(record)}
                loading={isConverting}
              />
            </Tooltip>
          )}
          {record.status === 'completed' && record.result && (
            <Tooltip title="预览结果">
              <Button 
                type="link" 
                icon={<EyeOutlined />} 
                onClick={() => handlePreviewSchema(record.result!)}
              />
            </Tooltip>
          )}
          <Tooltip title="查看详情">
            <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewDetails(record, 'task')} />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm title="确定要删除这个任务吗？" onConfirm={() => handleDeleteTask(record)}>
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const previewColumns = [
    {
      title: '预览名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: AmisPreview) => (
        <Space>
          <Tag color={getSourceTypeColor(record.sourceType)}>
            {record.sourceType}
          </Tag>
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '源类型',
      dataIndex: 'sourceType',
      key: 'sourceType',
      render: (type: string) => <Tag color={getSourceTypeColor(type)}>{type}</Tag>,
    },
    {
      title: '源ID',
      dataIndex: 'sourceId',
      key: 'sourceId',
      render: (id: string) => <Text code>{id}</Text>,
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
      render: (record: AmisPreview) => (
        <Space>
          <Tooltip title="预览">
            <Button 
              type="link" 
              icon={<EyeOutlined />} 
              onClick={() => handlePreviewSchema(record.schema)}
            />
          </Tooltip>
          <Tooltip title="查看详情">
            <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewDetails(record, 'preview')} />
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
            <RocketOutlined style={{ marginRight: '8px' }} />
            AMIS集成
          </Title>
          <Button 
            icon={<ShareAltOutlined />}
            onClick={() => setIsDetailDrawerVisible(true)}
          >
            集成概览
          </Button>
        </div>

        {/* 统计概览 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="AMIS映射数量"
                value={mappings.length}
                prefix={<SwapOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="转换任务数量"
                value={conversionTasks.length}
                prefix={<SyncOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="预览数量"
                value={previews.length}
                prefix={<EyeOutlined />}
                valueStyle={{ color: '#fa8c16' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="完成率"
                value={Math.round((conversionTasks.filter(t => t.status === 'completed').length / conversionTasks.length) * 100) || 0}
                suffix="%"
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>
        
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={[
            {
              key: 'mappings',
              label: 'AMIS映射管理',
              children: (
            <>
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
            </>
              )
            },
            {
              key: 'tasks',
              label: '转换任务管理',
              children: (
            <>
              <div style={{ marginBottom: '16px' }}>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => setIsConversionModalVisible(true)}
                >
                  创建转换任务
                </Button>
              </div>
              
              <Table
                columns={taskColumns}
                dataSource={conversionTasks}
                rowKey="id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
                }}
              />
            </>
              )
            },
            {
              key: 'previews',
              label: 'AMIS预览',
              children: (
            <>
              <div style={{ marginBottom: '16px' }}>
                <Button 
                  type="primary" 
                  icon={<EyeOutlined />}
                  onClick={() => setIsPreviewModalVisible(true)}
                >
                  预览AMIS
                </Button>
              </div>
              
              <Table
                columns={previewColumns}
                dataSource={previews}
                rowKey="id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
                }}
              />
            </>
              )
            },
            {
              key: 'test',
              label: 'AMIS测试',
              children: <SimpleAmisTest />
            }
          ]}
        />
      </Card>

      {/* 添加映射模态框 */}
      <Modal
        title={editingItem ? "编辑AMIS映射" : "添加AMIS映射"}
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

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="sourceType"
                label="源类型"
                rules={[{ required: true, message: '请选择源类型' }]}
              >
                <Select placeholder="请选择源类型">
                  <Option value="entity">实体</Option>
                  <Option value="aggregate">聚合</Option>
                  <Option value="dto">DTO</Option>
                  <Option value="api">API</Option>
                  <Option value="screen">屏幕</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="targetType"
                label="目标类型"
                rules={[{ required: true, message: '请选择目标类型' }]}
              >
                <Select placeholder="请选择目标类型">
                  <Option value="amis-component">AMIS组件</Option>
                  <Option value="amis-page">AMIS页面</Option>
                  <Option value="amis-form">AMIS表单</Option>
                  <Option value="amis-table">AMIS表格</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="sourceId"
                label="源ID"
                rules={[{ required: true, message: '请输入源ID' }]}
              >
                <Input placeholder="请输入源ID" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="targetId"
                label="目标ID"
                rules={[{ required: true, message: '请输入目标ID' }]}
              >
                <Input placeholder="请输入目标ID" />
              </Form.Item>
            </Col>
          </Row>

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

      {/* 创建转换任务模态框 */}
      <Modal
        title="创建转换任务"
        open={isConversionModalVisible}
        onCancel={() => {
          setIsConversionModalVisible(false);
          conversionForm.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Form
          form={conversionForm}
          layout="vertical"
          onFinish={handleAddConversionTask}
        >
          <Form.Item
            name="name"
            label="任务名称"
            rules={[{ required: true, message: '请输入任务名称' }]}
          >
            <Input placeholder="请输入任务名称" />
          </Form.Item>

          <Form.Item
            name="description"
            label="任务描述"
            rules={[{ required: true, message: '请输入任务描述' }]}
          >
            <TextArea rows={3} placeholder="请输入任务描述" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="sourceType"
                label="源类型"
                rules={[{ required: true, message: '请选择源类型' }]}
              >
                <Select placeholder="请选择源类型">
                  <Option value="entity">实体</Option>
                  <Option value="aggregate">聚合</Option>
                  <Option value="dto">DTO</Option>
                  <Option value="api">API</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="targetType"
                label="目标类型"
                rules={[{ required: true, message: '请选择目标类型' }]}
              >
                <Select placeholder="请选择目标类型">
                  <Option value="amis-page">AMIS页面</Option>
                  <Option value="amis-form">AMIS表单</Option>
                  <Option value="amis-table">AMIS表格</Option>
                  <Option value="amis-dashboard">AMIS仪表板</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="sourceId"
                label="源ID"
                rules={[{ required: true, message: '请输入源ID' }]}
              >
                <Input placeholder="请输入源ID" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="mappingId"
                label="映射ID"
                rules={[{ required: true, message: '请选择映射ID' }]}
              >
                <Select placeholder="请选择映射ID">
                  {mappings.map(mapping => (
                    <Option key={mapping.id} value={mapping.id}>
                      {mapping.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => {
                setIsConversionModalVisible(false);
                conversionForm.resetFields();
              }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                创建任务
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* AMIS预览模态框 */}
      <Modal
        title="AMIS可视化预览"
        open={isPreviewModalVisible}
        onCancel={() => {
          setIsPreviewModalVisible(false);
          setPreviewSchema(null);
        }}
        footer={null}
        width={1400}
        style={{ top: 20 }}
        styles={{ body: { height: '80vh', padding: '16px' } }}
      >
        {previewSchema ? (
          <AmisPreview 
            schema={previewSchema}
            title="AMIS预览"
            onClose={() => {
              setIsPreviewModalVisible(false);
              setPreviewSchema(null);
            }}
          />
        ) : (
          <Empty description="暂无预览内容" />
        )}
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
                ...(selectedItem.mappingRules ? [{
                  key: 'mappingRules',
                  label: '映射规则',
                  children: (
                    <List
                      dataSource={selectedItem.mappingRules}
                      renderItem={(rule: MappingRule) => (
                        <List.Item>
                          <Space>
                            <Tag color="blue">{rule.sourceField}</Tag>
                            <Text>→</Text>
                            <Tag color="green">{rule.targetField}</Tag>
                            <Text type="secondary">({rule.dataType})</Text>
                          </Space>
                        </List.Item>
                      )}
                    />
                  )
                }] : []),
                ...(selectedItem.transformationRules ? [{
                  key: 'transformationRules',
                  label: '转换规则',
                  children: (
                    <List
                      dataSource={selectedItem.transformationRules}
                      renderItem={(rule: TransformationRule) => (
                        <List.Item>
                          <Space>
                            <Tag color="orange">{rule.type}</Tag>
                            <Text>{rule.name}</Text>
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

export default AmisIntegration;
