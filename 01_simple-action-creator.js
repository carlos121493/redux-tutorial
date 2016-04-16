// 第一节 simple-action-creator.js

// 我们来开始说说介绍里面说的actions但是什么是那些"action creator"呢？
// 并且为什么称他们为"actions"?

// 实际上，我们仅仅只用几行代码就可以很好的解释它。

// action creator仅仅是一个函数。

var actionCreator = function() {
	// 就是这样建立返回一个action（是的，action creator名字现在显而易见）
	return {
		type: 'AN_ACTION'
	}
}

// 所以这就是全部了？ 是的

// 然后，只有一件事需要注意就是action的格式。action是一个包含type属性的对象，
// 这是flux的一项发明。这个type运行让之后能够很好的识别控制action。当然了，这个action
// 也同样可以保护其他你想传送的其他数据。

// 我们等一下看看一个action creator可以传送其他一些不只是action的东西。
// 比如一个函数。这样可以很好的处理一些移步的action（更多请参考dispatch-async-action.js）

// 我们能够执行这个action creator然后获取一个我们期望的action就像这样。
console.log(actionCreator())

// 输出: { type: 'AN_ACTION' }

// 好了，这样可以运作，但是这样哪也去不了。。。
// 我们需要做的是将它送到某处，让一些对此关联的内容知道这个action发生了并且做出相应的变化。
// 我们可以称这个环节为"Dispatching an action"。

// 去dispatch一个我们需要的action。。。一个dispatch的函数（废话）
// 然后让所有相应的关联内容知道处理这个action，我们需要“handlers”。
// 因此在普通的flux应用中这部分“handlers”叫做stores
// 我们将会在下一节中看到他们在redux中如何被称呼。

// 到现在我们的应用数据流如下：
// ActionCreator -> Action

// 了解更多关于action和action creators在这里：
// http://rackt.org/redux/docs/recipes/ReducingBoilerplate.html

// 进入我们下一节的学习：02_about-state-and-meet-redux.js