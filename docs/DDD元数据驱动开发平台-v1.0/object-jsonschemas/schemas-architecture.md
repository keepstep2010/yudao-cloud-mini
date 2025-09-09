# 📐 DDD元数据平台 - Schema架构层级├── 🖥️ 用户├── 📡 通信接口域 (Communication Domain) - 对外暴露接口
│   ├── SDK (Software Development Kit)
│   ├── API (Application Programming Interface)
│   ├── DTO (Data Transfer Object)
│   ├── DTO映射 (DTO Mapping)
│   └── 性能监控 (Performance Monitoring)ser Interface Domain) - 用户交互界面
│   ├── 屏幕定义 (Screen Definition)
│   ├── Amis屏幕定义 (Amis Screen Definition)
│   ├── 表单定义 (Form Definition)
│   ├── 布局定义 (Layout Definition)
│   └── 组件定义 (Component Definition)
├── 📡 通信接口域 (Communication Domain) - 对外暴露接口 对象层级关系 - 项目驱动的分层分区架构

### 🎯 **核心层级关系澄清**
```
📁 项目 (Project) - 顶级视角
├── 🗣️ 统一语言 (Ubiquitous Language) - 项目级术语体系
│   ├── 业务术语 (Business Terms)
│   ├── 业务属性 (Business Properties)
│   ├── 约束条件 (Constraints)
│   ├── 业务规则 (Business Rules)
│   ├── 验证规则 (Validation Rules)
│   ├── 计算规则 (Calculation Rules)
│   └── 领域事件定义 (Domain Event Definitions)
├── 🎯 问题域 (Problem Domain) - 要解决的业务问题
│   ├── 领域 (Domain) + 策略 (Policy)
│   ├── 子域 (Subdomain) + 规约 (Specification)
│   └── 聚合 (Aggregate) + 实体 (Entity) + 值对象 (Value Object) + 不变式 (Invariant)
├── ⚡ 解决方案域 (Solution Domain) - 技术实现方案
│   ├── 模块 (Module)
│   ├── 限界上下文 (Bounded Context)
│   ├── 领域服务 (Domain Service)
│   ├── 应用服务 (Application Service)
│   ├── 适配器 (Adapter) + 防腐网关 (Anti-Corruption Layer)
│   └── 外部系统 (External System)
├── �️ 用户界面域 (User Interface Domain) - 用户交互界面
│   ├── 界面定义 (Screen Definition)
│   ├── Amis界面定义 (Amis Screen Definition)
│   ├── 组件库 (Component Library)
│   ├── 界面主题 (UI Theme)
│   └── 用户体验配置 (UX Configuration)
├── �📡 通信接口域 (Communication Domain) - 对外暴露接口
│   ├── SDK (Software Development Kit)
│   ├── API (Application Programming Interface)
│   ├── DTO (Data Transfer Object)
│   ├── DTO映射 (DTO Mapping)
│   └── 性能监控 (Performance Monitoring)
└── 🏗️ 基础设施域 (Infrastructure Domain) - 技术支撑服务
    ├── 持久化服务 (Persistence Services)
    ├── 通信服务 (Communication Services)
    ├── 集成服务 (Integration Services)
    └── 技术服务 (Technical Services)
```

