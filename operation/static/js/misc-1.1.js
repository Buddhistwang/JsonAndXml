/**
 * Created by zj on 2017/4/24.
 */
/**
 * 生成分页时要显示的页码范围：get_area_num(3, 5)
 * @param page_index 当前页
 * @param page_total 显示的页数，比如5页
 * @returns {Array}
 */
function get_area_num(page_index, page_total) {
    var count = 7;
    var num_area = [];
    var middle_num = Math.round(count / 2);

    if (page_index <= middle_num) {
        for (var i = 1; i < count + 1; i++) {
            if (i <= page_total) {
                num_area.push(i);
            }
        }
    }
    else if (page_index >= (page_total - count + middle_num)) {
        var start = 1;
        if (start > (page_total - count + start)) {
            start = start - page_total + count
        }
        for (var i = start; i < count + start; i++) {
            index = page_total - count + i
            if (index <= page_total) {
                num_area.push(index);
            }
        }
    }
    else {
        for (var i = 1; i < count + 1; i++) {
            var index = page_index - middle_num + i
            if (index <= page_total) {
                num_area.push(index);
            }
        }
    }
    return num_area;
}

color_bar = ['#1ab394', '#cacaca']
color = ['#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
    '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
    '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
    '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0']

/**
 * 生成数组：range(0, 5)
 * @param start
 * @param end
 * @returns {Array}
 */
function range(start, end) {
    var array = new Array();
    for (var i = start; i < end; i++) {
        array.push(i);
    }
    return array;
}

/**
 * 休眠：sleep(5)
 * @param d
 */
function sleep(d) {
    for (var t = Date.now(); Date.now() - t <= d;);
}


/**
 * 数组去重：var a = unique5(arr)
 * @param array
 * @returns {Array}
 */
function unique5(array) {
    var r = [];
    for (var i = 0, l = array.length; i < l; i++) {
        for (var j = i + 1; j < l; j++)
            if (array[i] === array[j]) j = ++i;
        r.push(array[i]);
    }
    return r;
}


/**
 * 分页函数：jsPage(parseInt(data['pageInfo']['total']), page_size, page_index);
 * @param total_record 总记录数
 * @param page_size 每页显示多少个
 * @param page_index 第几页
 */
/*
var jsPage = function (total_record, page_size, page_index) {
    var page_total = Math.ceil(total_record / page_size);
    // console.info(page_total)
    var li_page_size = [20, 50, 100]
    var num_area = get_area_num(page_index, page_total);
    // console.info(num_area)

    var li = '';
    li += '<div class="ng-scope">'
    li += '    <div class="pull-right ng-isolate-scope">'
    li += '        <div class="pagination-info">'
    li += '            <span class="ng-binding"> 共有' + total_record + '条 </span> ，'
    li += '            <span class="ng-binding ng-hide"> 每页显示：' + page_size + '条 </span>'
    li += '            <span class="ng-binding"> 每页显示：'
    li += '                <select class="ng-pristine ng-valid" onChange="goPageSize(' + page_index + ', this)">'
    for (var i = 0; i < li_page_size.length; i++) {
        if (li_page_size[i] == page_size) {
            li += '<option value="20" selected="selected">' + li_page_size[i] + '</option>'
        }
        else {
            li += '<option value="20">' + li_page_size[i] + '</option>'
        }
    }
    li += '                </select>条'
    li += '            </span>'
    li += '        </div>'
    li += '        <ul class="pagination ng-isolate-scope">'

    if (page_index == 1) {
        li += '<li class="ng-scope disabled"><a class="ng-binding">«</a></li>'
        li += '<li class="ng-scope disabled"><a class="ng-binding">‹</a></li>'
    }
    else {
        li += '<li class="ng-scope"><a class="ng-binding" onclick="goPage(1, ' + page_size + ')">«</a></li>'
        li += '<li class="ng-scope"><a class="ng-binding" onclick="goPage(' + (page_index - 1) + ',' + page_size + ')">‹</a></li>'
    }

    for (var i = 0; i < num_area.length; i++) {
        if (num_area[i] == page_index) {
            li += '<li class="active"><a href="#">' + num_area[i] + '</a></li>';
        }
        else {
            li += '<li><a onclick="goPage(' + num_area[i] + ',' + page_size + ')" title="转到第' + num_area[i] + '页">' + num_area[i] + '</a></li>'
        }
    }

    if (page_total > page_index && page_total > 0) {
        li += '<li class="ng-scope"><a class="ng-binding" onclick="goPage(' + (page_index + 1) + ',' + page_size + ')">›</a></li>'
        li += '<li class="ng-scope"><a class="ng-binding" onclick="goPage(' + page_total + ',' + page_size + ')">»</a></li>'
    }
    else {
        li += '<li class="ng-scope disabled"><a class="ng-binding">›</a></li>'
        li += '<li class="ng-scope disabled"><a class="ng-binding">»</a></li>'
    }
    li += '        </ul>'
    li += '        <span style="padding-left: 15px;padding-right: 15px" class="ng-hide">'
    li += '            <input type="text" class="form-control ng-pristine ng-valid" style="width: 40px; display: inline-block; padding-right: 5px">'
    li += '            <button class="btn btn-default" style="padding: 8px 8px;margin-left: 6px" disabled="disabled">GO</button>'
    li += '        </span>'
    li += '    </div>'
    li += '</div>'
    $("#divPage").html(li)
}
*/


