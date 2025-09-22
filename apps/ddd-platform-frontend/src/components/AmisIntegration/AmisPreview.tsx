import React, { useEffect, useRef, useState } from 'react';
import { Card, Tabs, Button, Space, Alert, message, Spin } from 'antd';
import { EyeOutlined, CodeOutlined, CopyOutlined, DownloadOutlined } from '@ant-design/icons';
import { render as amisRender } from 'amis';
import 'amis/lib/themes/antd.css';
import 'amis/lib/themes/default.css';
import type { AmisSchema } from '../../types';

// 尝试使用AMIS的React组件
let AmisRenderer: any = null;
try {
  AmisRenderer = require('amis').Renderer;
} catch (e) {
  console.log('AMIS Renderer not available, using render function');
}

// 尝试使用AMIS的React组件方式
let AmisComponent: any = null;
try {
  AmisComponent = require('amis').ReactRenderer;
} catch (e) {
  console.log('AMIS ReactRenderer not available');
}

interface AmisPreviewProps {
  schema: AmisSchema;
  title?: string;
  onClose?: () => void;
}

const AmisPreview: React.FC<AmisPreviewProps> = ({ schema, title = 'AMIS预览', onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('preview');
  const previewRef = useRef<HTMLDivElement>(null);
  const amisInstanceRef = useRef<any>(null);

  // 渲染AMIS组件
  const renderAmis = async (amisSchema: AmisSchema) => {
    if (!previewRef.current) return;

    setLoading(true);
    setError(null);

    try {
      // 清空之前的渲染
      previewRef.current.innerHTML = '';
      if (amisInstanceRef.current) {
        amisInstanceRef.current = null;
      }

      // 添加调试信息
      console.log('渲染AMIS Schema:', amisSchema);

      // 尝试使用最简单的Schema进行测试
      const testSchema = {
        type: 'page',
        title: '测试页面',
        body: {
          type: 'tpl',
          tpl: 'Hello AMIS! 这是一个测试页面。'
        }
      };

      console.log('使用测试Schema:', testSchema);

      // 先显示测试内容
      previewRef.current.innerHTML = '<div style="padding: 20px; border: 1px solid #ccc; background: #f9f9f9; min-height: 200px;">Hello AMIS! 这是一个测试页面。</div>';
      
      // 等待一下再尝试AMIS渲染
      setTimeout(() => {
        try {
          console.log('开始尝试AMIS渲染...');
          
          // 清空容器，准备AMIS渲染
          previewRef.current.innerHTML = '';
          
          // 尝试不同的AMIS渲染方式
          const amisInstance = amisRender(testSchema, previewRef.current, {
            // AMIS配置
            theme: 'antd',
            locale: 'zh-CN',
            // 禁用一些功能以确保预览模式
            disableValidateApi: true,
            // 添加更多配置
            env: {
              // 禁用一些环境检查
              disableValidateApi: true,
              // 添加基础环境
              fetcher: () => Promise.resolve({}),
              notify: () => {},
              alert: () => {},
              confirm: () => Promise.resolve(true)
            }
          });
          
          amisInstanceRef.current = amisInstance;
          console.log('AMIS渲染完成');
          
          // 检查渲染结果
          setTimeout(() => {
            if (previewRef.current && previewRef.current.children.length === 0) {
              console.warn('AMIS渲染后仍然没有内容，回退到测试内容');
              previewRef.current.innerHTML = '<div style="padding: 20px; border: 1px solid #ccc; background: #f9f9f9; min-height: 200px;">Hello AMIS! 这是一个测试页面。<br/>AMIS渲染成功但内容为空，可能是样式问题。</div>';
            } else {
              console.log('AMIS渲染成功，内容长度:', previewRef.current?.children.length);
            }
          }, 200);
          
        } catch (renderError) {
          console.error('AMIS渲染错误:', renderError);
          // 如果AMIS渲染失败，显示错误信息
          previewRef.current.innerHTML = '<div style="padding: 20px; border: 1px solid #ccc; background: #f9f9f9; min-height: 200px;">Hello AMIS! 这是一个测试页面。<br/>AMIS渲染失败: ' + renderError.message + '</div>';
        }
      }, 100);
      
      // 检查渲染结果
      setTimeout(() => {
        if (previewRef.current && previewRef.current.children.length === 0) {
          console.warn('AMIS渲染后没有内容');
          setError('AMIS组件渲染后没有内容，请检查Schema格式');
        } else {
          console.log('AMIS渲染成功，内容长度:', previewRef.current?.children.length);
          message.success('AMIS组件渲染成功！');
        }
      }, 100);

    } catch (err) {
      console.error('AMIS渲染失败:', err);
      setError(err instanceof Error ? err.message : '渲染失败');
      message.error('AMIS组件渲染失败！');
    } finally {
      setLoading(false);
    }
  };

  // 复制JSON到剪贴板
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
      message.success('JSON已复制到剪贴板！');
    } catch (err) {
      message.error('复制失败！');
    }
  };

  // 下载JSON文件
  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(schema, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title || 'amis-schema'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    message.success('JSON文件已下载！');
  };

  // 组件挂载时渲染
  useEffect(() => {
    if (schema) {
      renderAmis(schema);
    }
  }, [schema]);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      if (amisInstanceRef.current) {
        amisInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button 
            type="primary" 
            icon={<EyeOutlined />}
            onClick={() => setActiveTab('preview')}
          >
            可视化预览
          </Button>
          <Button 
            icon={<CodeOutlined />}
            onClick={() => setActiveTab('code')}
          >
            JSON代码
          </Button>
          <Button 
            icon={<CopyOutlined />}
            onClick={copyToClipboard}
          >
            复制JSON
          </Button>
          <Button 
            icon={<DownloadOutlined />}
            onClick={downloadJson}
          >
            下载JSON
          </Button>
        </Space>
      </div>

      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        items={[
          {
            key: 'preview',
            label: '可视化预览',
            children: (
          <Card 
            style={{ 
              height: '100%', 
              minHeight: '500px',
              display: 'flex',
              flexDirection: 'column'
            }}
            styles={{ 
              body: { 
                flex: 1, 
                padding: '16px',
                display: 'flex',
                flexDirection: 'column'
              }
            }}
          >
            {loading && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '200px' 
              }}>
                <Spin size="large" tip="正在渲染AMIS组件..." />
              </div>
            )}
            
            {error && (
              <Alert
                message="渲染错误"
                description={error}
                type="error"
                showIcon
                style={{ marginBottom: '16px' }}
              />
            )}
            
            <div 
              ref={previewRef}
              style={{ 
                flex: 1,
                minHeight: '400px',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
                padding: '16px',
                backgroundColor: '#fafafa'
              }}
            />
          </Card>
            )
          },
          {
            key: 'code',
            label: 'JSON代码',
            children: (
          <Card style={{ height: '100%', minHeight: '500px' }}>
            <Alert
              message="AMIS Schema JSON"
              description="这是生成的AMIS配置JSON，您可以直接复制使用或进行修改。"
              type="info"
              showIcon
              style={{ marginBottom: '16px' }}
            />
            <pre style={{ 
              backgroundColor: '#f5f5f5',
              padding: '16px',
              borderRadius: '6px',
              overflow: 'auto',
              maxHeight: '600px',
              fontFamily: 'Monaco, Consolas, "Courier New", monospace',
              fontSize: '12px',
              lineHeight: '1.5'
            }}>
              {JSON.stringify(schema, null, 2)}
            </pre>
          </Card>
            )
          }
        ]}
      />
    </div>
  );
};

export default AmisPreview;
