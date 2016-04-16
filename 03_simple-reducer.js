// 第三节 - simple-reducer.js

// 现在我们知道如何去生成一个Redux的实例帮我们掌管我们应用中的state
// 我们将我们的注意力放在处理我们state的reducer函数上面

// 一句话说是reducer和store的关系
// 就像你了解到的那样，在介绍中的一个flux的表格，我们称其为Store，不像Redux中"Reducer"那样
// 所以我们如何明确的阐述Store和Reducer的不同呢？
// 这个比你想象中的简单：一个Store保存一个数据在里面而Reducer不会。
// 所以在传统的flux模型里，store可以控制state在里面，然后再Redux中每次reducer被执行
// 总是返回一个更新过的数据。这种方式reducers变成一个 "stateless stores"我们将其称为reducers

// 当创建Redux实例的时候，在状态生成之前我们必须先得设置一个reducer函数。

import { createStore } from 'redux'

var store_0 = createStore(() => {})

// 所以Redux可以在在你的应用上像这样获取state
// 因此createStore正是我们之前在第一章讨论过的redux注册的用于响应action的函数

// 让我们在reducer里面放一些log

var reducer = function (...args) {
    console.log('Reducer was called with args', args)
}

var store_1 = createStore(reducer)

// 输出: Reducer was called with args [ undefined, { type: '@@redux/INIT' } ]

// 你看到了吗？reducer依然在没有传任何参数的情况下被调用
// 这正是我们初始化application的state
// Redux 实际上dispatch了一个初始化的action

// 当我们调用的时候给reducer这些参数：（state，action）
// 这是在应用初始化时候非常有意义的逻辑，state还没有被初始化的时候是undefined

// 但是当我们发出init 这个action之后state在应用里是如何呈现的？

// 让我们进行下一章节：04_get-state.js