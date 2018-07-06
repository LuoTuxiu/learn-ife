## 任务 2 笔记

### 1.div + img ，容易出现 div 元素下方有 3px 的空白

首先参考：

[张鑫旭的《CSS 深入理解 vertical-align 和 line-height 的基友关系》](https://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/)

[关于 BFC](https://zhuanlan.zhihu.com/p/25321647)

[如何清除 img 导致的底部间隙](https://juejin.im/post/5b3e15d0f265da0f7e6268e4)

### 2.关于 form 表单的对齐实现方式

因为是两列，可以考虑用 table，两列，左边右对齐，右边左对齐。  但是要注意一点：

> 要实现顶部对齐，可以使用 vertical-align:top
