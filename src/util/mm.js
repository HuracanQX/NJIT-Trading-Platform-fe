/*
* @Author: Huracan
* @Date:   2020-02-20 12:34:35
* @Last Modified by:   Huracan
* @Last Modified time: 2020-03-01 13:45:57
*/

var Hogan = require('hogan.js');
var conf = {
    ServerHost : ''
};
var _mm = {
    //网络请求
    request : function (param) {
        var _this = this;
        $.ajax({
            type     : param.method  || 'get',
            url      : param.url     || '',
            dataType : param.type    || 'json',
            data     : param.data    || '',
            success  : function(res){
                //请求成功
                if (0 === res.status) {
                    typeof param.success === 'function' &&param.success(res.data,res.msg);
                }
                //未登录，需要强制登录
                else if(10 === res.status) {
                    _this.doLogin();
                }
                //请求数据错误
                else if (1 === res.status) {
                    typeof param.error === 'function' &&param.error(res.msg);
                }
            },
            error    : function(err){
                typeof param.error === 'function' &&param.error(err.statusText);
            }

        });
    },
    //获取服务器地址
    getServerUrl: function(path) {
        return conf.ServerHost + path;
    },
    //获取url参数
    getUrlParam : function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //
    renderHtml : function(htmlTemplate,data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    successTips : function(msg){
        alert(msg || '操作成功！');
    },
    errorTips : function(msg){
        alert(msg || '出现错误！');
    },
    // 字段的验证，支持非空、手机、邮箱的判断
    validate : function(value, type){
        var value = $.trim(value);
        // 非空验证
        if('require' === type){
            return !!value;
        }
        // 手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        // 邮箱格式验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //统一登录处理
    doLogin : function(){
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome : function(){
        window.location.href = './index.html';
    }
};

module.exports = _mm;