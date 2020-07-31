/* eslint-disable no-console */

import {
    register
} from 'register-service-worker'
import Vue from 'vue';
let v = new Vue();
if (process.env.NODE_ENV === 'production') {
    register(`${process.env.BASE_URL}service-worker.js`, {
        ready() {
            console.log('正在加载离线缓存...')
        },
        registered() {
            console.log('程序已加载，正常使用');
        },
        cached() {
            console.log('已脱机缓存')
        },
        updatefound() {
            console.log('正在官网加载新版本...')
        },
        updated() {
            console.log('新版已准备好，请刷新后使用！')
            v.$notify.info({
                title: 'XY笔记有新版了!',
                message: '请刷新后使用！出现错误重载配置即可恢复！',
                duration: 0
            });
            // window.location.reload(true);
        },
        offline() {
            console.log('应用程序正在脱机模式下运行...')
        },
        error(error) {
            console.error('注册时出错：', error)
        }
    })
}