#!/bin/bash

# 修改版本号
./build/build-version.sh $1

# 检查是否提供了命令行参数
if [ "$#" -ne 1 ]; then
    echo "[error] 缺少版本号！"
    exit 1
fi
echo "[info] 正在打包版本: $1"

# 读取变量
read -e -p "是否执行生产环境打包脚本？(yes/no): " production

# 默认是
if [[ -z $production ]]; then
    production="no"
fi

if [[ $production == "yes" ]]; then
    echo "开始生产环境打包"
else
    echo "开始sit环境打包"
fi

# 项目地址
process_directory=$(pwd)

# 产物地址
productDir="$process_directory/release/web/$1"
echo "[info] 产物地址: $productDir"

# 检查 build 文件夹是否存在
if [ ! -d $productDir ]; then
    # 如果不存在，则创建 build 文件夹
    mkdir -p $productDir
else
    rm -rf $productDir
    mkdir -p $productDir
fi

# 打包web应用
echo "开始打包依赖..."
pnpm --stream -r --filter=!@xynotes/web  build
echo "打包依赖结束"

# 打包应用
if [[ $production == "yes" ]]; then
    echo "打包生产web程序..."
    cd $process_directory/packages/web
    pnpm build
else
    echo "打包测试web程序..."
    cd $process_directory/packages/web
    pnpm build:sit
fi

echo "打包web程序结束"

# 判断是否正确打包
if [ $? -ne 0 ]; then
    echo "[error] web打包失败！"
    exit 1
fi

# 产物地址
dist="$process_directory/packages/web/dist"

# 判断产物是否存在
if [ ! -d $dist ]; then
    echo "[error] 产物不存在！"
    exit 1
fi

# 复制产物到build文件夹
cp -r $dist/* $productDir

# 读取配置文件路径
config_file="$process_directory/.config/.conf.ini"

# 判断config文件存在
if [ ! -f $config_file ]; then
    echo "[info] 配置不存在，不需要上传，打包结束"
    exit 0
fi

# 判断是不是生产环境
if [[ $production == "yes" ]]; then
    PRD_HOST_URL=$(grep -w "PRD_HOST_URL" $config_file | sed -n "s/.*PRD_HOST_URL=\(.*\)/\1/p")
    echo "[info] 生产上传地址: $PRD_HOST_URL"
    rsync -av -e "ssh -p 22 -i $process_directory/.config/prd-ssh.key" --prune-empty-dirs "$productDir/" "$PRD_HOST_URL"
else
    SIT_HOST_URL=$(grep -w "SIT_HOST_URL" $config_file | sed -n "s/.*SIT_HOST_URL=\(.*\)/\1/p")
    echo "[info] 测试上传地址: $SIT_HOST_URL"
    rsync -av -e "ssh -p 22 -i $process_directory/.config/sit-ssh.key" --prune-empty-dirs "$productDir/" "$SIT_HOST_URL"
fi

# 检查 rsync 是否成功
if [ $? -eq 0 ]; then
    echo "上传成功"
else
    echo "上传失败"
fi
