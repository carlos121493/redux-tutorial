// 第一章 － introduction.js

// 为什么开始这篇教学？
// 当我试着去学习Redux, 我通过读一些文章和个人经验逐渐堆积起来关于flux错误的经验。
// 我不是说flux的文章写的不好，只是我不能抓取到真正正确的观念。于是乎，我开始试着去查阅运用不同的flux框架
// （Reflux，Flummox，FB Flux）并且试着去匹配我所读到过的理论（actions / actions creators, stor, dispatcher, etc）观点。
// 只有当我开始使用Redux，我逐渐意识到flux比我想象的要简单的多。
// 这多亏了Redux设计的很好，并且移除了很多在其他框架里残留的不好的"anti-boilerplate"特性。
// 我现在感觉到Redux是一个比别的框架更好了解flux框架的框架。这也是我为什么想要分享给每一个人。
// 用我的话说。flux的想法使我开始上路，却最后遇见了redux。

// 你可能看见过下图介绍flux运用经典的单向数据流模型：

/*
                 _________               ____________               ___________
                |         |             |            |             |           |
                | Action  |------------▶| Dispatcher |------------▶| callbacks |
                |_________|             |____________|             |___________|
                     ▲                                                   |
                     |                                                   |
                     |                                                   |
 _________       ____|_____                                          ____▼____
|         |◀----|  Action  |                                        |         |
| Web API |     | Creators |                                        |  Store  |
|_________|----▶|__________|                                        |_________|
                     ▲                                                   |
                     |                                                   |
                 ____|________           ____________                ____▼____
                |   User       |         |   React   |              | Change  |
                | interactions |◀--------|   Views   |◀-------------| events  |
                |______________|         |___________|              |_________|

*/

// 在这篇教程中，我们将会逐步对介绍上面这幅图。对于全部介绍上图的流动特性，我们将会讲每个部分拆开
// 分别介绍每一块是如何运作的。一旦你了解了每一块时如何运作的你将最终完美的理解上图。

// 但是当我们开始前。我们讲一点，flux存在和我们需要它的意义。。。
// 假设我们正在建设一个web应用。所有的web运用用什么搭建？
// 1） 模板 ／html ＝ View
// 2） 数据将落雨我们的界面上 ＝ Models
// 3） 逻辑的处理数据，并将界面组合起来，以及响应我们的事件去改变数据 等等 ＝ Controller

// 这是我们所了解的非常简单的MVC数据模型。但是这实际上更像是flux的观点。
// 仅仅用另一种更简洁的方式来阐述：
// － Model层视为Store
// － 用户事件，数据修改和一些控制函数更像是 action creator => action => dispatcher => callback
// － Views 更像是React Views（或者像flux到目前认为类似什么的）

// 所以flux框架只是一个新的说法？不准确。但是这种说法能够让我们重新更精确的组织和解释对这个框架的术语的认识。
// 比如说，为什么一个data会获取到一个action？就像一个click同样是一个action？
// 并且一个input的change也是一个action
// 然后我们将我们过去讨论的action称为应用中的action，我们仅仅只是将他们叫的不同而已。

// 让我们了解更多冠军MVC和flux的不同，我们将组织一些更经典的MVC用例：
// 在一些经典的MVC应用中你可以很简单的用下面的方式组织。
// 1）用户点击按钮"A"
// 2) 一个按钮"A"的点击事件触发了一个Model"A"上的变化
// 3）一个Model"A"上的变化事件触发了一个Model"B"上的变化
// 4）一个Model"B"上的变化触发了一个View"B"使得其重新渲染。

// 这样要想找到一个环境中的bug是哪里出的问题会变得十分具有挑战。
// 这是由于每一个View对应着每一个Model，同时每个Model又会关联其他Model
// 所以数据可以到达更多地方，数据可以从更多的地方（可能是任何View，任何Model）流入

// 鉴于此当我们用flux和其单向数据流的时候我们，上面这种情况会变为
// 1）用户点击了按钮"A"
// 2) 一个点击按钮"A"的事件触发了一个dispatch并且给Store"A"发送了一个变化。
// 3）因此所有其他相关联的stores能够被这个action通知到。Store"B"同样可以响应这个action
// 4）View"B"被Store A和B的变化通知到，并且重新渲染自身。

// 让我们看看如何避免Store A和Store B的相互引用？每一个store可以只能被action修改。并且一旦所有的stores响应一个action
// views可以迅速的被更新。所以最终会以单向数据流的方式展现出来：
// action => store => view => action => store => view => action => store => view

// 上面的action作为我们的开始环节，让我们开始我们的action和action creators

// 进行下一个教程： 01_simple-action-creator.js
