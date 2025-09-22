import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Avatar, 
  Tag, 
  Space, 
  Typography, 
  message, 
  Popconfirm,
  Tooltip,
  Badge
} from 'antd';
import { 
  PlusOutlined, 
  UserOutlined, 
  EditOutlined, 
  DeleteOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined,
  CrownOutlined,
  SafetyOutlined,
  CodeOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { ProjectMetadata } from '@types';

const { Title, Text } = Typography;
const { Option } = Select;

interface ProjectMembersProps {
  project: ProjectMetadata;
  onAddMember: (member: any) => void;
  onUpdateMember: (memberId: string, updates: any) => void;
  onRemoveMember: (memberId: string) => void;
}

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'developer' | 'viewer';
  avatar?: string;
  phone?: string;
  department?: string;
  joinDate: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'pending';
}

const ProjectMembers: React.FC<ProjectMembersProps> = ({
  project,
  onAddMember,
  onUpdateMember,
  onRemoveMember
}) => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  // 模拟成员数据
  const mockMembers: Member[] = [
    {
      id: '1',
      name: '张三',
      email: 'zhangsan@example.com',
      role: 'owner',
      phone: '13800138001',
      department: '技术部',
      joinDate: '2024-01-01',
      lastActive: '2024-01-20',
      status: 'active'
    },
    {
      id: '2',
      name: '李四',
      email: 'lisi@example.com',
      role: 'developer',
      phone: '13800138002',
      department: '技术部',
      joinDate: '2024-01-05',
      lastActive: '2024-01-19',
      status: 'active'
    },
    {
      id: '3',
      name: '王五',
      email: 'wangwu@example.com',
      role: 'admin',
      phone: '13800138003',
      department: '产品部',
      joinDate: '2024-01-10',
      lastActive: '2024-01-18',
      status: 'active'
    },
    {
      id: '4',
      name: '赵六',
      email: 'zhaoliu@example.com',
      role: 'viewer',
      phone: '13800138004',
      department: '测试部',
      joinDate: '2024-01-15',
      lastActive: '2024-01-17',
      status: 'pending'
    }
  ];

  const [members, setMembers] = useState<Member[]>(mockMembers);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return <CrownOutlined style={{ color: '#ff4d4f' }} />;
      case 'admin': return <SafetyOutlined style={{ color: '#fa8c16' }} />;
      case 'developer': return <CodeOutlined style={{ color: '#1890ff' }} />;
      case 'viewer': return <EyeOutlined style={{ color: '#52c41a' }} />;
      default: return <UserOutlined />;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'inactive': return 'orange';
      case 'pending': return 'blue';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '活跃';
      case 'inactive': return '非活跃';
      case 'pending': return '待确认';
      default: return '未知';
    }
  };

  const handleAddMember = async (values: any) => {
    try {
      const newMember: Member = {
        id: Date.now().toString(),
        name: values.name,
        email: values.email,
        role: values.role,
        phone: values.phone,
        department: values.department,
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString().split('T')[0],
        status: 'pending'
      };

      setMembers(prev => [...prev, newMember]);
      setIsAddModalVisible(false);
      form.resetFields();
      message.success('成员添加成功！');
      
      if (onAddMember) {
        onAddMember(newMember);
      }
    } catch (error) {
      message.error('添加成员失败！');
    }
  };

  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    editForm.setFieldsValue(member);
    setIsEditModalVisible(true);
  };

  const handleUpdateMember = async (values: any) => {
    try {
      if (editingMember) {
        const updatedMembers = members.map(member => 
          member.id === editingMember.id 
            ? { ...member, ...values }
            : member
        );
        setMembers(updatedMembers);
        setIsEditModalVisible(false);
        setEditingMember(null);
        editForm.resetFields();
        message.success('成员信息更新成功！');
        
        if (onUpdateMember) {
          onUpdateMember(editingMember.id, values);
        }
      }
    } catch (error) {
      message.error('更新成员信息失败！');
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      setMembers(prev => prev.filter(member => member.id !== memberId));
      message.success('成员移除成功！');
      
      if (onRemoveMember) {
        onRemoveMember(memberId);
      }
    } catch (error) {
      message.error('移除成员失败！');
    }
  };

  const columns = [
    {
      title: '成员',
      key: 'member',
      render: (record: Member) => (
        <Space>
          <Avatar 
            size={40} 
            icon={<UserOutlined />}
            src={record.avatar}
          />
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.name}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.email}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Space>
          {getRoleIcon(role)}
          <Tag color={getRoleColor(role)}>
            {getRoleText(role)}
          </Tag>
        </Space>
      ),
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge 
          status={status === 'active' ? 'success' : status === 'pending' ? 'processing' : 'default'} 
          text={getStatusText(status)}
        />
      ),
    },
    {
      title: '加入时间',
      dataIndex: 'joinDate',
      key: 'joinDate',
    },
    {
      title: '最后活跃',
      dataIndex: 'lastActive',
      key: 'lastActive',
    },
    {
      title: '操作',
      key: 'actions',
      render: (record: Member) => (
        <Space>
          <Tooltip title="编辑成员">
            <Button 
              type="link" 
              icon={<EditOutlined />}
              onClick={() => handleEditMember(record)}
            />
          </Tooltip>
          <Tooltip title="移除成员">
            <Popconfirm
              title="确定要移除这个成员吗？"
              onConfirm={() => handleRemoveMember(record.id)}
              disabled={record.role === 'owner'}
            >
              <Button 
                type="link" 
                danger 
                icon={<DeleteOutlined />}
                disabled={record.role === 'owner'}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const roleStats = {
    owner: members.filter(m => m.role === 'owner').length,
    admin: members.filter(m => m.role === 'admin').length,
    developer: members.filter(m => m.role === 'developer').length,
    viewer: members.filter(m => m.role === 'viewer').length,
  };

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Title level={2} style={{ margin: 0 }}>
            <TeamOutlined style={{ marginRight: '8px' }} />
            项目成员管理
          </Title>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setIsAddModalVisible(true)}
          >
            添加成员
          </Button>
        </div>

        {/* 成员统计 */}
        <Card size="small" style={{ marginBottom: '24px' }}>
          <Space size="large">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff4d4f' }}>
                {roleStats.owner}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>项目负责人</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fa8c16' }}>
                {roleStats.admin}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>管理员</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                {roleStats.developer}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>开发者</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                {roleStats.viewer}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>观察者</div>
            </div>
          </Space>
        </Card>

        <Table
          columns={columns}
          dataSource={members}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
          }}
        />
      </Card>

      {/* 添加成员模态框 */}
      <Modal
        title="添加新成员"
        open={isAddModalVisible}
        onCancel={() => {
          setIsAddModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
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
            name="phone"
            label="手机号码"
          >
            <Input placeholder="请输入手机号码" />
          </Form.Item>

          <Form.Item
            name="department"
            label="部门"
          >
            <Input placeholder="请输入部门" />
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

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => {
                setIsAddModalVisible(false);
                form.resetFields();
              }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                添加成员
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 编辑成员模态框 */}
      <Modal
        title="编辑成员信息"
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setEditingMember(null);
          editForm.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleUpdateMember}
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
            name="phone"
            label="手机号码"
          >
            <Input placeholder="请输入手机号码" />
          </Form.Item>

          <Form.Item
            name="department"
            label="部门"
          >
            <Input placeholder="请输入部门" />
          </Form.Item>

          <Form.Item
            name="role"
            label="角色权限"
            rules={[{ required: true, message: '请选择角色权限' }]}
          >
            <Select placeholder="请选择角色权限">
              <Option value="owner">项目负责人</Option>
              <Option value="admin">管理员</Option>
              <Option value="developer">开发者</Option>
              <Option value="viewer">观察者</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
          >
            <Select placeholder="请选择状态">
              <Option value="active">活跃</Option>
              <Option value="inactive">非活跃</Option>
              <Option value="pending">待确认</Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => {
                setIsEditModalVisible(false);
                setEditingMember(null);
                editForm.resetFields();
              }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                保存修改
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectMembers;




