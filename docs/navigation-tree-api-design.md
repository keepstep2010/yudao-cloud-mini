# 导航树动态构建API接口设计

## 1. 获取导航树数据

### 接口定义
```http
GET /api/navigation-tree/data
```

### 请求参数
```json
{
  "projectId": "string",     // 项目ID
  "domainId": "string",      // 领域ID（可选）
  "nodeId": "string",        // 节点ID（可选，用于获取特定节点）
  "expandLevel": "number",   // 展开层级（可选，默认2）
  "includeMetadata": "boolean" // 是否包含元数据（可选，默认true）
}
```

### 响应数据
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "nodeId": "root_ddd_platform",
    "nodeType": "PLATFORM_ROOT",
    "nodeName": "DDD元数据驱动开发平台",
    "nodeIcon": "🏗️",
    "nodeData": {
      "platformId": "ddd_platform_001",
      "platformName": "DDD元数据驱动开发平台",
      "platformVersion": "2.1.0"
    },
    "children": [
      {
        "nodeId": "project_ecommerce",
        "nodeType": "PROJECT",
        "nodeName": "电商平台项目",
        "nodeIcon": "📁",
        "nodeData": {
          "projectId": "project_ecommerce_001",
          "projectName": "电商平台项目",
          "projectVersion": "v2.1.0"
        },
        "children": [
          // ... 子节点数据
        ]
      }
    ],
    "metadata": {
      "createdAt": "2025-09-22T10:40:00Z",
      "updatedAt": "2025-09-22T10:40:00Z",
      "createdBy": "admin",
      "updatedBy": "admin"
    }
  }
}
```

## 2. 展开/收起节点

### 接口定义
```http
POST /api/navigation-tree/expand
POST /api/navigation-tree/collapse
```

### 请求参数
```json
{
  "nodeId": "string",        // 节点ID
  "expanded": "boolean",     // 展开状态
  "projectId": "string"      // 项目ID
}
```

### 响应数据
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "nodeId": "project_ecommerce",
    "expanded": true,
    "children": [
      // ... 子节点数据
    ]
  }
}
```

## 3. 更新节点

### 接口定义
```http
PUT /api/navigation-tree/update
```

### 请求参数
```json
{
  "nodeId": "string",        // 节点ID
  "nodeName": "string",      // 节点名称
  "nodeType": "string",      // 节点类型
  "nodeIcon": "string",      // 节点图标
  "nodeData": "object",      // 节点数据
  "projectId": "string"      // 项目ID
}
```

### 响应数据
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "nodeId": "project_ecommerce",
    "nodeName": "电商平台项目",
    "nodeType": "PROJECT",
    "nodeIcon": "📁",
    "nodeData": {
      "projectId": "project_ecommerce_001",
      "projectName": "电商平台项目",
      "projectVersion": "v2.1.0"
    },
    "updatedAt": "2025-09-22T10:40:00Z",
    "updatedBy": "admin"
  }
}
```

## 4. 添加子节点

### 接口定义
```http
POST /api/navigation-tree/add-child
```

### 请求参数
```json
{
  "parentNodeId": "string",  // 父节点ID
  "nodeName": "string",      // 节点名称
  "nodeType": "string",      // 节点类型
  "nodeIcon": "string",      // 节点图标
  "nodeData": "object",      // 节点数据
  "projectId": "string"      // 项目ID
}
```

### 响应数据
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "nodeId": "new_node_001",
    "parentNodeId": "project_ecommerce",
    "nodeName": "新节点",
    "nodeType": "SUBDOMAIN",
    "nodeIcon": "🎯",
    "nodeData": {},
    "createdAt": "2025-09-22T10:40:00Z",
    "createdBy": "admin"
  }
}
```

## 5. 删除节点

### 接口定义
```http
DELETE /api/navigation-tree/delete
```

### 请求参数
```json
{
  "nodeId": "string",        // 节点ID
  "projectId": "string"      // 项目ID
}
```

