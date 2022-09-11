import { Component, VNode, VueConstructor } from 'vue';

// 长按指令
export default {
  install(
    Vue: VueConstructor,
    options = {
      time: 500,
    }
  ): void {
    Vue.directive('longPress', {
      bind: function (el: Element, binding, vNode: VNode) {
        // 确保提供的表达式是函数
        if (typeof binding.value !== 'function') {
          // 获取组件名称
          const compName = (vNode.context as Component)?.name;
          // 将警告传递给控制台
          let warn = `[longpress:] provided expression '${binding.expression}' is not afunction, but has to be `;
          if (compName) {
            warn += `Found in component '${compName}' `;
          }
          console.warn(warn);
        }
        // 定义变量
        let pressTimer: number | null = null;
        // 定义函数处理程序
        // 创建计时器（ 1秒后执行函数 ）
        const start = (e: PointerEvent | Event) => {
          if (e.type === 'click' && (e as PointerEvent).button !== 0) {
            return;
          }
          if (pressTimer === null) {
            pressTimer = window.setTimeout(() => {
              // 执行函数
              handler(e);
            }, options.time);
          }
        };
        // 取消计时器
        const cancel = () => {
          // 检查计时器是否有值
          if (pressTimer !== null) {
            clearTimeout(pressTimer);
            pressTimer = null;
          }
        };
        // 运行函数
        const handler = (e: Event) => {
          // 执行传递给指令的方法
          binding.value(e);
        };
        // 添加事件监听器
        el.addEventListener('mousedown', start);
        el.addEventListener('touchstart', start);
        // 取消计时器
        el.addEventListener('click', cancel);
        el.addEventListener('mouseout', cancel);
        el.addEventListener('touchend', cancel);
        el.addEventListener('touchmove', cancel);
        el.addEventListener('touchcancel', cancel);
      },
    });
  },
};
