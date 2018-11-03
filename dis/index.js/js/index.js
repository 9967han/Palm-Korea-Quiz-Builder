'use strict';

var _chineseToPinyin = require('chinese-to-pinyin');

var _chineseToPinyin2 = _interopRequireDefault(_chineseToPinyin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var test = _chineseToPinyin2.default.pinyin('今天天气真好');

console.log(test);