/**
 * Created by zj on 2017/3/15.
 */
// 自定义列
$("#btn_custom_columns").on("click", function () {
    $('#modal_custom_columns').modal().on('show.bs.modal', function (event) {
    })
});
//全选
$("#table_head_select_all, #table_foot_select_all").click(function () {
    if (this.checked) {
        $("input[class='ng-pristine ng-valid']:checkbox").each(function () { //遍历所有的name为selectFlag的 checkbox
            $(this).prop('checked', true);
        })
    } else {   //反之 取消全选
        $("input[class='ng-pristine ng-valid']:checkbox").each(function () { //遍历所有的name为selectFlag的 checkbox
            $(this).prop('checked', false);
        })
    }
})
//删除
function do_action_del(p_id, p_name) {
    var li = '<li ng-repeat="item in selectedItem" class="ng-scope">'
    li += '    <span class="ng-scope ng-isolate-scope">'
    li += '        <span class="ng-scope">'
    li += '            <span class="ng-scope">' + p_id + '</span>'
    li += '        </span>'
    li += '        <span class="ng-scope"> / </span>'
    li += '    </span>'
    li += '    <span class="ng-scope ng-isolate-scope">'
    li += '        <span class="ng-scope">' + p_name + '</span>'
    li += '    </span>'
    li += '</li>'
    $(".batch-action-list").html(li);
    $('#btn_delete').attr('data-whatever', p_id);
    $('#modal_del').modal().on('show.bs.modal', function (event) {
        // var button = $(event.relatedTarget);
        // var recipient = button.data('whatever');
    })
}
//删除模态框显示详情
function dropdownToggle() {
    if ($("#dropdown-icon").attr("class") == "icon-down") {
        $("#dropdown-icon").attr("class", "icon-up")
    }
    else {
        $("#dropdown-icon").attr("class", "icon-down")
    }
    $(".batch-action-list").toggleClass("ng-hide");
}
//Ajax
function postAjax(url, postData, callBackBefore, callBackSuccess, callBackError) {
    $.ajax({
        type: 'post',
        dataType: "json",
        url: url,
        data: postData,
        cache: false,
        async: false,
        beforeSend: function () {
            callBackBefore();
        },
        success: function (data) {
            callBackSuccess(data);
        },
        error: function (data) {
            callBackError(data)
        }
    });
}
function getAjax(url, postData, callBack) {
    $.ajax({
        url: url,
        dataType: 'json',
        beforeSend: function () {
            $(this).html("<img src='/img/loading.gif'>")
        },
        success: function (json) {
            callBack(data);
        },
        error: function () {
            console.info("error:" + JSON.stringify(data));
        }
    })
}
//分页部分
function set_url_param(url, param, value) {
    if (url.indexOf('?') != -1) {
        var p = new RegExp("((\\?|&)" + param + ")=[^&]*");
        if (p.test(url)) {
            url = url.replace(p, "$1=" + value);
        }
        else {
            url = url + '&' + param + '=' + value;
        }
        return url;
    }
    else {
        return url + '?' + param + '=' + value
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