### 🏗️ **第一层：项目架构总览图**
```mermaid
graph TB
    %% 样式定义
    classDef project fill:#ff9800,stroke:#e65100,stroke-width:4px,color:white;
    classDef languageZone fill:#fff3e0,stroke:#e65100,stroke-width:3px,color:black;
    classDef problemZone fill:#e3f2fd,stroke:#0d47a1,stroke-width:3px,color:black;
    classDef solutionZone fill:#e8f5e9,stroke:#1b5e20,stroke-width:3px,color:black;
    classDef uiZone fill:#fce4ec,stroke:#880e4f,stroke-width:3px,color:black;
    classDef communicationZone fill:#f3e5f5,stroke:#4a148c,stroke-width:3px,color:black;
    classDef infrastructureZone fill:#f5f5f5,stroke:#424242,stroke-width:3px,color:black;

    %% 项目作为顶级容器
    PROJECT[📁 项目 Project<br/>顶级业务上下文]:::project
    
    %% 项目包含的六大域
    LANGUAGE_DOMAIN[🗣️ 统一语言域<br/>Ubiquitous Language Domain]:::languageZone
    PROBLEM_DOMAIN[🎯 问题域<br/>Problem Domain]:::problemZone
    SOLUTION_DOMAIN[⚡ 解决方案域<br/>Solution Domain]:::solutionZone
    UI_DOMAIN[🖥️ 用户界面域<br/>User Interface Domain]:::uiZone
    COMMUNICATION_DOMAIN[📡 通信接口域<br/>Communication Domain]:::communicationZone
    INFRASTRUCTURE_DOMAIN[🏗️ 基础设施域<br/>Infrastructure Domain]:::infrastructureZone

    %% 项目包含关系
    PROJECT -->|定义| LANGUAGE_DOMAIN
    PROJECT -->|分析| PROBLEM_DOMAIN
    PROJECT -->|设计| SOLUTION_DOMAIN
    PROJECT -->|呈现| UI_DOMAIN
    PROJECT -->|暴露| COMMUNICATION_DOMAIN
    PROJECT -->|依赖| INFRASTRUCTURE_DOMAIN
    
    %% 域间核心关系
    LANGUAGE_DOMAIN -.->|术语定义| PROBLEM_DOMAIN
    LANGUAGE_DOMAIN -.->|术语定义| SOLUTION_DOMAIN
    LANGUAGE_DOMAIN -.->|术语定义| UI_DOMAIN
    LANGUAGE_DOMAIN -.->|术语定义| COMMUNICATION_DOMAIN
    
    PROBLEM_DOMAIN -->|映射到| SOLUTION_DOMAIN
    SOLUTION_DOMAIN -->|呈现到| UI_DOMAIN
    SOLUTION_DOMAIN -->|暴露| COMMUNICATION_DOMAIN
    UI_DOMAIN -->|调用| COMMUNICATION_DOMAIN
    SOLUTION_DOMAIN -->|依赖| INFRASTRUCTURE_DOMAIN
    UI_DOMAIN -->|依赖| INFRASTRUCTURE_DOMAIN
    COMMUNICATION_DOMAIN -->|依赖| INFRASTRUCTURE_DOMAIN
```

### 🔍 **第二层：域详细图**

#### 📁 **0. 项目容器层 - Project Container**
```mermaid
graph TB
    classDef project fill:#ff9800,stroke:#e65100,stroke-width:3px,color:white;
    classDef domain fill:#ffcc80,stroke:#f57c00,stroke-width:2px,color:black;
    classDef metadata fill:#ffe0b2,stroke:#ff8f00,stroke-width:1px,color:black;
    
    %% 项目容器
    PROJECT(项目容器<br/>Project Container):::project
    
    %% 项目元数据
    subgraph PROJECT_META [项目元数据区]
        PROJ_INFO(项目信息<br/>Project Information):::metadata
        PROJ_CONFIG(项目配置<br/>Project Configuration):::metadata
        PROJ_TEAM(项目团队<br/>Project Team):::metadata
    end
    
    %% 项目包含的六大域
    LANG_DOMAIN[🗣️ 统一语言域]:::domain
    PROB_DOMAIN[🎯 问题域]:::domain
    SOLU_DOMAIN[⚡ 解决方案域]:::domain
    UI_DOMAIN[🖥️ 用户界面域]:::domain
    COMM_DOMAIN[📡 通信接口域]:::domain
    INFRA_DOMAIN[🏗️ 基础设施域]:::domain
    
    %% 项目包含关系
    PROJECT -.-> PROJECT_META
    PROJECT -->|管理| LANG_DOMAIN
    PROJECT -->|定义| PROB_DOMAIN
    PROJECT -->|实现| SOLU_DOMAIN
    PROJECT -->|呈现| UI_DOMAIN
    PROJECT -->|暴露| COMM_DOMAIN
    PROJECT -->|依赖| INFRA_DOMAIN
```

