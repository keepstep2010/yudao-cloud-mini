#!/bin/bash

# DDD驱动开发平台前端 - 构建脚本

set -e

echo "🏗️ 构建DDD驱动开发平台前端..."

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

# 清理构建目录
clean_build() {
    echo "🧹 清理构建目录..."
    if [ -d "dist" ]; then
        rm -rf dist
    fi
    echo "✅ 构建目录清理完成"
}

# 运行代码检查
run_lint() {
    echo "🔍 运行代码检查..."
    npm run lint
    echo "✅ 代码检查通过"
}

# 运行类型检查
run_type_check() {
    echo "🔍 运行类型检查..."
    npm run type-check
    echo "✅ 类型检查通过"
}

# 运行测试
run_tests() {
    echo "🧪 运行测试..."
    npm run test:coverage
    echo "✅ 测试通过"
}

# 构建应用
build_app() {
    echo "🏗️ 构建应用..."
    npm run build
    
    if [ -d "dist" ]; then
        echo "✅ 构建成功"
        echo "📁 构建输出目录: dist/"
        
        # 显示构建信息
        echo ""
        echo "📊 构建信息:"
        echo "  总文件数: $(find dist -type f | wc -l)"
        echo "  总大小: $(du -sh dist | cut -f1)"
        echo ""
        
        # 显示主要文件
        echo "📄 主要文件:"
        find dist -name "*.js" -o -name "*.css" -o -name "*.html" | head -10 | while read file; do
            size=$(du -h "$file" | cut -f1)
            echo "  $file ($size)"
        done
    else
        echo "❌ 构建失败"
        exit 1
    fi
}

# 验证构建
verify_build() {
    echo "🔍 验证构建..."
    
    # 检查index.html
    if [ -f "dist/index.html" ]; then
        echo "✅ index.html存在"
    else
        echo "❌ index.html不存在"
        exit 1
    fi
    
    # 检查主要JS文件
    if [ -f "dist/assets/index-*.js" ]; then
        echo "✅ 主要JS文件存在"
    else
        echo "❌ 主要JS文件不存在"
        exit 1
    fi
    
    # 检查主要CSS文件
    if [ -f "dist/assets/index-*.css" ]; then
        echo "✅ 主要CSS文件存在"
    else
        echo "❌ 主要CSS文件不存在"
        exit 1
    fi
    
    echo "✅ 构建验证通过"
}

# 显示完成信息
show_completion_info() {
    echo ""
    echo "🎉 构建完成！"
    echo ""
    echo "📁 构建输出目录: dist/"
    echo "🌐 预览构建结果: npm run preview"
    echo "🐳 Docker构建: docker build -t ddd-platform-frontend ."
    echo "📦 部署到服务器: 将dist/目录内容上传到Web服务器"
    echo ""
}

# 主函数
main() {
    check_environment
    check_dependencies
    clean_build
    run_lint
    run_type_check
    run_tests
    build_app
    verify_build
    show_completion_info
}

# 运行主函数
main "$@"




