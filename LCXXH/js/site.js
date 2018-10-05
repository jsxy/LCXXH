var _iframe_layout_north_init_size = null;
var prompt=9;
var _constants = {
    DATA_GRID_NUMBER_START: 0
};
/* FIX IE下不支持indexOf方法属性 */
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;
    for (; from < len; from++)
    {
      if (from in this && this[from] === elt){
        return from;
      }
    }
    return -1;
  };
}

/**
 * 表单折叠展开 默认高度 46
 **/
function search_fold(obj) {
    if (null == _iframe_layout_north_init_size) {
        _iframe_layout_north_init_size = _iframe_layout.state.north.size;
    }
    var o = $(obj);
    if (o.hasClass("up")) {
        _iframe_layout.sizePane("north", _iframe_layout_north_init_size);
        o.removeClass("up");
        o.html('<i class="fa fa-angle-double-up"></i>');
    } else {
        _iframe_layout.sizePane("north", 45);
        o.addClass("up");
        o.html('<i class="fa fa-angle-double-down"></i>');
    }
}

function action_manage_confirm(title, message, callback, btn) {
    if (window != top.window) {
        top.action_manage_confirm(title, message, callback, btn);
        return;
    }
    if (!message) {
        message = "";
    }
    quick_dialog("action_manage_confirm_dlg", title, {
        template: "<div class=\"ui-dialog-form\" style='padding:4px;'> <div class=\"k-error-colored action-manage-confirm-wrap\"> <i class=\"fa fa-exclamation-circle\" style='font-size: 45px;padding: 20px 20px 0 10px;display: inline-block;float: left;'></i> <div style=\"margin-left:70px\"> <p>" + message + "</p> <p>再次确认请输入</p> <table style=\"margin-top: 10px;\"><tr><td width=\"80\" align=\"left\" class=\"label\">管理员密码：</td><td width=\"200\"><input name=\"password\" class=\"k-textbox\" type=\"password\"></td><td></td></tr></table></div><div class=\"fn-clear\"></div></div>" +
        "<div class=\"actions\" style='position:absolute;'><button class=\"btn_ok_confirm hc_btn k-button k-primary\" type=\"button\"><i class=\"fa fa-trash-o\"></i>确 定</button><button class=\"hc_btn k-button\" type=\"button\" onclick=\"close_dialog('action_manage_confirm_dlg')\"><i class=\"fa fa-ban\"></i>取 消</button></div></div>"
    }, 500, 220, btn, false, false);

    setTimeout(function () {
        $("#action_manage_confirm_dlg .btn_ok_confirm").click(function () {
            var pwd = $("#action_manage_confirm_dlg input[name='password']").val();
            quick_ajax("/platform/login/confirm", {"pwd": pwd}, function (res) {
                if (callback && $.isFunction(callback)) {
                    callback();
                    close_dialog('action_manage_confirm_dlg');
                }
            }, null, null, "POST", "", true, false);


        });
    }, 500);


}
/**
 *
 * Dialog 快捷方法
 * 参数(id)：指定弹出框的id
 * 参数(title)：指定弹出框的标题
 * 参数(url)：指定弹出框加载的iframe地址
 * 参数(width)：指定弹出框的宽度，可选
 * 参数(height)：指定弹出框的高度，可选
 * 参数(btn)：指定要恢复的按钮，可选
 * 参数(reload)：Boolean，指定是否在弹出框弹出时刷新iframe页面，可选
 * 参数(useiframe):Boolean,指定是否使用iframe方式加载页面，默认“是”
 **/
function quick_dialog(id, title, url, width, height, btn, reload, useiframe) {
    if (window != top.window) {
        top.quick_dialog(id, title, url, width, height, btn, reload, useiframe);
        return;
    }

    if (btn) {
        btn_running(btn);
    }
    var $el;
    if (id) {
        $el = $("#" + id);
    } else {
        id = "dlg_" + new Date().getTime();
    }
    if (!$el || $el.length == 0) {
        $el = $('<div id="' + id + '"></div>').appendTo('body');
    }
    if (useiframe == undefined || useiframe == null) {
        useiframe = true;
    }
    var win = $("#" + id).data("kendoWindow");
    if (win) {
        win.open();
        win.title(title||"");
        //if (reload) {
            win.refresh({
                iframe: useiframe,
                url:url
            });
        //}
        return;
    }

    var options = {
        title: title,
        content: url,
        //appendTo : top.window.document.body,
        iframe: useiframe,
        modal: true,
        pinned: true,
        /*关闭缩放*/
        resizable: false,
        /*关闭最大化按钮，如果需要放开maximize*/
        /*不销毁窗口的情况下刷新会变成上一个打开的窗口，BUG*/
        actions: [/*"Maximize", *//*"Refresh",*/ "Close"],
        activate: function () {
            if (useiframe) {
                $("#" + id).addClass("k-window-iframecontent-loading");
                iframe_loaded($("iframe", "#" + id)[0], function () {
                    $("#" + id).removeClass("k-window-iframecontent-loading");
                });
            }
        },
        open: function () {
            this.center();
        },
        close: function () {
            if (btn) {
                btn_enabled(btn);
            }
            //与视频插件有冲突，暂时未找到解决办法，先关闭destroy暂时应对
            //this.destroy();

            //关闭窗口时主动销毁iframe
            $("iframe").each(function(){
                var src = $(this).attr("src");
                if(src==url){
                    ////console.info($(this).attr("src"));
                    $(this).attr("src","");
                }
            })
        }
    };
    if (width) {
        options.width = width>$(window).width()?$(window).width():width;
        //options.width = $(window).width();
        options.orginalWidth = width;
    }
    if (height) {
        options.height = height>$(window).height()-40?$(window).height()-40:height;
        //options.height = $(window).height()-40;
    }

    $el.hcWindow(options);

}

/**
 * 获取Dialog对象
 **/
function get_dialog(id) {
    if (window != top.window) {
        return top.get_dialog(id);
    }
    return $("#" + id).data("kendoWindow");
}

/**
 * 刷新dialog对象内容
 * @param id
 */
function refresh_dialog(id){
    var dialog = get_dialog(id);
    if(dialog){
        dialog.refresh();
    }
}

/**
 * resize Dialog
 **/
function resize_dialog(id, width, height) {
    var dialog = get_dialog(id);
    if (dialog) {
        if (width) {
            dialog.setOptions({width: width});
        }
        if (height) {
            dialog.setOptions({height: height});
        }

        dialog.center();
    }
}

