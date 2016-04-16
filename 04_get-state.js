// 第四节 04 - get-state.js

// 我们如何在Redux实例中获取state

import { createStore } from 'redux'

var reducer_0 = function (state, action) {
    console.log('reducer_0 was called with state', state, 'and action', action)
}

var store_0 = createStore(reducer_0)
// 输出: reducer_0 was called with state undefined and action { type: '@@redux/INIT' }

// 获取Redux为我们控制的state信息，要调用getState函数

console.log('store_0 state after initialization:', store_0.getState())

// 所以state在初始化后依然为undefined？好的，确实如此。
// 我们的reducer没有做任何事情。。。还记得我们在about-state-and-meet-redux中提到的我们如何期望redux的行为的吗？
// 一个reducer仅仅是我们为程序获取当前state和action后返回一个新的state的函数
// 我们的reducer不会立即返回任何内容，所以这就是我们的reducer为什么返回undefined的原因

// 让我们试着返回一个应用的状态假如所给的reducer是undefined

var reducer_1 = function (state, action) {
    console.log('reducer_1 was called with state', state, 'and action', action)
    if (typeof state === 'undefined') {
        return {}
    }

    return state;
}

var store_1 = createStore(reducer_1)
// 输出: reducer_1 was called with state undefined and action { type: '@@redux/INIT' }

console.log('store_1 state after initialization:', store_1.getState())
// 输出: store_1 state after initialization: {}

// 正如我们期望的那样，Redux返回了{}状态在初始化后

// 然而感觉es6我们有了一种更简洁的方式来实现它
var reducer_2 = function (state = {}, action) {
    console.log('reducer_2 was called with state', state, 'and action', action)

    return state;
}

var store_2 = createStore(reducer_2)
// 输出: reducer_2 was called with state {} and action { type: '@@redux/INIT' }

// 你很可能已经注意到，我们用了默认的state参数在reducer_2上，
// 我们不再获取到undefined在我们的reducer上

var reducer_3 = function (state = {}, action) {
    console.log('reducer_3 was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SAY_SOMETHING':
            return {
                ...state,
                message: action.value
            }
        default:
            return state;
    }
}

var store_3 = createStore(reducer_3)
// 输出: reducer_3 was called with state {} and action { type: '@@redux/INIT' }

// 到此为止我们还没有派发任何action更新state。但是我们有几个重要的点需要我们关注一下。
// 0）我们假设我们的action包含type和一个value值。type是flux的一个action机制，value值可能是任何值。
// 1）你可能尝尝看的我们用swtitch来接收相对应地action。
// 2）当我们用switch的时候千万不要忘了default来返回一个默认state。否则可能会返回state从而丢掉所有state
// 3）注意我们是如何用es7的对象扩展方式来对{ message: action.value }对象进行合并的：{ ...state, message: action.value }
// 4）注意es7的这种对象扩展方式只适合于我们的例子，因为复制我们的state{ message: action.value }是一种浅拷贝的形式。（不能优雅的合并{ message: action.value }，意味着第一级的数据将被覆盖）
// 假如你有一些更复杂的内嵌数据那么你更新数据的方式将完全不同。
// - 通过 Immutable.js (https://facebook.github.io/immutable-js/)
// - 通过 Object.assign (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
// - 通过手动合并
// - 或者用一些其他满足需求的战略在数据变更的时候
//   Redux显然不会去执意做这个事情，（记住，Redux只是一个state的容器）

//  好了现在我们已经可以用reducer来操作action了
//  接下来我们来讨论一下多个reudcer的场景，我们是如何来合并这些reducer的

//  进入下一节: 05_combine-reducers.js
