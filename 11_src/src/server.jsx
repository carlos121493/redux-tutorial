// 第 12 节 Provider-and-connect.js

// 到这里，你应该已经准备好开始用Redux构建React App了

// 你这里看到的应用已经是最小化的了，不能再更小了（从开发角度和设计角度上说，抱歉说些闲话）。
// 我们在这里奖关注react-redux的两个主要的绑定（https://github.com/gaearon/react-redux）：
// 1）the Provider component
// 2) the connect function

// 但是正如我们之前说的那样，让我们先来看看应用基础的建设，并且看看它时如何为浏览器提供服务的

// 我们不用express(http://expressjs.com/) 开发app
// 因为我们不会需要它去只展示一个html页面

// "http"模块奖可以创建一个http服务器
import http from 'http';
import React from 'react';

// 我们在这里创建我们主要的应用服务器。它奖提供我们批评所有路径的一个html页面。
// 所以你不会去找的任何专用路由逻辑在下方。（除了favcion的请求）

var server = http.createServer(function(req, res) {
	// 忘掉，这个，这只是避免为浏览器自动请求favicon请求(假如不是这样。这个服务器将会返回一个html页面)
	if (req.url.match('favicon.ico')) {
		return res.end();
	}

	// 当然的，这里有我们的应用HTML我们将把其返回到浏览器端。
	// 这里没什么特别的，除了我们应用的js集合的URI。这些指向我们的webpack dev server
	// (located at http://localhost:5051)

	res.write(
		`<!DOCTYPE html>
		<html>
			<head>
				<meta charset="utf-8" />
			</head>
			<body>
				<div id="app-wrapper"></div>
				<script type="text/javascript" src="http://localhost:5051/static/bundle.js"></script>
			</body>
		</html>
		`
	)

	res.end();
});

export default server
// 到 ./index.jsx看看，那里有我们app是如何初始化的。那里喝webpack不一样
// index.jsx定义了我们js集合(in 12_src/webpack.config.js)的入口（首个文件）
// 并且到js集合加载到浏览器后会自动执行。