import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const Screen: React.FC = () => {
  return (
    <div>
      <Title level={2}>界面设计</Title>
      <Card>
        <p>界面设计功能开发中...</p>
      </Card>
    </div>
  );
};

export default Screen;


