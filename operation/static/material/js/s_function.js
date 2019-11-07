/* dataTables - Language*/
var oLanguageData = {
    searchPlaceholder: "搜索需要查询的数据",
    sProcessing: "处理中...",
    sLengthMenu: "显示 _MENU_ 项结果",
    sZeroRecords: "没有匹配结果",
    sInfo: "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
    sInfoEmpty: "显示第 0 至 0 项结果，共 0 项",
    sInfoFiltered: "(由 _MAX_ 项结果过滤)",
    sInfoPostFix: "",
    sSearch: "搜索:",
    sUrl: "",
    sEmptyTable: "表中数据为空",
    sLoadingRecords: "载入中...",
    sInfoThousands: ",",
    oPaginate: {
        sFirst: "首页",
        sPrevious: "上页",
        sNext: "下页",
        sLast: "末页"
    },
    oAria: {
        sSortAscending: ": 以升序排列此列",
        sSortDescending: ": 以降序排列此列"
    }
};

/* notify */
function notify(from, align, icon, type, title) {
    $.notify({
        icon: icon,
        title: title,
        message: '',
        url: ''
    }, {
        element: 'body',
        type: type,
        allow_dismiss: true,
        placement: {
            from: from,
            align: align
        },
        offset: {
            x: 20,
            y: 20
        },
        spacing: 10,
        z_index: 1031,
        delay: 500,
        timer: 1000,
        url_target: '_blank',
        mouse_over: true,
        animate: {
            enter: 'animated fadeIn',
            exit: 'animated fadeOut'
        },
        template: '<div data-notify="container" class="alert alert-dismissible alert-{0} alert&#45;&#45;notify" role="alert">' +
        '<span data-notify="icon"></span> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '<button type="button" aria-hidden="true" data-notify="dismiss" class="alert&#45;&#45;notify__close">Close</button>' +
        '</div>'
    });
}

/**
 *dataTables 组件
 **/
function initDataTables(initname, tablename, field_names, datas, column_defs, options) {
    console.log("2-field_names",field_names)
    console.log("2-datas",datas)
    var defaults = {
        data: datas,
        columns: field_names,
        retrieve: true,//保证只有一个table实例
        autoWidth: !1,
        destroy: true,
        responsive: !0,
        columnDefs: column_defs,
        lengthMenu: [[8, 30, 45, -1], ["8 Rows", "30 Rows", "45 Rows", "Everything"]],
        language: oLanguageData,
        dom: "Blfrtip",
        buttons: [
            {extend: "excelHtml5", title: "Export Data"},
            {extend: "csvHtml5", title: "Export Data"},
            {extend: "print", title: "Material Admin"}],
        initComplete: function (a, b) {
            $(this).closest(".dataTables_wrapper").prepend(
                '<ul id="js_updatacol" class="table-dropdown-menu dropdown-menu dropdown-menu-right"></ul></div>' +
                '<div class="dataTables_buttons hidden-sm-down actions">' +
                '<span class="actions__item zmdi zmdi-fullscreen" data-table-action="fullscreen" />' +
                '<span id= "js_dropdown" class="dropdown actions__item zmdi zmdi-format-list-bulleted"></span></div>')

            /*<span class="actions__item zmdi zmdi-print" data-table-action="print" />' +
             '<div class="dropdown actions__item"><i data-toggle="dropdown" class="zmdi zmdi-download" /><ul class="dropdown-menu dropdown-menu-right"><a href="" class="dropdown-item" data-table-action="excel">Excel (.xlsx)</a><a href="" class="dropdown-item" data-table-action="csv">CSV (.csv)</a></ul></div>' +*/

            for (var i = 0; i < field_names.length; i++) {
                $(tablename).parent().find('#js_updatacol').prepend('<li><label class="custom-control custom-checkbox"><input type="checkbox" class="toggle-vis custom-control-input" data-column="' + i + '"><span class="custom-control-indicator"></span><span class="custom-control-description">' + field_names[i]['title'] + '</span></label></li>')
            }
            var srTarget;
            $(this).parent().find("#js_dropdown").bind("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                srTarget = e.target
                console.log("srTarget", srTarget)
                var ul = $("#js_updatacol");
                ul.show();
            });
            $("body").bind("click", function () {
                //var ul = $(tablename).parent().find("#js_dropdown");
                if (event.target != srTarget) {
                    var ul = $("#js_updatacol");
                    ul.hide()
                }
            });
            $(tablename).parent().find('.toggle-vis').on('change', function (e) {
                e.preventDefault();
                var column = initname.name.column($(this).attr('data-column'));
                column.visible(!column.visible());
            });

            $(tablename).parent().find(".dataTables_filter input[type=search]").focus(function () {
                $(this).closest(".dataTables_filter").addClass("dataTables_filter--toggled")
            });
            $(tablename).parent().find(".dataTables_filter input[type=search]").blur(function () {
                $(this).closest(".dataTables_filter").removeClass("dataTables_filter--toggled")
            });
            $("body").off('click', "[data-table-action]").on("click", "[data-table-action]", function (a) {
                a.preventDefault();
                a.stopPropagation();
                var b = $(this).data("table-action");

                if ("excel" === b && $(this).closest(".dataTables_wrapper").find(".buttons-excel").trigger("click"),
                    "csv" === b && $(this).closest(".dataTables_wrapper").find(".buttons-csv").trigger("click"),
                    "print" === b && $(this).closest(".dataTables_wrapper").find(".buttons-print").trigger("click"),
                    "fullscreen" === b) {
                    var c = $(this).closest(".card");
                    c.hasClass("card--fullscreen") ? (c.removeClass("card--fullscreen"),
                        $("body").removeClass("data-table-toggled")) : (c.addClass("card--fullscreen"),
                        $("body").addClass("data-table-toggled"))
                }
            })
        }

    }
    var settings = $.extend({}, defaults, options);//将一个空对象做为第一个参
    initname.name = $(tablename).DataTable(settings)

}