function get_line_no_zoom(data, x_column, y_column, y_name, y_unit) {
    var options = {
        grid: {
            x: '60',      // 左上横
            y: '30',      // 左上纵
            x2: '20',     // 右下横
            y2: '55'      // 右下纵
        },
        legend: {
            data: [],
            //x: 'left',
            bottom: 0,
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: [],
            axisLabel: {
                formatter: function (val) {
                    if (val) {
                        return val.substring(5).split(" ").join("\n"); //横轴信息文字竖直显示
                    }
                    else {
                        return val
                    }
                }
            }
        },
        yAxis: {
            // name: '次数',
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            }
        },
        color: color,
        series: []
    };

    // X轴数据
    for (x in x_column) {
        options.xAxis.data = data[x_column[x]]
    }

    // Y轴数据
    for (y in y_column) {
        options.series.push({
            name: y_column[y],
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data[y_column[y]]


        })
    }

    // legend数据
    options.legend.data = y_column

    // yAxis数据
    options.yAxis.name = y_name
    options.yAxis.axisLabel.formatter = '{value}' + y_unit


    return options;
}
//日志专用
function get_line_no_zoom_log(data, x_column, y_column, y_name, y_unit) {
    var options = {
        grid: {
            x: '60',      // 左上横
            y: '28',      // 左上纵
            x2: '25',     // 右下横
            y2: '85'      // 右下纵
        },
        legend: {
            data: [],
            //x: 'left',
            bottom: 0,
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: [],
            axisLabel: {
                formatter: function (val) {
                    if (val) {
                        return val.substring(5).split(" ").join("\n"); //横轴信息文字竖直显示
                    }
                    else {
                        return val
                    }
                }
            }
        },
        yAxis: {
            // name: '次数',
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            }
        },
        color: color,
        series: []
    };

    // X轴数据
    for (x in x_column) {
        options.xAxis.data = data[x_column[x]]
    }

    // Y轴数据
    for (y in y_column) {
        options.series.push({
            name: y_column[y],
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data[y_column[y]]


        })
    }

    // legend数据
    // if (y_column.length > 8){
    //     var data1 = new Array()
    //     var data2 = new Array()
    //     for (var i = 0; i < y_column.length/2; i++)
    //     {
    //         data1.push(y_column[i]);
    //     }
    //
    //     for (var i = y_column.length/2; i < y_column.length; i++)
    //     {
    //         data2.push(y_column[i]);
    //     }
    //
    //     options.legend = [{
    //             x:'center',
    //             bottom:'0%',
    //             data:data1
    //         },{
    //             x:'center',
    //             // top:'3%',
    //             bottom:'4%',
    //             data:data2
    //     }]
    // }else {
    //     options.legend.data = y_column
    // }

    options.legend.data = y_column

    // yAxis数据
    options.yAxis.name = y_name
    options.yAxis.axisLabel.formatter = '{value}' + y_unit


    return options;
}
function get_line(data, x_column, y_column, y_name, y_unit) {
    var options = {
        grid: {
            x: '80',      // 左上横
            y: '60',      // 左上纵
            x2: '80',     // 右下横
            y2: '95'      // 右下纵
        },
        legend: {
            data: [],
            //x: 'left',
            bottom: 40,
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: [],
            axisLabel: {
                formatter: function (val) {
                    if (val) {
                        return val.substring(5).split(" ").join("\n"); //横轴信息文字竖直显示
                    }
                    else {
                        return val
                    }
                }
            }
        },
        yAxis: {
            // name: '次数',
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            }
        },
        dataZoom: [{
            type: 'inside',
            xAxisIndex: [0],
            start: 0,
            end: 100
        }, {
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }],
        color: color,
        series: []
    };

    // X轴数据
    for (x in x_column) {
        options.xAxis.data = data[x_column[x]]
    }

    // Y轴数据
    for (y in y_column) {
        options.series.push({
            name: y_column[y],
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data[y_column[y]]


        })
    }

    // legend数据
    options.legend.data = y_column

    // yAxis数据
    options.yAxis.name = y_name
    options.yAxis.axisLabel.formatter = '{value}' + y_unit


    return options;
}


