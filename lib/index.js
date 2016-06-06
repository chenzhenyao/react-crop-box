'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var maxByAbs = function maxByAbs(a, b) {
	return Math.abs(a) > Math.abs(b) ? a : b;
};

var CropBox = (_temp2 = _class = function (_React$Component) {
	(0, _inherits3.default)(CropBox, _React$Component);

	function CropBox() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, CropBox);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(CropBox)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
			left: 0,
			top: 0,
			width: 0,
			height: 0,
			maxWidth: 0,
			maxHeight: 0,
			lastX: 0,
			lastY: 0,
			flag: false,
			type: 'drag'
		}, _this.resetBox = function () {
			var offsetLeft = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
			var offsetTop = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
			var offsetWidth = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
			var offsetHeight = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
			var _this$state = _this.state;
			var left = _this$state.left;
			var top = _this$state.top;
			var width = _this$state.width;
			var height = _this$state.height;
			var maxWidth = _this$state.maxWidth;
			var maxHeight = _this$state.maxHeight;
			var aspectRatio = _this.props.aspectRatio;
			// 待优化

			if (aspectRatio) {
				offsetWidth = maxByAbs(offsetWidth, offsetHeight * aspectRatio);
				offsetHeight = maxByAbs(offsetHeight, offsetWidth / aspectRatio);
			}

			left = left + offsetLeft;
			top = top + offsetTop;
			width = width + offsetWidth;
			height = height + offsetHeight;

			if (left < 0 || top < 0 || width < 0 || height < 0) return;
			if (left + width > maxWidth || top + height > maxHeight) return;

			_this.setState({
				left: left,
				top: top,
				width: width,
				height: height
			});
		}, _this.onMouseDown = function (type, e) {
			e.preventDefault();
			e.stopPropagation();
			var _this$state2 = _this.state;
			var left = _this$state2.left;
			var top = _this$state2.top;
			var width = _this$state2.width;
			var height = _this$state2.height;

			_this.setState({
				lastX: e.clientX,
				lastY: e.clientY,
				flag: true,
				type: type
			});
		}, _this.onMouseMove = function (e) {
			var _this$state3 = _this.state;
			var left = _this$state3.left;
			var top = _this$state3.top;
			var width = _this$state3.width;
			var height = _this$state3.height;
			var lastX = _this$state3.lastX;
			var lastY = _this$state3.lastY;
			var flag = _this$state3.flag;
			var type = _this$state3.type;

			if (!flag) return;

			_this.setState({
				lastX: e.clientX,
				lastY: e.clientY
			});
			var disX = e.clientX - lastX;
			var disY = e.clientY - lastY;
			switch (type) {
				case 'drag':
					//拖拽
					_this.resetBox(disX, disY, 0, 0);
					break;
				case 'nw':
					//左上
					_this.resetBox(disX, disY, -disX, -disY);
					break;
				case 'n':
					//上
					_this.resetBox(0, disY, 0, -disY);
					break;
				case 'ne':
					//右上
					_this.resetBox(0, disY, disX, -disY);
					break;
				case 'e':
					//右
					_this.resetBox(0, 0, disX, 0);
					break;
				case 'se':
					//右下
					_this.resetBox(0, 0, disX, disY);
					break;
				case 's':
					//下
					_this.resetBox(0, 0, 0, disY);
					break;
				case 'sw':
					//左下
					_this.resetBox(disX, 0, -disX, disY);
					break;
				case 'w':
					//左
					_this.resetBox(disX, 0, -disX, 0);
					break;
			}
		}, _this.onMouseUp = function (e) {
			_this.setState({
				flag: false
			});
		}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(CropBox, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _state = this.state;
			var left = _state.left;
			var top = _state.top;
			var width = _state.width;
			var height = _state.height;
			var maxWidth = _state.maxWidth;
			var maxHeight = _state.maxHeight;
			var aspectRatio = this.props.aspectRatio;


			maxWidth = this.refs.root.clientWidth;
			maxHeight = this.refs.root.clientHeight;
			width = maxWidth * 0.8;
			height = maxHeight * 0.8;

			if (aspectRatio) {
				width = Math.min(width, height * aspectRatio);
				height = Math.min(height, width / aspectRatio);
			}

			this.setState({
				left: (maxWidth - width) / 2,
				top: (maxHeight - height) / 2,
				width: width,
				height: height,
				maxWidth: maxWidth,
				maxHeight: maxHeight
			});

			document.addEventListener('mousemove', this.onMouseMove);
			document.addEventListener('mouseup', this.onMouseUp);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			document.removeEventListener('mousemove', this.onMouseMove);
			document.removeEventListener('mouseup', this.onMouseUp);
		}
	}, {
		key: 'render',
		value: function render() {
			var _state2 = this.state;
			var top = _state2.top;
			var left = _state2.left;
			var width = _state2.width;
			var height = _state2.height;

			var dotStyle = {
				position: 'absolute',
				width: 4,
				height: 4,
				border: '1px solid #000',
				background: '#fff',
				overflow: 'hidden'
			};
			return _react2.default.createElement(
				'div',
				{
					ref: 'root',
					style: {
						position: 'relative',
						width: '100%',
						height: '100%',
						overflow: 'hidden'
					}
				},
				_react2.default.createElement(
					'div',
					{
						style: {
							position: 'absolute',
							top: top,
							left: left,
							width: width,
							height: height,
							border: '1px solid #333',
							boxSizing: 'border-box',
							cursor: 'move',
							boxShadow: '0 0 0 500px rgba(0,0,0,.32)'
						},
						onMouseDown: this.onMouseDown.bind(this, 'drag')
					},
					_react2.default.createElement('div', {
						style: (0, _extends3.default)({}, dotStyle, {
							top: -3,
							left: -3,
							cursor: 'nw-resize'
						}),
						onMouseDown: this.onMouseDown.bind(this, 'nw')
					}),
					_react2.default.createElement('div', {
						style: (0, _extends3.default)({}, dotStyle, {
							top: -3,
							left: '50%',
							marginLeft: -3,
							cursor: 'n-resize'
						}),
						onMouseDown: this.onMouseDown.bind(this, 'n')
					}),
					_react2.default.createElement('div', {
						style: (0, _extends3.default)({}, dotStyle, {
							top: -3,
							right: -3,
							cursor: 'ne-resize'
						}),
						onMouseDown: this.onMouseDown.bind(this, 'ne')
					}),
					_react2.default.createElement('div', {
						style: (0, _extends3.default)({}, dotStyle, {
							top: '50%',
							right: -3,
							marginTop: -3,
							cursor: 'e-resize'
						}),
						onMouseDown: this.onMouseDown.bind(this, 'e')
					}),
					_react2.default.createElement('div', {
						style: (0, _extends3.default)({}, dotStyle, {
							right: -3,
							bottom: -3,
							cursor: 'se-resize'
						}),
						onMouseDown: this.onMouseDown.bind(this, 'se')
					}),
					_react2.default.createElement('div', {
						style: (0, _extends3.default)({}, dotStyle, {
							bottom: -3,
							right: '50%',
							marginLeft: -3,
							cursor: 's-resize'
						}),
						onMouseDown: this.onMouseDown.bind(this, 's')
					}),
					_react2.default.createElement('div', {
						style: (0, _extends3.default)({}, dotStyle, {
							left: -3,
							bottom: -3,
							cursor: 'sw-resize'
						}),
						onMouseDown: this.onMouseDown.bind(this, 'sw')
					}),
					_react2.default.createElement('div', {
						style: (0, _extends3.default)({}, dotStyle, {
							top: '50%',
							left: -3,
							marginTop: -3,
							cursor: 'w-resize'
						}),
						onMouseDown: this.onMouseDown.bind(this, 'w')
					})
				)
			);
		}
	}]);
	return CropBox;
}(_react2.default.Component), _class.propTypes = {
	aspectRatio: _react2.default.PropTypes.number
}, _class.defaultProps = {
	aspectRatio: 1
}, _temp2);
exports.default = CropBox;