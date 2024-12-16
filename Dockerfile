# 使用Node.js官方镜像作为基础镜像
FROM node:14
# 设置工作目录
WORKDIR /app
# 切换 Yarn 注册表到淘宝镜像源或其他镜像源
RUN npm config set registry https://registry.npmmirror.com -g
# 将当前项目的代码复制到容器内
COPY . /app
# 安装项目依赖
RUN npm install
# 打包项目
#RUN npm run build
# 暴露端口
EXPOSE 8080
# 启动项目
CMD ["npm", "run", "serve"]