function get_histogram(data, x_column, y_column, y_name, y_unit) {
    var option = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330, 220]
            }
        ]
    };

    // X轴数据
    for (x in x_column) {
        options.xAxis.data = data[x_column[x]]
    }

    // Y轴数据
    for (y in y_column) {
        options.series.push({
            name: y_column[y],
            type: 'bar',
            barWidth: '60%',
            data: data[y_column[y]]
        })
    }

    // legend数据
    options.legend.data = y_column;

    // yAxis数据
    options.yAxis.name = y_name;
    options.yAxis.axisLabel.formatter = '{value}' + y_unit;


    return options;
}
/**
 * 分页跳转函数：goPage(4, 9)
 * @param pageIndex
 * @param pageSize
 */
function goPage(pageIndex, pageSize) {
    page_index = pageIndex;
    page_size = pageSize;
    GetGrid(pageIndex, pageSize);
}

/**
 * 分页切换每页显示条数
 * @param pageIndex 页码
 * @param obj 下拉框
 */
function goPageSize(pageIndex, obj) {
    page_index = pageIndex;
    page_size = parseInt(obj.options[obj.selectedIndex].text);
    GetGrid(pageIndex, page_size);
}


/**
 * 生成删除模态框
 * @param li_id
 * @returns {string}
 */
function create_modal_del(li_id) {
    var li = ''
    li += '<div class="modal fade" id="modal_del" style="margin-top: 60px;">'
    li += '    <div class="modal-dialog">'
    li += '    <div class="modal-content">'
    li += '        <div class="console-message-dialog ng-scope">'
    li += '            <div class="modal-header">'
    li += '                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'
    li += '                <h5 class="modal-title ng-binding">删除组件</h5>'
    li += '            </div>'
    li += '            <div class="modal-body clearfix">'
    li += '                <div class="pull-left col-padding"><span class="text-size-32 icon-help-2 text-warning"></span></div>'
    li += '                <div class="pull-left col-padding col-sm-10">'
    li += '                    <div class="ng-isolate-scope">'
    li += '                        <div class="col-sm-12">'
    li += '                            <span class="ng-binding">您所选的</span>'
    li += '                            <span style="cursor: pointer" onclick="dropdownToggle()">'
    li += '                                <span class="text-primary text-size-16 ng-binding">' + li_id.length + '</span>'
    li += '                                <span class="text-primary text-size-16 ng-binding">&nbsp;个组件</span>'
    li += '                                <span class="icon-down" id="dropdown-icon"></span>'
    li += '                            </span>'
    li += '                            <span class="ng-binding">将执行删除组件操作，您是否确认操作？</span>'
    li += '                        </div>'
    li += '                        <div class="col-sm-12">'
    li += '                            <ul class="batch-action-list ng-scope ng-hide" style="max-height: 100px;">'
    $.each(li_id, function (index, array) {
        li += '                                <li ng-repeat="item in selectedItem" class="ng-scope">'
        li += '                                    <span class="ng-scope ng-isolate-scope">'
        li += '                                        <span class="ng-scope">'
        //li += '                                            <span class="ng-scope">' + array[0] + '</span>'
        li += '                                            <span class="ng-scope"></span>'
        li += '                                        </span>'
        //li += '                                        <span class="ng-scope"> / </span>'
        li += '                                        <span class="ng-scope"></span>'
        li += '                                    </span>'
        li += '                                    <span class="ng-scope ng-isolate-scope">'
        li += '                                        <span class="ng-scope">' + array[1] + '</span>'
        li += '                                    </span>'
        li += '                                    <span class="ng-scope ng-isolate-scope">'
        li += '                                        <span class="ng-scope"></span>'
        li += '                                    </span>'
        li += '                                </li>'
    })
    li += '                            </ul>'
    li += '                        </div>'
    li += '                    </div>'
    li += '                </div>'
    li += '            </div>'
    li += '            <div class="modal-footer">'
    li += '                <button class="btn btn-primary" id="btn_do_del" data-whatever="">删除</button>'
    li += '                <button class="btn btn-default" data-dismiss="modal">关闭</button>'
    li += '            </div>'
    li += '        </div>'
    li += '    </div>'
    li += '    </div>'
    li += '</div>'
    return li;
}
function dropdownToggle() {
    if ($("#dropdown-icon").attr("class") == "icon-down") {
        $("#dropdown-icon").attr("class", "icon-up")
    }
    else {
        $("#dropdown-icon").attr("class", "icon-down")
    }
    $(".batch-action-list").toggleClass("ng-hide");
}


