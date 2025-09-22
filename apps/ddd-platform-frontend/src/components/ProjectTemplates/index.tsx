import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Button, 
  Typography, 
  Space, 
  Tag, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Upload, 
  message, 
  List, 
  Avatar,
  Progress,
  Divider,
  Tabs
} from 'antd';
import { 
  PlusOutlined, 
  UploadOutlined, 
  DownloadOutlined, 
  EditOutlined, 
  DeleteOutlined,
  FileTextOutlined,
  EyeOutlined,
  CopyOutlined,
  StarOutlined,
  ShareAltOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  downloads: number;
  rating: number;
  tags: string[];
  domains: number;
  boundedContexts: number;
  aggregates: number;
  entities: number;
  screens: number;
  isPublic: boolean;
  isOfficial: boolean;
}

const ProjectTemplates: React.FC = () => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [form] = Form.useForm();

  // 模拟模板数据
  const mockTemplates: Template[] = [
    {
      id: '1',
      name: '电商系统模板',
      description: '包含用户管理、商品管理、订单管理、支付管理等核心领域的完整电商系统模板',
      category: '电商',
      version: '2.1.0',
      author: 'DDD团队',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      downloads: 1250,
      rating: 4.8,
      tags: ['电商', 'B2C', '支付', '库存'],
      domains: 5,
      boundedContexts: 12,
      aggregates: 25,
      entities: 80,
      screens: 20,
      isPublic: true,
      isOfficial: true
    },
    {
      id: '2',
      name: 'CRM客户关系管理',
      description: '客户管理、销售管理、服务管理、营销管理等CRM核心功能模板',
      category: 'CRM',
      version: '1.5.0',
      author: '业务团队',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-12',
      downloads: 890,
      rating: 4.6,
      tags: ['CRM', '客户', '销售', '服务'],
      domains: 4,
      boundedContexts: 8,
      aggregates: 15,
      entities: 45,
      screens: 15,
      isPublic: true,
      isOfficial: false
    },
    {
      id: '3',
      name: 'ERP企业资源规划',
      description: '财务管理、人力资源、供应链管理、生产管理等ERP核心模块模板',
      category: 'ERP',
      version: '3.0.0',
      author: '企业团队',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-18',
      downloads: 2100,
      rating: 4.9,
      tags: ['ERP', '财务', 'HR', '供应链'],
      domains: 8,
      boundedContexts: 20,
      aggregates: 40,
      entities: 120,
      screens: 35,
      isPublic: true,
      isOfficial: true
    },
    {
      id: '4',
      name: '内容管理系统',
      description: '文章管理、用户管理、权限管理、评论系统等内容管理核心功能',
      category: 'CMS',
      version: '1.2.0',
      author: '内容团队',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-16',
      downloads: 650,
      rating: 4.4,
      tags: ['CMS', '内容', '文章', '用户'],
      domains: 3,
      boundedContexts: 6,
      aggregates: 10,
      entities: 25,
      screens: 12,
      isPublic: true,
      isOfficial: false
    }
  ];

  const [templates, setTemplates] = useState<Template[]>(mockTemplates);

  const handleCreateTemplate = async (values: any) => {
    try {
      const newTemplate: Template = {
        id: Date.now().toString(),
        name: values.name,
        description: values.description,
        category: values.category,
        version: '1.0.0',
        author: '当前用户',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        downloads: 0,
        rating: 0,
        tags: values.tags ? values.tags.split(',').map((tag: string) => tag.trim()) : [],
        domains: 0,
        boundedContexts: 0,
        aggregates: 0,
        entities: 0,
        screens: 0,
        isPublic: values.isPublic || false,
        isOfficial: false
      };

      setTemplates(prev => [newTemplate, ...prev]);
      setIsCreateModalVisible(false);
      form.resetFields();
      message.success('模板创建成功！');
    } catch (error) {
      message.error('模板创建失败！');
    }
  };

  const handleUseTemplate = (template: Template) => {
    message.success(`正在使用模板：${template.name}`);
    // 这里可以跳转到项目创建页面，并预填充模板数据
  };

  const handlePreviewTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setIsPreviewModalVisible(true);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      '电商': 'blue',
      'CRM': 'green',
      'ERP': 'purple',
      'CMS': 'orange',
      '其他': 'default'
    };
    return colors[category] || 'default';
  };

  const categories = ['电商', 'CRM', 'ERP', 'CMS', '其他'];

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Title level={2} style={{ margin: 0 }}>
            <FileTextOutlined style={{ marginRight: '8px' }} />
            项目模板管理
          </Title>
          <Space>
            <Button icon={<UploadOutlined />}>
              导入模板
            </Button>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setIsCreateModalVisible(true)}
            >
              创建模板
            </Button>
          </Space>
        </div>

        <Tabs defaultActiveKey="all">
          <TabPane tab="全部模板" key="all">
            <Row gutter={[16, 16]}>
              {templates.map((template) => (
                <Col span={8} key={template.id}>
                  <Card
                    hoverable
                    style={{ height: '400px' }}
                    actions={[
                      <EyeOutlined key="preview" onClick={() => handlePreviewTemplate(template)} />,
                      <CopyOutlined key="use" onClick={() => handleUseTemplate(template)} />,
                      <DownloadOutlined key="download" />
                    ]}
                  >
                    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                      <Avatar 
                        size={48} 
                        icon={<FileTextOutlined />}
                        style={{ backgroundColor: '#1890ff' }}
                      />
                    </div>
                    
                    <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                      <Title level={4} style={{ margin: 0 }}>
                        {template.name}
                        {template.isOfficial && (
                          <StarOutlined style={{ color: '#faad14', marginLeft: '4px' }} />
                        )}
                      </Title>
                    </div>
                    
                    <Paragraph 
                      ellipsis={{ rows: 2 }} 
                      style={{ textAlign: 'center', marginBottom: '12px' }}
                    >
                      {template.description}
                    </Paragraph>

                    <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                      <Tag color={getCategoryColor(template.category)}>
                        {template.category}
                      </Tag>
                      <Tag color="blue">v{template.version}</Tag>
                      {template.isPublic && <Tag color="green">公开</Tag>}
                    </div>

                    <Row gutter={8} style={{ marginBottom: '8px' }}>
                      <Col span={12}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          领域: {template.domains}
                        </Text>
                      </Col>
                      <Col span={12}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          实体: {template.entities}
                        </Text>
                      </Col>
                    </Row>

                    <Row gutter={8} style={{ marginBottom: '8px' }}>
                      <Col span={12}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          限界上下文: {template.boundedContexts}
                        </Text>
                      </Col>
                      <Col span={12}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          屏幕: {template.screens}
                        </Text>
                      </Col>
                    </Row>

                    <Divider style={{ margin: '8px 0' }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text type="secondary" style={{ fontSize: '11px' }}>
                        <DownloadOutlined /> {template.downloads}
                      </Text>
                      <Text type="secondary" style={{ fontSize: '11px' }}>
                        <StarOutlined /> {template.rating}
                      </Text>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPane>

          {categories.map(category => (
            <TabPane tab={category} key={category}>
              <Row gutter={[16, 16]}>
                {templates
                  .filter(template => template.category === category)
                  .map((template) => (
                    <Col span={8} key={template.id}>
                      <Card
                        hoverable
                        style={{ height: '400px' }}
                        actions={[
                          <EyeOutlined key="preview" onClick={() => handlePreviewTemplate(template)} />,
                          <CopyOutlined key="use" onClick={() => handleUseTemplate(template)} />,
                          <DownloadOutlined key="download" />
                        ]}
                      >
                        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                          <Avatar 
                            size={48} 
                            icon={<FileTextOutlined />}
                            style={{ backgroundColor: '#1890ff' }}
                          />
                        </div>
                        
                        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                          <Title level={4} style={{ margin: 0 }}>
                            {template.name}
                            {template.isOfficial && (
                              <StarOutlined style={{ color: '#faad14', marginLeft: '4px' }} />
                            )}
                          </Title>
                        </div>
                        
                        <Paragraph 
                          ellipsis={{ rows: 2 }} 
                          style={{ textAlign: 'center', marginBottom: '12px' }}
                        >
                          {template.description}
                        </Paragraph>

                        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                          <Tag color={getCategoryColor(template.category)}>
                            {template.category}
                          </Tag>
                          <Tag color="blue">v{template.version}</Tag>
                          {template.isPublic && <Tag color="green">公开</Tag>}
                        </div>

                        <Row gutter={8} style={{ marginBottom: '8px' }}>
                          <Col span={12}>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              领域: {template.domains}
                            </Text>
                          </Col>
                          <Col span={12}>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              实体: {template.entities}
                            </Text>
                          </Col>
                        </Row>

                        <Row gutter={8} style={{ marginBottom: '8px' }}>
                          <Col span={12}>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              限界上下文: {template.boundedContexts}
                            </Text>
                          </Col>
                          <Col span={12}>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              屏幕: {template.screens}
                            </Text>
                          </Col>
                        </Row>

                        <Divider style={{ margin: '8px 0' }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Text type="secondary" style={{ fontSize: '11px' }}>
                            <DownloadOutlined /> {template.downloads}
                          </Text>
                          <Text type="secondary" style={{ fontSize: '11px' }}>
                            <StarOutlined /> {template.rating}
                          </Text>
                        </div>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </TabPane>
          ))}
        </Tabs>
      </Card>

      {/* 创建模板模态框 */}
      <Modal
        title="创建新模板"
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
          onFinish={handleCreateTemplate}
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
            <TextArea 
              rows={4} 
              placeholder="请输入模板描述"
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="模板分类"
            rules={[{ required: true, message: '请选择模板分类' }]}
          >
            <Select placeholder="请选择模板分类">
              {categories.map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="tags"
            label="标签"
          >
            <Input placeholder="请输入标签，用逗号分隔" />
          </Form.Item>

          <Form.Item
            name="isPublic"
            label="公开模板"
            valuePropName="checked"
          >
            <input type="checkbox" />
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
                创建模板
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 模板预览模态框 */}
      <Modal
        title="模板预览"
        open={isPreviewModalVisible}
        onCancel={() => setIsPreviewModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsPreviewModalVisible(false)}>
            关闭
          </Button>,
          <Button key="use" type="primary" onClick={() => {
            if (selectedTemplate) {
              handleUseTemplate(selectedTemplate);
              setIsPreviewModalVisible(false);
            }
          }}>
            使用此模板
          </Button>
        ]}
        width={800}
      >
        {selectedTemplate && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Avatar 
                size={64} 
                icon={<FileTextOutlined />}
                style={{ backgroundColor: '#1890ff' }}
              />
              <Title level={3} style={{ marginTop: '16px' }}>
                {selectedTemplate.name}
                {selectedTemplate.isOfficial && (
                  <StarOutlined style={{ color: '#faad14', marginLeft: '8px' }} />
                )}
              </Title>
              <Paragraph>{selectedTemplate.description}</Paragraph>
            </div>

            <Row gutter={16}>
              <Col span={12}>
                <Card size="small" title="基本信息">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div><Text strong>版本：</Text>{selectedTemplate.version}</div>
                    <div><Text strong>作者：</Text>{selectedTemplate.author}</div>
                    <div><Text strong>分类：</Text>
                      <Tag color={getCategoryColor(selectedTemplate.category)}>
                        {selectedTemplate.category}
                      </Tag>
                    </div>
                    <div><Text strong>创建时间：</Text>{selectedTemplate.createdAt}</div>
                    <div><Text strong>更新时间：</Text>{selectedTemplate.updatedAt}</div>
                  </Space>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="统计信息">
                  <Row gutter={8}>
                    <Col span={12}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                          {selectedTemplate.domains}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>领域</div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                          {selectedTemplate.entities}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>实体</div>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={8} style={{ marginTop: '16px' }}>
                    <Col span={12}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fa8c16' }}>
                          {selectedTemplate.boundedContexts}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>限界上下文</div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#722ed1' }}>
                          {selectedTemplate.screens}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>屏幕</div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>

            <Card size="small" title="标签" style={{ marginTop: '16px' }}>
              <Space wrap>
                {selectedTemplate.tags.map(tag => (
                  <Tag key={tag} color="blue">{tag}</Tag>
                ))}
              </Space>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProjectTemplates;