/**
 * 获取Grid对象
 **/
function get_grid(grid_el) {
    return $(grid_el).data("kendoGrid");
}

/**
 * 获取Dialog中的Grid对象
 **/
function get_grid_in_dialog(dialog_id, grid_el) {
    var dlg = get_dialog(dialog_id);
    if (!dlg)return null;
    var iframe = $("iframe", dlg.element[0]);
    if (!iframe)return null;
    return iframe[0].contentWindow.get_grid(grid_el);
}

/**
 * 获取父窗口中的Grid对象
 **/
function get_grid_in_main_frame(grid_el) {
    if (window != top.window) {
        return top.get_grid_in_main_frame(grid_el);
    }
    var iframe = $("#_main_frame");
    if (!iframe)return null;
    return iframe[0].contentWindow.get_grid(grid_el);
}

function get_button(el) {
    return $(el).data("kendoButton");
}

function get_button_in_main_frame(btn) {
    var iframe = $("#_main_frame");
    if (!iframe || iframe.length == 0)return null;
    return iframe[0].contentWindow.get_button(btn);
}

/**
 * 获取Dialog中的Element对象
 **/
function get_el_in_dialog(dialog_id, el) {
    var dlg = get_dialog(dialog_id);
    if (!dlg)return null;
    var iframe = $("iframe", dlg.element[0]);
    if (!iframe)return null;
    return iframe[0].contentWindow.get_el(el);
}


function get_el_in_main_frame(el) {
    if (window != top.window) {
        return top.get_el_in_main_frame(el);
    }
    var iframe = $("#_main_frame");
    if (!iframe)return null;
    return iframe[0].contentWindow.get_el(el);
}

/**
 * 调用指定Dialog中的方法
 **/
function call_fun_in_dialog(dialog_id, fun, options) {
    var dlg = get_dialog(dialog_id);
    if (!dlg)return null;
    var iframe = $("iframe", dlg.element[0]);
    if (!iframe)return null;
    iframe[0].contentWindow.eval(fun+'()');
}

/**
 * 把Dom对象封装成jQuery对象
 **/
function get_el(el) {
    return $(el);
}

/**
 * 关闭Dialog同时销毁Dialog对象
 **/
function close_dialog(id, destroy) {
    if (id == undefined) {
        //FIXME
        var wins = $(".k-window-iframecontent", top.window.document.body);
        var idx = wins.length-1;
        id = wins.eq(idx).attr("id");
    }
    if (window != top.window) {
        top.close_dialog(id);
        return;
    }
    var win = $("#" + id).data("kendoWindow");
    if (destroy == undefined) {
        destroy = true;
    }
    win.close();
    if (destroy) {
        win.destroy();
        return;
    }
}

/**
 * 加载iframe时的回调函数
 **/
function iframe_loaded(iframe, callback) {
    if (!iframe)return;
    if (iframe.attachEvent) {
        iframe.attachEvent("onload", function () {
            callback();
        });

    } else {
        iframe.onload = function () {
            callback();
        };
    }

}
/**
 *
 * Ajax 快捷方法
 * 参数(url)：ajax请求地址
 * 参数(data)：ajax传递到服务端的数据，可选
 * 参数(success_callback)：ajax请求成功的回调函数，可选
 * 参数(btn)：ajax请求完成之后恢复按钮，可选
 * 参数(grid)：要刷新的Grid对象，可选
 * 参数(type)：请求方式，POST或GET
 * 参数(msg)：请求成功之后的消息提醒文案，默认 "操作成功！"
 * 参数(autonotify)：是否显示提示信息
  * 参数(show_success_msg)：是否显示正确信息
 **/
function quick_ajax(url, data, success_callback, btn, grid, type, msg, autonotify, show_success_msg) {
    type = type || "POST";
    if (autonotify === undefined || autonotify === null || autonotify === "") {
        autonotify = true;
    }
    if (show_success_msg === undefined || show_success_msg === null || show_success_msg === "") {
        show_success_msg = true;
    }

    if (btn) {
        btn_running(btn);
    }
    $.ajax({
        url: url,
        type: type,
        data: data || {},
        success: function (res) {
            if (res && res.status == "success") {
                if (autonotify && show_success_msg) notify(msg || res.message || "操作成功！", "success");
                if (grid) {
                    grid.dataSource.read();
                }
                if (success_callback && $.isFunction(success_callback)) {
                    success_callback(res);
                }
            } else if (res && res.status == "error") {
                if (autonotify) notify(res.message || "操作失败！", "error");
            }
        },
        complete: function () {
            if (btn) {
                btn_enabled(btn);
            }
        }
    });
}

/**
 *
 * TreeList 快捷方法
 * 参数(el)：指定装载tree的容器
 * 参数(formId)：表单的id，自动将指定表单中的数据传送到服务器，可选
 * 参数(readUrl)：获取数据的 URL 地址
 * 参数(columns)：TODO
 * 参数(options)：tree 配置，可选
 * 参数(dsOptions)：DataSource 配置，可选
 * 参数(operates)：生成操作按钮，可选
 * 参数(toolbarId)：工具条的id，可选
 **/
