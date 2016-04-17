// 第12节 - Provider-and-connect.js

// 现在是时候我们来看一下redux-react中的第一次绑定(https://github.com/rackt/react-redux)
// 我们看到的是 Provider组件

// Provider是一个React组件被设计成用来作为包裹你应用根目录的组件。
// 它试图将redux实例传到你应用中的每一个组件中。
// 了解其是如何运作的并不重要。但是你可以知道它是用来React的context的特性。
// （这个不在文档上所以你也不必知道它，但是如果你真的好奇可以看这里  https://www.tildedave.com/2014/11/15/introduction-to-contexts-in-react-js.html)）

import React from 'react'
import Home from './home'
import { Provider } from 'react-redux'

export default class Application extends React.Component{
	render () {
		return (
			// 就像上面解释的那样，Provider必须包裹你应用的根组件。
			// 这样组件和其所有子对象（甚至是深入内嵌的）将会进入Redux store体系。
			// 你必须传给Provider一个 你之前创建好的store（通过store props）
			<Provider store={ this.props.store }>
				<Home />
			</Provider>
		)
	}
}

// 进入 ./home.jsx来探索你怎样读取到state并且如何dispatch一个action通过React component。