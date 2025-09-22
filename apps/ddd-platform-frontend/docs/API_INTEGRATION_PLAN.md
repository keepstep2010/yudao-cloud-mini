# DDD驱动开发平台前端 - API集成计划

## 📡 API架构设计

### 后端服务配置
- **开发环境**：http://127.0.0.1:8100
- **生产环境**：https://api.ddd-platform.com
- **API版本**：v1
- **认证方式**：JWT Bearer Token

### API服务分层
```typescript
// API服务架构
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    'Project',
    'Domain',
    'BoundedContext',
    'Aggregate',
    'Entity',
    'Screen',
    'Template',
    'GenerationTask',
  ],
  endpoints: (builder) => ({
    // API端点定义
  }),
});
```

## 🔗 API端点设计

### 1. 项目管理API

#### 项目CRUD操作
```typescript
// 获取项目列表
GET /api/projects
Query: { page?: number; size?: number; search?: string }
Response: PageResponse<ProjectMetadata>

// 获取项目详情
GET /api/projects/:id
Response: ProjectMetadata

// 创建项目
POST /api/projects
Body: CreateProjectRequest
Response: ProjectMetadata

// 更新项目
PUT /api/projects/:id
Body: UpdateProjectRequest
Response: ProjectMetadata

// 删除项目
DELETE /api/projects/:id
Response: void
```

#### 项目成员管理
```typescript
// 获取项目成员
GET /api/projects/:id/members
Response: ProjectMember[]

// 添加项目成员
POST /api/projects/:id/members
Body: AddMemberRequest
Response: ProjectMember

// 更新成员权限
PUT /api/projects/:id/members/:userId
Body: UpdateMemberRequest
Response: ProjectMember

// 移除项目成员
DELETE /api/projects/:id/members/:userId
Response: void
```

### 2. DDD建模API

#### 领域管理
```typescript
// 获取领域列表
GET /api/projects/:projectId/domains
Response: Domain[]

// 获取领域详情
GET /api/projects/:projectId/domains/:id
Response: Domain

// 创建领域
POST /api/projects/:projectId/domains
Body: CreateDomainRequest
Response: Domain

// 更新领域
PUT /api/projects/:projectId/domains/:id
Body: UpdateDomainRequest
Response: Domain

// 删除领域
DELETE /api/projects/:projectId/domains/:id
Response: void
```

#### 限界上下文管理
```typescript
// 获取限界上下文列表
GET /api/projects/:projectId/bounded-contexts
Response: BoundedContext[]

// 获取限界上下文详情
GET /api/projects/:projectId/bounded-contexts/:id
Response: BoundedContext

// 创建限界上下文
POST /api/projects/:projectId/bounded-contexts
Body: CreateBoundedContextRequest
Response: BoundedContext

// 更新限界上下文
PUT /api/projects/:projectId/bounded-contexts/:id
Body: UpdateBoundedContextRequest
Response: BoundedContext

// 删除限界上下文
DELETE /api/projects/:projectId/bounded-contexts/:id
Response: void
```

#### 聚合管理
```typescript
// 获取聚合列表
GET /api/projects/:projectId/aggregates
Response: Aggregate[]

// 获取聚合详情
GET /api/projects/:projectId/aggregates/:id
Response: Aggregate

// 创建聚合
POST /api/projects/:projectId/aggregates
Body: CreateAggregateRequest
Response: Aggregate

// 更新聚合
PUT /api/projects/:projectId/aggregates/:id
Body: UpdateAggregateRequest
Response: Aggregate

// 删除聚合
DELETE /api/projects/:projectId/aggregates/:id
Response: void
```

#### 实体管理
```typescript
// 获取实体列表
GET /api/projects/:projectId/entities
Response: Entity[]

// 获取实体详情
GET /api/projects/:projectId/entities/:id
Response: Entity

// 创建实体
POST /api/projects/:projectId/entities
Body: CreateEntityRequest
Response: Entity

// 更新实体
PUT /api/projects/:projectId/entities/:id
Body: UpdateEntityRequest
Response: Entity

// 删除实体
DELETE /api/projects/:projectId/entities/:id
Response: void
```

### 3. 屏幕设计API

#### 屏幕管理
```typescript
// 获取屏幕列表
GET /api/projects/:projectId/screens
Response: ScreenDefinition[]

// 获取屏幕详情
GET /api/projects/:projectId/screens/:id
Response: ScreenDefinition

// 创建屏幕
POST /api/projects/:projectId/screens
Body: CreateScreenRequest
Response: ScreenDefinition

// 更新屏幕
PUT /api/projects/:projectId/screens/:id
Body: UpdateScreenRequest
Response: ScreenDefinition

// 删除屏幕
DELETE /api/projects/:projectId/screens/:id
Response: void

// 生成屏幕
POST /api/projects/:projectId/screens/generate
Body: GenerateScreenRequest
Response: ScreenDefinition

// 预览屏幕
GET /api/projects/:projectId/screens/:id/preview
Response: AmisSchema
```

