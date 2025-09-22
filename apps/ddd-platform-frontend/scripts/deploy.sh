#!/bin/bash

# DDD驱动开发平台前端 - 部署脚本

set -e

echo "🚀 部署DDD驱动开发平台前端..."

# 配置
ENVIRONMENT=${1:-production}
DOCKER_IMAGE="ddd-platform-frontend"
DOCKER_TAG="latest"
REGISTRY="ghcr.io"

# 检查环境
check_environment() {
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker未安装，请先安装Docker"
        exit 1
    fi
    
    if ! command -v kubectl &> /dev/null; then
        echo "⚠️  kubectl未安装，将跳过Kubernetes部署"
    fi
    
    echo "✅ 环境检查通过"
}

# 构建Docker镜像
build_docker_image() {
    echo "🐳 构建Docker镜像..."
    
    # 构建镜像
    docker build -t $DOCKER_IMAGE:$DOCKER_TAG .
    
    if [ $? -eq 0 ]; then
        echo "✅ Docker镜像构建成功"
    else
        echo "❌ Docker镜像构建失败"
        exit 1
    fi
}

# 标记镜像
tag_docker_image() {
    echo "🏷️  标记Docker镜像..."
    
    docker tag $DOCKER_IMAGE:$DOCKER_TAG $REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG
    
    if [ $? -eq 0 ]; then
        echo "✅ Docker镜像标记成功"
    else
        echo "❌ Docker镜像标记失败"
        exit 1
    fi
}

# 推送镜像
push_docker_image() {
    echo "📤 推送Docker镜像..."
    
    docker push $REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG
    
    if [ $? -eq 0 ]; then
        echo "✅ Docker镜像推送成功"
    else
        echo "❌ Docker镜像推送失败"
        exit 1
    fi
}

# 部署到Kubernetes
deploy_to_kubernetes() {
    if command -v kubectl &> /dev/null; then
        echo "☸️  部署到Kubernetes..."
        
        # 创建命名空间
        kubectl create namespace ddd-platform --dry-run=client -o yaml | kubectl apply -f -
        
        # 部署应用
        kubectl apply -f k8s/ -n ddd-platform
        
        if [ $? -eq 0 ]; then
            echo "✅ Kubernetes部署成功"
        else
            echo "❌ Kubernetes部署失败"
            exit 1
        fi
    else
        echo "⚠️  跳过Kubernetes部署"
    fi
}

# 部署到Docker Compose
deploy_to_docker_compose() {
    echo "🐳 部署到Docker Compose..."
    
    # 停止现有容器
    docker-compose down
    
    # 启动新容器
    docker-compose up -d
    
    if [ $? -eq 0 ]; then
        echo "✅ Docker Compose部署成功"
    else
        echo "❌ Docker Compose部署失败"
        exit 1
    fi
}

# 验证部署
verify_deployment() {
    echo "🔍 验证部署..."
    
    # 检查容器状态
    if docker ps | grep -q $DOCKER_IMAGE; then
        echo "✅ 容器运行正常"
    else
        echo "❌ 容器未运行"
        exit 1
    fi
    
    # 检查服务健康状态
    sleep 10
    if curl -f http://localhost:80/health > /dev/null 2>&1; then
        echo "✅ 服务健康检查通过"
    else
        echo "❌ 服务健康检查失败"
        exit 1
    fi
}

# 显示部署信息
show_deployment_info() {
    echo ""
    echo "🎉 部署完成！"
    echo ""
    echo "📊 部署信息:"
    echo "  环境: $ENVIRONMENT"
    echo "  镜像: $REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG"
    echo "  访问地址: http://localhost:80"
    echo "  健康检查: http://localhost:80/health"
    echo ""
    echo "🔧 管理命令:"
    echo "  查看日志: docker-compose logs -f"
    echo "  停止服务: docker-compose down"
    echo "  重启服务: docker-compose restart"
    echo "  更新服务: docker-compose pull && docker-compose up -d"
    echo ""
}

# 主函数
main() {
    check_environment
    build_docker_image
    tag_docker_image
    push_docker_image
    
    if [ "$ENVIRONMENT" = "production" ]; then
        deploy_to_kubernetes
    else
        deploy_to_docker_compose
    fi
    
    verify_deployment
    show_deployment_info
}

# 运行主函数
main "$@"




