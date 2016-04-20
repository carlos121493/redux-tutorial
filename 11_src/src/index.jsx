// 第12节 Provider-and-connect.js

// 这个文件时JS集合的一个入口文件。在这里我们将创建我们的Redux Store。
// 实例化我们的React应用根组件，并将他绑定dom上。

import React from 'react';
import { render } from 'react-dom';
// 所有store的构建代码放在 ./create-store里面
import createStore from './create-store';
// Application是我们应用的根组件提供给Redux‘s Provider...
import Application from './appliaction';

// 正如我们之前那么多次的例子一样，我们需要先创建我们的redux实例。
// 这次我们将所有的任务都放在一个可以返回我们单独触发实例函数的特点模块中。
const store = createStore();

// 现在，我们可以用ReactDom.render来渲染我们的应用（归功于es的引入方式
import { render } from 'react-dom';）

render(
	// 并且提供一个Redux store参数到我们的根component，这样Redux Provider便可以正常运作。
	<Application store={store} />,
	document.getElementById('app-wrapper')
)

// 接着我们到 ./create-store.js来回顾一下我们已经非常了解的内容：如何去创建Redux Store