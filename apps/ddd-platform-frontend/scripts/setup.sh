#!/bin/bash

# DDD驱动开发平台前端 - 环境设置脚本
# 适用于macOS/Linux环境

set -e

echo "🚀 开始设置DDD驱动开发平台前端环境..."

# 检查Node.js版本
check_node_version() {
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js未安装，请先安装Node.js 18+"
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 16 ]; then
        echo "❌ Node.js版本过低，需要16+，当前版本: $(node -v)"
        exit 1
    fi
    
    echo "✅ Node.js版本检查通过: $(node -v)"
}

# 检查npm版本
check_npm_version() {
    if ! command -v npm &> /dev/null; then
        echo "❌ npm未安装"
        exit 1
    fi
    
    NPM_VERSION=$(npm -v | cut -d'.' -f1)
    if [ "$NPM_VERSION" -lt 8 ]; then
        echo "❌ npm版本过低，需要8+，当前版本: $(npm -v)"
        exit 1
    fi
    
    echo "✅ npm版本检查通过: $(npm -v)"
}

# 安装依赖
install_dependencies() {
    echo "📦 安装项目依赖..."
    npm install
    echo "✅ 依赖安装完成"
}

# 设置Git钩子
setup_git_hooks() {
    echo "🔧 设置Git钩子..."
    
    # 安装husky
    npm install --save-dev husky
    
    # 设置pre-commit钩子
    npx husky add .husky/pre-commit "npm run lint && npm run type-check"
    
    # 设置commit-msg钩子
    npx husky add .husky/commit-msg "npx --no -- commitlint --edit \$1"
    
    echo "✅ Git钩子设置完成"
}

# 设置commitlint
setup_commitlint() {
    echo "📝 设置commitlint..."
    
    # 安装commitlint
    npm install --save-dev @commitlint/cli @commitlint/config-conventional
    
    # 创建commitlint配置文件
    cat > commitlint.config.js << EOF
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'ci',
        'build',
        'revert'
      ]
    ],
    'subject-case': [2, 'never', ['pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never']
  }
};
EOF
    
    echo "✅ commitlint设置完成"
}

# 创建环境配置文件
create_env_files() {
    echo "⚙️ 创建环境配置文件..."
    
    # 创建.env文件
    cat > .env << EOF
# 开发环境配置
VITE_API_BASE_URL=http://127.0.0.1:8100
VITE_APP_TITLE=DDD驱动开发平台
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development
EOF
    
    # 创建.env.local文件
    cat > .env.local << EOF
# 本地环境配置（不提交到Git）
# 在这里添加本地特定的配置
EOF
    
    # 创建.env.production文件
    cat > .env.production << EOF
# 生产环境配置
VITE_API_BASE_URL=https://api.ddd-platform.com
VITE_APP_TITLE=DDD驱动开发平台
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=production
EOF
    
    echo "✅ 环境配置文件创建完成"
}

# 创建开发脚本
create_dev_scripts() {
    echo "📜 创建开发脚本..."
    
    # 创建start-dev.sh
    cat > start-dev.sh << 'EOF'
#!/bin/bash
echo "🚀 启动DDD驱动开发平台前端开发服务器..."
npm run dev
EOF
    chmod +x start-dev.sh
    
    # 创建build-prod.sh
    cat > build-prod.sh << 'EOF'
#!/bin/bash
echo "🏗️ 构建生产版本..."
npm run build
echo "✅ 构建完成，输出目录: dist/"
EOF
    chmod +x build-prod.sh
    
    # 创建test-all.sh
    cat > test-all.sh << 'EOF'
#!/bin/bash
echo "🧪 运行所有测试..."
npm run test:coverage
echo "✅ 测试完成"
EOF
    chmod +x test-all.sh
    
    echo "✅ 开发脚本创建完成"
}

# 验证设置
verify_setup() {
    echo "🔍 验证设置..."
    
    # 检查package.json脚本
    if npm run --silent 2>/dev/null | grep -q "dev"; then
        echo "✅ 开发脚本可用"
    else
        echo "❌ 开发脚本不可用"
        exit 1
    fi
    
    # 检查TypeScript配置
    if [ -f "tsconfig.json" ]; then
        echo "✅ TypeScript配置存在"
    else
        echo "❌ TypeScript配置不存在"
        exit 1
    fi
    
    # 检查Vite配置
    if [ -f "vite.config.ts" ]; then
        echo "✅ Vite配置存在"
    else
        echo "❌ Vite配置不存在"
        exit 1
    fi
    
    echo "✅ 设置验证完成"
}

# 显示完成信息
show_completion_info() {
    echo ""
    echo "🎉 DDD驱动开发平台前端环境设置完成！"
    echo ""
    echo "📋 可用的命令："
    echo "  npm run dev          - 启动开发服务器"
    echo "  npm run build        - 构建生产版本"
    echo "  npm run preview      - 预览生产版本"
    echo "  npm run test         - 运行测试"
    echo "  npm run lint         - 代码检查"
    echo "  npm run type-check   - 类型检查"
    echo ""
    echo "📜 可用的脚本："
    echo "  ./start-dev.sh       - 启动开发服务器"
    echo "  ./build-prod.sh      - 构建生产版本"
    echo "  ./test-all.sh        - 运行所有测试"
    echo ""
    echo "🔗 相关文档："
    echo "  docs/DEVELOPMENT_PLAN.md     - 开发计划"
    echo "  docs/ARCHITECTURE_DESIGN.md  - 架构设计"
    echo "  docs/IMPLEMENTATION_GUIDE.md - 实施指南"
    echo "  docs/API_INTEGRATION_PLAN.md - API集成计划"
    echo ""
    echo "🚀 开始开发："
    echo "  npm run dev"
    echo ""
}

# 主函数
main() {
    check_node_version
    check_npm_version
    install_dependencies
    setup_git_hooks
    setup_commitlint
    create_env_files
    create_dev_scripts
    verify_setup
    show_completion_info
}

# 运行主函数
main "$@"