function quick_treelist(el, formId, readUrl, columns, options, dsOptions, operates, toolbarId) {
    options = options || {};
    toolbarId = toolbarId || "#grid_toolbar_template";
    var _dbopt = {
        transport: {
            read: {
                url: readUrl,
                type: "POST",
                dataType: "json",
                cache: false,
                data: function (p) {
                    if (formId) {
                        var arr = $(formId).serializeArray();
                        if (arr && arr.length > 0) {
                            var d = {};
                            $.each(arr, function (idx, it) {
                                if (it.value) {
                                    // 多选情况下，同一key有多个值
                                    if (d[it.name]) {
                                        d[it.name] = d[it.name] + ","+it.value;
                                    }
                                    else {
                                        d[it.name] = it.value;
                                    }
                                }
                            });
                            return d;
                        }
                    }
                    return {};
                }
            }
        }
    };
    if (dsOptions) {
        _dbopt = $.extend(_dbopt, dsOptions);
    }
    var _opt = {
        dataSource: new kendo.data.TreeListDataSource(_dbopt),
        toolbar: hc.template($(toolbarId).html().replace(/&lt;/g, '<').replace(/&gt;/g, '>')),
        height: "100%",
        groupable: false,
        selectable: true,
        columns: columns,
        messages: {
            noRows: "无记录",
            loading: "加载中...",
            requestFailed: "请求失败.",
            retry: "重试",
            commands: {
                edit: "编辑",
                update: "修改",
                canceledit: "取消",
                create: "新增",
                createchild: "新增子记录",
                destroy: "删除",
                excel: "导出Excel",
                pdf: "导出PDF"
            }
        }
    };
    if (options) {
        _opt = $.extend(_opt, options);
    }

    $(el).hcTreeList(_opt);

    var $toolbar = $(".k-grid-toolbar .toolbar .grid_operates", el);

    if (operates && operates.length > 0) {
        $.each(operates, function (idx, it) {

            if(it.type=="button")
            {
                var $oper = $('<li><button ' + (it.id ? 'id="' + it.id + '"' : '') + '>' + (it.icon ? '<i class="' + it.icon + '"></i>' : '') + it.name + '</button></li>');
                if (it.onclick && $.isFunction(it.onclick)) {
                    $("button", $oper).bind("click.toolbar", function (e) {
                        it.onclick(this, $(el).data("kendoTreeList"));
                    });
                }
                $toolbar.append($oper);
            }else if(it.type=="checkbox")
            {
                var $oper = $('<li><input type=\"checkbox\" ' + (it.name ? 'name="' + it.name + '"' : '') + (it.value ? 'value="' + it.value + '"' : '')  + (it.id ? 'id="' + it.id + '"' : '') + '>' + (it.icon ? '<i class="' + it.icon + '"></i>' : '') + it.name + '</input></li>');
                if (it.onclick && $.isFunction(it.onclick)) {
                    $("button", $oper).bind("click.toolbar", function (e) {
                        it.onclick(this, $(el).data("kendoTreeList"));
                    });
                }
                $toolbar.append($oper);
            }else
            {
                var $oper = $('<li><button ' + (it.id ? 'id="' + it.id + '"' : '') + '>' + (it.icon ? '<i class="' + it.icon + '"></i>' : '') + it.name + '</button></li>');
                if (it.onclick && $.isFunction(it.onclick)) {
                    $("button", $oper).bind("click.toolbar", function (e) {
                        it.onclick(this, $(el).data("kendoTreeList"));
                    });
                }
                $toolbar.append($oper);
            }
        });
    }

    if (formId) {
        $(formId).submit(function (event) {
            var _this = this;
            var grid = $(el).data("kendoTreeList");
            btn_running($("*[type='submit']", _this));

            grid.dataSource.xquery({}, function () {
                btn_enabled($("button[type='submit']", _this));
            });
            event.preventDefault();
            return false;
        });
    }
}

/**
 *
 * DataGrid 快捷方法
 * 参数(el)：指定装载tree的容器
 * 参数(formId)：表单的id，自动将指定表单中的数据传送到服务器，可选
 * 参数(readUrl)：获取数据的 URL 地址
 * 参数(columns)：TODO
 * 参数(options)：tree 配置，可选
 * 参数(dsOptions)：DataSource 配置，可选
 * 参数(operates)：生成操作按钮，可选
 * 参数(toolbarId)：工具条的id，可选
 * 参数(showShort)：显示短的分页工具条，默认显示长工具条
 **/
function quick_datagrid(el, formId, readUrl, columns, options, dsOptions, operates, toolbarId,showShort) {
    options = options || {};
    toolbarId = toolbarId || "#grid_toolbar_template";

    var _dbopt = {
        transport: {
            read: {
                url: readUrl,
                type: "POST",
                dataType: "json",
                cache: false,
                data: function (p) {
                    if (formId) {
                        var arr = $(formId).serializeArray();
                        if (arr && arr.length > 0) {
                            var d = {};
                            $.each(arr, function (idx, it) {
                                if (it.value) {
                                    // 多选情况下，同一key有多个值
                                    if (d[it.name]) {
                                        d[it.name] = d[it.name] + ","+it.value;
                                    }
                                    else{
                                        d[it.name] = it.value;
                                    }
                                }
                            });
                            return d;
                        }
                    }
                    return {};
                }
            },
            parameterMap: function (data, type) {
                if (type == "read") {
                    data.pageNo = data.page;
                    data.page = undefined;
                    data.take = undefined;
                    data.skip = undefined;
                    delete data.page;
                    delete data.take;
                    delete data.skip;
                    return data;
                }
            }
        },
        schema: {
            type: "json",
            data: "rows",
            total: "total"
        },
        serverPaging: true,
        pageSize: options.pageSize || 20,
        change: function () {
            _constants.DATA_GRID_NUMBER_START = 0;
        }
    };
    if (dsOptions) {
        _dbopt = $.extend(_dbopt, dsOptions);
    }
    var _opt = {
        dataSource: new kendo.data.DataSource(_dbopt),
        //toolbar: hc.template($(toolbarId).html().replace(/&lt;/g, '<').replace(/&gt;/g, '>')),
        height: "100%",
        groupable: false,
        selectable: true,
        pageable: {
            refresh: true,
            pageSizes: [10, 20, 50, 100],
            input: (showShort==true?false:true),
            buttonCount: (showShort==true?1:5),
            messages: {
                empty: "没有数据",
                display: (showShort==true?"":"共{2}条数据，本页显示{0}-{1}条"),
                page: "",
                of: "/ {0}",
                itemsPerPage: "",
                first: "首页",
                last: "末页",
                next: "下一页",
                previous: "上一页",
                refresh: "刷新",
                morePages: "更多页"
            }
        },
        showNumber: true,
        columns: columns
    };
    if (options) {
        _opt = $.extend(_opt, options);
    }

    if (_opt.showNumber) {
        _opt.columns.splice(0, 0, {
            title: "序号",
            width: 50,
            template: "#:(++(_constants.DATA_GRID_NUMBER_START)) #",
            attributes: {
                "class": "grid_number"
            }
        });
    }

    $(el).hcGrid(_opt);

    var $toolbar = $(".k-grid-toolbar .toolbar .grid_operates", el);
    if (operates && operates.length > 0) {
        $.each(operates, function (idx, it) {
            //alert(it.type)
            if(it.type=="button")
            {
                var $oper = $('<li><button ' + (it.id ? 'id="' + it.id + '"' : '') + '>' + (it.icon ? '<i class="' + it.icon + '"></i>' : '') + it.name + '</button></li>');
                if (it.onclick && $.isFunction(it.onclick)) {
                    $("button", $oper).bind("click.toolbar", function (e) {
                        it.onclick(this, $(el).data("kendoGrid"));
                    });
                }
                $toolbar.append($oper);
            }else if(it.type=="checkbox")
            {
                var $oper = $('<li><input style=\"vertical-align: middle;\" type=\"checkbox\" ' + (it.checked ? 'checked="' + it.checked + '"' : '') + (it.name ? 'name="' + it.name + '"' : '') + (it.value ? 'value="' + it.value + '"' : '')  + (it.id ? 'id="' + it.id + '"' : '') + '>' + (it.icon ? '<i class="' + it.icon + '"></i>' : '') + it.name + '</input></li>');
                if (it.onclick && $.isFunction(it.onclick)) {
                    $(":checkbox", $oper).bind("click.toolbar", function (e) {
                        it.onclick(this, $(el).data("kendoGrid"));
                    });
                }
                if (it.onchange && $.isFunction(it.onchange)) {
                    $(":checkbox", $oper).bind("change.toolbar", function (e) {
                        it.onchange(this, $(el).data("kendoGrid"));
                    });
                }
                $toolbar.append($oper);
            }else
            {
                var $oper = $('<li><button ' + (it.id ? 'id="' + it.id + '"' : '') + '>' + (it.icon ? '<i class="' + it.icon + '"></i>' : '') + it.name + '</button></li>');
                if (it.onclick && $.isFunction(it.onclick)) {
                    $("button", $oper).bind("click.toolbar", function (e) {
                        it.onclick(this, $(el).data("kendoGrid"));
                    });
                }
                $toolbar.append($oper);
            }
        });
    }

    if (_opt.excel) {
        var $gridtool = $(".k-grid-toolbar .toolbar .grid_tool", el);
        // var $oper = $('<li><a href="javascript:void(0)" class=""><i class="fa fa-file-excel-o"></i></a></li>');
        // var $oper = $('<li><a href="javascript:void(0)" class=""><i class="fa fa-file-excel-o"></i></a></li>');
        var btn_export = '<li><button data-role="button" class="k-button" role="button" aria-disabled="false" tabindex="0"><i class="fa fa-file-excel-o"></i>导出查询结果</button>'
        var $oper = $(btn_export);
        $oper.bind("click.gridtool", function (e) {
            var grid = $(el).data("kendoGrid");
            if (grid) {
                grid.saveAsExcel();
            }
        });
        $gridtool.append($oper);
    }


    if (formId) {
        $(formId).submit(function (event) {
            var _this = this;
            var grid = $(el).data("kendoGrid");
            btn_running($("*[type='submit']", _this));

            grid.dataSource.xquery({
                page: 1,
                pageSize: grid.dataSource.pageSize()
            }, function () {
                btn_enabled($("button[type='submit']", _this));
            });
            event.preventDefault();
            return false;
        });
    }

}
/**
 * Dialog中的form表单验证失败，重新设定dialog的宽度，居中定位
 * 参数(formEl)：dialog中的表单id
 * 参数(dialogId)：dialog对象的id
 **/
