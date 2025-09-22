import React, { useEffect, useRef } from 'react';
import { Card, Alert } from 'antd';
import 'amis/lib/themes/antd.css';
import 'amis/lib/themes/default.css';

// 尝试使用AMIS的React组件
let AmisRenderer: any = null;
try {
  AmisRenderer = require('amis').Renderer;
} catch (e) {
  console.log('AMIS Renderer not available');
}

// 尝试使用AMIS的React组件方式
let AmisComponent: any = null;
try {
  AmisComponent = require('amis').ReactRenderer;
} catch (e) {
  console.log('AMIS ReactRenderer not available');
}

const SimpleAmisTest: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 最简单的AMIS测试
    const testSchema = {
      type: 'page',
      title: 'AMIS测试页面',
      body: {
        type: 'tpl',
        tpl: 'Hello AMIS! 这是一个测试页面。'
      }
    };

    console.log('SimpleAmisTest: 开始渲染AMIS');

    try {
      // 尝试使用AMIS的render函数
      const { render } = require('amis');
      
      // 清空容器
      containerRef.current.innerHTML = '';
      
      // 尝试使用不同的渲染方式
      console.log('SimpleAmisTest: 尝试AMIS渲染...');
      
      const amisInstance = render(testSchema, containerRef.current, {
        theme: 'antd',
        locale: 'zh-CN',
        disableValidateApi: true,
        env: {
          disableValidateApi: true,
          fetcher: () => Promise.resolve({}),
          notify: () => {},
          alert: () => {},
          confirm: () => Promise.resolve(true)
        }
      });

      console.log('SimpleAmisTest: AMIS渲染完成', amisInstance);
      
      // 强制添加AMIS样式类
      if (containerRef.current) {
        containerRef.current.classList.add('amis-scope');
        containerRef.current.style.cssText = `
          min-height: 200px;
          border: 1px solid #d9d9d9;
          border-radius: 6px;
          padding: 16px;
          background-color: #fafafa;
        `;
      }
      
      // 尝试使用React组件方式
      if (AmisComponent) {
        console.log('SimpleAmisTest: 尝试使用React组件方式');
        try {
          const React = require('react');
          const ReactDOM = require('react-dom/client');
          
          // 创建React根节点
          const root = ReactDOM.createRoot(containerRef.current);
          root.render(React.createElement(AmisComponent, {
            schema: testSchema,
            theme: 'antd',
            locale: 'zh-CN'
          }));
          
          console.log('SimpleAmisTest: React组件渲染完成');
        } catch (reactError) {
          console.error('SimpleAmisTest: React组件渲染失败:', reactError);
        }
      }

      // 检查渲染结果
      setTimeout(() => {
        if (containerRef.current && containerRef.current.children.length === 0) {
          console.warn('SimpleAmisTest: AMIS渲染后没有内容');
          containerRef.current.innerHTML = '<div style="padding: 20px; color: red;">AMIS渲染失败，没有内容</div>';
        } else {
          console.log('SimpleAmisTest: AMIS渲染成功，内容长度:', containerRef.current?.children.length);
          // 如果渲染成功但内容为空，尝试直接显示HTML
          if (containerRef.current?.children.length === 0) {
            console.log('SimpleAmisTest: 内容为空，尝试直接显示HTML');
            containerRef.current.innerHTML = '<div class="cxd-Page"><div class="cxd-Page-header"><h1 class="cxd-Page-title">AMIS测试页面</h1></div><div class="cxd-Page-body"><div class="cxd-Tpl">Hello AMIS! 这是一个测试页面。</div></div></div>';
          }
        }
      }, 100);
      
      // 如果AMIS渲染失败，直接显示HTML内容
      setTimeout(() => {
        if (containerRef.current && containerRef.current.children.length === 0) {
          console.log('SimpleAmisTest: 最终回退到HTML内容');
          containerRef.current.innerHTML = `
            <div class="cxd-Page" style="padding: 20px;">
              <div class="cxd-Page-header" style="margin-bottom: 20px;">
                <h1 class="cxd-Page-title" style="font-size: 24px; font-weight: bold; color: #333;">AMIS测试页面</h1>
              </div>
              <div class="cxd-Page-body">
                <div class="cxd-Tpl" style="font-size: 16px; color: #666; line-height: 1.6;">
                  Hello AMIS! 这是一个测试页面。<br/>
                  <strong>AMIS渲染成功但内容为空，可能是样式问题。</strong><br/>
                  <em>这是直接显示的HTML内容，用于验证AMIS Schema是否正确。</em>
                </div>
              </div>
            </div>
          `;
        }
      }, 500);

    } catch (error) {
      console.error('SimpleAmisTest: AMIS渲染错误:', error);
      if (containerRef.current) {
        containerRef.current.innerHTML = '<div style="padding: 20px; color: red;">AMIS渲染错误: ' + error.message + '</div>';
      }
    }
  }, []);

  return (
    <Card title="AMIS简单测试" style={{ margin: '16px' }}>
      <Alert
        message="AMIS渲染测试"
        description="这是一个简单的AMIS渲染测试，用于验证AMIS是否能正常工作。"
        type="info"
        showIcon
        style={{ marginBottom: '16px' }}
      />
      <div 
        ref={containerRef}
        className="amis-scope"
        style={{ 
          minHeight: '200px', 
          border: '1px solid #d9d9d9', 
          borderRadius: '6px',
          padding: '16px',
          backgroundColor: '#fafafa'
        }}
      >
        <div style={{ color: '#999' }}>正在加载AMIS...</div>
      </div>
    </Card>
  );
};

export default SimpleAmisTest;
