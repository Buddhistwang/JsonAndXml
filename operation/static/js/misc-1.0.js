/**
 * Created by zj on 2017/3/31.
 */
/*
 用法：
 var url = '', postData = '&a=1&b=2';
 postAjax(url, postData,
 function() {
 alert("提交前");
 },
 function() {
 alert("成功了");
 },
 function() {
 alert("出错了");
 });
 */
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


// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


// 绑定下拉框
// 用法：bind_select('test', 'value', 'b');
function bind_select(select_id, type, value) {
    var select_length = $("#" + select_id + " option").length;
    for (var i = 0; i < select_length; i++) {
        if (type == 'value') {
            if ($("#" + select_id).get(0).options[i].value == value) {
                $("#" + select_id).get(0).options[i].selected = true;
                break;
            }
        }
        else if (type == 'text') {
            if ($("#" + select_id).get(0).options[i].text == value) {
                $("#" + select_id).get(0).options[i].selected = true;
                break;
            }
        }
    }
}


// 模态框显示后，展示要删除的ID列表
function dropdownToggle() {
    if ($("#dropdown-icon").attr("class") == "icon-down") {
        $("#dropdown-icon").attr("class", "icon-up")
    }
    else {
        $("#dropdown-icon").attr("class", "icon-down")
    }
    $(".batch-action-list").toggleClass("ng-hide");
}


dropdownToggle


// 模态框自定义列
function create_modal_custom_column(columns, show_num) {
    var li = ''
    li += '<div class="modal fade" id="modal_show_col" style="margin-top: 60px;">'
    li += '    <div class="modal-dialog">'
    li += '        <div class="modal-content">'
    li += '        <div class="modal-header ng-scope">'
    li += '            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'
    li += '            <h5 class="modal-title ng-binding">自定义列表项</h5>'
    li += '        </div>'
    li += '        <div class="modal-body clearfix row ng-scope">'
    li += '            <div class="col-sm-12 clearfix">'
    /*li += '                <div class="pull-left list-user-preferences-uint nowrap ng-scope">'
     li += '                    <div class="ng-isolate-scope">'
     li += '                        <label style="cursor: pointer" class="inline-block text-muted"><input type="checkbox" class="margin-right-1 ng-pristine ng-valid" disabled="disabled"> 实例ID/名称</label>'
     li += '                    </div>'
     li += '                </div>'*/
    for (var i = 0; i < columns.length; i++) {
        li += '<div class="pull-left list-user-preferences-uint nowrap ng-scope">'
        li += '    <div class="ng-isolate-scope">';
        li += '        <label style="cursor: pointer" class="inline-block text-muted">';
        li += '            <input type="checkbox" class="margin-right-1 ng-pristine ng-valid"' + ((i < show_num) ? ' checked="checked"' : '') + ' data-column="' + (i+1) + '">' + columns[i];
        li += '        </label>';
        li += '    </div>';
        li += '</div>';
    }
    li += '            </div>'
    li += '        </div>'
    li += '    </div>'
    li += '</div>'
    return li;
}


// 数组去重。
// 用法： var a = unique5(arr)
function unique5(array) {
    var r = [];
    for (var i = 0, l = array.length; i < l; i++) {
        for (var j = i + 1; j < l; j++)
            if (array[i] === array[j]) j = ++i;
        r.push(array[i]);
    }
    return r;
}

// 数据集的所有Key。
// li_json数据集, exclude_key要排除的Key
// 用法： var a = get_distinct_key([{'': '', '', ''}, {'': '', '', ''}, {'': '', '', ''}], ['a', 'b', 'c'])
function get_distinct_key(li_json, exclude_key) {
    var all_key = new Array(), tmp = new Array();

    $.each(li_json, function (index, array) {
        $.merge(tmp, Object.keys(array));
    })
    tmp = unique5(tmp.sort())
    $.each(exclude_key, function (index, array) {
        tmp.splice($.inArray(array, tmp), 1);
    })
    exclude_key.splice($.inArray('_id', exclude_key), 1)
    $.merge(all_key, exclude_key);
    $.merge(all_key, tmp);
    console.info('--' + all_key);
    return all_key;
}
/* 根据数据集生成table
data为数据集： 如[{'a': '1', 'b': '2'}, {'b': '3', 'c': '4'}]
columns为列，如['a', 'b']
 */
