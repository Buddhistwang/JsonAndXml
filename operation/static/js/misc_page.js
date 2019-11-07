/**
 * Created by zj on 2017/2/16.
 */
//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
// 设置指定url中param的值，返回处理后的url
function set_url_param(url, param, value) {
    if (url.indexOf('?') != -1) {
        var p = new RegExp("((\\?|&)" + param + ")=[^&]*");
        if (p.test(url)) {
            url = url.replace(p, "$1=" + value);
        }
        else {
            url = url + '?' + param + '=' + value;
        }
        return url;
    }
}
function do_page(page) {
    var url = window.location.href;
    window.location.href = set_url_param(url, 'page_index', page)
}
function do_page_size(obj) {
    var url = window.location.href;
    window.location.href = set_url_param(url, 'page_size', obj.options[obj.selectedIndex].text)
}
