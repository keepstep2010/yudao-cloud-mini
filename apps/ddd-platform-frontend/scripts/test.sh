#!/bin/bash

# DDD驱动开发平台前端 - 测试脚本

set -e

echo "🧪 运行DDD驱动开发平台前端测试..."

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

# 运行单元测试
run_unit_tests() {
    echo "🧪 运行单元测试..."
    npm run test:coverage
    
    if [ $? -eq 0 ]; then
        echo "✅ 单元测试通过"
    else
        echo "❌ 单元测试失败"
        exit 1
    fi
}

# 运行代码检查
run_lint() {
    echo "🔍 运行代码检查..."
    npm run lint
    
    if [ $? -eq 0 ]; then
        echo "✅ 代码检查通过"
    else
        echo "❌ 代码检查失败"
        exit 1
    fi
}

# 运行类型检查
run_type_check() {
    echo "🔍 运行类型检查..."
    npm run type-check
    
    if [ $? -eq 0 ]; then
        echo "✅ 类型检查通过"
    else
        echo "❌ 类型检查失败"
        exit 1
    fi
}

# 运行构建测试
run_build_test() {
    echo "🏗️ 运行构建测试..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ 构建测试通过"
    else
        echo "❌ 构建测试失败"
        exit 1
    fi
}

# 显示测试报告
show_test_report() {
    echo ""
    echo "📊 测试报告:"
    echo "  单元测试: ✅ 通过"
    echo "  代码检查: ✅ 通过"
    echo "  类型检查: ✅ 通过"
    echo "  构建测试: ✅ 通过"
    echo ""
    
    if [ -f "coverage/lcov-report/index.html" ]; then
        echo "📈 覆盖率报告: coverage/lcov-report/index.html"
    fi
    
    echo "🎉 所有测试通过！"
}

# 主函数
main() {
    check_environment
    check_dependencies
    run_unit_tests
    run_lint
    run_type_check
    run_build_test
    show_test_report
}

# 运行主函数
main "$@"




