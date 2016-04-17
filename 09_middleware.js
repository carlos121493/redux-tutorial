// 第9节 middleware.js

// 我们在dispatch-async-action-2.js中留下了一个观点"middleware".middleware将会
// 帮我们解决async action的处理。所以准确说什么是middleware。

// 大体上说middleware是是一个机制。当在应用中的两个部分A和B。
// B会在接收一些A传来的内容中间时插入它。用图示展示就是
// A ---> B
// 最终我们会看到
// A ---> middleware1 ---> middleware2 ---> middleware3 ---> ... ---> B

// 所以说middleware将如何在Redux环境中帮助到我们？同样的我们可以看到
// 我们从async action creator返回的函数不能够被原生的Redux支持。
// 但是假如我们有一个middleware在我们的reducer和action之间。
// 我们就可以传一些转换格式的函数进去。
// 这很适合Redux：

// action ---> dispatcher ---> middleware1 ---> middleware2 ---> middleware3 ---> reducers

// 我们的middleware（或者其他像我们async action的处理函数）将会在每次action被dispatch时被调用。
// 这会帮助我们当我们想要的时候发送真正到action。(或者什么都不做 － 这是完全可以的甚至是有时希望这样)

// 在Redux中，middleware是一组必须要验证规范签名的函数，并且遵行一个强行规定的结构。
/*
    var anyMiddleware = function ({ dispatch, getState }) {
        return function(next) {
            return function (action) {
                // your middleware-specific code goes here
            }
        }
    }
*/

// 正如上图你所看到的那样，一个middleware由三部分内嵌的函数来组成（这被称为序列化）：
// 1）第一层提供一个dispatch函数和一个getState函数（假如你的中间件需要读取state）到第二层
// 2）第二层提供一个next函数用来显式的转换你的输入到下一个组件或者Redux（所以Redux又可以称为所有的reducers）
// 3）第三层提供一个上一个插件提供的或者被dispatch的action（以使action能够继续流转）或者执行action在何时的地方。

// 这些使正在训练函数编程的你发现一个运用设计模式的机会：柯里化（假如你不知道，没关系，跳过后面的10行
// 不会影响到你对Redux的认知）。运用柯里化你将很容易的做到类似上面的函数方式。
/*
    // 柯里化在许多函数式编程的库中存在 (lodash, ramda, etc.)
    var thunkMiddleware = curry(
        ({dispatch, getState}, next, action) => (
            // your middleware-specific code goes here
        )
    );
*/
// 我们构建的async action creator中间件叫做thunk middleware
// 你可以在这里 https://github.com/gaearon/redux-thunk 查看其源码

// 来我吗看看它的构成（通过转换成可读性强的es5）

var thunkMiddleware = function({dispatch, getState}) {
	// console.log('Enter thunkMiddleware')
	retrun function(next) {
		// console.log('Function "next" provided:', next);
		retrun function (action) {
			// console.log('Handling action:', action);
			return typeof action === 'function' ? action(dispatch, getState) : next(action)
		}
	}
}

// 去告知Reudx我们拥有1个或者多个middlewares。我们必须用到Redux提供的一个辅助函数： applyMiddleware：

// applyMiddleware会将你所有的middlewares作为参数并返回一个需要传入createStore的回调函数。
// 当最后一个中间件加入后，将会生成一个store dispatch时被调用的最高优先级的middleware。
// 引用自 https://github.com/rackt/redux/blob/v1.0.0-rc/src/utils/applyMiddleware.js
// 来让我们看看我们如何集成这些middleware在一个Redux store中。

// import { createStore, combineReducers, applyMiddleware } from 'redux'

// const finalCreateStore = applyMiddleware(thunkMiddleware)(createStore)
// 如果有更多的中间件，试着写下： applyMiddleware(middleware1, middleware2, ...)(createStore)

var reducer = combineReducers({
    speaker: function (state = {}, action) {
        console.log('speaker was called with state', state, 'and action', action)

        switch (action.type) {
            case 'SAY':
                return {
                    ...state,
                    message: action.message
                }
            default:
                return state
        }
    }
})

const store_0 = finalCreateStore(reducer)
// 输出:
//     speaker was called with state {} and action { type: '@@redux/INIT' }
//     speaker was called with state {} and action { type: '@@redux/PROBE_UNKNOWN_ACTION_s.b.4.z.a.x.a.j.o.r' }
//     speaker was called with state {} and action { type: '@@redux/INIT' }

// 现在我们有了我们的store实例的中间件。让我们再试一下dispatch我们的async action的处理。

var asyncSayActionCreator_1 = function (message) {
    return function (dispatch) {
        setTimeout(function() {
        	dispatch({
        		type: 'SAY', 
        		message
        	})
        }, 2000)
    }
}
// 输出:
//     Mon Aug 03 2015 00:01:20 GMT+0200 (CEST) Running our async action creator:
//     Mon Aug 03 2015 00:01:22 GMT+0200 (CEST) 'Dispatch action now:'
//     speaker was called with state {} and action { type: 'SAY', message: 'Hi' }

// 我们的action在调用async action creator2秒后被dispatched。
// 为了满足你的好奇心，接下来我们演示一下一个中间件如何记录将被dispatch的actions
// 就像下面这样

function logMiddleware ({ dispatch, getState }) {
    return function(next) {
        return function (action) {
            console.log('logMiddleware action received:', action)
            return next(action)
        }
    }
}

// 同样但下面这个会组织所有的将被dispatch的actions（尽管不是很有用，但是加上更多逻辑后可以更有选择的过滤一些actions到下一个middleware或者Redux）
function discardMiddleware ({ dispatch, getState }) {
    return function(next) {
        return function (action) {
            console.log('discardMiddleware action received:', action)
        }
    }
}

// 试着去修改最终的state通过用logMiddleware或者discardMiddleware
// 然后看看接下来发生什么，比如说：
// const finalCreateStore = applyMiddleware(discardMiddleware, thunkMiddleware)(createStore)
// 应该不会送任何actions到你的thunkMiddleware同样不会到你的reducers

// 更多参阅 http://rackt.org/redux/docs/introduction/Ecosystem.html
// middleware章节，查看更多的中间件。

// 我们总结一下我们到现在为止学到的。
// 1）我们知道如何去写actions和action creator2秒后被dispatched。
// 2）我们知道如何dispatch 我们的 action
// 3）我们知道如何操作我们自定义的actions像异步 actions

// 唯一在Flux应用中循环部分丢掉的是通知部分。
// 状态更新后应该去响应他们（例子中我们需要重新渲染模板）。

// 所以我们如何订阅我们的Redux store来更新？

// 继续下一节内容： 10_state-subscriber.js