#### 屏幕模板管理
```typescript
// 获取屏幕模板列表
GET /api/screen-templates
Response: ScreenTemplate[]

// 获取屏幕模板详情
GET /api/screen-templates/:id
Response: ScreenTemplate

// 创建屏幕模板
POST /api/screen-templates
Body: CreateScreenTemplateRequest
Response: ScreenTemplate

// 更新屏幕模板
PUT /api/screen-templates/:id
Body: UpdateScreenTemplateRequest
Response: ScreenTemplate

// 删除屏幕模板
DELETE /api/screen-templates/:id
Response: void
```

### 4. 代码生成API

#### 代码生成任务
```typescript
// 获取生成任务列表
GET /api/projects/:projectId/generation/tasks
Response: GenerationTask[]

// 获取生成任务详情
GET /api/projects/:projectId/generation/tasks/:id
Response: GenerationTask

// 创建生成任务
POST /api/projects/:projectId/generation/tasks
Body: CreateGenerationTaskRequest
Response: GenerationTask

// 删除生成任务
DELETE /api/projects/:projectId/generation/tasks/:id
Response: void

// 下载生成结果
GET /api/projects/:projectId/generation/tasks/:id/download
Response: File
```

## 🔄 数据流设计

### 1. 状态管理流程
```typescript
// 数据获取流程
const useProjectData = () => {
  const { data: projects, loading, error } = useGetProjectsQuery();
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();
  
  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
  };
};
```

### 2. 缓存策略
```typescript
// RTK Query缓存配置
export const api = createApi({
  // ... 其他配置
  keepUnusedDataFor: 60, // 60秒后清理未使用的数据
  refetchOnMountOrArgChange: 30, // 30秒后重新获取数据
  refetchOnFocus: true, // 窗口获得焦点时重新获取
  refetchOnReconnect: true, // 网络重连时重新获取
});
```

### 3. 乐观更新
```typescript
// 乐观更新示例
const useOptimisticUpdate = () => {
  const [updateProject] = useUpdateProjectMutation();
  
  const handleUpdate = async (project: Project) => {
    try {
      // 乐观更新
      await updateProject({
        id: project.id,
        ...project,
        // 立即更新UI
      }).unwrap();
      
      message.success('项目更新成功');
    } catch (error) {
      message.error('项目更新失败');
      // 回滚乐观更新
    }
  };
  
  return { handleUpdate };
};
```

## 🛡️ 错误处理

### 1. 全局错误处理
```typescript
// API错误处理中间件
const handleApiError = (error: any) => {
  if (error.status === 401) {
    // 未授权，跳转到登录页
    navigate('/login');
  } else if (error.status === 403) {
    // 权限不足
    message.error('权限不足');
  } else if (error.status >= 500) {
    // 服务器错误
    message.error('服务器错误，请稍后重试');
  } else {
    // 其他错误
    message.error(error.data?.message || '操作失败');
  }
};
```

### 2. 重试机制
```typescript
// 自动重试配置
export const api = createApi({
  // ... 其他配置
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    // 自动重试配置
    retry: (failureCount, error) => {
      if (error.status === 404) return false;
      return failureCount < 3;
    },
  }),
});
```

### 3. 超时处理
```typescript
// 请求超时配置
const timeoutQuery = fetchBaseQuery({
  baseUrl: '/api',
  timeout: 10000, // 10秒超时
});
```

## 🔐 认证和授权

### 1. JWT Token管理
```typescript
// Token管理
const useAuth = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: RootState) => state.auth);
  
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authApi.login(credentials);
      dispatch(loginSuccess(response));
      
      // 存储Token
      localStorage.setItem('token', response.token);
      
      return response;
    } catch (error) {
      dispatch(loginFailure(error.message));
      throw error;
    }
  };
  
  const logout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };
  
  return { login, logout, token, user };
};
```

### 2. 权限控制
```typescript
// 权限检查Hook
const usePermission = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  
  const hasPermission = (permission: string) => {
    return user?.permissions.includes(permission) || false;
  };
  
  const hasRole = (role: string) => {
    return user?.role === role;
  };
  
  return { hasPermission, hasRole };
};
```

## 📊 性能优化

