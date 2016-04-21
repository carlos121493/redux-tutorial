// 第 12节 - Provider-and-connect.js

// 这个文件将只使用一个reducer在我们的应用中。这个行为对你来说没什么新的。
// 它仅仅是从三个方面对action进行控制（GET_TIME）变成了三个专用点actions....
// 这个进步允许我们去做一些友善的实践去像这样更新我们的UI。

var initialTimeState = {}

// reducer用_作为前置符合避免使用。 state.time.time（两次读取time）当从state中读取的时候。
// 所以在这里只是一个个人偏好所以你可以不用这种方式给你的reducers和暴露给Redux‘s store的参数命名。

export function _time(state = initialTimeState, action) {
	console.log('_time reducer called with state', state, ' and action ', action);

	switch (action.type) {
		case 'GET_TIME_REQUEST':
			return {
				...state,
				frozen: true,
			}
		case 'GET_TIME_SUCCESS':
			return {
				...state,
				time: action.result.time,
				frozen: false,
			}
		case 'GET_TIME_FAILURE':
			// 我们可以在这里加一些报错信息，用于在项目的部分地方显示
			return {
				...state,
				frozen: false,
			}
		default:
			return state
	}
}