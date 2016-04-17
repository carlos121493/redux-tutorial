// 第12节 - Provider-and-connect.js

// 这里不必说太多，你已经看过很多次并且在这里应该感激非常熟悉。

// 一件需要注意的事情是：我们没用我们之前说的thunk middleware。
// 我们用promise middleware方案来代替它，这样不仅能够很好的处理异步action creators。
// 并且能够做一些非常真实的更新在我们的UI上（同样可以做一些积极的更新）。
// 这个middleware在这里讨论https://github.com/rackt/redux/issues/99
// 有一个很好的例子 react-redux-universal-example: https://github.com/erikras/react-redux-universal-hot-example
// 我强力建议你之后看一看

import { createStore, applyMiddleware, combineReducers } from 'redux'

// 你可以看看这个middleware的源码，这不是恨复杂并且能锻炼你立刻了解middlewares的练习

import promiseMiddleware from './promise-middleware'

// 我们在应用中将仅仅只有一个reducer，但是如下的es6扩展引用如下
// 是一个非常有意思的引入方式并且能够一次性的将字典引入到一个对象中。
// 看一眼./reducers.js看看我们的reducer实际上做了什么（这里没有魔术方法）。

import * as reducers from './reducers'

// 我们在这里看到的data参数是用来初始化我们的redux store。
// 我们之前简单讨论过。感谢reducers可以被真实数据初始化，假如你确实有一些真实数据。
// 假如有一个你用来获取数据的服务端 isomorphic/universal app，序列化数据并传到你的客户端。
// 你的Redux Store可以被这些数据初始化。
// 我们在这不会传入任何数据，但是你最好知道createStore的这一能力。
export default function(data) {
	var reducer = combineReducers(reducers);
	var finalCreateStore = applyMiddleware(promiseMiddleware)(createStore);
	var stor = finalCreateStore(reducer, data);

	return store;
}

// 到 ./application.jsx去了解Redux是如何用Provider Component第一次绑定React的