/**
 *dataTables 组件 设置页面
 **/
function initDataTablesCustom(initname, tablename, field_names, datas, column_defs, delapiurl, options) {
    var defaults = {
        data: datas,
        columns: field_names,
        retrieve: true,//保证只有一个table实例
        autoWidth: !1,
        bStateSave: true,
        destroy: true,
        responsive: true,
        columnDefs: column_defs,
        lengthMenu: [[15, 30, 45, -1], ["15 Rows", "30 Rows", "45 Rows", "Everything"]],
        language: oLanguageData,
        dom: "Blfrtip",
        buttons: [
            {extend: "excelHtml5", title: "Export Data"},
            {extend: "csvHtml5", title: "Export Data"},
            {extend: "print", title: "print"}],
        initComplete: function (a, b) {
            $(this).closest(".dataTables_wrapper").prepend(
                '<ul id="js_updatacol" class="table-dropdown-menu dropdown-menu dropdown-menu-right"></ul></div>' +
                '<div class="dataTables_buttons hidden-sm-down actions">' +
                '<span class="actions__item zmdi zmdi-fullscreen" data-table-action="fullscreen" /><span class="actions__item zmdi zmdi-delete alldelete" />' +
                '<span id= "js_dropdown" class="dropdown actions__item zmdi zmdi-format-list-bulleted"></span></div>')
            for (var i = 0; i < field_names.length; i++) {
                $(tablename).parent().find('#js_updatacol').prepend(' <li><label class="custom-control custom-checkbox"><input type="checkbox" class="toggle-vis custom-control-input" data-column="' + i + '"><span class="custom-control-indicator"></span><span class="custom-control-description">' + field_names[i]['title'] + '</span></label></li>')
            }
            var srTarget;
            $(this).parent().find("#js_dropdown").bind("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                srTarget = e.target
                console.log("srTarget", srTarget)
                var ul = $("#js_updatacol");
                ul.show();
            });
            $("body").bind("click", function () {
                //var ul = $(tablename).parent().find("#js_dropdown");
                if (event.target != srTarget) {
                    var ul = $("#js_updatacol");
                    ul.hide()
                }
            });
            $(tablename).parent().find('.toggle-vis').on('change', function (e) {
                e.preventDefault();
                var column = initname.name.column($(this).attr('data-column'));
                column.visible(!column.visible());
            });
            $(tablename).parent().find(".dataTables_filter input[type=search]").focus(function () {
                $(this).closest(".dataTables_filter").addClass("dataTables_filter--toggled")
            });
            $(tablename).parent().find(".dataTables_filter input[type=search]").blur(function () {
                $(this).closest(".dataTables_filter").removeClass("dataTables_filter--toggled")
            });
            $("body").off('click', "[data-table-action]").on("click", "[data-table-action]", function (a) {
                a.preventDefault();
                var b = $(this).data("table-action");
                if ("excel" === b && $(this).closest(".dataTables_wrapper").find(".buttons-excel").trigger("click"),
                    "csv" === b && $(this).closest(".dataTables_wrapper").find(".buttons-csv").trigger("click"),
                    "print" === b && $(this).closest(".dataTables_wrapper").find(".buttons-print").trigger("click"),
                    "fullscreen" === b) {
                    var c = $(this).closest(".card");
                    c.hasClass("card--fullscreen") ? (c.removeClass("card--fullscreen"),
                        $("body").removeClass("data-table-toggled")) : (c.addClass("card--fullscreen"),
                        $("body").addClass("data-table-toggled"))
                }
            })

            //单选功能
            $(tablename).on("click", "[name=checkbox]:checkbox", function () {
                if ($(this).hasClass('checkeds')) {
                    $(this).removeClass('checkeds')
                } else {
                    $(this).addClass('checkeds')
                }
            })
            /*翻页时清空check状态*/
            $(tablename).on('page.dt', function () {
                $("#all_checked").prop('checked', false);
                $('[name=checkbox]:checkbox').prop('checked', false);
                $('[name=checkbox]:checkbox').removeClass('checkeds');
            });
            //全选功能
            $(tablename).on('click', '#all_checked', function () {
                console.log("this.checked", this.checked)
                $('[name=checkbox]:checkbox').prop('checked', this.checked);

                if ($('[name=checkbox]:checkbox').hasClass('checkeds')) {
                    $('[name=checkbox]:checkbox').removeClass('checkeds')
                } else {
                    $('[name=checkbox]:checkbox').addClass('checkeds')
                }

            });
            /*批量删除*/
            $(tablename + "_wrapper").on('click', ".alldelete", function () {
                var urls = [];
                    console.log(" $('.checkeds')", $('.checkeds'))
                $('.checkeds').each(function (i) {

                    urls[i] = delapiurl + $(this).attr("data-id")
                });
                if (urls.length <= 0) {
                    notify('top', 'center', '', 'danger', '请选择要删除的数据');
                } else {
                    dialogDel(urls)
                }
            });
            /*单删除*/
            $(tablename).off("click", ".dodel").on("click", ".dodel", function () {
                var urls = [];
                var url = delapiurl + $(this).data("id")
                urls.push(url)
                dialogDel(urls)

            })

            function dialogDel(urls) {
                var options = {
                    title: '提示',
                    modal_size: 'modal-sm',
                    content: '确认删除' + urls.length + '条数据吗？',
                }
                superModal(options, function () {
                    loading_show()
                    for (var i = 0; i < urls.length; i++) {
                        $.ajax({
                            url: urls[i],
                            type: 'post',
                            dataType: 'json',
                            beforeSend: function () {
                            },
                            success: function (data) {
                            }
                        })
                    }
                    loading_hide()
                    notify('top', 'center', '', 'success', '删除成功');
                    setTimeout(function () {
                        console.log("刷新本页")
                        window.location.reload()
                    }, 1000)
                })
            }


        }
    }
    var settings = $.extend({}, defaults, options);//将一个空对象做为第一个参
    initname.name = $(tablename).DataTable(settings)
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







