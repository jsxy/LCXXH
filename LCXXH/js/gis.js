
var query,layer,util;
function gis_load_end(obj) {
    query = obj.getQueryObj();
    layer=obj.getLayerObj();
    util=obj.getUtilObj();
    util.changerStylePop({
        titleFontColor:"rgba(20,20,20,1)",//标题和内容字体的颜色
        titleBgColor:"rgba(8,36,73,0.87)",//标题背景
        contentBgColorl:"rgba(8,36,73,0.87)",//内容背景
        actionsBgColorl:"rgba(8,36,73,0.87)"//actionsPane背景
    });
    //隐藏点击点冒泡时默认的选中框，只对点的选中框有作用
    util.hidePoupSelectPoint();
    util.hideMultiPopupZoom(["popupTip"]);

}
var jichuData;
function getjichuData() {
    $.ajax({
        url:"json/jichubujian.json",
        type:"get",
        async:false,
        success:function(data){
            jichuData=data;

        }
    })
}

function addjichubujian(name) {
    var url="/LCXXH/images/jichusheshi/";
    // var url="/liaocheng/LCXXH/images/jichusheshi/";
    var bujianname;
    switch(name){
        case "1 供水泵站":
            url=url+"gongshuibeng.png";
            bujianname="供水泵站监测器_";
            break;
        case "2 排水泵站":
            url=url+"paishuibengzhan.png";
            bujianname="排水泵站监测器_";
            break;
        case "3 消防栓":
            url=url+"xiaofangshuan.png";
            bujianname="消防栓监测器_";
            break;
        case "4 加压站":
            url=url+"jiayazhan.png";
            bujianname="加压站监测器_";
            break;
        case "5 水表箱":
            url=url+"shuibiaoxiang.png";
            bujianname="水表箱监测器_";
            break;
        case "6 窖井":
            url=url+"wushuijiance.png";
            bujianname="窖井监测器_";
            break;
        case "7 流量监测点":
            url=url+"liuliang.png";
            bujianname="流量监测点监测器_";
            break;
        case "8 水质监测点":
            url=url+"shuizhi.png";
            bujianname="水质监测点监测器_";
            break;
        case "9 压力监测点":
            url=url+"jiayazhan.png";
            bujianname="压力监测点监测器_";
            break;
        case "10 排水监测点":
            url=url+"shuiyuandi.png";
            bujianname="排水监测点监测器_";
            break;
    }


    util.hideWindow();
    var points =[] ;
    for(var i=0;i<jichuData.data.length;i++){
        points.push({x:jichuData.data[i].x+Math.random()*2000,y:jichuData.data[i].y+Math.random()*2000})
    }

    var address=["站前街","建设西路","中华路","柳园南路","长江路","兴华西路"];
    var time=["2018-10-07 18:45:32","2018-10-02 08:45:32","2018-09-06 05:45:32","2018-08-15 03:45:32","2018-07-27 21:45:32","2018-07-15 18:45:32"];

    if(layer.getLayer("jichusheshiLayer")){
        layer.clearLayer("jichusheshiLayer");
    }else{
        layer.addGL("jichusheshiLayer");
    }
    layer.addPoints({
        layerName: "jichusheshiLayer",
        list: points,
        imgObj: {
            imgUrl: url,
            imgH: 26,
            imgW: 26
        },
        isInfo:true,
        infoObj:{
            height:400,
            width:330,
            title: function(){
                return "<div class='popupTitle'>属性信息</div>";
            },
            content: function (o) {
                var html = "<link href='/LCXXH/css/popupTab.css' rel='stylesheet'>" +
                    "<table class='popupTab'>";
                // var html = "<link href='/liaocheng/LCXXH/css/popupTab.css' rel='stylesheet'>" +
                //     "<table class='popupTab'>";
                html += "<tr class='even'><td style='width:80px;'>设备名称</td><td>" + bujianname+(String.fromCharCode(65+Math.round(Math.random()*4)))+"0"+Math.round(Math.random()*4)+ "</td></tr>" +
                    "<tr class='odd'><td>位置</td><td>" + address[Math.round(Math.random()*5)] + "</td></tr><tr class='even'><td>当前值</td><td>" +Math.round(Math.random()*50) + "</td></tr><tr class='odd'><td>检测时间</td><td>" +  time[Math.round(Math.random()*5)]  + "</td></tr><tr class='even'><td>状态</td><td>" +"正常运行" + "</td></tr>";
                html+= "</table>";
                html+="<div class='record'>"+"查看历史记录>>"+"</div>";
                return html;
            }
        },
        isCenter: true
    });
}

