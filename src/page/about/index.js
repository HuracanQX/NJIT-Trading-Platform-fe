/*
* @Author: Huracan
* @Date:   2020-02-28 10:17:05
* @Last Modified by:   Huracan
* @Last Modified time: 2020-02-28 10:17:24
*/
'use strict';

require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide         = require('page/common/nav-side/index.js');

// page 逻辑部分
var page = {
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'about'
        });
    }
};
$(function(){
    page.init();
});