/* 读取等待*/
function loading_show() {
    $(".page-loader").css("display", "flex");
    $(".page-loader").css("opacity", "0.8");
}

function loading_hide() {
    $(".page-loader").css("display", "none");
}

/*格式化字符串-三位加逗号*/
function toThousands(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}

/**
 * modal组件
 *
 * */
function superModal(options, callback) {
    var defaults = {
        //控件开关
        title: '标题',
        modal_size: 'modal-default',
        content: '提示信息',
        auto_close: false,
    }
    var buttonHtml;
    var settings = $.extend({}, defaults, options);//将一个空对象做为第一个参

    if (settings.auto_close) {
        buttonHtml = '<button type="button" class="btn btn-primary" data-dismiss="modal" >关闭</button>'
    } else {
        buttonHtml = '<button type="button" class="btn btn-secondary" id="model_submit">确定</button>' +
            '<button type="button" class="btn btn-primary" data-dismiss="modal" >取消</button>'
    }

    /*创建基本组件*/
    if ($("#modal_main") == null) {
        var baseModel =
            '   <div class="modal fade" id="modal_main" tabindex="-1">' +
            '        <div class="modal-dialog ' + settings.modal_size + '">' +
            '            <div class="modal-content">' +
            '                <div class="modal-header">' +
            '                    <i class="zmdi zmdi-alert-circle-o"></i><h5 class="modal-title pull-left">' + settings.title + '</h5>' +
            '                </div>' +
            '                <div class="modal-body">' + settings.content + '</div>' +
            '                <div class="modal-footer">' + buttonHtml +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '    </div>';
        $("body").append(baseModel)
    } else {
        var baseModel =
            '   <div class="modal fade" id="modal_main" tabindex="-1">' +
            '        <div class="modal-dialog ' + settings.modal_size + '">' +
            '            <div class="modal-content">' +
            '                <div class="modal-header">' +
            '                    <h5 class="modal-title pull-left">' + settings.title + '</h5>' +
            '                </div>' +
            '                <div class="modal-body">' + settings.content + '</div>' +
            '                <div class="modal-footer">' + buttonHtml +
            '            </div>' +
            '        </div>' +
            '    </div>';
        $("#modal_main").remove();
        $("body").append(baseModel)
    }

    $('#modal_main').modal('show');

    $('#model_submit').off("click").on("click", function () {
        $('#modal_main').modal('hide')
        callback()
    })
}

