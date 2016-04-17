// 第12节 Provider-and-connect.js

// 我们通过用Bluebird（https://github.com/petkaantonov/bluebird）作为promise库
// 但是你可以用任何你想使用的promise库。
import Promise from 'bluebird';

// 我们的action creator仅仅是获取当前时间通过一个过时的方式来描述promise middleware的用法。

// promise middleware用其中之一的方式来完成延时

// 1）一个类似这种格式的action
// {
// 	types: [REQUEST, SUCCESS, FAILURE],
// 	promise: function() {
// 		// return a promise
// 	}
// }
// 2) 或者其他什么你想要继续传往下一个middleware或者Redux（实际上，
//    在promise中间层进行运用， 任何没有包含一个promise的参数的函数
//    将会传入另一个中间层或者Redux）

//   当promise中间层获得action，这将从中获取到2个action。
//   1个action是REQUEST，另一个action是SUCCESS或者FAILURE的action creator

//   再来一遍，promise middleware的代码并没有完善可以去看一下（./promise-middleware.js）

//   action将会被延迟从action creator传入的delay毫秒。试着去改变这个值来验证
//   延迟能正确反映到UI上

  export function getTime(delay) {
  	return {
  		types: ['GET_TIME_REQUEST', 'GET_TIME_SUCCESS', 'GET_TIME_FAILURE'],
  		promise: () => {
  			return new Promise((resolve, reject) => {
  				// 仅仅是模拟异步请求服务器通过i 一个setTimeout函数
  				setTimeout(() => {
  					const d = new Date();
  					const ms = ('000' + d.getMilliseconds()).slice(-3);
  					resolve({
  						time: `${d.toString().match(/\d{2}:\d{2}:\d{2}/)[0]}.${ms}`
  					}, delay)
  				});
  			})
  		}
  	}
  }