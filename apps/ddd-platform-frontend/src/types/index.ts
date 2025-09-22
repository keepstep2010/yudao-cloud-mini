// DDD元数据模型类型定义
export interface ProjectMetadata {
  id: string;
  name: string;
  description?: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  tags: string[];
  isActive: boolean;
}

export interface Domain {
  id: string;
  name: string;
  description?: string;
  type: 'CORE' | 'SUPPORTING' | 'GENERIC';
  boundedContexts: string[];
  stakeholders: Stakeholder[];
  businessGoals: BusinessGoal[];
  isActive: boolean;
}

export interface BoundedContext {
  id: string;
  name: string;
  description?: string;
  domainId: string;
  responsibilities: string[];
  boundaries: string[];
  isActive: boolean;
}

export interface Aggregate {
  id: string;
  name: string;
  description?: string;
  boundedContextId: string;
  rootEntityId: string;
  entities: Entity[];
  valueObjects: ValueObject[];
  domainServices: DomainService[];
  domainEvents: DomainEvent[];
  repositories: Repository[];
  isActive: boolean;
}

export interface Entity {
  id: string;
  name: string;
  description?: string;
  aggregateId: string;
  type: 'AGGREGATE_ROOT' | 'ENTITY' | 'VALUE_OBJECT';
  attributes: EntityAttribute[];
  behaviors: EntityBehavior[];
  identity: EntityIdentity;
  isActive: boolean;
}

export interface ValueObject {
  id: string;
  name: string;
  description?: string;
  aggregateId: string;
  properties: ValueObjectProperty[];
  validation: ValueObjectValidation[];
  isActive: boolean;
}

export interface DomainService {
  id: string;
  name: string;
  description?: string;
  aggregateId: string;
  interface: ServiceInterface;
  implementation: ServiceImplementation;
  isActive: boolean;
}

export interface DomainEvent {
  id: string;
  name: string;
  description?: string;
  aggregateId: string;
  handlers: EventHandler[];
  publishers: EventPublisher[];
  isActive: boolean;
}

export interface Repository {
  id: string;
  name: string;
  description?: string;
  aggregateId: string;
  interface: RepositoryInterface;
  implementation: RepositoryImplementation;
  isActive: boolean;
}

// 支撑类型定义
export interface Stakeholder {
  id: string;
  name: string;
  description?: string;
  type: 'BUSINESS_USER' | 'TECHNICAL_USER' | 'MANAGER' | 'CUSTOMER' | 'PARTNER';
  contact?: {
    email?: string;
    phone?: string;
  };
  isActive: boolean;
}

export interface BusinessGoal {
  id: string;
  name: string;
  description?: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  metrics: Metric[];
  isActive: boolean;
}

export interface Metric {
  id: string;
  name: string;
  description?: string;
  type: 'KPI' | 'KVI' | 'CUSTOM';
  unit?: string;
  target?: number;
  isActive: boolean;
}

export interface EntityAttribute {
  id: string;
  name: string;
  description?: string;
  dataType: string;
  constraints: AttributeConstraint[];
  isRequired: boolean;
  isUnique: boolean;
  defaultValue?: any;
  isActive: boolean;
}

export interface EntityBehavior {
  id: string;
  name: string;
  description?: string;
  parameters: BehaviorParameter[];
  returnType?: string;
  businessRules: BusinessRule[];
  isActive: boolean;
}

export interface EntityIdentity {
  id: string;
  type: 'SINGLE' | 'COMPOSITE';
  attributes: string[];
  generationStrategy: 'MANUAL' | 'AUTO' | 'UUID';
  isActive: boolean;
}

export interface ValueObjectProperty {
  id: string;
  name: string;
  description?: string;
  dataType: string;
  constraints: AttributeConstraint[];
  isRequired: boolean;
  isActive: boolean;
}

export interface ValueObjectValidation {
  id: string;
  name: string;
  description?: string;
  expression: string;
  message: string;
  severity: 'ERROR' | 'WARNING' | 'INFO';
  isActive: boolean;
}

export interface ServiceInterface {
  id: string;
  name: string;
  description?: string;
  methods: ServiceMethod[];
  isActive: boolean;
}

export interface ServiceImplementation {
  id: string;
  name: string;
  description?: string;
  dependencies: ServiceDependency[];
  isActive: boolean;
}

export interface ServiceMethod {
  id: string;
  name: string;
  description?: string;
  parameters: MethodParameter[];
  returnType?: string;
  businessRules: BusinessRule[];
  isActive: boolean;
}