/* modal组件 - 添加*/
function dialogAdd(url, param, backurl) {
    var options = {
        title: '提示',
        modal_size: 'modal-sm',
        content: '确认要添加？',
        auto_close: false,
    }
    superModal(options, function () {
        $.ajax({
            url: url,
            type: 'post',
            data: param,
            dataType: 'json',
            beforeSend: function () {
                loading_show()
            },
            success: function (data) {
                if (data.code == "200") {
                    loading_hide()
                    notify('top', 'center', '', 'success', '添加成功,2秒后返回列表页');
                    setTimeout(function () {
                        window.location.href = backurl
                    }, 2500)
                } else {
                    loading_hide()
                    notify('top', 'center', '', 'success', '添加成功,2秒后返回列表页' + data.code);
                    setTimeout(function () {
                        window.location.href = backurl
                    }, 2500)
                }
            },
        })
    })
}

/* modal组件 - 修改*/
function dialogUpdate(url, param, backurl) {
    var options = {
        title: '提示',
        modal_size: 'modal-sm',
        content: '确认要修改？',
        auto_close: false,
    }
    superModal(options, function () {
        $.ajax({
            url: url,
            type: 'post',
            data: param,
            dataType: 'json',
            beforeSend: function () {
                loading_show()
            },
            success: function (data) {
                if (data.code == "200") {
                    loading_hide()
                    notify('top', 'center', '', 'success', '修改成功,2秒后返回列表页');
                    setTimeout(function () {
                        window.location.href = backurl
                    }, 2500)
                } else {
                    loading_hide()
                    notify('top', 'center', '', 'success', '修改成功,2秒后返回列表页' + data.code);
                    setTimeout(function () {
                        window.location.href = backurl
                    }, 2500)
                }
            }
        })
    })
}


/**
 * 线图组件
 * url: 接口url地址以 ? & 号结尾
 * linechartid:线图容器外层id
 * myChart:初始化echarts容器
 * options:修改配置项
 *
 * */
