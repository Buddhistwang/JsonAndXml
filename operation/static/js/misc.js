function getAjax(url, postData, callBack) {
    $.ajax({
        type: 'post',
        dataType: "text",
        url: url,
        data: postData,
        cache: false,
        async: false,
        success: function (data) {
            callBack(data);
            //Loading(false);
        },
        error: function (data) {
            alert("error:" + JSON.stringify(data));
            Loading(false);
        }
    });
}
color_bar = ['#1ab394', '#cacaca']
color = ['#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
    '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
    '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
    '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0']

// 折线图
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
function get_bar_report(data, x_column, y_column, y_name, y_unit) {
    var options = {
        grid: {
            x: 100,      // 左上横
            y: 40,      // 左上纵
            x2: 60,     // 右下横
            y2: 40      // 右下纵
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
                formatter: '{value}'
            }
        },
        yAxis: {
            type: 'category',
            data: [],
            axisLabel: {
                interval: 0     // 全部显示
            }
        },
        color: color_bar,
        series: []
    };

    // X轴数据
    for (x in x_column) {
        options.yAxis.data = data[x_column[x]]
    }

    // Y轴数据
    for (y in y_column) {
        options.series.push({
            name: '崩溃率',
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'right'
                }
            },
            //itemStyle : dataStyle,s
            data: data[y_column[y]]
        })
    }
    // legend数据
    // options.legend.data = y_column

    // yAxis数据
    options.xAxis.name = y_name
    options.xAxis.axisLabel.formatter = '{value}%'

    return options;
}


function get_line_yAlias(data, x_column, y_column, y_alias, y_name, y_unit) {
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
            name: y_alias[y],
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data[y_column[y]]
        })
    }

    // legend数据
    options.legend.data = y_alias

    // yAxis数据
    options.yAxis.name = y_name
    options.yAxis.axisLabel.formatter = '{value}' + y_unit


    return options;
}

// 柱状图-Y轴为类目轴
function get_bar_y_category(data, x_column, y_column, y_name, y_unit) {
    var options = {
        grid: {
            x: 100,      // 左上横
            y: 40,      // 左上纵
            x2: 60,     // 右下横
            y2: 40      // 右下纵
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
                formatter: '{value}',
                rotate: -30
            }
        },
        yAxis: {
            type: 'category',
            data: [],
            axisLabel: {
                interval: 0     // 全部显示
            }
        },
        color: color_bar,
        series: []
    };

    // X轴数据
    for (x in x_column) {
        options.yAxis.data = data[x_column[x]]
    }

    // Y轴数据
    for (y in y_column) {
        options.series.push({
            name: y_column[y],
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'right'
                }
            },
            data: data[y_column[y]]
        })
    }
    // legend数据
    // options.legend.data = y_column

    // yAxis数据
    options.xAxis.name = y_name
    options.xAxis.axisLabel.formatter = '{value}' + y_unit

    return options;
}

option = {
    title: {
        text: '世界人口总量',
        subtext: '数据来自网络'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['2011年', '2012年']
    },
    toolbox: {
        show: true,
        feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    calculable: true,
    xAxis: [
        {
            type: 'value',
            boundaryGap: [0, 0.01]
        }
    ],
    yAxis: [
        {
            type: 'category',
            data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
        }
    ],
    series: [
        {
            name: '2011年',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
        },
        {
            name: '2012年',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
        }
    ]
};

// 横向柱状图
function get_bar_stack_horizontal(data, x_column, y_column, y_name, y_unit, title) {
    var options = {
        grid: {
            x: 100,      // 左上横
            y: 40,      // 左上纵
            x2: 60,     // 右下横
            y2: 40      // 右下纵
        },
        legend: {
            data: []
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },

        title: {
            text: '',
            subtext: ''
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'value',
                boundaryGap: [0, 0.01]
            }
        ],


        yAxis: {
            type: 'category',
            data: [],
            axisLabel: {
                interval: 0     // 全部显示
            }
        },
        // xAxis: {
        //     type: 'value',
        //     axisLabel: {
        //         formatter: ''
        //     }
        // },
        color: color,
        series: []
    };
    // // X轴数据
    // for (x in x_column) {
    //     options.xAxis.data = data[x_column[x]]
    // }

    // X轴数据
    for (y in x_column) {
        options.yAxis.data = data[x_column[y]]
    }

    // Y轴数据
    for (y in y_column) {
        if (y == 0) {
            color_var = '#87cefa'
        } else {
            color_var = '#546570'
        }

        options.series.push({
            name: y_column[y],
            type: 'bar',
            // stack: '广告',
            itemStyle: {normal: {color: color_var}},
            label: {
                normal: {
                    show: true,
                    position: 'right'
                }
            },


            data: data[y_column[y]]
        })
    }

    options.title.text = title

    // legend数据
    options.legend.data = y_column

    // yAxis数据
    // options.yAxis.name = y_name
    // options.yAxis.axisLabel.formatter = '{value}' + y_unit

    return options;
}