function form_validation_dialog_event(formEl, dialogId) {
    $(formEl).on("validation", function (e, current) {
        var dlg = get_dialog(dialogId);
        if (this.isValid === false) {
            if (dlg.options.orginalWidth == dlg.options.width) {
                dlg.setOptions({width: dlg.options.orginalWidth + 100});
                dlg.center();
            }
        } else {
            dlg.setOptions({width: dlg.options.orginalWidth});
            dlg.center();
        }
    })
}


/**
 * Notify 信息提示封装
 * 参数(message)：显示在提示框中的文本
 * 参数(status)：信息提示框的状态，默认 "success"，如果状态是 "success" 或 "warn"，自动关闭
 * 参数(autoHide)：是否自动关闭，默认根据status状态指定
 * 参数(local)：是否显示在本层，默认否
 **/
function notify(message, status, autoHide,local) {
    var elementLth=top.$(".notifyjs-wrapper").length;
    if(elementLth==undefined||elementLth==0){
        if (!status) status = "success";
        if (typeof autoHide != 'boolean') {
            autoHide = (status == "success" || status == "warn") ? true : false;
        }
        if(local==undefined){
            local=false;
        }
        if (window != top.window && local==false) {
            top.notify(message, status);
            return;
        }
        $.notify(message, {
            globalPosition: 'top center',
            arrowShow: true,
            className: status || "success",
            autoHide: autoHide
        });
    }else{
        return;
    }
}


/**
 * 打开提示框
 * title 标题
 * text  内容
 * width 宽度
 * height 高度
 * cancelButton 是否显示取消按钮
 * okButton  是否显示确认按钮
 * callBack 点击ok按钮后回调
 **/
function open_dialog(title,text,cancelButton,okButton,callBack) {
    if (window != top.window) {
        top.open_dialog(title,text,cancelButton,okButton,callBack);
        return;
    }
    $("#notify_dialog").css("display","block");
    $("#notify_dialog").find(".prompt-title").text(title);
    $("#notify_dialog").find(".prompt-content-td").text(text);
    if(!cancelButton)
        $("#notify_dialog").find("#prompt-cancel").hide();
    else
        $("#notify_dialog").find("#prompt-cancel").show();
    if(!okButton)
        $("#notify_dialog").find("#prompt-ok").hide();
    else
    {
        $("#notify_dialog").find("#prompt-ok").show();
        $("#notify_dialog").find("#prompt-ok").click(function () {
            if (callBack && $.isFunction(callBack)) {
                callBack();
            }
        });
    }
}

/**
 * Confm 信息确认框
 * 参数(message)：显示在提示框中的文本
 * **/
function confmDel(callback) {
    top.$(".prompt-shade").show();
    top.$("#prompt-cancel").onclick=function () {
        top.$(".prompt-shade").hide();
        callback;
    };
    top.$("#prompt-ok").onclick=function () {
        top.$(".prompt-shade").hide();
        callback;
    };
    /*var promptInterval=setInterval(function () {
        if(prompt==1){
            debugger;
            clearInterval(promptInterval);
            prompt=9;
            callback;
            return 1;
        }else if(prompt==0){
            debugger;
            clearInterval(promptInterval);
            prompt=9;
            return 0;
        }
    },100);*/
}
function promptCancel(){
    top.$(".prompt-shade").hide();
    prompt=0;
}
function promptOk() {
    top.$(".prompt-shade").hide();
    prompt=1;
}
/**
 * 表单提交的button组件
 * 参数(button)：指定按钮元素
 * 参数(el)：指定表单元素
 * 参数(callback)：TODO
 **/
