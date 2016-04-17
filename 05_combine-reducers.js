// 第5节 - combine-reducers.js

// 我们现在来看看一个真正的reducer是什么样子的？

var reducer_0 = function(state = {}, action) {
    console.log('reducer_0 was called with state', state, 'and action', action);
    switch(action.type) {
    	case 'SAY_SOMETHING':
    		return {
    			...state,
    			message: action.value,
    		}
    }
}

// 但是在走的更远之前，我们来看看10个以上的actions判断会是怎样的

var reducer_1 = function (state = {}, action) {
	console.log('reducer_1 was called with sate', state, 'and action', action);

	switch (action.type) {
		case 'SAY_SOMETHING':
			return {
				...state,
				message: action.value,
			}
		case 'DO_SOMETHINE':
			// ...
		case 'LEARN_SOMETHING':
			//...
		case 'HEAR_SOMETHING':
			//...
		case 'GO_SOMEWHERE':
			//...
		default:
			return state;
	}
}

// 用一个reducer函数来处理我们一个应用里面所有的action变得非常危险（我们可以用这种方式，但会变得难以维护）

// 幸运的是 Redux不关心我们是否是用一个reducer还是用很多reducer，它甚至会帮我们合并这些reducer

var userReducer = function (state = {}, action) {
	console.log('userReducer was called with state', state, 'and action', action);

	switch (action.type) {
		// etc.
		default:
			return state;
	}
}

var itemsReducer = function (state = [], action) {
	console.log('itemsRender was called with state', state, 'and action', action);

	switch (action.type) {
		// etc .
		default:
			return state;
	}
}

// 我希望你能犀利的发现我们这两个reducer函数中的初始化state参数。userReducer用的是对象自面量来初始化。
// 而itemsRender用的是一个数组的格式。这样我们就可以明白一个reducer可以接受各种类型的数据结构。
// 这取决于你来决定那种数据结构更适合你的需要。（一个数组，一个对象自面量，一个布尔值，一个字符串，还是一个immutable结构）

// 有了这么多reducer来处理，我们最终有了各种各样的reducer来只处理应用中的某一部分数据。

// 但是就像我们了解到的那样，createStore函数，仅仅只能接受一个reducer对象。

// 所以我吗如何来合并我们的reducers？我们如何告诉Reudx每一个reducer只会控制某一部分的state？

// 作为一个清楚的例子，我们用Redux的combineReducers的一个辅助函数。combineReducers将这些碎片最合起来并返回一个
// 状态对象（仅仅只是一个hash {}）来供Redux去使用。
// 长话短说，我们来看看如何用多个reducers完成一个Redux。

import {createStore, combineReducers} from 'redux';

var reducer = combineReducers({
	user: userReducer,
	items: itemsReducer
})

//输出：
// userReducer was called with state {} and action { type: '@@redux/INIT' }
// userReducer was called with state {} and action { type: '@@redux/PROBE_UNKNOWN_ACTION_9.r.k.r.i.c.n.m.i' }
// itemsReducer was called with state [] and action { type: '@@redux/INIT' }
// itemsReducer was called with state [] and action { type: '@@redux/PROBE_UNKNOWN_ACTION_4.f.i.z.l.3.7.s.y.v.i' }

var store_0 = createStore(reducer)
// 输出:
// userReducer was called with state {} and action { type: '@@redux/INIT' }
// itemsReducer was called with state [] and action { type: '@@redux/INIT' }

// 就像你在输出中看到的那样，每一个reducer都能够在初始化action @@redux/INIT中被调用。
// 但是另一个action是什么？这是combineReducers中的一个sanity check。
// 去确认reducer将总是返回一个不等于undefined的state。
// 请注意我们在combineReducer中初始化actions时的第一个请求用不同随机的actions来实现这一目的。（去做一个sanity check合理化监测）

console.log('store_0 state after initialization:', store_0.getState())
// 输出:
// store_0 state after initialization: { user: {}, items: [] }

// 很有意思的是Redux可以很好的组织我们碎片化的state。
// 最终的state确实会变成一个由userReducer和一个itemsReducer组成的字典形式。
// {
//     user: {}, // {} is the slice returned by our userReducer
//     items: [] // [] is the slice returned by our itemsReducer
// }

// 因此我们可以用相对应的值(userReducer是{}, itemsReducers是[])来初始化，
// 这样我们就不用考虑数据格式在最终states在Redux中的一致性。

// 到现在为止我吗清楚的了解了reducers是如何工作的。
// 这将会很使这些actions可以很好的来发布并且看到时如何作用于Redux的state上面的。

// 让我们进入下一节: 06_dispatch-action.js