function addPipe(name) {
    switch(name){
        case "管网管线":
            if(layer.getLayer("pipe1Layer")){
                layer.clearLayer("pipe1Layer");
            }else{
                layer.addGL("pipe1Layer");
            }
            var resultData=query.queryWFS({
                type:"polyline",
                url:"/geoserver/liaocheng/ows",
                typeName:"pipe1bd",
                where:"1=1"
            });
            //添加样式
            for(var i=0;i<resultData.length;i++){
                resultData[i].linecolor='rgb(29,217,245)';
                resultData[i].linewidth=3;
            }
            layer.addLines({
                layerName: "pipe1Layer",
                list: resultData,
                isCenter: true
            });

            if(layer.getLayer("pipe2Layer")){
                layer.clearLayer("pipe2Layer");
            }else{
                layer.addGL("pipe2Layer");
            }
            var resultData=query.queryWFS({
                type:"polyline",
                url:"/geoserver/liaocheng/ows",
                typeName:"pipe2bd",
                where:"1=1"
            });
            //添加样式
            for(var i=0;i<resultData.length;i++){
                resultData[i].linecolor='rgb(28,238,196)';
                resultData[i].linewidth=3;
            }
            layer.addLines({
                layerName: "pipe2Layer",
                list: resultData,
                isCenter: true
            });

            if(layer.getLayer("pipe3Layer")){
                layer.clearLayer("pipe3Layer");
            }else{
                layer.addGL("pipe3Layer");
            }
            var resultData=query.queryWFS({
                type:"polyline",
                url:"/geoserver/liaocheng/ows",
                typeName:"pipe3bd",
                where:"1=1"
            });
            //添加样式
            for(var i=0;i<resultData.length;i++){
                resultData[i].linecolor='rgb(255,240,0)';
                resultData[i].linewidth=3;
            }
            layer.addLines({
                layerName: "pipe3Layer",
                list: resultData,
                isCenter: true
            });
            break;
        case "供热":
            if(layer.getLayer("pipe1Layer")){
                layer.clearLayer("pipe1Layer");
            }else{
                layer.addGL("pipe1Layer");
            }
            var resultData=query.queryWFS({
                type:"polyline",
                url:"/geoserver/liaocheng/ows",
                typeName:"pipe1bd",
                where:"1=1"
            });
            //添加样式
            for(var i=0;i<resultData.length;i++){
                resultData[i].linecolor='rgb(29,217,245)';
                resultData[i].linewidth=3;
            }
            layer.addLines({
                layerName: "pipe1Layer",
                list: resultData,
                isCenter: true
            });
            break;
        case "供水":
            if(layer.getLayer("pipe2Layer")){
                layer.clearLayer("pipe2Layer");
            }else{
                layer.addGL("pipe2Layer");
            }
            var resultData=query.queryWFS({
                type:"polyline",
                url:"/geoserver/liaocheng/ows",
                typeName:"pipe2bd",
                where:"1=1"
            });
            //添加样式
            for(var i=0;i<resultData.length;i++){
                resultData[i].linecolor='rgb(28,238,196)';
                resultData[i].linewidth=3;
            }
            layer.addLines({
                layerName: "pipe2Layer",
                list: resultData,
                isCenter: true
            });
            break;
        case "供电":
            if(layer.getLayer("pipe3Layer")){
                layer.clearLayer("pipe3Layer");
            }else{
                layer.addGL("pipe3Layer");
            }
            var resultData=query.queryWFS({
                type:"polyline",
                url:"/geoserver/liaocheng/ows",
                typeName:"pipe3bd",
                where:"1=1"
            });
            //添加样式
            for(var i=0;i<resultData.length;i++){
                resultData[i].linecolor='rgb(255,240,0)';
                resultData[i].linewidth=3;
            }
            layer.addLines({
                layerName: "pipe3Layer",
                list: resultData,
                isCenter: true
            });
            break;
    }
}