#### 🗣️ **1. 统一语言域 - Ubiquitous Language Domain**
```mermaid
graph TB
    classDef language fill:#ffa726,stroke:#ff6f00,stroke-width:2px,color:black;
    classDef scope fill:#ffcc80,stroke:#f57c00,stroke-width:1px,color:black;
    classDef external fill:#f5f5f5,stroke:#9e9e9e,stroke-width:1px,stroke-dasharray: 5 5,color:gray;

    %% 本域核心对象
    UL_ROOT(统一语言根<br/>Ubiquitous Language Root):::language
    
    %% 术语作用域层级
    subgraph UL_SCOPES [术语作用域层级]
        GLOBAL_TERMS(全局术语<br/>Global Terms):::scope
        PROJECT_TERMS(项目术语<br/>Project Terms):::scope
        DOMAIN_TERMS(领域术语<br/>Domain Terms):::scope
        CONTEXT_TERMS(上下文术语<br/>Context Terms):::scope
    end
    
    %% 术语实现
    TERM(业务术语<br/>Business Term):::language
    PROP(业务属性<br/>Business Property):::language
    CONSTRAINT(约束条件<br/>Constraint):::language
    BIZ_RULE(业务规则<br/>Business Rule):::language
    VALIDATION(验证规则<br/>Validation Rule):::language
    CALC_RULE(计算规则<br/>Calculation Rule):::language
    DOMAIN_EVENT_DEF(领域事件定义<br/>Domain Event Definition):::language
    
    %% 外部域引用节点
    PROJECT_EXT[项目容器]:::external
    DOMAIN_EXT[领域]:::external
    BC_EXT[限界上下文]:::external
    
    %% 本域内部关系
    UL_ROOT -->|管理| GLOBAL_TERMS
    PROJECT_EXT -->|定义| PROJECT_TERMS
    DOMAIN_EXT -->|定义| DOMAIN_TERMS
    BC_EXT -->|定义| CONTEXT_TERMS
    
    %% 术语层级关系
    GLOBAL_TERMS -->|继承到| PROJECT_TERMS
    PROJECT_TERMS -->|继承到| DOMAIN_TERMS
    DOMAIN_TERMS -->|继承到| CONTEXT_TERMS
    
    %% 术语实现关系
    PROJECT_TERMS -->|包含| TERM
    DOMAIN_TERMS -->|包含| TERM
    CONTEXT_TERMS -->|包含| TERM
    TERM -->|定义| PROP
    TERM -->|约束| CONSTRAINT
    TERM -->|规定| BIZ_RULE
    BIZ_RULE -->|实现为| VALIDATION
    BIZ_RULE -->|实现为| CALC_RULE
    UL_ROOT -->|定义模板| DOMAIN_EVENT_DEF
```

#### 🎯 **2. 问题域 - Problem Domain**
```mermaid
graph TB
    classDef problem fill:#42a5f5,stroke:#01579b,stroke-width:2px,color:black;
    classDef hierarchy fill:#81c784,stroke:#388e3c,stroke-width:1px,color:black;
    classDef external fill:#f5f5f5,stroke:#9e9e9e,stroke-width:1px,stroke-dasharray: 5 5,color:gray;
    
    %% 本域核心对象 - 业务层级结构
    subgraph PD_HIERARCHY [业务层级结构]
        DOM(领域<br/>Domain):::problem
        SUB(子域<br/>Subdomain):::problem
    end
    
    %% 本域核心对象 - 领域建模对象
    subgraph PD_MODELING [领域建模对象]
        AGG(聚合<br/>Aggregate):::problem
        AR(聚合根<br/>Aggregate Root):::problem
        ENT(实体<br/>Entity):::problem
        VO(值对象<br/>Value Object):::problem
        DE(领域事件<br/>Domain Event):::problem
    end
    
    %% 本域核心对象 - 业务规则对象
    subgraph PD_BUSINESS_RULES [业务规则对象]
        SPEC(规约<br/>Specification):::problem
        POLICY(策略<br/>Policy):::problem
        INVARIANT(不变式<br/>Invariant):::problem
    end
    
    %% 外部域引用节点
    PROJECT_EXT[项目容器]:::external
    TERM_EXT[业务术语]:::external
    PROP_EXT[业务属性]:::external
    BIZ_RULE_EXT[业务规则]:::external
    BC_EXT[限界上下文]:::external
    
    %% 项目包含问题域
    PROJECT_EXT -->|分析| DOM
    
    %% 本域内部层级关系
    DOM -->|分解为| SUB
    SUB -->|包含| AGG
    AGG -->|有且只有一个| AR
    AR -->|包含| ENT
    AR -->|包含| VO
    AR -->|发布| DE
    
    %% 业务规则层级关系
    DOM -->|定义| POLICY
    SUB -->|定义| SPEC
    AGG -->|保证| INVARIANT
    AR -->|验证| SPEC
    ENT -->|验证| SPEC
    VO -->|验证| SPEC
    
    %% 跨域关系 - 术语定义
    TERM_EXT -->|定义| DOM
    TERM_EXT -->|定义| SUB
    PROP_EXT -.->|构成| AR
    PROP_EXT -.->|构成| ENT
    PROP_EXT -.->|构成| VO
    BIZ_RULE_EXT -->|实现为| SPEC
    BIZ_RULE_EXT -->|实现为| POLICY
    BIZ_RULE_EXT -->|实现为| INVARIANT
    
    %% 跨域关系 - 解决方案映射
    SUB -.->|映射到| BC_EXT
```