function form_btn_submit(button, el, callback,errCallback) {

    var btn = $(button);
    var form = $(el);

    var instance = btn.data("kendoButton");
    if (instance) {
        btn.data("oldValue", btn.html());
        btn.html("正在提交...");
        instance.enable(false);
    }
    form.ajaxSubmit({
        success: function (res) {

            if (res && res.status == "success") {
                if (callback && $.isFunction(callback)) {
                    callback(res);
                }
                $.notify(res.message || "操作成功！", {
                    globalPosition: 'top center',
                    className: 'success'
                });
            } else {
                /*$.notify(res.message || "操作失败！", {
                 globalPosition: 'top center',
                 className: 'error',
                 autoHide: false
                 });*/
                /* BUGFIX: dialog中的错误信息显示位置移到顶层  2015.3.5 */
                if(errCallback&& $.isFunction(callback)){
                    errCallback(res);
                }else{
                    notify(res.message || "操作失败！", 'error');
                }
            }

        },
        complete: function () {
            if (instance) {
                btn.html(btn.data("oldValue"));
                instance.enable(true);
            }
        }
    });

}

/**
 * 获取layout的center高度
 **/
function _layout_center_height(lay) {
    return lay.state.center.innerHeight - 2;
}

/**
 * 控制按钮的状态
 * 参数(btn)：指定按钮元素
 * 参数(text)：指定按钮元素内文字
 **/
function btn_running(btn, text) {
    if (!btn)
        return;
    // var runningText = '<i class="fa fa-refresh fa-spin"></i> 运行中..';
    var runningText;
    if (text) {
        runningText = text;
    } else runningText = '<i class="fa fa-refresh"></i> 运行中..';
    btn = $(btn)[0];
    if (btn.tagName && btn.tagName.toUpperCase() == "A") {
        $(btn).addClass("disabled").data("text", $(btn).html()).html(runningText);
        var onclick = $(btn).attr("onclick");
        if (onclick) {
            $(btn).data("onclickevent", onclick);
            $(btn).removeAttr("onclick");
        }
    } else if (btn.tagName && btn.tagName.toUpperCase() == "BUTTON") {
        var button = $(btn).data("kendoButton");
        if (!button) {
            button = get_button_in_main_frame(btn);
        }
        if (button) {
            button.enable(false);
            $(btn).data("text", $(btn).html());
            $(btn).html(runningText);
        }
    }
}

/**
 * 恢复按钮的状态
 **/
function btn_enabled(btn) {
    if (!btn)
        return;
    btn = $(btn)[0];
    if (btn.tagName && btn.tagName.toUpperCase() == "A") {
        $(btn).removeClass("disabled").html($(btn).data("text"));
        var onclick = $(btn).data("onclickevent");
        if (onclick) {
            $(btn).attr("onclick", onclick);
        }
    } else if (btn.tagName && btn.tagName.toUpperCase() == "BUTTON") {
        var button = $(btn).data("kendoButton");
        if (!button) {
            button = get_button_in_main_frame(btn);
        }
        if (button) {
            $(btn).html($(btn).data("text"));
            button.enable(true);
        }
    }
}

/**
 * 日期格式化
 **/
Date.prototype.format = function (format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}
var _content_layouts = [];
/* 初始化内容 */
$(function () {
    if($(".hc_btn").length>0){
        $(".hc_btn").hcButton();
    }
    if($(".ui-datetime").length>0){
        $(".ui-datetime").hcDateTimePicker({
            format: "yyyy-MM-dd HH:mm:ss",
            culture:"zh-CN",
            interval: 1
        });
    }
    if($(".ui-combobox").length>0){
        $(".ui-combobox").hcComboBox();
    }
    if($(".ui-dropdownlist").length>0){
        $(".ui-dropdownlist").hcDropDownList();
    }
    if($("._current_date_time").length>0){
        $("._current_date_time").val(new Date().format("yyyy-MM-dd HH:mm:ss"));
    }
});

/* Cookie 存取 */
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

/* Cookie 读取 */
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

/**
 * 删除cookie
 * @param name
 */
function deleteCookie(name){
    var cval = readCookie(name);
    if (cval != null){
        createCookie(name,cval,-1);
    }
}

function init_main_page(defaultUrl) {
    if (window.location.hash) {
        if (window.location.hash != "#")
            try {
                loadUrl($.base64.decode(window.location.hash.substring(1)), defaultUrl);
                return;
            } catch (e) {}
    }
    loadUrl(defaultUrl,null);
    // var loadedUrl = $.cookie(cookie || 'loaded_url');
    // if (loadedUrl) {
    //     loadUrl($.base64.decode(loadedUrl), defaultUrl);
    //     return;
    // }
}

function loadUrl(url, defaultUrl) {
    $("#_loading").show();
    if (!url) return;
    var encodedUrl = $.base64.encode(url);
    window.location.hash = encodedUrl;
    _hash = window.location.hash;
    if (url.indexOf("?") > 0)
        url += "&";
    else
        url += "?";
    url += "_t=" + new Date().getTime();
    clearContentLayouts();
    try{if(_destructor && jQuery.isFunction(_destructor)){_destructor();}}catch(e){}
    $("#centerMain").load(url, function(responseText, textStatus, xhr) {
        // setTimeout(function(){$("#_loading").hide(0);},100);
        $("#_loading").hide(100, "linear");
        if (xhr.status == 200) {
            // $.cookie(cookie || 'loaded_url', encodedUrl, {
            //     expires: 7,
            //     path: '/'
            // });
        } else {
            if (defaultUrl) {
                //clearContentLayouts();
                loadUrl(defaultUrl,  null);
            }
        }
    });
}

function clearContentLayouts() {
    if (_inner_layout) {
        if (!_inner_layout.destroyed)
            _inner_layout.destroy();
        _inner_layout = null;
    }
    if (_content_layouts && _content_layouts.length > 0) {
        for (var i = 0; i < _content_layouts.length; i++) {
            if (_content_layouts[i]) {
                if (!_content_layouts[i].destroyed)
                    _content_layouts[i].destroy();
                _content_layouts[i] = null;
            }
        }

        _content_layouts = [];
    }
}