// 堆叠柱状图
function get_bar_stack(data, x_column, y_column, y_name, y_unit) {
    var options = {

        barMinHeight: 0,          // 最小高度改为0
        // barWidth: null,        // 默认自适应
        barGap: '30%',            // 柱间距离，默认为柱形宽度的30%，可设固定值
        barCategoryGap: '20%',   // 类目间柱形距离，默认为类目间距的20%，可设固定值

        grid: {
            x: 100,      // 左上横
            y: 40,      // 左上纵
            x2: 60,     // 右下横
            y2: 40      // 右下纵
        },
        legend: {
            data: []
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: [],
            axisLabel: {
                interval: 0     // 全部显示
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: ''
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
            type: 'bar',
            // stack: '广告',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
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

// 地图
function get_map(data, x_column, y_column, y_name, y_unit) {
    var options = {
        backgroundColor: {
            type: 'pattern',
            repeat: 'repeat'
        },
        grid: [{
            // top: 50,
            right: '5%',
            // bottom: '45%',
            left: '55%',
            containLabel: true
        }],
        xAxis: {
            type: 'value',
            scale: true,
            name: '价格',
            // max: 30,
            min: 0,
            boundaryGap: [0.2, 0.2],
            axisLabel: {
                formatter: '{value}'
            }
        },
        yAxis: {
            type: 'category',
            data: [],
            boundaryGap: true,
            axisLabel: {
                interval: 0     // 全部显示
            }
        },
        visualMap: {
            min: 0,
            max: 100,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],           // 文本，默认为数值文本
            calculable: true,
            inRange: {
                color: ['green', 'yellow', 'red']
            }
        },
        tooltip: [{
            trigger: 'item',
            formatter: function (params) {
                if (params.componentSubType == 'map') {
                    return params.seriesName + '<br>' + params.name + ' : ' + params.value;
                }
                else {
                    return params.name + ' : ' + params.value;
                }
            }
        }],
        series: []
    };

    // X轴数据
    for (x in x_column) {
        options.yAxis.data = data['city'][x_column[x]];
    }

    // Y轴数据
    for (y in y_column) {
        options.series.push({
            name: y_column[y],
            type: 'map',
            mapType: 'china',
            roam: false,
            left: '2%',
            right: '50%',
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                }
            },
            data: data[y_column[y]]
        }, {
            type: 'bar',
            stack: 'chart',
            z: 3,
            label: {
                normal: {
                    position: 'right',
                    show: true,
                    formatter: '{c}ms'
                }
            },
            data: data['value'][y_column[y]]
        })
    }
    ;

    // legend数据
    // options.legend.data = y_column

    // yAxis数据
    options.xAxis.name = y_name;
    options.xAxis.axisLabel.formatter = '{value}' + y_unit;
    return options;
}


function get_map_bar(data, x_column, y_column, y_name, y_unit, visual_map_max) {
    var options = {
        backgroundColor: {
            type: 'pattern',
            repeat: 'repeat'
        },
        grid: [{
            // top: 50,
            right: '5%',
            // bottom: '45%',
            left: '55%',
            containLabel: true
        }],
        xAxis: {
            type: 'value',
            scale: true,
            name: '价格',
            // max: 30,
            min: 0,
            boundaryGap: [0.2, 0.2],
            axisLabel: {
                formatter: '{value}'
            }
        },
        yAxis: {
            type: 'category',
            data: [],
            boundaryGap: true,
            axisLabel: {
                interval: 0     // 全部显示
            }
        },
        visualMap: {
            min: 0,
            max: 100,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],           // 文本，默认为数值文本
            calculable: true,
            inRange: {
                color: ['green', 'yellow', 'red']
            }
        },
        tooltip: [{
            trigger: 'item',
            formatter: function (params) {
                if (params.componentSubType == 'map') {
                    return params.seriesName + '<br>' + params.name + ' : ' + params.value;
                }
                else {
                    return params.name + ' : ' + params.value;
                }
            }
        }],
        series: []
    };

    options.visualMap.max = data['max'][visual_map_max];

    // X轴数据
    for (x in x_column) {
        options.yAxis.data = data['key'][x_column[x]];
        // options.yAxis.data = ['a', 'b', 'c'];
    }

    // Y轴数据
    for (y in y_column) {
        options.series.push({
            name: y_column[y],
            type: 'map',
            mapType: 'china',
            roam: false,
            left: '2%',
            right: '50%',
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                }
            },
            data: data[y_column[y]]
        }, {
            type: 'bar',
            stack: 'chart',
            z: 3,
            label: {
                normal: {
                    position: 'right',
                    show: true,
                    formatter: '{c}ms'
                }
            },
            data: data['value'][y_column[y]]
            // data: [1, 2, 3]
        })
    }
    ;

    // legend数据
    // options.legend.data = y_column

    // yAxis数据
    options.xAxis.name = y_name;
    options.xAxis.axisLabel.formatter = '{value}' + y_unit;
    return options;
}
function get_d_pie(data, x_column, y_column) {
    var option = {
        title: {
            text: "",
            subtext: "",
            left: "center",
            textStyle: {
                color: "#fff",
                fontSize: 18
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}:({d}%)"
        },
        series: [{
            name: '浏览器类型',
            type: 'pie',
            radius: ['32%', '60%'],
            color: ['#ec5d51', '#59abe1', '#f4cf42', '#3dc6a8'],
            label: {
                normal: {
                    position: 'inner'
                }
            },
            data: data[x_column]
        }, {
            name: '版本',
            type: 'pie',
            radius: ['62%', '70%'],
            color: ['#a0dca0', '#60bbb6', '#f78db3', '#feadac', '#fae395','#91d4e5','#8eb3e8'],
            label: {
                normal: {
                    position: 'outer'
                }
            },
            data: data[y_column]
        }]
    };
    return option;
}