### 响应数据
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "nodeId": "deleted_node_001",
    "deletedAt": "2025-09-22T10:40:00Z",
    "deletedBy": "admin"
  }
}
```

## 6. 搜索节点

### 接口定义
```http
GET /api/navigation-tree/search
```

### 请求参数
```json
{
  "keyword": "string",       // 搜索关键词
  "projectId": "string",     // 项目ID
  "nodeType": "string",      // 节点类型过滤（可选）
  "limit": "number"          // 结果数量限制（可选，默认50）
}
```

### 响应数据
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "results": [
      {
        "nodeId": "user_aggregate",
        "nodeType": "AGGREGATE",
        "nodeName": "用户聚合",
        "nodeIcon": "👤",
        "nodeData": {
          "aggregateId": "aggregate_user",
          "aggregateName": "用户聚合",
          "aggregateRoot": "User"
        },
        "path": "DDD元数据驱动开发平台 > 电商平台项目 > 项目领域 > 子域 > 用户管理子域 > 聚合",
        "score": 0.95
      }
    ],
    "total": 1,
    "keyword": "用户聚合"
  }
}
```

## 7. 获取节点统计信息

### 接口定义
```http
GET /api/navigation-tree/statistics
```

### 请求参数
```json
{
  "projectId": "string",     // 项目ID
  "nodeType": "string"       // 节点类型（可选）
}
```

### 响应数据
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "totalNodes": 156,
    "nodeTypeCounts": {
      "PROJECT": 1,
      "PROJECT_METADATA": 4,
      "PROJECT_DOMAIN": 1,
      "SUBDOMAIN": 5,
      "AGGREGATE": 12,
      "AGGREGATE_ROOT": 12,
      "ENTITY": 24,
      "VALUE_OBJECT": 18,
      "DOMAIN_SERVICE": 15,
      "DOMAIN_EVENT": 20,
      "COMMUNICATION_LAYER": 1,
      "INTERFACE_LAYER": 1,
      "IMPLEMENTATION_MAPPING_LAYER": 1,
      "VALIDATION_LAYER": 1
    },
    "maxDepth": 6,
    "averageChildrenPerNode": 3.2,
    "lastUpdated": "2025-09-22T10:40:00Z"
  }
}
```

## 8. 批量操作

### 接口定义
```http
POST /api/navigation-tree/batch-operations
```

### 请求参数
```json
{
  "operations": [
    {
      "operation": "UPDATE",
      "nodeId": "node_001",
      "data": {
        "nodeName": "更新后的名称"
      }
    },
    {
      "operation": "DELETE",
      "nodeId": "node_002"
    },
    {
      "operation": "ADD_CHILD",
      "parentNodeId": "node_003",
      "data": {
        "nodeName": "新子节点",
        "nodeType": "SUBDOMAIN",
        "nodeIcon": "🎯"
      }
    }
  ],
  "projectId": "string"
}
```

### 响应数据
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "successCount": 3,
    "failureCount": 0,
    "results": [
      {
        "operation": "UPDATE",
        "nodeId": "node_001",
        "success": true,
        "message": "更新成功"
      },
      {
        "operation": "DELETE",
        "nodeId": "node_002",
        "success": true,
        "message": "删除成功"
      },
      {
        "operation": "ADD_CHILD",
        "nodeId": "new_node_004",
        "success": true,
        "message": "添加成功"
      }
    ]
  }
}
```

## 9. 导出导航树

### 接口定义
```http
GET /api/navigation-tree/export
```

### 请求参数
```json
{
  "projectId": "string",     // 项目ID
  "format": "string",        // 导出格式：json, xml, csv, excel
  "includeMetadata": "boolean", // 是否包含元数据
  "nodeTypes": "array"       // 包含的节点类型（可选）
}
```

### 响应数据
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "downloadUrl": "/api/navigation-tree/download/export_20250922_104000.json",
    "fileName": "navigation_tree_export_20250922_104000.json",
    "fileSize": 1024000,
    "expiresAt": "2025-09-22T11:40:00Z"
  }
}
```

## 10. 导入导航树

### 接口定义
```http
POST /api/navigation-tree/import
```

### 请求参数
```json
{
  "projectId": "string",     // 项目ID
  "file": "file",            // 上传的文件
  "format": "string",        // 文件格式
  "mergeStrategy": "string", // 合并策略：REPLACE, MERGE, APPEND
  "validateOnly": "boolean"  // 仅验证不导入
}
```

### 响应数据
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "importId": "import_20250922_104000",
    "totalNodes": 156,
    "successCount": 150,
    "failureCount": 6,
    "errors": [
      {
        "nodeId": "invalid_node_001",
        "error": "节点类型无效",
        "line": 45
      }
    ],
    "importedAt": "2025-09-22T10:40:00Z",
    "importedBy": "admin"
  }
}
```