#### ⚡ **3. 解决方案域 - Solution Domain**
```mermaid
graph TB
    classDef solution fill:#66bb6a,stroke:#33691e,stroke-width:2px,color:black;
    classDef integration fill:#66bb6a,stroke:#2e7d32,stroke-width:1px,stroke-dasharray: 5 5,color:black;
    classDef external fill:#f5f5f5,stroke:#9e9e9e,stroke-width:1px,stroke-dasharray: 5 5,color:gray;
    
    %% 本域核心对象 - 技术组织结构
    subgraph SD_ORGANIZATION [技术组织结构]
        MOD(模块<br/>Module):::solution
        BC(限界上下文<br/>Bounded Context):::solution
    end
    
    %% 本域核心对象 - 服务层
    subgraph SD_SERVICES [服务层]
        DS(领域服务<br/>Domain Service):::solution
        APP_S(应用服务<br/>Application Service):::solution
    end
    
    %% 本域核心对象 - 集成层
    subgraph SD_INTEGRATION [集成层]
        ADPT(适配器<br/>Adapter):::solution
        GATEWAY(防腐网关<br/>Anti-Corruption Layer):::solution
        EXT_SYSTEM(外部系统<br/>External System):::integration
    end
    
    %% 外部域引用节点
    PROJECT_EXT[项目容器]:::external
    SUB_EXT[子域]:::external
    TERM_EXT[业务术语]:::external
    AR_EXT[聚合根]:::external
    DE_EXT[领域事件]:::external
    SDK_EXT[SDK]:::external
    API_EXT[API]:::external
    REPO_EXT[仓储接口]:::external
    
    %% 项目包含解决方案域
    PROJECT_EXT -->|设计| MOD
    PROJECT_EXT -->|管理| BC
    
    %% 本域内部关系
    MOD -->|包含| BC
    BC -->|包含| DS
    BC -->|包含| APP_S
    BC -->|包含| ADPT
    BC -->|定义| GATEWAY
    
    %% 集成层内部关系
    GATEWAY -->|使用| ADPT
    ADPT -->|转换调用| EXT_SYSTEM
    
    %% 上下文映射关系（同级）
    BC_A[限界上下文A]:::solution
    BC_B[限界上下文B]:::solution
    BC_A -->|上游/下游| BC_B
    
    %% 跨域关系 - 问题域映射
    SUB_EXT -->|实现为| BC
    TERM_EXT -->|定义| BC
    TERM_EXT -->|定义| DS
    
    %% 跨域关系 - 通信接口暴露
    BC -->|暴露| SDK_EXT
    APP_S -->|实现| API_EXT
    
    %% 跨域关系 - 领域对象操作
    APP_S -->|编排| DS
    APP_S -->|操作| AR_EXT
    DS -->|操作| AR_EXT
    
    %% 跨域关系 - 基础设施依赖
    DS -->|依赖| REPO_EXT
    DE_EXT -->|通过适配器| ADPT
    
    %% 跨域关系 - 外部系统集成
    DS -->|通过防腐网关| GATEWAY
    APP_S -->|通过防腐网关| GATEWAY
```

#### �️ **4. 用户界面域 - User Interface Domain**

用户界面域负责定义与用户交互的各种界面组件和表现形式。

```mermaid
graph TB
    classDef uiDomain fill:#2196F3,stroke:#0D47A1,stroke-width:2px,color:white;
    classDef external fill:#f5f5f5,stroke:#9e9e9e,stroke-width:1px,stroke-dasharray: 5 5,color:gray;
    
    %% 本域核心对象 - 界面定义层
    subgraph UI_DEFINITION [界面定义层]
        SCREEN_DEF(屏幕定义<br/>Screen Definition):::uiDomain
        FORM_DEF(表单定义<br/>Form Definition):::uiDomain
        LAYOUT_DEF(布局定义<br/>Layout Definition):::uiDomain
    end
    
    %% 本域核心对象 - 界面实现层
    subgraph UI_IMPLEMENTATION [界面实现层]
        AMIS_SCREEN(Amis屏幕定义<br/>Amis Screen Definition):::uiDomain
        COMPONENT_DEF(组件定义<br/>Component Definition):::uiDomain
        EVENT_HANDLER(事件处理器<br/>Event Handler):::uiDomain
    end
    
    %% 本域内关系
    SCREEN_DEF -->|包含| FORM_DEF
    SCREEN_DEF -->|使用| LAYOUT_DEF
    SCREEN_DEF -->|实现为| AMIS_SCREEN
    FORM_DEF -->|组成| COMPONENT_DEF
    COMPONENT_DEF -->|绑定| EVENT_HANDLER
    
    %% 项目包含用户界面域
    PROJECT([项目容器<br/>Project Container]):::external
    PROJECT -->|呈现| UI_DEFINITION
    PROJECT -->|渲染| UI_IMPLEMENTATION
```

