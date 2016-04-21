// 第11节 - Provider-and-connect.js

// 这是最后一节告诉大家如何结合Redux和React进行开发。

// 到了这个例子，你需要一个浏览器。

// 所有关于解释这个例子的源码在./11_src/src/.

// 当你读到下面的语句时，启动服务 11_src/src/server.js.

// 构建我们的React应用并将其提供给浏览器，我们将用到：
// 一个极其简单的node的HTTP服务器(https://nodejs.org/api/http.html)
// 一个awesome Webpack (http://webpack.github.io/)来打包我们的应用
// 神奇的Webpack Dev Server(http://webpack.github.io/docs/webpack-dev-server.html)
// 一个js文件node专用服务器来让我吗观察文件的变化。
// 不可思议的React Hot Loader http://gaearon.github.io/react-hot-loader/
// （Dan Abramov的另一个项目，只是一个用法，它是Redux的作者）拥有非常疯狂的
// DX(Developer experience)使我们在调整代码的时候组件可以实时渲染到浏览器。

// 一个重要的点是React从0.14版本以后开始支持这样使用。 

// 我们在这里不会讨论 Webpack Dev Server和React Hot Loader 配置。
// 可以参考React Hot Loader的文档进行查阅。
import webpackDevServer from './11_src/src/webpack-dev-server'
// 我们引用这个文件作为我们启动主要的请求服务器。
import server from './11_src/src/server'

// 修改下方端口号5050假如其已经被你用了。
// 假如port等于X，我们将用X作为服务器接口
// X+1作为 webpack-dev-server接口
const port = 5050

// 启动我们webpack dev server。。。
webpackDevServer.listen(port);
// 我们主要的服务器
server.listen(port);

console.log(`Server is listening on http://127.0.0.1:${port}`)

// 进入 11_src/src/server.js...

// 继续我们下一节：12_final-words.js