/**
 * 生成自定义列模态框
 * @param columns 列，如：['name_cn', 'name_en']
 * @param show_num 显示列数，如：3
 * @returns {string}
 */
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
        li += '            <input type="checkbox" class="margin-right-1 ng-pristine ng-valid"' + ((i < show_num) ? ' checked="checked"' : '') + ' data-column="' + (i + 1) + '">' + columns[i];
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


/**
 * DataTable
 * @param arr_th 列，如：['name_cn', 'name_en']
 * @param show_number 显示列数，如：3
 */
var jsDataTable = function (arr_th, show_number) {
    var li = [];
    for (var i = 0; i <= arr_th.length; i++) {
        if (i > show_number) {
            li.push(i)
        }
    }
    var table = $('#example').DataTable({
        "paging": false,
        "searching": false,
        "bInfo": false,
        "autoWidth": false,
        "order": [[1, 'asc']],
        "columnDefs": [{
            "visible": false,
            "targets": li   //[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], //隐藏列
        }, {
            "bSortable": false,
            "aTargets": []
        }],  //最后一列禁止排序
    });
    $("body").append(create_modal_custom_column(arr_th, show_number));
    $('#icon-setup').on('click', function () {
        $('#modal_show_col').modal().on('shown.bs.modal', function () {

        }).on('hidden.bs.modal', function (event) {

        })
    })
    //显示隐藏列
    $('.margin-right-1').on('change', function (e) {
        e.preventDefault();
        // console.log($(this).attr('data-column'));
        var column = table.column($(this).attr('data-column'));
        column.visible(!column.visible());
    })
    //全选
    $("#check_all_top, #check_all_bottom").on("click", function () {
        if ($(this).prop("checked") === true) {
            $("input[name='checkList']").prop("checked", $(this).prop("checked"));
            $("#check_all_top, #check_all_bottom").prop("checked", $(this).prop("checked"));
            $('body table:first tbody tr').addClass('selected');
        } else {
            $("input[name='checkList']").prop("checked", false);
            $('body table:first tbody tr').removeClass('selected');
            $("#check_all_top, #check_all_bottom").prop("checked", $(this).prop("checked"));
        }
    });
    $('body table:first tbody').on('click', 'tr input[name="checkList"]', function () {
        var $tr = $(this).parents('tr');
        $tr.toggleClass('selected');
        var $tmp = $('[name=checkList]:checkbox');
        $('#check_all_top, #check_all_bottom').prop('checked', $tmp.length == $tmp.filter(':checked').length);
    });
    $('input[type="checkbox"]').on("click", function () {
        var len = $("input[name='checkList']:checked").length;
        if (len < 1) {
            $("#btn_batch_delete").attr("disabled", "disabled");
        } else {
            $("#btn_batch_delete").removeAttr("disabled");
        }
    });
}