export interface ServiceDependency {
  id: string;
  name: string;
  type: 'REPOSITORY' | 'SERVICE' | 'EXTERNAL';
  isRequired: boolean;
  isActive: boolean;
}

export interface EventHandler {
  id: string;
  name: string;
  description?: string;
  eventType: string;
  handlerType: 'SYNCHRONOUS' | 'ASYNCHRONOUS';
  isActive: boolean;
}

export interface EventPublisher {
  id: string;
  name: string;
  description?: string;
  eventType: string;
  publishingStrategy: 'IMMEDIATE' | 'BATCH' | 'SCHEDULED';
  isActive: boolean;
}

export interface RepositoryInterface {
  id: string;
  name: string;
  description?: string;
  methods: RepositoryMethod[];
  isActive: boolean;
}

export interface RepositoryImplementation {
  id: string;
  name: string;
  description?: string;
  dataSource: string;
  isActive: boolean;
}

export interface RepositoryMethod {
  id: string;
  name: string;
  description?: string;
  parameters: MethodParameter[];
  returnType?: string;
  queryType: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';
  isActive: boolean;
}

// 通用类型定义
export interface AttributeConstraint {
  id: string;
  type: 'MIN_LENGTH' | 'MAX_LENGTH' | 'MIN_VALUE' | 'MAX_VALUE' | 'PATTERN' | 'CUSTOM';
  value: any;
  message: string;
  isActive: boolean;
}

export interface BusinessRule {
  id: string;
  name: string;
  description?: string;
  type: 'VALIDATION' | 'CALCULATION' | 'AUTHORIZATION' | 'WORKFLOW';
  expression: string;
  message: string;
  severity: 'ERROR' | 'WARNING' | 'INFO';
  isActive: boolean;
}

export interface BehaviorParameter {
  id: string;
  name: string;
  description?: string;
  dataType: string;
  isRequired: boolean;
  defaultValue?: any;
  isActive: boolean;
}

export interface MethodParameter {
  id: string;
  name: string;
  description?: string;
  dataType: string;
  isRequired: boolean;
  defaultValue?: any;
  isActive: boolean;
}

// API响应类型
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data?: T;
  timestamp: number;
  path?: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// 屏幕定义类型
export interface ScreenDefinition {
  id: string;
  name: string;
  description?: string;
  type: 'LIST' | 'FORM' | 'DETAIL' | 'DASHBOARD' | 'WORKFLOW';
  sourceAggregateId?: string;
  amisSchema: any;
  metadata: any;
  isActive: boolean;
}

// AMIS相关类型
export interface AmisSchema {
  type: string;
  [key: string]: any;
}

export interface AmisComponent {
  type: string;
  name?: string;
  label?: string;
  [key: string]: any;
}

// 用户界面状态类型
export interface AppState {
  auth: AuthState;
  project: ProjectState;
  ddd: DDDState;
  screen: ScreenState;
  generation: GenerationState;
}

export interface AuthState {
  user?: User;
  token?: string;
  isAuthenticated: boolean;
  loading: boolean;
  error?: string;
}

export interface ProjectState {
  currentProject?: ProjectMetadata;
  projects: ProjectMetadata[];
  loading: boolean;
  error?: string;
}

export interface DDDState {
  domains: Domain[];
  boundedContexts: BoundedContext[];
  aggregates: Aggregate[];
  entities: Entity[];
  currentAggregate?: Aggregate;
  loading: boolean;
  error?: string;
}

export interface ScreenState {
  screens: ScreenDefinition[];
  currentScreen?: ScreenDefinition;
  templates: ScreenTemplate[];
  loading: boolean;
  error?: string;
}

export interface GenerationState {
  tasks: GenerationTask[];
  currentTask?: GenerationTask;
  loading: boolean;
  error?: string;
}

// 支撑类型
export interface User {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  role: string;
  permissions: string[];
}

export interface ScreenTemplate {
  id: string;
  name: string;
  description?: string;
  type: string;
  template: AmisSchema;
  isSystem: boolean;
}

export interface GenerationTask {
  id: string;
  name: string;
  type: 'BACKEND' | 'FRONTEND' | 'DATABASE' | 'API_DOC';
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  configuration: any;
  result?: any;
  createdAt: string;
  updatedAt: string;
}

// 数据传输相关类型
export interface DTOField {
  id: string;
  name: string;
  type: string;
  description: string;
  isRequired: boolean;
  defaultValue: string;
  validation: string[];
  mapping: string;
  createdAt: string;
  updatedAt: string;
}