### 1. 请求去重
```typescript
// RTK Query自动去重
export const api = createApi({
  // ... 其他配置
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => 'projects',
      // 自动去重相同请求
    }),
  }),
});
```

### 2. 分页加载
```typescript
// 分页数据加载
const usePaginatedProjects = (page: number, size: number) => {
  const { data, loading, error } = useGetProjectsQuery({ page, size });
  
  return {
    projects: data?.content || [],
    totalPages: data?.totalPages || 0,
    loading,
    error,
  };
};
```

### 3. 虚拟滚动
```typescript
// 虚拟滚动组件
const VirtualizedProjectList: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <ProjectCard project={projects[index]} />
    </div>
  );
  
  return (
    <List
      height={600}
      itemCount={projects.length}
      itemSize={120}
      width="100%"
    >
      {Row}
    </List>
  );
};
```

## 🔄 实时更新

### 1. WebSocket连接
```typescript
// WebSocket连接管理
const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    const ws = new WebSocket(url);
    
    ws.onopen = () => {
      setIsConnected(true);
      setSocket(ws);
    };
    
    ws.onclose = () => {
      setIsConnected(false);
      setSocket(null);
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    return () => {
      ws.close();
    };
  }, [url]);
  
  return { socket, isConnected };
};
```

### 2. 实时数据同步
```typescript
// 实时数据同步
const useRealtimeData = () => {
  const dispatch = useDispatch();
  const { socket } = useWebSocket('ws://localhost:8100/ws');
  
  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
          case 'PROJECT_UPDATED':
            dispatch(updateProject(data.payload));
            break;
          case 'PROJECT_DELETED':
            dispatch(removeProject(data.payload.id));
            break;
          default:
            break;
        }
      };
    }
  }, [socket, dispatch]);
};
```

## 📱 移动端适配

### 1. 响应式API调用
```typescript
// 响应式API调用
const useResponsiveApi = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const getProjects = useCallback(async () => {
    const pageSize = isMobile ? 10 : 20;
    return await api.getProjects({ page: 0, size: pageSize });
  }, [isMobile]);
  
  return { getProjects };
};
```

### 2. 离线支持
```typescript
// 离线数据缓存
const useOfflineSupport = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return { isOnline };
};
```

## 🧪 测试策略

### 1. API Mock
```typescript
// API Mock配置
export const handlers = [
  rest.get('/api/projects', (req, res, ctx) => {
    return res(
      ctx.json({
        content: [
          { id: '1', name: '项目1', description: '描述1' },
          { id: '2', name: '项目2', description: '描述2' },
        ],
        totalPages: 1,
        totalElements: 2,
      })
    );
  }),
];
```

### 2. 集成测试
```typescript
// API集成测试
describe('Project API', () => {
  it('应该获取项目列表', async () => {
    const { result } = renderHook(() => useGetProjectsQuery(), {
      wrapper: ({ children }) => (
        <Provider store={store}>{children}</Provider>
      ),
    });
    
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    
    expect(result.current.data).toBeDefined();
  });
});
```

## 📈 监控和日志

### 1. API性能监控
```typescript
// API性能监控
const useApiMonitoring = () => {
  useEffect(() => {
    const originalFetch = window.fetch;
    
    window.fetch = async (...args) => {
      const start = performance.now();
      
      try {
        const response = await originalFetch(...args);
        const end = performance.now();
        
        // 记录API调用性能
        console.log(`API调用耗时: ${end - start}ms`);
        
        return response;
      } catch (error) {
        const end = performance.now();
        console.error(`API调用失败: ${end - start}ms`, error);
        throw error;
      }
    };
    
    return () => {
      window.fetch = originalFetch;
    };
  }, []);
};
```

### 2. 错误日志
```typescript
// 错误日志记录
const useErrorLogging = () => {
  const logError = useCallback((error: Error, context: string) => {
    const errorLog = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };
    
    // 发送到日志服务
    console.error('API错误:', errorLog);
  }, []);
  
  return { logError };
};
```

---

## 📋 API集成检查清单

### 开发前检查
- [ ] API文档完整
- [ ] 后端服务可用
- [ ] 认证配置正确
- [ ] 错误处理完善

### 开发中检查
- [ ] API调用正常
- [ ] 数据格式正确
- [ ] 错误处理有效
- [ ] 性能优化到位

### 测试检查
- [ ] 单元测试通过
- [ ] 集成测试通过
- [ ] 错误场景测试
- [ ] 性能测试通过

### 部署检查
- [ ] 生产环境配置
- [ ] 监控和日志
- [ ] 错误告警
- [ ] 性能监控

通过这个API集成计划，前端应用可以与后端服务进行高效、安全、可靠的集成。