**用户界面域组件说明:**

- **屏幕定义**: 定义通用的屏幕界面结构和布局规范
- **表单定义**: 定义数据输入表单的结构和验证规则  
- **布局定义**: 定义界面的排版和视觉呈现方式
- **Amis屏幕定义**: 基于Amis框架的具体屏幕实现配置
- **组件定义**: 定义可复用的UI组件和其属性
- **事件处理器**: 定义用户交互事件的处理逻辑

#### �📡 **5. 通信接口域 - Communication Domain**
```mermaid
graph TB
    classDef communication fill:#9c27b0,stroke:#4a148c,stroke-width:2px,color:white;
    classDef external fill:#f5f5f5,stroke:#9e9e9e,stroke-width:1px,stroke-dasharray: 5 5,color:gray;
    
    %% 本域核心对象 - 接口规范层
    subgraph CD_SPECIFICATION [接口规范层]
        SDK(客户端SDK<br/>Client SDK):::communication
        API_SPEC(API规范<br/>API Specification):::communication
    end
    
    %% 本域核心对象 - 接口实现层
    subgraph CD_IMPLEMENTATION [接口实现层]
        API_ENDPOINT(API端点<br/>API Endpoint):::communication
        SERVICE_METHOD(服务方法<br/>Service Method):::communication
        METHOD_PARAM(方法参数<br/>Method Parameter):::communication
        METHOD_RETURN(方法返回值<br/>Method Return):::communication
    end
    
    %% 本域核心对象 - 数据传输层
    subgraph CD_DATA_TRANSFER [数据传输层]
        DTO(数据传输对象<br/>Data Transfer Object):::communication
        DTO_ATTR(DTO属性<br/>DTO Attribute):::communication
        DTO_MAPPING(DTO映射<br/>DTO Mapping):::communication
    end
    
    %% 本域核心对象 - 监控度量层
    subgraph CD_MONITORING [监控度量层]
        PERF_MONITOR(性能监控<br/>Performance Monitoring):::communication
    end
    
    %% 外部域引用节点
    PROJECT_EXT[项目容器]:::external
    BC_EXT[限界上下文]:::external
    APP_S_EXT[应用服务]:::external
    PROP_EXT[业务属性]:::external
    AR_EXT[聚合根]:::external
    ENT_EXT[实体]:::external
    VO_EXT[值对象]:::external
    
    %% 项目包含通信接口域
    PROJECT_EXT -->|暴露| SDK
    PROJECT_EXT -->|定义| API_SPEC
    PROJECT_EXT -->|监控| PERF_MONITOR
    
    %% 本域内部关系
    SDK -->|定义| API_SPEC
    API_SPEC -->|包含| API_ENDPOINT
    API_ENDPOINT -->|包含| SERVICE_METHOD
    SERVICE_METHOD -->|有| METHOD_PARAM
    SERVICE_METHOD -->|有| METHOD_RETURN
    
    SDK -->|定义| DTO
    DTO -->|包含| DTO_ATTR
    DTO -->|通过| DTO_MAPPING
    
    METHOD_PARAM -->|使用| DTO
    METHOD_RETURN -->|使用| DTO
    
    %% 跨域关系 - 解决方案域实现
    BC_EXT -->|暴露| SDK
    APP_S_EXT -->|实现| API_ENDPOINT
    
    %% 跨域关系 - 统一语言域定义
    PROP_EXT -.->|构成| DTO_ATTR
    
    %% 跨域关系 - 问题域对象映射
    AR_EXT -.->|映射为| DTO
    ENT_EXT -.->|映射为| DTO
    VO_EXT -.->|映射为| DTO
```