(function($) {
    $.cachedScript = function( url, options ) {
        options = $.extend( options || {}, {
            dataType: "script",
            cache: true,
            url: url
        });
        return $.ajax( options );
    };
    $.fn.box = function(options) {
        var _this = this;
        if (options == "resize") {
            var c = this.data("_cal");
            if (c)
                c();
            return;
        }

        var _cal = function() {
            if ($.isFunction(options.width)) {
                _this.outerWidth(options.width());
            } else {
                _this.outerWidth(options.width || 250);
            }

            if ($.isFunction(options.height)) {
                $(".ui-box-container", _this).height(options.height() - $(".ui-box-head", _this).outerHeight() - 7);
            } else if (options.height) {
                $(".ui-box-container", _this).height(options.height - $(".ui-box-head", _this).outerHeight() - 7);
            }
        };
        this.data("_cal", _cal);
        _cal();
    };



    $
        .ajaxSetup({
            error: function(xhr, textStatus, errorThrown) {
                if (xhr.status == 401) {
                    $.message("会话已失效，请重新登录！", $.message.TYPE_ERROR, 4, true, true);
                    var _login_dlg = dialog({
                        content: '<form id="_login_dlg_form" class="ui-form" method="post" action="'+$.CONTEXT_PATH+'/platform/login"><input type="hidden" name="rtype" value="json" /><fieldset>' + '<div class="ui-form-item block"><label style="width:80px;" class="ui-label" for="">用户名:</label><input class="ui-input" type="text" name="username" value="" data-rule="required;" />' + '</div><div class="ui-form-item block"><label style="width:80px;" class="ui-label" for="">密码:</label><input class="ui-input" type="password" name="password" value="" data-rule="required;" />' + '</div><div class="ui-form-item block fn-mt-20"><label style="width:80px;" class="ui-label"></label><button class="btn btn-primary" type="submit"><i class="iconfont icon-key" style="color:#FFF;"></i>登录</button>' + '<a class="btn" href="javascript:void(0)" onclick="dialog.list[\'_login_dlg\'].close();"><i class="iconfont icon-minus-sign" style="color:#333;"></i>取消</a>' + '</div></fieldset></form>',
                        id: '_login_dlg',
                        lock: true,
                        width: 380,
                        height: 150,
                        title : '请重新登录'
                    });
                    $("#_login_dlg_form input[name='username']").focus();
                    $("#_login_dlg_form").submit(function(){
                        $.forms.submit("#_login_dlg_form",function(){
                            _login_dlg.close();
                        });
                        return false;
                    });
                    return false;
                } else if (xhr.status == 403) {
                    $.message("无权访问！", $.message.TYPE_ERROR, 4, false, true);
                    return false;
                } else if (xhr.status == 404) {
                    $.message("不存在的访问路径！", $.message.TYPE_ERROR, 4, false, true);
                    return false;
                } else if (xhr.status == 500) {
                    $.message("服务器发生错误！", $.message.TYPE_ERROR, 4, false, true);
                    return false;
                } else if (textStatus == "error") {
                    $.message("未知错误！", $.message.TYPE_ERROR, 4, false, true);
                    return false;
                }
            }
        });
    $.dialogs = {
        show: function(id, content, callback, width, height, title, okVal, showOkBtn, cancelVal, padding) {
            var config = {
                content: content,
                id: id,
                padding: padding || '0',
                lock: true,
                width: width || 650,
                height: height || 380,
                cancel: true,
                cancelVal: '<i class="iconfont" data-value="cancel" style="color:#333;">&#xf056;</i>' + (cancelVal || "取消")
            };
            if (!(showOkBtn === false)) {
                config.okVal = '<i class="iconfont" data-value="ok" style="color:#FFF;">&#xf058;</i>' + (okVal || "确定");
                config.ok = function(btn) {
                    if (callback) {
                        return callback(this, btn);
                    }
                    return true;
                };
            }
            if (title) {
                config.title = title;
            }
            return dialog(config);
        },
        normalDialog: function(id, url, callback, width, height, title, okVal, showOkBtn, cancelVal, padding) {
            return $.dialogs.show(id, 'load:' + url, callback, width, height, title, okVal, showOkBtn, cancelVal, padding);
        }
    };
    $.forms = {
        linkRunning: function(a, msg) {
            a = $(a);
            if (!a.data("org"))
                a.data("org", a.html());
            a.html(msg || '<i class="iconfont icon-refresh iconfont-spin"></i>运行中...').attr("disabled",true).addClass("disabled");
            if (!a.data("onclick"))
                a.data("onclick", a[0].onclick);
        },
        linkEnabled: function(a) {
            a = $(a);
            a.attr("disabled",false).removeClass("disabled");
            if (a.data("org"))
                a.html(a.data("org"));
            if (a.data("onclick"))
                a[0].onclick = a.data("onclick");
        },
        handleMessage: function(responseText, callback, form, errorCallback) {
            if (responseText && (responseText.status == 'success')) {
                $.message(responseText.message, $.message.TYPE_OK, 4, true, true);
                if (callback) {
                    callback(responseText, form);
                }
            } else if (responseText && (responseText.status == 'fail' || responseText.status == 'error')) {
                $.message(responseText.message, $.message.TYPE_ERROR, 4, false, true);
                if (errorCallback) {
                    errorCallback(responseText, form);
                }
            } else {
                $.message("发生异常，请重试！", $.message.TYPE_ERROR, 4, false, true);
                if (errorCallback) {
                    errorCallback(responseText, form);
                }
            }
        },
        submits: function(form, callback, btn, errorCallback) {
            var $el = $(form);
            $el.isValid(function(v) {
                if (v) {
                    if (btn) {
                        $.btn.running($(btn), "正在提交...");
                    }
                    $el.ajaxSubmit({
                        success: function(responseText, statusText, xhr, $form) {
                            $.forms.handleMessage(responseText, callback, $el, errorCallback);
                        },
                        error: function(o) {
                            $.message("发生异常，请重试！", $.message.TYPE_ERROR, 4, false, true);
                        },
                        complete: function() {
                            if (btn) {
                                $.btn.enabled($(btn));
                            }
                        }
                    });
                }
            }, false);
        },
        submit: function(form, callback, btn, errorCallback) {
            var $el = $(form);
            if (btn) {
                $.btn.running($(btn), "正在提交...");
            }
            $el.ajaxSubmit({
                success: function(responseText, statusText, xhr, $form) {
                    $.forms.handleMessage(responseText, callback, $el, errorCallback);
                },
                error: function(o) {
                    $.message("发生异常，请重试！", $.message.TYPE_ERROR, 4, false, true);
                },
                complete: function() {
                    if (btn) {
                        $.btn.enabled($(btn));
                    }
                }
            });
        },
        validSubmit: function(el, callback, errorCallback) {
            var $el = $(el);
            $el.on('valid.form', function(e, form) {
                var $btn = $("*[type=submit]", form);
                $.btn.running($btn, "正在提交...");
                $(this).ajaxSubmit({
                    success: function(responseText, statusText, xhr, $form) {
                        $.forms.handleMessage(responseText, callback, $el, errorCallback);
                    },
                    error: function(o) {
                        $.message("发生异常，请重试！", $.message.TYPE_ERROR, 4, false, true);
                    },
                    complete: function() {
                        $.btn.enabled($btn);
                    }
                });
            });
        }
    };
})(jQuery);

