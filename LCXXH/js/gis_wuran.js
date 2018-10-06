
var query,layer,util,loc;
var jichuData;
function gis_load_end(obj) {
    query = obj.getQueryObj();
    layer=obj.getLayerObj();
    util=obj.getUtilObj();
    loc=obj.getLocation();
    util.changerStylePop({
        titleFontColor:"rgba(20,20,20,1)",//标题和内容字体的颜色
        titleBgColor:"rgba(8,36,73,0.87)",//标题背景
        contentBgColorl:"rgba(8,36,73,0.87)",//内容背景
        actionsBgColorl:"rgba(8,36,73,0.87)"//actionsPane背景
    });
    //隐藏点击点冒泡时默认的选中框，只对点的选中框有作用
    util.hidePoupSelectPoint();
    util.hideMultiPopupZoom(["popupTip"]);

    addjichubujian();
}

var waterData =
    [
        {"x": 12920276.183535732, "y": 4343726.474546317},
        {"x": 12916660.183535732, "y": 4340206.474546317},
        {"x": 12914260.183535732, "y": 4336174.474546317},
        {"x": 12917972.183535732, "y": 4336558.474546317},
        {"x": 12907508.183535732, "y": 4339950.474546317},
        {"x": 12913076.183535732, "y": 4337070.474546317},
        {"x": 12907423.848579822, "y": 4335465.801494764},
        {"x": 12913535.848579822, "y": 4342633.801494764},
        {"x": 12915935.848579822, "y": 4335081.801494764},

        {"x": 12912244.183535732, "y": 4339886.474546317},
        {"x": 12919700.183535732, "y": 4340494.474546317},
        {"x": 12916020.183535732, "y": 4332558.474546317},
        {"x": 12913524.183535732, "y": 4339886.474546317}
        ];
function addjichubujian(name) {
    var url="/LCXXH/images/jichusheshi/wushuijiance.png";
    // var url="/liaocheng/LCXXH/images/jichusheshi/shuizhi.png";
    util.hideWindow();

    if(layer.getLayer("wuran")){
        layer.clearLayer("wuran");
    }else{
        layer.addGL("wuran");
    }

    layer.addPoints({
        layerName: "wuran",
        list: waterData,
        imgObj: {
            imgUrl: url,
            imgH: 26,
            imgW: 26
        },
        isInfo: true,
        infoObj: {
            height: 400,
            width: 330,
            title: function () {
                return "<div class='popupTitle'>检测指标</div>";
            },
            content: function (o) {
                var html = "<link href='/LCXXH/css/popupTab.css' rel='stylesheet'>" +
                    "<table class='popupTab'>";
                // var html = "<link href='/liaocheng/LCXXH/css/popupTab.css' rel='stylesheet'>" +
                //     "<table class='popupTab'>";
                html += "<tr class='even'><td style='width:90px;'>色度</td><td>" + Math.round(Math.random() * 70) + "</td></tr>" +
                    "<tr class='odd'><td>浑浊度(TPU)</td><td>" + Math.round(Math.random() * 70) + "</td></tr><tr class='even'><td>臭和味</td><td>" + Math.round(Math.random() * 70) + "</td></tr><tr class='odd'><td>肉眼可见物</td><td>" + Math.round(Math.random() * 70) + "</td></tr><tr class='even'><td>化学需氧量(mg/L)</td><td>" + Math.round(Math.random() * 70) + "</td></tr>";
                html += "</table>";
                html += "<div class='record'>" + "查看历史记录>>" + "</div>";
                return html;
            }
        },
        isCenter: false
    });



}

function showPupoInfo(name) {
    var n=Math.round(Math.random()*(waterData.length-1));
    var x=waterData[n].x;
    var y=waterData[n].y;
    var address=["站前街","建设西路","中华路","柳园南路","长江路","兴华西路"];
    var time=["2018-10-07 18:45:32","2018-10-02 08:45:32","2018-09-06 05:45:32","2018-08-15 03:45:32","2018-07-27 21:45:32","2018-07-15 18:45:32"];

    loc.showPupoInfo({
        x:x,//冒泡的经纬度点
        y:y,
        w:350,//宽度
        h:400,//最大高度
        isCenter:true,//是否定位
        height:400,
        width:330,
        title: function(){
            return "<div class='popupTitle'>检测指标</div>";
        },
        content: function (o) {
            var html = "<link href='/LCXXH/css/popupTab.css' rel='stylesheet'>" +
                "<table class='popupTab'>";
            // var html = "<link href='/liaocheng/LCXXH/css/popupTab.css' rel='stylesheet'>" +
            //     "<table class='popupTab'>";
            html += "<tr class='even'><td style='width:90px;'>设备名称</td><td>" +name+ "</td></tr>" +
                "<tr class='odd'><td>位置</td><td>" +address[Math.round(Math.random()*5)]+ "</td></tr><tr class='even'><td>当前值</td><td>" +"见右侧"+ "</td></tr><tr class='odd'><td>检测时间</td><td>" + time[Math.round(Math.random()*5)]+ "</td></tr><tr class='even'><td>状态</td><td>" +"正常运行" + "</td></tr>";
            html+= "</table>";
            html+="<div class='record'>"+"查看历史记录>>"+"</div>";
            return html;
        }
    })


}