// 饼图
function get_pie(data, x_column, y_column) {
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: data[x_column]
        },
        color: color,
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: data[y_column],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    return option;
};


function get_d_pie(data, x_column, y_column) {
    var option = {
        title: {
            text: "",
            subtext: "",
            left: "center",
            textStyle: {
                color: "#fff",
                fontSize: 18
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}:({d}%)"
        },
        series: [{
            name: '浏览器类型',
            type: 'pie',
            radius: ['15%', '60%'],
            color: ['#ec5d51', '#59abe1', '#f4cf42', '#3dc6a8'],
            label: {
                normal: {
                    position: 'inner'
                }
            },
            data: data[x_column]
        }, {
            name: '版本',
            type: 'pie',
            radius: ['62%', '70%'],
            color: ['#a0dca0', '#60bbb6', '#f78db3', '#feadac', '#fae395','#91d4e5','#8eb3e8'],
            label: {
                normal: {
                    position: 'outer'
                }
            },
            data: data[y_column]
        }]
    };
    return option;
}


function get_slelect_id(s_id) {
    var obj = document.getElementById(s_id);
    var index = obj.selectedIndex;
    var text = obj.options[index].getAttribute("data-code");
    return text;
}

// 报警级别
function get_priority(priority) {
    var res = ""
    if (priority == "1") {
        res = '提醒';
    }
    else if (priority == "2") {
        res = '警告';
    }
    else if (priority == "3") {
        res = '严重';
    }
    return res;
}

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
