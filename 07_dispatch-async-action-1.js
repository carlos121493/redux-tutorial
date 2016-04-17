// 第7节 - dispatch-async-action-1.js

// 我们先前看到的我们如何dispatch action并且我们如何将这些actions修改的。
// 我们感谢这些reducers来处理我们应用的state

// 但是到目前为止，我们仅仅只是考虑了同步点actions情况，或者更精确的说是同步的action creators
// 这会制造同步的action：当我们调用它 action会立即返回。

// 让我们一起想想如何做一个简单的异步模型。
// 1）用户点击一个Say Hi的按钮2秒钟
// 2）当按钮A点击后，我们希望2秒钟后看到HI
// 3）2秒钟后，我们的界面被信息Hi刷新。

// 当然了，这个信息是我们应用state中的一部分。所以我们可以保存它在Redux store中。
// 但是我们希望我们在action creator被调用2秒后再保存信息。（因为我们如果想要立即更新状态
// 任何订阅state的修改，如我们的view将会立即被通知到。并且在2秒后会被立即更新）

// 到目前为止我们是这样调用action creator 的。

import { createStore, combineReducers } from 'redux'

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
                return state;
        }
    }
})
var store_0 = createStore(reducer)

var sayActionCreator = function (message) {
    return {
        type: 'SAY',
        message
    }
}

console.log("\n", 'Running our normal action creator:', "\n")

console.log(new Date());
store_0.dispatch(sayActionCreator('Hi'))

console.log(new Date());
console.log('store_0 state after action SAY:', store_0.getState())
// 输出 (跳过初始化输出部分):
//     Sun Aug 02 2015 01:03:05 GMT+0200 (CEST)
//     speaker was called with state {} and action { type: 'SAY', message: 'Hi' }
//     Sun Aug 02 2015 01:03:05 GMT+0200 (CEST)
//     store_0 state after action SAY: { speaker: { message: 'Hi' } }

// 然后我们可以看到我们的store会被立即更新。

// 我们希望看到action creator做的有点像这样
var asyncSayActionCreator_0 = function (message) {
    setTimeout(function () {
        return {
            type: 'SAY',
            message
        }
    }, 2000)
}

// 但是这样并不会返回一个action，这会返回一个"undefined"。
// 所以这并不是一个很好的解决方案。

// 来一个黑科技：与其返回一个action，我们将返回一个函数用来在合适的时候返回一个action。
// 但是我们想要我们的函数可以dispatch action。必须提供给函数一个dispatch。然后变得像这样。

var asyncSayActionCreator_1 = function (message) {
    return function (dispatch) {
    	setTimeout(function() {
    		dispatch({
    			type: 'SAY',
    			message
    		})
    	}, 2000);
    }
}

// 你将再次发现我们的action creator 但是这样并不会返回一个action，这会返回一个而是返回一个函数。
// 这是一个我们不知道会发生什么的情况的高频率场景。如果我们不去试试我们将永远不会知道发生了什么

// 让我们进行下一节: 08_dispatch-async-action-2.js