#### 🏗️ **6. 基础设施域 - Infrastructure Domain**
```mermaid
graph LR
    classDef infrastructure fill:#616161,stroke:#424242,stroke-width:2px,color:white;
    classDef external fill:#f5f5f5,stroke:#9e9e9e,stroke-width:1px,stroke-dasharray: 5 5,color:gray;
    
    %% 本域核心对象 - 持久化基础设施
    subgraph INFRA_PERSISTENCE [持久化基础设施]
        REPO_IFACE(仓储接口<br/>Repository Interface):::infrastructure
        REPO_IMPL(仓储实现<br/>Repository Implementation):::infrastructure
        PERSISTENCE_MAPPING(持久化映射<br/>Persistence Mapping):::infrastructure
    end
    
    %% 本域核心对象 - 通信基础设施
    subgraph INFRA_COMMUNICATION [通信基础设施]
        MSG_SENDER(消息发送器<br/>Message Sender):::infrastructure
        EVENT_BUS(事件总线<br/>Event Bus):::infrastructure
        NOTIFICATION(通知服务<br/>Notification Service):::infrastructure
    end
    
    %% 本域核心对象 - 集成基础设施
    subgraph INFRA_INTEGRATION [集成基础设施]
        GATEWAY_IMPL(防腐网关实现<br/>Gateway Implementation):::infrastructure
        EXT_SERVICE(外部服务客户端<br/>External Service Client):::infrastructure
        ADAPTER_IMPL(适配器实现<br/>Adapter Implementation):::infrastructure
        INTEGRATION_MAPPING(集成映射<br/>Integration Mapping):::infrastructure
    end
    
    %% 本域核心对象 - 技术基础设施
    subgraph INFRA_TECHNICAL [技术基础设施]
        CACHE_SERVICE(缓存服务<br/>Cache Service):::infrastructure
        LOG_SERVICE(日志服务<br/>Log Service):::infrastructure
        SECURITY_SERVICE(安全服务<br/>Security Service):::infrastructure
        ARCHITECTURE_MAPPING(架构映射<br/>Architecture Mapping):::infrastructure
    end
    
    %% 外部域引用节点
    PROJECT_EXT[项目容器]:::external
    AR_EXT[聚合根]:::external
    ENT_EXT[实体]:::external
    DS_EXT[领域服务]:::external
    DE_EXT[领域事件]:::external
    APP_S_EXT[应用服务]:::external
    GATEWAY_EXT[防腐网关]:::external
    ADAPTER_EXT[适配器]:::external
    
    %% 项目依赖基础设施域
    PROJECT_EXT -->|依赖| INFRA_PERSISTENCE
    PROJECT_EXT -->|依赖| INFRA_COMMUNICATION
    PROJECT_EXT -->|依赖| INFRA_INTEGRATION
    PROJECT_EXT -->|依赖| INFRA_TECHNICAL
    
    %% 本域内部关系
    REPO_IFACE -.->|被实现| REPO_IMPL
    GATEWAY_EXT -.->|被实现| GATEWAY_IMPL
    ADAPTER_EXT -.->|被实现| ADAPTER_IMPL
    
    %% 跨域关系 - 持久化服务
    AR_EXT -->|被持久化| REPO_IFACE
    ENT_EXT -->|被持久化| REPO_IFACE
    DS_EXT -->|依赖| REPO_IFACE
    APP_S_EXT -->|使用| PERSISTENCE_MAPPING
    
    %% 跨域关系 - 通信服务
    APP_S_EXT -->|发送消息| MSG_SENDER
    DS_EXT -->|发送消息| MSG_SENDER
    DE_EXT -->|通过| EVENT_BUS
    APP_S_EXT -->|发送通知| NOTIFICATION
    
    %% 跨域关系 - 集成服务
    DS_EXT -->|调用外部服务| EXT_SERVICE
    APP_S_EXT -->|通过防腐网关| GATEWAY_IMPL
    APP_S_EXT -->|通过适配器| ADAPTER_IMPL
    DS_EXT -->|使用| INTEGRATION_MAPPING
    
    %% 跨域关系 - 技术服务
    APP_S_EXT -->|使用缓存| CACHE_SERVICE
    DS_EXT -->|使用缓存| CACHE_SERVICE
    APP_S_EXT -->|记录日志| LOG_SERVICE
    DS_EXT -->|记录日志| LOG_SERVICE
    APP_S_EXT -->|安全检查| SECURITY_SERVICE
    DS_EXT -->|安全检查| SECURITY_SERVICE
    PROJECT_EXT -->|架构映射| ARCHITECTURE_MAPPING
```

