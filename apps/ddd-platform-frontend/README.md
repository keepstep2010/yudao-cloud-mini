# DDD驱动开发平台前端

基于DDD元数据驱动的可视化开发平台前端应用，集成AMIS编辑器，实现从DDD设计到界面实现的全自动化开发流程。

## 🚀 项目特性

### 核心功能
- **项目管理**：完整的项目生命周期管理
- **DDD建模**：可视化领域驱动设计工具
- **界面生成**：基于DDD模型自动生成AMIS界面
- **代码生成**：多框架代码自动生成
- **实时预览**：所见即所得的设计体验

### 技术特性
- **React 18**：最新React特性支持
- **TypeScript**：完整的类型安全
- **Ant Design 5**：企业级UI组件库
- **AMIS 6.3**：低代码前端框架
- **Redux Toolkit**：现代化状态管理
- **Vite**：极速构建工具

## 📁 项目结构

```
src/
├── components/          # 组件库
│   ├── ProjectManagement/    # 项目管理组件
│   ├── UbiquitousLanguage/   # 统一语言组件
│   ├── StrategicDesign/      # 战略设计组件
│   ├── TacticalDesign/       # 战术设计组件
│   ├── DataTransfer/         # 数据传输组件
│   ├── ScreenDesign/         # 屏幕设计组件
│   ├── AmisMapping/          # AMIS映射组件
│   ├── InterfaceRendering/   # 界面渲染组件
│   └── Common/               # 通用组件
├── pages/               # 页面组件
│   ├── Dashboard/           # 工作台
│   ├── Project/            # 项目管理
│   ├── DDD/                # DDD设计
│   ├── Screen/             # 界面设计
│   ├── Generation/         # 代码生成
│   └── Settings/           # 系统设置
├── services/            # API服务
├── stores/              # 状态管理
├── hooks/               # 自定义Hooks
├── utils/               # 工具函数
├── types/               # 类型定义
└── assets/              # 静态资源
```

## 🛠️ 开发环境

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 🔧 开发工具

### 代码质量
```bash
# 代码检查
npm run lint

# 自动修复
npm run lint:fix

# 代码格式化
npm run format

# 类型检查
npm run type-check
```

### 测试
```bash
# 运行测试
npm run test

# 监听模式
npm run test:watch

# 覆盖率报告
npm run test:coverage
```

## 📚 开发指南

### 组件开发
1. 在对应的功能模块下创建组件
2. 使用TypeScript定义组件props类型
3. 遵循Ant Design设计规范
4. 编写单元测试

### 状态管理
- 使用Redux Toolkit进行状态管理
- 使用RTK Query进行API数据管理
- 遵循单一数据源原则

### API集成
- 所有API调用通过RTK Query
- 统一的错误处理机制
- 自动缓存和重新验证

### 样式规范
- 使用Less预处理器
- 遵循BEM命名规范
- 响应式设计优先

## 🏗️ 架构设计

### 分层架构
1. **项目管理层**：项目创建、设置、成员管理
2. **统一语言层**：业务术语、规则、约束管理
3. **战略设计层**：领域识别、限界上下文设计
4. **战术设计层**：聚合、实体、值对象设计
5. **数据传输层**：DTO、API接口设计
6. **屏幕设计层**：屏幕类型、模板、组件管理
7. **AMIS映射层**：DDD到AMIS的转换
8. **界面渲染层**：AMIS编辑器、预览、测试

### 数据流
```
DDD元数据模型 → 屏幕模型 → AMIS Schema → 界面渲染
```

## 🔗 相关项目

- **后端服务**：`apps/ddd-platform-server`
- **AMIS编辑器**：`apps/ddd-amis-editor`

## 📄 许可证

MIT License

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📞 联系我们

- 项目团队：DDD Platform Team
- 邮箱：team@ddd-platform.com




