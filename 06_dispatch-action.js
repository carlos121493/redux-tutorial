// 第六节 dispatch-action.js

// 到现在为止我们可以关注于构建我们的reducers和我们还没使用的actions
// 我们将使用我们前几节使用的reducers，来控制下面一些actions。

var userReducer = function (state = {}, action) {
    console.log('userReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            }
        default:
            return state;
    }
}
var itemsReducer = function (state = [], action) {
    console.log('itemsReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'ADD_ITEM':
            return [
                ...state,
                action.item
            ]
        default:
            return state;
    }
}

import { createStore, combineReducers } from 'redux'

var reducer = combineReducers({
    user: userReducer,
    items: itemsReducer
})
var store_0 = createStore(reducer)


console.log("\n", '### It starts here')
console.log('store_0 state after initialization:', store_0.getState())

// 输出
// store_0 state after initialization: { user: {}, items: [] }

// 让我们传入第一个action。。。记住我们在第一节 simple-action-creator.js 所说的话：
// 要想dispatch一个我们需要的action...我们需要创建一个dispatch函数（废话）

// 我们要找的dispatch函数，Reudx也已经提供，并且能够将我们的actions传入所有的reducers中。
// dispatch函数在Redux中可以无障碍的用其实例中的dispatch方法。

// 去dispatch一个函数，仅仅需要：

// store_0.dispatch({
// 	type: 'AN_ACTION'
// })
// 输出
// userReducer was called with state {} and action { type: 'AN_ACTION' }
// itemsReducer was called with satate [] and action { type: 'AN_ACTION' }
// 每一个方法都能够正常调用，但是由于我们的reducers不能够很好的去识别action type
// 留下的state没有改变。

console.log('store_0 state after action AN_ACTION:', store_0.getState())
// 输出: store_0 state after action AN_ACTION: { user: {}, items: [] }
// 但是，稍等下！难道我们不是用action creator来发送这个action
// 我们确实用过actionCreator诞生自从它只是返回一个action，这将不会在例子中用展示更多。
// 我们做一些根据flux理论做一些正确的事情，我们做一个action creator发送一个我们真正需要关注的action。

var setNameActionCreator = function (name) {
    return {
        type: 'SET_NAME',
        name: name
    }
}

store_0.dispatch(setNameActionCreator('bob'))

// 输出
// userReducer was called with state {} and action { type: 'SET_NAME', name: 'bob' }
// itemsReducer was called with state [] and action { type: 'SET_NAME', name: 'bob' }
console.log('store_0 state after action SET_NAME:', store_0.getState())

// 输出
// store_0 state after action SET_NAME: { user: { name: 'bob' }, items: [] }

// 我们仅仅是控制我们的一个action并且用其来改变整个应用的状态。
// 但是这个看上去过于简单不能用于真正的实战。
// 比如说，我们如何在action creator中用一些异步的方式？我们将在下一节"dispatch-async-action.js"讨论一下。

// 到目前为止我们的应用流程如下
// ActionCreator => Action => dispatcher => reducer
// 继续下一章节： 07_dispatch-async-action-1.js
