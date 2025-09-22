import React, { useState } from 'react';
import { Card, Form, Input, Button, Select, Switch, Divider, Typography, Space, message, Tabs, Upload, Avatar, List, Tag } from 'antd';
import { 
  SaveOutlined, 
  UploadOutlined, 
  UserOutlined, 
  SettingOutlined,
  TeamOutlined,
  FileTextOutlined,
  SecurityScanOutlined
} from '@ant-design/icons';
import { ProjectMetadata } from '@types';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

interface ProjectSettingsProps {
  project: ProjectMetadata;
  onSave: (project: Partial<ProjectMetadata>) => void;
  onAddMember: (member: any) => void;
  onRemoveMember: (memberId: string) => void;
}

const ProjectSettings: React.FC<ProjectSettingsProps> = ({
  project,
  onSave,
  onAddMember,
  onRemoveMember
}) => {
  const [form] = Form.useForm();
  const [memberForm] = Form.useForm();
  const [isAddingMember, setIsAddingMember] = useState(false);

  const handleSave = async (values: any) => {
    try {
      await onSave(values);
      message.success('项目设置保存成功！');
    } catch (error) {
      message.error('保存失败，请重试！');
    }
  };

  const handleAddMember = async (values: any) => {
    try {
      await onAddMember(values);
      memberForm.resetFields();
      setIsAddingMember(false);
      message.success('成员添加成功！');
    } catch (error) {
      message.error('添加成员失败！');
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'red';
      case 'admin': return 'orange';
      case 'developer': return 'blue';
      case 'viewer': return 'green';
      default: return 'default';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'owner': return '项目负责人';
      case 'admin': return '管理员';
      case 'developer': return '开发者';
      case 'viewer': return '观察者';
      default: return '未知';
    }
  };

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <Card>
        <Title level={2}>
          <SettingOutlined style={{ marginRight: '8px' }} />
          项目设置
        </Title>
        
        <Tabs defaultActiveKey="basic">
          <TabPane tab="基本信息" key="basic">
            <Form
              form={form}
              layout="vertical"
              initialValues={project}
              onFinish={handleSave}
              style={{ maxWidth: '600px' }}
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
                <TextArea 
                  rows={4} 
                  placeholder="请输入项目描述"
                />
              </Form.Item>

              <Form.Item
                name="status"
                label="项目状态"
              >
                <Select>
                  <Option value="active">进行中</Option>
                  <Option value="inactive">暂停</Option>
                  <Option value="archived">已归档</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="visibility"
                label="项目可见性"
                valuePropName="checked"
              >
                <Switch 
                  checkedChildren="公开" 
                  unCheckedChildren="私有"
                />
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                    保存设置
                  </Button>
                  <Button>重置</Button>
                </Space>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="成员管理" key="members">
            <div style={{ marginBottom: '16px' }}>
              <Button 
                type="primary" 
                icon={<UserOutlined />}
                onClick={() => setIsAddingMember(true)}
              >
                添加成员
              </Button>
            </div>

            <List
              dataSource={project.members}
              renderItem={(member) => (
                <List.Item
                  actions={[
                    <Button 
                      type="link" 
                      danger
                      onClick={() => onRemoveMember(member.id)}
                      disabled={member.role === 'owner'}
                    >
                      移除
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={
                      <Space>
                        <Text strong>{member.name}</Text>
                        <Tag color={getRoleColor(member.role)}>
                          {getRoleText(member.role)}
                        </Tag>
                      </Space>
                    }
                    description={`ID: ${member.id}`}
                  />
                </List.Item>
              )}
            />

            {isAddingMember && (
              <Card 
                title="添加新成员" 
                style={{ marginTop: '16px' }}
                extra={
                  <Button onClick={() => setIsAddingMember(false)}>
                    取消
                  </Button>
                }
              >
                <Form
                  form={memberForm}
                  layout="vertical"
                  onFinish={handleAddMember}
                >
                  <Form.Item
                    name="name"
                    label="成员姓名"
                    rules={[{ required: true, message: '请输入成员姓名' }]}
                  >
                    <Input placeholder="请输入成员姓名" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="邮箱地址"
                    rules={[
                      { required: true, message: '请输入邮箱地址' },
                      { type: 'email', message: '请输入有效的邮箱地址' }
                    ]}
                  >
                    <Input placeholder="请输入邮箱地址" />
                  </Form.Item>

                  <Form.Item
                    name="role"
                    label="角色权限"
                    rules={[{ required: true, message: '请选择角色权限' }]}
                  >
                    <Select placeholder="请选择角色权限">
                      <Option value="admin">管理员</Option>
                      <Option value="developer">开发者</Option>
                      <Option value="viewer">观察者</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item>
                    <Space>
                      <Button type="primary" htmlType="submit">
                        添加成员
                      </Button>
                      <Button onClick={() => setIsAddingMember(false)}>
                        取消
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </Card>
            )}
          </TabPane>

          <TabPane tab="项目模板" key="templates">
            <Card title="项目模板管理">
              <Paragraph>
                项目模板可以帮助您快速创建具有预定义结构和配置的新项目。
              </Paragraph>
              
              <div style={{ marginBottom: '16px' }}>
                <Button type="primary" icon={<UploadOutlined />}>
                  导入模板
                </Button>
                <Button style={{ marginLeft: '8px' }}>
                  导出模板
                </Button>
              </div>

              <List
                dataSource={[
                  { name: '电商系统模板', description: '包含用户、商品、订单等核心领域', version: '1.0.0' },
                  { name: 'CRM系统模板', description: '包含客户、销售、服务等核心领域', version: '1.0.0' },
                  { name: 'ERP系统模板', description: '包含财务、库存、采购等核心领域', version: '1.0.0' }
                ]}
                renderItem={(template) => (
                  <List.Item
                    actions={[
                      <Button type="link">使用</Button>,
                      <Button type="link">编辑</Button>,
                      <Button type="link" danger>删除</Button>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<FileTextOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}
                      title={template.name}
                      description={template.description}
                    />
                    <div>
                      <Tag color="blue">v{template.version}</Tag>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </TabPane>

          <TabPane tab="安全设置" key="security">
            <Card title="安全配置">
              <Form layout="vertical">
                <Form.Item
                  name="requireAuth"
                  label="访问控制"
                  valuePropName="checked"
                >
                  <Switch 
                    checkedChildren="需要认证" 
                    unCheckedChildren="公开访问"
                  />
                </Form.Item>

                <Form.Item
                  name="allowGuestAccess"
                  label="访客访问"
                  valuePropName="checked"
                >
                  <Switch 
                    checkedChildren="允许" 
                    unCheckedChildren="禁止"
                  />
                </Form.Item>

                <Form.Item
                  name="sessionTimeout"
                  label="会话超时时间（分钟）"
                >
                  <Select defaultValue="30">
                    <Option value="15">15分钟</Option>
                    <Option value="30">30分钟</Option>
                    <Option value="60">1小时</Option>
                    <Option value="120">2小时</Option>
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" icon={<SecurityScanOutlined />}>
                    保存安全设置
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ProjectSettings;




