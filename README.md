# 知识付费平台的SAAS平台

一个SAAS的知识付费平台,使用nestjs+mongoDB+VUE3创作的一个SAAS知识付费平台，目前只完成了一部分，未完成H5

## 如何使用
**admin**：项目的后端部分 

**saas-exam-admin**：项目的前端部分


## 技术栈
- nestjs
- mongodb
- vue3
- axios
- tdesign (ui框架)
- 七牛云上传


## 启动
前端启动
```
    cd saas-exam-admin
    yarn || npm install || pnpm install
    yarn dev 
```
后端启动
先创建.env文件，因为涉及登录和上传，上传使用的是七牛云上传
可以根据.env.example来进行填写。
```
    cd admin 
    yarn
    nest start -w admin  启动后端项目
```

<!-- ## 目前编写的功能 -->

