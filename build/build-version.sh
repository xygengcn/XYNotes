#!/bin/bash

# 定义一个包含多个 package.json 文件路径的数组
json_files=("packages/web/package.json" "packages/tauri/package.json" "packages/tauri/tauri.conf.json")

# 检查是否提供了命令行参数
if [ "$#" -ne 1 ]; then
    echo "[error] Usage: $0 new version"
    exit 1
fi

# 获取命令行参数作为新版本号
new_version="$1"

# 遍历数组中的每个文件路径
for file in "${json_files[@]}"; do
    # 使用 jq 更新 version 字段
    jq --arg new_version "$new_version" '.version = $new_version' "$file" >temp.json && mv temp.json "$file"
done

echo "All package.json files have been updated to version $new_version."
