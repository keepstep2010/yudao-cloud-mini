#!/bin/bash

# DDD驱动开发平台前端 - 开发服务器启动脚本

set -e

echo "🚀 启动DDD驱动开发平台前端开发服务器..."

# 检查环境
check_environment() {
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js未安装，请先安装Node.js 18+"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo "❌ npm未安装"
        exit 1
    fi
    
    echo "✅ 环境检查通过"
}

# 检查依赖
check_dependencies() {
    if [ ! -d "node_modules" ]; then
        echo "📦 安装依赖..."
        npm install
    else
        echo "✅ 依赖已安装"
    fi
}

# 启动开发服务器
start_dev_server() {
    echo "🌐 启动开发服务器..."
    echo "📍 访问地址: http://localhost:5173"
    echo "📱 移动端预览: http://localhost:5173?mobile=true"
    echo ""
    echo "按 Ctrl+C 停止服务器"
    echo ""
    
    npm run dev
}

# 主函数
main() {
    check_environment
    check_dependencies
    start_dev_server
}

# 运行主函数
main "$@"




