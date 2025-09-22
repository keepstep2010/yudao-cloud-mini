import React from 'react';
import { Card, Typography } from 'antd';
import { RocketOutlined } from '@ant-design/icons';

const { Title } = Typography;

const SimpleTest: React.FC = () => {
  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <Card>
        <Title level={2}>
          <RocketOutlined style={{ marginRight: '8px' }} />
          AMIS集成 - 测试页面
        </Title>
        <p>这是一个简化的测试页面，用于验证路由是否正常工作。</p>
      </Card>
    </div>
  );
};

export default SimpleTest;