(function($) {

    $.fn.magicTab = function(options) {

        if (typeof options == "string") {

            return;
        }

        var _currentPane, _currentItem;
        var _this = this;
        var _config = {
            defaults: {
                resizable: false,
                closable: false,
                spacing_open: 5
            }
        };

        var _judgeShow = function(currentItem) {

            var dataTarget = currentItem.attr("data-target");
            var href = currentItem.attr("href");
            var pane;
            var loaded;
            if (dataTarget) {
                pane = $(dataTarget);
                loaded = pane.data("layouted");
                pane.show();
                if (currentItem.attr("data-reload") == "true" || !pane.data("loaded")) {
                    href = currentItem.attr("href");
                    pane.load(href, function() {
                        pane.data("loaded", true);
                        _processLayout(pane, currentItem.attr("data-reload") == "true");
                    });
                }
            } else {
                pane = $(href);
                loaded = pane.data("layouted");
                pane.show();
                _processLayout(pane, currentItem.attr("data-reload") == "true");
            }

            if (loaded) {
                var fun = currentItem.attr("data-reload-function");
                if (fun) {
                    try {
                        eval(fun + "()");
                    } catch (e) {}
                }
            }
            _currentPane = pane;
        };

        var _processLayout = function(pane, reload) {
            if (reload || !pane.data("layouted")) {
                pane.width("100%").height("100%");
                var _old_layout = pane.data("_layout");
                if (_old_layout && !_old_layout.destroyed) {
                    _old_layout.destroy();
                }
                if (options.resize && $.isFunction(options.resize)) {
                    _config.onresize_end = function(name, element, state) {
                        if (name == "center") {
                            options.resize(pane, name, state);
                        }
                    };
                }

                var _pane_layout = pane.layout(_config);
                _content_layouts.push(_pane_layout);
                if (options.load && $.isFunction(options.load)) {
                    options.load(pane, _pane_layout);
                }
                pane.data("layouted", true);
                pane.data("_layout", _pane_layout);
            }

        };

        _judgeShow($(".ui-tab-items .current a", _this));

        $(".ui-tab-items a", _this).click(function(e) {
            var href = $(this).attr("href");
            if (href == null || href == "" || href == "#") {
                $.message($(this).attr("data-msg") || "操作出错啦！", $.message.TYPE_ERROR, 4, false, true);
                return false;
            }
            $(".ui-tab-items .current", _this).removeClass("current");
            $(this).parent().addClass("current");
            $(".ui-tab-panels>div", _this).hide();
            _currentItem = $(this);
            _judgeShow($(this));
            return false;
        });

        return {
            currentPane: function() {
                return _currentPane;
            },
            reload: function() {
                _judgeShow(_currentItem);
            }
        };

    };


    //增加鼠标移进移出时验证框显示隐藏
    $("form .k-textbox").bind({
        mouseover: function(e) {
            if ($(this).hasClass("n-invalid")) {
                var msg_box = $(this).siblings(".msg-box").get(0);
                $(msg_box).find(".n-error").show();
            }
        },
        mouseout: function(e){
            if ($(this).hasClass("n-invalid")) {
                $(this).siblings(".msg-box").find(".n-error").hide();
            }
        }
    });




    $.select_refer = function(_this,url,dlg_id,form_id,title,width,height,keys_callback,func_callback){
        if(url.indexOf("?")>0){url+="&";}else{url+="?";}
        url += "formId=" + form_id;
        url += "&dlgId=" + dlg_id;
        if(keys_callback){url+="&callbackKeys=" + keys_callback;}

        var _dlg = $.dialogs.normalDialog(dlg_id, url, function(dlg,btn){
            var row = $("#"+dlg_id+" .bDiv>table").getSelectedRows()[0];
            _callback_func(row);
        },width,height,title);
        var _callback_func = function(row){
            if(!row)return;
            var keys = keys_callback.split(",");
            for(var i = 0 ; i < keys.length;i++){
                var listKey = keys[i].split(".").slice(2).join(".");
                if(row[listKey]==undefined || row[listKey] == null) continue;
                $("#"+form_id+" *[assname='"+keys[i]+"']").val(row[listKey]);
                $("#"+form_id+" *[name='"+keys[i]+"']").val(row[listKey]);
            }
            _dlg.close();
        };
        $("#" + dlg_id).data("_callback_func", _callback_func);
    };
    var _common_base_select = function(_this, url, dlg_id, title, width, height, func_selected, options, func_query) {
        var _opt = options || {};
        var query = "?";
        if (_opt.muilt == true) {} else {
            _opt.muilt = false;
        }
        query += "muilt=" + _opt.muilt;
        if (_opt.muilt) {
            var muilt_select_container = $(_this).closest(".ui-muilt-select");
            var valInput = $("input[type='hidden']", muilt_select_container);
            if (valInput.val()) {
                query += "&selected=" + valInput.val();
            }
        }
        if (_opt.queryCallback && $.isFunction(_opt.queryCallback)) {
            query += _opt.queryCallback(_opt);
        }
        //clearContentLayouts();
        var _dlg = $.dialogs.show(dlg_id, url + query, function(dlg, btn) {
            $.btn.running(btn);
            var selected;
            if (func_selected && $.isFunction(func_selected))
                selected = func_selected(_opt);
            //            if (!selected || selected.length == 0) {
            //                $.btn.enabled(btn);
            //                $.message("没做任何选择", $.message.TYPE_WARN, 2, true, true);
            //                return false;
            //            }
            if (!selected) {
                selected = [];
            }

            if (_opt.muilt) {
                if (selected.length > 0) {
                    var muilt_select_container = $(_this).closest(".ui-muilt-select");
                    var valInput = $("input[type='hidden']", muilt_select_container);
                    var v = "";
                    $("ul", muilt_select_container).empty();
                    for (var i = 0; i < selected.length; i++) {
                        //var v = valInput.val();
                        //							if (("," + v + ",").indexOf("," + selected[i][_opt.muiltFill.val] + ",") >= 0)
                        //								continue;
                        $("ul", muilt_select_container).append('<li>' + selected[i][_opt.muiltFill.key] + '</li>');
                        if (v)
                            v += ",";
                        v += selected[i][_opt.muiltFill.val];
                    }
                    valInput.val(v);
                    muilt_select_container.muiltSelect();
                }
            } else {
                if (_opt.fill && selected.length > 0) {
                    $.each(_opt.fill, function(idx, it) {
                        $(it).val(selected[0][idx]);
                    });
                }
            }
            if (_opt.callback && $.isFunction(_opt.callback)) {
                _opt.callback(selected, dlg, btn);
            }
            $.btn.enabled(btn);
        }, width, height, title, "确定选择", true, "取消");

        var _dbl_click_func = function(row) {
            if (_opt.fill && row) {
                $.each(_opt.fill, function(idx, it) {
                    $(it).val(row[idx]);
                });
            }
            _dlg.close();
        };
        $("#" + dlg_id).data("_dbl_click_func", _dbl_click_func);
    };
    var _common_select = function(_this, url, dlg_id, title, width, height, func_selected, options, func_query) {
        _common_base_select(_this, "load:" + $.CONTEXT_PATH + url, dlg_id, title, width, height, func_selected, options, func_query);
    };
    $.commonSelect = _common_select;
    $.selectPoi = function(_this, options) {
        options.muilt = false;
        var url = options.url || ($.CONTEXT_PATH + "/platform/gis/poi/select");
        _common_base_select(_this, "url:" + url, "_select_gis_poi", "标记地理信息", 600, 400, function(_opt) {
            return _select_gis_poi._select_point();
        }, options);
    };

    $.selectUser = function(_this, options) {
        _common_select(_this, "/platform/authorization/user/select", "_select_user", "选择用户", 880, 600, function(_opt) {
            return plat_auth_user_select_datagrid.getSelectedRows();
        }, options);
    };
    /**
     * 通用选人员
     * @param _this
     * @param options
     */
    $.selectPerson = function(_this, options) {
        if ($._plat_org_person_select_main_layout && !$._plat_org_person_select_main_layout.destroyed)
            $._plat_org_person_select_main_layout.destroy();
        if ($._plat_org_person_select_inner_layout && !$._plat_org_person_select_inner_layout.destroyed)
            $._plat_org_person_select_inner_layout.destroy();
        _common_select(_this, "/platform/organization/person/select"+(options.permission ? "?permission=" + options.permission : ""), "_select_person", "选择人员", 880, 600, function(_opt) {
            return plat_org_person_select_grid.getSelectedRows();
        }, options);
    };
    /**
     * 通用选岗位
     * @param options
     */
    $.selectRole = function(_this, options) {
        _common_select(_this, "/platform/authorization/role/select", "_select_role", "选择角色", 350, 500, function(_opt) {
            var selected;
            if (_opt.muilt) {
                selected = plat_auth_role_select_tree.getCheckedNodes(true);
            } else {
                selected = plat_auth_role_select_tree.getSelectedNodes();
            }
            return selected;
        }, options);
    };
    /**
     * 通用选岗位组件
     */
    $.selectPosition = function(_this, options) {
        _common_select(_this, "/platform/organization/position/select", "_select_position", "选择岗位", 350, 500, function(_opt) {
            var selected;
            if (_opt.muilt) {
                selected = plat_org_position_select_tree.getCheckedNodes(true);
            } else {
                selected = plat_org_position_select_tree.getSelectedNodes();
            }
            return selected;
        }, options);
    };
    /**
     * 通用选部门组件
     */
    $.selectDepartment = function(_this, options) {
        _common_select(_this, "/platform/organization/department/select", "_select_department", "选择部门", 350, 500, function(_opt) {
            var selected;
            if (_opt.muilt) {
                selected = plat_org_department_select_tree.getCheckedNodes(true);
            } else {
                selected = plat_org_department_select_tree.getSelectedNodes();
            }
            return selected;
        }, options);
    };
    $.fn.muiltSelect = function(options) {
        var combineVal = function(vals) {
            var v = "";
            for (var i = 0; i < vals.length; i++) {
                if (vals[i])
                    v += vals[i] + ",";
            }
            if (v != "") {
                v = v.substring(0, v.length - 1);
            }
            return v;
        };
        this.each(function() {
            var _this = this;
            var _opt = options || {};

            var valInput = $("input[type='hidden']", _this);

            $("ul li", this).each(function(idx, it) {
                var me = $(this);
                if (me.hasClass("muilt-select-inited"))
                    return;
                me.addClass("muilt-select-inited");
                me.append('<a href="javascript:void(0)" class="ui-input-remove">x</a>');
                $(".ui-input-remove", this).click(function() {
                    if (_opt.removeCallback && $.isFunction(_opt.removeCallback)) {
                        _opt.removeCallback($(this), _this);
                    } else {
                        var li = $(this).parent("li");
                        //					var ul = $(this).closest("ul");
                        //					var idx = $("li", ul).index(li);
                        //					if (idx < 0) {
                        //						alert("数据错误?");
                        //						return false;
                        //					}
                        var arr = valInput.val().split(",");
                        if (arr.length == 0) {
                            alert("数据错误?");
                            return false;
                        }
                        arr.splice(idx, 1);
                        valInput.val(combineVal(arr));
                        li.remove();
                    }
                });
            });
        });


    };

    $.fn.suggests = function(options) {
        var _opt = options || {};
        this.each(function() {
            var _this = this;
            var params = _opt.params || {};
            if (_opt.key) {
                params[_opt.key] = function() {
                    return $(_this).val();
                };
            }
            _opt.params = params;
            _opt.type = "POST";
            $(this).autocomplete(_opt);
        });
    };


})(jQuery);