export interface DTO {
  id: string;
  name: string;
  description: string;
  domain: string;
  aggregate: string;
  entity: string;
  fields: DTOField[];
  version: string;
  status: 'draft' | 'review' | 'approved' | 'deprecated';
  createdAt: string;
  updatedAt: string;
  author: string;
}

export interface APIMethod {
  id: string;
  name: string;
  httpMethod: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  requestDTO: string;
  responseDTO: string;
  parameters: string[];
  headers: string[];
  statusCodes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface APIEndpoint {
  id: string;
  name: string;
  description: string;
  domain: string;
  boundedContext: string;
  basePath: string;
  methods: APIMethod[];
  version: string;
  status: 'draft' | 'review' | 'approved' | 'deprecated';
  createdAt: string;
  updatedAt: string;
  author: string;
}

export interface DataMapping {
  id: string;
  name: string;
  description: string;
  sourceType: 'entity' | 'dto' | 'api';
  targetType: 'entity' | 'dto' | 'api';
  sourceId: string;
  targetId: string;
  mappingRules: string[];
  transformationRules: string[];
  validationRules: string[];
  createdAt: string;
  updatedAt: string;
  author: string;
}

// 屏幕设计相关类型
export interface ScreenType {
  id: string;
  name: string;
  description: string;
  category: 'LIST' | 'FORM' | 'DETAIL' | 'DASHBOARD' | 'WORKFLOW';
  icon: string;
  features: string[];
  useCases: string[];
  complexity: 'SIMPLE' | 'MEDIUM' | 'COMPLEX';
  estimatedTime: string;
  createdAt: string;
  updatedAt: string;
  author: string;
}

export interface ScreenField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'file' | 'image';
  required: boolean;
  placeholder: string;
  validation: string[];
  options: string[];
  defaultValue: any;
  mapping: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScreenLayout {
  id: string;
  name: string;
  description: string;
  type: 'GRID' | 'FLEX' | 'CARD' | 'TAB' | 'ACCORDION' | 'STEPS';
  columns: number;
  responsive: boolean;
  spacing: number;
  padding: number;
  margin: number;
  backgroundColor: string;
  borderColor: string;
  borderRadius: number;
  shadow: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ScreenInteraction {
  id: string;
  name: string;
  type: 'CLICK' | 'HOVER' | 'FOCUS' | 'CHANGE' | 'SUBMIT' | 'RESET';
  target: string;
  action: string;
  parameters: string[];
  conditions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ScreenValidation {
  id: string;
  name: string;
  type: 'REQUIRED' | 'FORMAT' | 'LENGTH' | 'RANGE' | 'CUSTOM';
  field: string;
  rule: string;
  message: string;
  severity: 'ERROR' | 'WARNING' | 'INFO';
  createdAt: string;
  updatedAt: string;
}

// AMIS集成相关类型
export interface AmisMapping {
  id: string;
  name: string;
  description: string;
  sourceType: 'entity' | 'aggregate' | 'dto' | 'api' | 'screen';
  targetType: 'amis-component' | 'amis-page' | 'amis-form' | 'amis-table';
  sourceId: string;
  targetId: string;
  mappingRules: MappingRule[];
  transformationRules: TransformationRule[];
  validationRules: ValidationRule[];
  createdAt: string;
  updatedAt: string;
  author: string;
}

export interface MappingRule {
  id: string;
  name: string;
  sourceField: string;
  targetField: string;
  dataType: string;
  isRequired: boolean;
  defaultValue: any;
  description: string;
}

export interface TransformationRule {
  id: string;
  name: string;
  type: 'FORMAT' | 'CALCULATE' | 'CONVERT' | 'FILTER' | 'SORT';
  expression: string;
  parameters: string[];
  description: string;
}

export interface ValidationRule {
  id: string;
  name: string;
  type: 'REQUIRED' | 'FORMAT' | 'LENGTH' | 'RANGE' | 'CUSTOM';
  field: string;
  rule: string;
  message: string;
  severity: 'ERROR' | 'WARNING' | 'INFO';
}

export interface ConversionTask {
  id: string;
  name: string;
  description: string;
  sourceType: 'entity' | 'aggregate' | 'dto' | 'api';
  sourceId: string;
  targetType: 'amis-page' | 'amis-form' | 'amis-table' | 'amis-dashboard';
  mappingId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  result?: AmisSchema;
  error?: string;
  createdAt: string;
  updatedAt: string;
  author: string;
}

export interface AmisPreview {
  id: string;
  name: string;
  schema: AmisSchema;
  sourceType: string;
  sourceId: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

