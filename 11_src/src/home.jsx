//  第12节 - Provider-and-connect.js

//  我们但教程几乎结束了，唯一在回顾Redux时留下的一块是：
// 我们怎样读取我们的store state并且我们是如何dispatch 这些action的？

// 这两个问题我们可以用一个react-redux绑定组件来回答：connect。

// 就像我们之前解释的那样。当用我们的Provider component我们允许所有的应用中的
// components进入我们的Redux。但是这种进入是用到了我们未被写入文档的特性"React's context".
// 不建议你使用这种React的黑科技。React-Redux暴露了一个函数，你可以通过此用在你的Component上。

// 这个函数就是我们所说的"connect"。这可以用你的Redux store让其直接连接到你的component上
// 它用component's 的prop来提供你store 的dispatch函数方法。
// 并且加各种参数来传递你想要的store state部分。

// 使用connect，用一点点代码的改变变便可以写出逆天的代码和华丽的组件。
// (https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).

// "connect"是一个传入一些匹配函数作为参数并返回我们所期望的函数。
// 你想要链接的一个存在的组件类。connect会被更高级别的组件上被调用（HOC）
// HOC是一种函数是设计模式。为输入(component， store)增加一些效果和行为。没有用任何继承。
// 这种React的应用构建方式却会通过类似继承方式为这些组件进行支持。（实际上React的应用是没什么限制的）
// 了解更多关于HOCs和composition在这里。
// https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.lpp7we7mx
// http://natpryce.com/articles/000814.html

// connect HOC被设计用来支持各种用例。从极简到极复杂。
// 在最近的例子中，我们不会去用connect的极复杂模式。
// 但是你能够在这里找到完整的connect API文档
// https://github.com/rackt/react-redux/blob/v4.0.0/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options

// 这里有完整的connect参数。
// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
// 这里有使用的方式
// /*
//   const wrappedComponentClass = connect(...)(ComponentClass)
// */

// 我们将关注点放在第一个connect的参数上 mapStateToProps

// 作为"connect"的第一个参数。是一个选取哪一部分的state是你想要为你的component提供数据的。
// 这个函数的逻辑叫做"selector"并且接收了两个参数：
// store中的state和你component的current props。
// 你会在下面看的我们将其命名为 mapStateToProps。这是一个能够很清晰解释这个函数能够做什么的有
// 语意的名字。它匹配state和一些组件的props（阅读“extracts some of”）

// compnent的同样提供了一些参数来提供一些用prop值摘取一部分state的场景（比如 state.items[props.someID]）.
// mapStateToProps期望你能返回一个给使用的component的props（一般是一个对象字面量）
// 最终会在返回props前接收到你转换过的state
// 你可以看看下面这个connect的最简单大用例（仅仅是在component 类定义后）

import React from 'react'
import { connect } from 'react-redux'

// 我们用es6的import的一个小手段获取所有的action creator返回一个类似字典结构的用于reducers。
// 假如你还不知道，移步到我们的action creator(./action-creatrs.js)看一看
import * as actionCreators from './action-creators'

class Home extends React.Component {
	onTimeButtonClick (delay) {
		// 这个按钮将会处理从用户的一个点击事件里面dispatch的一个action
		// 我们这里用到了connect提供的一个prop来自动的dispatch
		// 有很多方式去调用已经绑定准备去dispatch的actionCreators
		// 意味着需要给connect第二个参数
		// https://github.com/rackt/react-redux/blob/v4.0.0/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
		// delay值是我们给actionCreators中getTime的一个延时接受异步请求的时间值。
		// 试试改变这个值来验证我们能否影响到我们的UI
		this.props.dispatch(actionCreators.getTime(delay));
	}
	render () {
		
	}
}