/**
 * Ajax通过Post提交数据
 * @param url
 * @param postData
 * @param callBackSuccess
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
function postAjax(url, postData, callBackSuccess) {
    $.ajax({
        type: 'post',
        dataType: "json",
        url: url,
        data: postData,
        cache: false,
        async: false,
        beforeSend: function () {
            var li = '';
            li += '<table class="table table-hover" style="margin-bottom: 12px;" id="example">';
            li += '    <tbody>';
            li += '        <tr bindonce="" class="ng-scope">';
            li += '            <td><img src="/img/loading.gif">数据加载中......</td>';
            li += '        </tr>';
            li += '    </tbody>';
            li += '</table>';
            $(".gridSection").html(li);
        },
        success: function (data) {
            console.info(JSON.stringify(data));
            if (data['code'] == '200') {
                callBackSuccess(data);
            }
            else {
                var msg = '未知状态';
                if (data['code'] == '200') {
                    msg = '操作成功';
                }
                else if (data['code'] == '-1') {
                    msg = '操作失败';
                }
                else if (data['code'] == '10009') {
                    msg = '很抱歉，您没有权限执行此操作';
                }

                layer.msg(msg, {
                    icon: 0,
                    time: 3000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                });
            }
        },
        error: function (data) {
            layer.msg('操作失败！', {
                icon: 0,
                time: 3000 //2秒关闭（如果不配置，默认是3秒）
            }, function () {
            });
        }
    });
}


/**
 * 批量删除操作
 * @param url Post数据的url， 如：/sso/user/delete/<_id>
 * @param li ID，如：['1', '2', '3']
 */
function do_batch_del(url, li) {
    $("body").append(create_modal_del(li));

    $('#modal_del').modal().on('shown.bs.modal', function (event) {

        $('#btn_do_del').on('click', function (e) {
            $.each(li, function (index, array) {
                var obj_span = $(".batch-action-list>li:eq(" + index + ")>span:eq(2)>span:eq(0)");
                $.ajax({
                    url: url.replace('<_id>', array[0]),
                    type: 'post',
                    data: '&_id=' + array[0],
                    dataType: 'json',
                    beforeSend: function () {
                        obj_span.html('<img src="/img/loading.gif">');
                    },
                    success: function (data) {
                        var msg = '<i class="text-danger margin-left icon icon-yes-1"></i> 未知状态';
                        if (data['code'] == '200') {
                            msg = '<i class="text-success margin-left icon icon-yes-1"></i> 操作成功';
                        }
                        else if (data['code'] == '-1') {
                            msg = '<i class="text-danger margin-left icon icon-yes-1"></i> 操作失败';
                        }
                        else if (data['code'] == '10009') {
                            msg = '<i class="text-danger margin-left icon icon-no-1"></i> 很抱歉，您没有权限执行此操作';
                        }
                        obj_span.html(msg);
                    },
                    error: function () {
                        obj_span.html('<i class="text-danger margin-left icon icon-no-1"></i>');
                    }
                })
            });
            layer.msg('操作完成！', {
                icon: 1,
                time: 3000 //2秒关闭（如果不配置，默认是3秒）
            }, function () {
                $('#modal_del').modal('hide');
                GetGrid(page_index, page_size);
            });
        })
    }).on('hidden.bs.modal', function (event) {
        $("#modal_del").remove();
    })
}


/**
 * 获取数据
 */
function get_post_data() {
    var postData = '&page_index=' + page_index + '&page_size=' + page_size;
    $("input[type=text]", $('form:first')).each(function () {
        postData += '&' + $(this).attr('id') + '=' + $(this).val();
    });
    $("select", $('form:first')).each(function () {
        postData += '&' + $(this).attr('id') + '=' + $(this).val();
    });
    $("input[type=checkbox]:checked", $('form:first')).each(function () {
        postData += '&' + $(this).attr('id') + '=' + $(this).val();
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


// tab点击特效
$(".nav-tabs:first li a").click(function () {
    for (var i = 0; i < $(".nav-tabs:first li").size(); i++) {
        if (i == this.id) {
            $("#div_" + i).removeClass("ng-hide");
            $(".nav-tabs:first li").eq(i).addClass("active")
            $("#tab_" + i).removeClass("ng-hide");
        }
        else {
            $("#div_" + i).addClass("ng-hide");
            $(".nav-tabs:first li").eq(i).removeClass("active")
            $("#tab_" + i).addClass("ng-hide");
        }
    }
});


// json中是否存在key：p
function has_key(p) {
    if (p != undefined) {
        return p
    }
    else {
        return '0';
    }
}

var timeoutID = -1;
function set_interval(func, cycle) {
    if (!func) {
        return;
    }
    if (cycle && !isNaN(cycle)) {
        timeoutID = setInterval(func, cycle);
    }
    else {
        // 周期非数字
        console.info('周期非数字')
    }
}