function createTable(data, columns, show_column_num) {
    var table_html = '';
    table_html += '<table class="table table-hover" style="margin-bottom: 57px;">';
    table_html += '    <thead><tr>';
    table_html += '        <th width="10"><input type="checkbox" class="ng-pristine ng-valid" id="checkAllHead"></th>';
    $.each(columns, function (index, array) {
        table_html += '<th class="ng-isolate-scope">' + array + '</th>';
    })
    table_html += '<th class="ng-isolate-scope text-right">操作</th></tr>';
    table_html += '</thead>';
    table_html += '<tbody>'
    $.each(data, function (index, array) {
        table_html += '<tr class="ng-scope">';
        table_html += '<td width="10"><input type="checkbox" class="ng-pristine ng-valid" name="checkList" data-id="' + array['_id'] + '" data-name="' + array['name'] + '"></td>';
        $.each(columns, function (k, v) {
            if (array.hasOwnProperty(v)) {
                table_html += '<td style="word-wrap:break-word;">' + array[v] + '</td>';
            }
            else {
                table_html += '<td style="word-wrap:break-word;"></td>';
            }
        });
        table_html += '<td class="text-right"><div class="ng-isolate-scope"><div class="ng-scope"><div class="nowrap">';
        table_html += '<a class="btn btn-link btn-xs ng-isolate-scope" href="/configuration/element/update/' + array["_id"] + '">编辑</a><span class="text-explode">|</span>'
        table_html += '<a class="btn btn-link btn-xs ng-isolate-scope btn_del" id="' + array['_id'] + '" name="' + array['name'] + '">删除</a></div></div></div></td></tr>';
    })
    table_html += '</tbody>';
    table_html += '</table>';
    // console.info(table_html)
    $(".gridSection").html(table_html);

    var li = [];
    for (var i = 0; i <= columns.length; i++) {
        if (i > show_column_num) {
            li.push(i)
        }
    }

    var table = $('.gridSection table').DataTable({
        "paging": false,
        "searching": false,
        "bInfo": false,
        "autoWidth": false,
        "order": [[1, "desc"]],
        "columnDefs": [
            {"bSortable": false, "aTargets": [0, -1]},
            {
                "visible": false,
                "targets": li   //[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], //隐藏列
            }]
    });


    //checkbox全选
    $("#checkAllHead,#checkAllFoot").on("click", function () {
        if ($(this).prop("checked") === true) {
            $("input[name='checkList']").prop("checked", $(this).prop("checked"));
            $("#checkAllHead,#checkAllFoot").prop("checked", $(this).prop("checked"));
        } else {
            $("input[name='checkList']").prop("checked", false);
            $("#checkAllHead,#checkAllFoot").prop("checked", false);
        }
    });
    //取消全选
    $('.table-hover tbody').on('click', 'tr input[name="checkList"]', function () {
        var $tmp = $('[name=checkList]:checkbox');
        $('#checkAllHead,#checkAllFoot').prop('checked', $tmp.length == $tmp.filter(':checked').length);
    });

    // 显示弹出框
    $("#modal").html(create_modal_custom_column(columns, show_column_num));
    $('.list-tool-bar-button').on('click', function () {
        $('#modal_show_col').modal().on('shown.bs.modal', function () {

        }).on('hidden.bs.modal', function (event) {

        })
    })

    //显示隐藏列
    $('.margin-right-1').on('change', function (e) {
        e.preventDefault();
        console.log($(this).attr('data-column'));
        var column = table.column($(this).attr('data-column'));
        column.visible(!column.visible());
    })
}




// 批量删除
function do_batch_delete(url, li_id, callBackSuccess, callBackError) {
    $("body").append(create_modal_del(li_id));
    $('#modal_del').modal().on('shown.bs.modal', function (event) {
        $("#btn_do_del").click(function () {
            $(this).attr('disabled', 'disabled');
            $.each(li_id, function (index, array) {
                var obj_span = $(".batch-action-list>li:eq(" + index + ")>span:eq(2)>span:eq(0)");
                $.ajax({
                    type: 'post',
                    dataType: "json",
                    url: url,
                    data: '&obj___id=' + array[0],
                    cache: false,
                    async: false,
                    beforeSend: function () {
                        obj_span.html('<img src="/img/loading.gif">');
                    },
                    success: function (data) {
                        obj_span.html('<i class="text-success margin-left icon icon-yes-1"></i>');
                        callBackSuccess(data);
                    },
                    error: function (data) {
                        obj_span.html('<i class="text-danger margin-left icon icon-no-1"></i>');
                        callBackError(data)
                    }
                });
            })

            layer.msg('操作完成！', {
                icon: 1,
                time: 3000 //2秒关闭（如果不配置，默认是3秒）
            }, function () {
                window.location.reload();
            });
        })
    }).on('hidden.bs.modal', function (event) {
        $("#modal_del").remove();
    })
}

