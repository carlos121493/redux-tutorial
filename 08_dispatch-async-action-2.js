// 第8节 - dispatch-async-action-2.js

// 让我们来试一下第一个异步的action creator我们写在dispatch-async-action-1.js.中

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

var asyncSayActionCreator_1 = function (message) {
    return function (dispatch) {
        setTimeout(function () {
            dispatch({
                type: 'SAY',
                message
            })
        }, 2000)
    }
}

console.log("\n", 'Running our async action creator:', "\n")
store_0.dispatch(asyncSayActionCreator_1('Hi'))

// 输出:
//     ...
//     /Users/classtar/Codes/redux-tutorial/node_modules/redux/node_modules/invariant/invariant.js:51
//         throw error;
//               ^
//     Error: Invariant Violation: Actions must be plain objects. Use custom middleware for async actions.
//    
// 看上去我们的函数并没有达到我们的reducers里。但是redux已经很友善的提示了要用custom middleware
// 来处理异步actions。这看上去我们似乎做的对。但是什么是middleware？

// 再次确认一下我们的action creator asyncSayActionCreator_1写的没问题运作的很ok。
// 我们马上就来看看middleware是什么。我们怎么去用它。

// 来进行下一节：09_middleware.js