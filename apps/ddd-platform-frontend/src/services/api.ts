import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../stores';
import type {
  PageResponse,
  ProjectMetadata,
  Domain,
  BoundedContext,
  Aggregate,
  Entity,
  ScreenDefinition,
  ScreenTemplate,
  GenerationTask,
} from '../types';

// 基础API配置
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
    // 项目管理API
    getProjects: builder.query<PageResponse<ProjectMetadata>, { page?: number; size?: number }>({
      query: ({ page = 0, size = 10 }) => `projects?page=${page}&size=${size}`,
      providesTags: ['Project'],
    }),
    getProject: builder.query<ProjectMetadata, string>({
      query: (id) => `projects/${id}`,
      providesTags: (result, error, id) => [{ type: 'Project', id }],
    }),
    createProject: builder.mutation<ProjectMetadata, Partial<ProjectMetadata>>({
      query: (project) => ({
        url: 'projects',
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation<ProjectMetadata, ProjectMetadata>({
      query: ({ id, ...project }) => ({
        url: `projects/${id}`,
        method: 'PUT',
        body: project,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Project', id }],
    }),
    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),

    // 领域管理API
    getDomains: builder.query<Domain[], string>({
      query: (projectId) => `projects/${projectId}/domains`,
      providesTags: ['Domain'],
    }),
    getDomain: builder.query<Domain, { projectId: string; id: string }>({
      query: ({ projectId, id }) => `projects/${projectId}/domains/${id}`,
      providesTags: (result, error, { id }) => [{ type: 'Domain', id }],
    }),
    createDomain: builder.mutation<Domain, { projectId: string; domain: Partial<Domain> }>({
      query: ({ projectId, domain }) => ({
        url: `projects/${projectId}/domains`,
        method: 'POST',
        body: domain,
      }),
      invalidatesTags: ['Domain'],
    }),
    updateDomain: builder.mutation<Domain, { projectId: string; domain: Domain }>({
      query: ({ projectId, domain }) => ({
        url: `projects/${projectId}/domains/${domain.id}`,
        method: 'PUT',
        body: domain,
      }),
      invalidatesTags: (result, error, { domain }) => [{ type: 'Domain', id: domain.id }],
    }),
    deleteDomain: builder.mutation<void, { projectId: string; id: string }>({
      query: ({ projectId, id }) => ({
        url: `projects/${projectId}/domains/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Domain'],
    }),

    // 限界上下文管理API
    getBoundedContexts: builder.query<BoundedContext[], string>({
      query: (projectId) => `projects/${projectId}/bounded-contexts`,
      providesTags: ['BoundedContext'],
    }),
    getBoundedContext: builder.query<BoundedContext, { projectId: string; id: string }>({
      query: ({ projectId, id }) => `projects/${projectId}/bounded-contexts/${id}`,
      providesTags: (result, error, { id }) => [{ type: 'BoundedContext', id }],
    }),
    createBoundedContext: builder.mutation<BoundedContext, { projectId: string; context: Partial<BoundedContext> }>({
      query: ({ projectId, context }) => ({
        url: `projects/${projectId}/bounded-contexts`,
        method: 'POST',
        body: context,
      }),
      invalidatesTags: ['BoundedContext'],
    }),
    updateBoundedContext: builder.mutation<BoundedContext, { projectId: string; context: BoundedContext }>({
      query: ({ projectId, context }) => ({
        url: `projects/${projectId}/bounded-contexts/${context.id}`,
        method: 'PUT',
        body: context,
      }),
      invalidatesTags: (result, error, { context }) => [{ type: 'BoundedContext', id: context.id }],
    }),
    deleteBoundedContext: builder.mutation<void, { projectId: string; id: string }>({
      query: ({ projectId, id }) => ({
        url: `projects/${projectId}/bounded-contexts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BoundedContext'],
    }),

    // 聚合管理API
    getAggregates: builder.query<Aggregate[], string>({
      query: (projectId) => `projects/${projectId}/aggregates`,
      providesTags: ['Aggregate'],
    }),
    getAggregate: builder.query<Aggregate, { projectId: string; id: string }>({
      query: ({ projectId, id }) => `projects/${projectId}/aggregates/${id}`,
      providesTags: (result, error, { id }) => [{ type: 'Aggregate', id }],
    }),
    createAggregate: builder.mutation<Aggregate, { projectId: string; aggregate: Partial<Aggregate> }>({
      query: ({ projectId, aggregate }) => ({
        url: `projects/${projectId}/aggregates`,
        method: 'POST',
        body: aggregate,
      }),
      invalidatesTags: ['Aggregate'],
    }),
    updateAggregate: builder.mutation<Aggregate, { projectId: string; aggregate: Aggregate }>({
      query: ({ projectId, aggregate }) => ({
        url: `projects/${projectId}/aggregates/${aggregate.id}`,
        method: 'PUT',
        body: aggregate,
      }),
      invalidatesTags: (result, error, { aggregate }) => [{ type: 'Aggregate', id: aggregate.id }],
    }),
    deleteAggregate: builder.mutation<void, { projectId: string; id: string }>({
      query: ({ projectId, id }) => ({
        url: `projects/${projectId}/aggregates/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Aggregate'],
    }),

    // 实体管理API
    getEntities: builder.query<Entity[], string>({
      query: (projectId) => `projects/${projectId}/entities`,
      providesTags: ['Entity'],
    }),
    getEntity: builder.query<Entity, { projectId: string; id: string }>({
      query: ({ projectId, id }) => `projects/${projectId}/entities/${id}`,
      providesTags: (result, error, { id }) => [{ type: 'Entity', id }],
    }),
    createEntity: builder.mutation<Entity, { projectId: string; entity: Partial<Entity> }>({
      query: ({ projectId, entity }) => ({
        url: `projects/${projectId}/entities`,
        method: 'POST',
        body: entity,
      }),
      invalidatesTags: ['Entity'],
    }),
    updateEntity: builder.mutation<Entity, { projectId: string; entity: Entity }>({
      query: ({ projectId, entity }) => ({
        url: `projects/${projectId}/entities/${entity.id}`,
        method: 'PUT',
        body: entity,
      }),
      invalidatesTags: (result, error, { entity }) => [{ type: 'Entity', id: entity.id }],
    }),
    deleteEntity: builder.mutation<void, { projectId: string; id: string }>({
      query: ({ projectId, id }) => ({
        url: `projects/${projectId}/entities/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Entity'],
    }),

    // 屏幕管理API
    getScreens: builder.query<ScreenDefinition[], string>({
      query: (projectId) => `projects/${projectId}/screens`,
      providesTags: ['Screen'],
    }),
    getScreen: builder.query<ScreenDefinition, { projectId: string; id: string }>({
      query: ({ projectId, id }) => `projects/${projectId}/screens/${id}`,
      providesTags: (result, error, { id }) => [{ type: 'Screen', id }],
    }),
    createScreen: builder.mutation<ScreenDefinition, { projectId: string; screen: Partial<ScreenDefinition> }>({
      query: ({ projectId, screen }) => ({
        url: `projects/${projectId}/screens`,
        method: 'POST',
        body: screen,
      }),
      invalidatesTags: ['Screen'],
    }),
    updateScreen: builder.mutation<ScreenDefinition, { projectId: string; screen: ScreenDefinition }>({
      query: ({ projectId, screen }) => ({
        url: `projects/${projectId}/screens/${screen.id}`,
        method: 'PUT',
        body: screen,
      }),
      invalidatesTags: (result, error, { screen }) => [{ type: 'Screen', id: screen.id }],
    }),
    deleteScreen: builder.mutation<void, { projectId: string; id: string }>({
      query: ({ projectId, id }) => ({
        url: `projects/${projectId}/screens/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Screen'],
    }),
    generateScreen: builder.mutation<ScreenDefinition, { projectId: string; aggregateId: string; screenType: string }>({
      query: ({ projectId, aggregateId, screenType }) => ({
        url: `projects/${projectId}/screens/generate`,
        method: 'POST',
        body: { aggregateId, screenType },
      }),
      invalidatesTags: ['Screen'],
    }),

    // 屏幕模板API
    getScreenTemplates: builder.query<ScreenTemplate[], void>({
      query: () => 'screen-templates',
      providesTags: ['Template'],
    }),
    getScreenTemplate: builder.query<ScreenTemplate, string>({
      query: (id) => `screen-templates/${id}`,
      providesTags: (result, error, id) => [{ type: 'Template', id }],
    }),

    // 代码生成API
    getGenerationTasks: builder.query<GenerationTask[], string>({
      query: (projectId) => `projects/${projectId}/generation/tasks`,
      providesTags: ['GenerationTask'],
    }),
    getGenerationTask: builder.query<GenerationTask, { projectId: string; id: string }>({
      query: ({ projectId, id }) => `projects/${projectId}/generation/tasks/${id}`,
      providesTags: (result, error, { id }) => [{ type: 'GenerationTask', id }],
    }),
    createGenerationTask: builder.mutation<GenerationTask, { projectId: string; task: Partial<GenerationTask> }>({
      query: ({ projectId, task }) => ({
        url: `projects/${projectId}/generation/tasks`,
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['GenerationTask'],
    }),
    deleteGenerationTask: builder.mutation<void, { projectId: string; id: string }>({
      query: ({ projectId, id }) => ({
        url: `projects/${projectId}/generation/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['GenerationTask'],
    }),
  }),
});

export const {
  // 项目管理
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  // 领域管理
  useGetDomainsQuery,
  useGetDomainQuery,
  useCreateDomainMutation,
  useUpdateDomainMutation,
  useDeleteDomainMutation,
  // 限界上下文管理
  useGetBoundedContextsQuery,
  useGetBoundedContextQuery,
  useCreateBoundedContextMutation,
  useUpdateBoundedContextMutation,
  useDeleteBoundedContextMutation,
  // 聚合管理
  useGetAggregatesQuery,
  useGetAggregateQuery,
  useCreateAggregateMutation,
  useUpdateAggregateMutation,
  useDeleteAggregateMutation,
  // 实体管理
  useGetEntitiesQuery,
  useGetEntityQuery,
  useCreateEntityMutation,
  useUpdateEntityMutation,
  useDeleteEntityMutation,
  // 屏幕管理
  useGetScreensQuery,
  useGetScreenQuery,
  useCreateScreenMutation,
  useUpdateScreenMutation,
  useDeleteScreenMutation,
  useGenerateScreenMutation,
  // 屏幕模板
  useGetScreenTemplatesQuery,
  useGetScreenTemplateQuery,
  // 代码生成
  useGetGenerationTasksQuery,
  useGetGenerationTaskQuery,
  useCreateGenerationTaskMutation,
  useDeleteGenerationTaskMutation,
} = api;
