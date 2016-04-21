// 第二节 about-state-and-meet-redux.js

// 有的时候在我们应用中操作的action不仅仅需要通知到我们同样需要告诉我们数据被更新了。


// 这是在任何app中极大的挑战。
// 我们怎样在我们应用的生命周期中保存数据？
// 我们怎样去操作这些数据的变化？
// 我们怎样去照顾到一个变化在应用中所有涉及的部分？

// 让我们开始Redux

// Redux (https://github.com/rackt/redux) 是一个可预知state的JavaScript应用容器

// 让我们回顾上面的问题并且回答他们。
// Redux 术语（flux术语比其内容更多）
// a.我们怎样在我们应用的生命周期中保存数据？
//   以你想用的方式保存他们（JS 对象, 数组, 不变的Immutable结构, ...）
//   数据在我们的应用中被叫做state。就像我们称道的那样。所有的数据会随着时间变化变化。
//   这是非常真实的应用state。但是你得通过Redux来控制它（Redux是一个state容器，还记得吗？）
// b.我们怎样去操作这些数据的变化？
//   用reducers（传统上也就是flux的stores）
//   一个reducer也是一个actions的订阅者。
//   一个reducer就是一个获取你当前应用状态和action的一个函数。
//   然后返回一个修改过的state（或者像别人说的reduced一样）
// c.我们怎样去照顾到一个变化在应用中所有涉及的部分？
//   去订阅所有状态的修改。

//   Redux将会把这些全部帮你绑定
//   总结一下，Redux将会提供你：
//   1）一个你应用的state放入的地方。
//   2）一个去发出并修改你应用状态的机制，reducer
//   3）一个去订阅所有状态更新读机制

//   Redux实例也被称作一个store如下方式生成
// import { createStore } from 'redux'
// var store = createStore()

// 假如你执行上面的代码，注意你会收到如下报错
// Error: Invariant Violation: Expected the reducer to be a function.

// 这是由于createStore希望接收到一个可以改变你state的reducer函数。

// 让我们再来试试
import { createStore } from 'redux'

var store = createStore(() => {});

// 看上去现在好了

// 让我们进行下一节 03_simple-reducer.js