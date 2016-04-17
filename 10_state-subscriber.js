// 第10节 state-subscriber.js

// 我们已经几乎完成了Flux整个流程，但是我们任然缺失了一部分有争议的地方。

//  _________      _________       ___________
// |         |    | Change  |     |   React   |
// |  Store  |----▶ events  |-----▶   Views   |
// |_________|    |_________|     |___________|

// 没有这个我们无法在我们store变化的时候更新我们的views。

// 幸运的是，这里有一个简单的方式来观察我们Redux的store的更新。

/*
    store.subscribe(function() {
        // retrieve latest store state here
        // Ex:
        console.log(store.getState());
    })
*/

// 好的。。。所以简单来说它同样让我们再次相信 Santa Claus。

// 让我们试试下面的方式

import { createStore, combineReducers } from 'redux'

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

var reducer = combineReducers({ items: itemsReducer })
var store_0 = createStore(reducer)
store_0.subscribe(function() {
    console.log('store_0 has been updated. Latest store state:', store_0.getState());
    // Update your views here
})

var addItemActionCreator = function (item) {
    return {
        type: 'ADD_ITEM',
        item: item
    }
}
store_0.dispatch(addItemActionCreator({ id: 1234, description: 'anything' }))
// 输出:
//     ...
//     store_0 has been updated. Latest store state: { items: [ { id: 1234, description: 'anything' } ] }

// 我们订阅的回调函数正确被调用并且我们对store现在包含了我们新加的项目。

// 理论上我们说到这里。我们的flux周期被关闭了，我们理解了所有flux的核心观念，这些都不再神秘了。
// 老实说，还有很多需要说并且在最后的一些有关其内涵的一些例子。留下一些最简单的格式来阐述Flux的概念。

// －我们的订阅回调函数并没有用state作为参数来接收，为什么这样？
// －因为我们没有收到更多的新state，我们利用我们已经包含state的store_0
//   这样的方式在多模块应用中是不能接受的。
// － 所以我们实际上是用什么方式更新我们的views？
// － 我们如何取消store更新的订阅？
// － 更多的讨论我们如何将redux和react放在一起使用？

// 我们正在进行更多关于"Redux in React"规范但书写。

// 理解Redux是很容易和React绑定的。这实际上，只是一个
// Javascript应用的可预测state的一个容器。你可以用它在各种框架中。
// react容器只是其中一个。

// 如果不是react-redux（https://github.com/rackt/react-redux）我们将会不知所措
// 显而易见的集成Redux(before 1.0.0),
// 这个库使Redux在React应用在整个流程中控制住我们的依赖变的轻而易举。

// 回到我们subscribe例子。。。为什么我吗能轻而易举的有这种substribe的回调函数同时却不提供更充足多特性？

// 最简单多原因是其性能！Redux拥有着及其精简对API（包括subscribe）非常具有扩展性的方式
// 能够让开发者开发出更多像Redux DevTools这样疯狂的产品
// (https://github.com/gaearon/redux-devtools)

// 但是我们任然需要更好的API来订阅我吗store的变化。这就是react-redux带给我们的。
// 一个API可以很好的令我们无缝填充原始Reudx订阅模式和开发期望。最后，你不会希望需要直接用订阅
// 你会用provide或者connect来代替隐藏subscribe的关联更新功能。

// 所以，subscribe方法仍将会用到作为最高级调用state的处理函数。

// 我们将会涉及到这样关联方式，并且展示如何书写你的组件用Redux的state方式。

// 继续下一章节：11_Provider-and-connect.js