function createSuperLineChart(url, myChart, options) {
    var defaults = {
        //数据展示xy列标
        x_column: "",
        y_column: "",
        y_name: "",
        y_unit: "",
    }
    var settings = $.extend({}, defaults, options);//将一个空对象做为第一个参
    /**
     * 获取echart配置
     * */
    var getOption = function (series_data) {
        var config = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: [],//legend_data
            },
            /*  dataZoom: [
                  {
                      type: 'slider',
                      show: true,
                      xAxisIndex: [0],
                      handleSize: 16,//滑动条的 左右2个滑动条的大小
                      height: 6,//组件高度
                      left: 100, //左边的距离
                      right: 100,//右边的距离

                      bottom: 15,//右边的距离
                      handleColor: '#fff',//h滑动图标的颜色
                      handleStyle: {
                          borderColor: "#cacaca",
                          borderWidth: "1",
                          shadowBlur: 2,
                          background: "#fff",
                          shadowColor: "#ddd",
                      },
                      fillerColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                          //给颜色设置渐变色 前面4个参数，给第一个设置1，第四个设置0 ，就是水平渐变
                          //给第一个设置0，第四个设置1，就是垂直渐变
                          offset: 0,
                          color: '#1eb5e5'
                      }, {
                          offset: 1,
                          color: '#5ccbb1'
                      }]),
                      backgroundColor: '#f2f2f2',//两边未选中的滑动条区域的颜色
                      showDataShadow: false,//是否显示数据阴影 默认auto
                      showDetail: true,//即拖拽时候是否显示详细数值信息 默认true
                      handleIcon: 'M-292,322.2c-3.2,0-6.4-0.6-9.3-1.9c-2.9-1.2-5.4-2.9-7.6-5.1s-3.9-4.8-5.1-7.6c-1.3-3-1.9-6.1-1.9-9.3c0-3.2,0.6-6.4,1.9-9.3c1.2-2.9,2.9-5.4,5.1-7.6s4.8-3.9,7.6-5.1c3-1.3,6.1-1.9,9.3-1.9c3.2,0,6.4,0.6,9.3,1.9c2.9,1.2,5.4,2.9,7.6,5.1s3.9,4.8,5.1,7.6c1.3,3,1.9,6.1,1.9,9.3c0,3.2-0.6,6.4-1.9,9.3c-1.2,2.9-2.9,5.4-5.1,7.6s-4.8,3.9-7.6,5.1C-285.6,321.5-288.8,322.2-292,322.2z',
                      filterMode: 'filter',
                  },
                  //下面这个属性是里面拖到
                  {
                      type: 'inside',
                      show: true,
                      xAxisIndex: [0],
                      start: 1,
                      end: 100
                  }],*/
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
                lineStyle: {color: "#ccc", type: 'dotted'}
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: [],
                axisLine: {show: true, lineStyle: {color: "#ccc",}},
            }],
            yAxis: {
                type: 'value',
                axisLine: {show: false, lineStyle: {color: "#ccc"}},
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#ccc'],
                        width: 1,
                        type: 'dotted'
                    },
                }
            },
            series: [],
        };

        // X 轴数据
        for (x in settings.x_column) {
            config.xAxis[0].data = series_data[settings.x_column]
        }

        // series数据设置
        for (y in settings.y_column) {
            config.series.push({
                name: settings.y_name[y],
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: series_data[settings.y_column[y]]
            })
        }

        // legend设置
        config.legend.data = settings.y_name

        // y列单位设置
        config.yAxis.name = settings.y_unit

        return config;
    }


    myChart.showLoading({
        text: 'loading',
        color: '#dddddd',
        textColor: '#ccc',
        maskColor: 'rgba(255, 255, 255, 0.8)',
        zlevel: 0
    });

    $.ajax({
        url: url,
        dataType: 'json',
        success: function (data) {
            window.onresize = myChart.resize();
            myChart.hideLoading();
            myChart.setOption(getOption(data), true);

        },
        error: function () {
        }
    });
}
