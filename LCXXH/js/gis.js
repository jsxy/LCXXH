
var query,layer,util;
function gis_load_end(obj) {
    query = obj.getQueryObj();
    layer=obj.getLayerObj();
    util=obj.getUtilObj();

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
    console.log(1)
    var url="/liaocheng/LCXXH/images/jichusheshi/";
    switch(name){
        case " 1 供水泵站":
            url=url+"gongshuibeng.png";
            break;
        case " 2 排水泵站":
            debugger
            url=url+"paishuibengzhan.png";
            break;
        case " 3 消防栓":
            url=url+"xiaofangshuan.png";
            break;
        case " 4 加压站":
            url=url+"jiayazhan.png";
            break;
        case " 5 水表箱":
            url=url+"shuibiaoxiang.png";
            break;
        case " 6 窖井":
            url=url+"wushuijiance.png";
            break;
        case " 7 流量监测点":
            url=url+"liuliang.png";
            break;
        case " 8 水质监测点":
            url=url+"shuizhi.png";
            break;
        case " 9 压力监测点":
            url=url+"jiayazhan.png";
            break;
        case " 10 排水监测点":
            url=url+"shuiyuandi.png";
            break;
    }

    util.changerStylePop({
        titleFontColor:"rgba(20,20,20,1)",//标题和内容字体的颜色
        contentBgColorl:"rgba(72,72,72,0.87)",//内容背景
        actionsBgColorl:"rgba(72,72,72,0.87)"//actionsPane背景
    });
    //隐藏点击点冒泡时默认的选中框，只对点的选中框有作用
    util.hidePoupSelectPoint();
    util.hideMultiPopupZoom(["popupTip"]);

    var points =[] ;
    for(var i=0;i<jichuData.data.length;i++){
        points.push({x:jichuData.data[i].x+Math.random()*2000,y:jichuData.data[i].y+Math.random()*2000})
    }

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
            width:320,
            title: function(){
                return "<div class='popupTitle'>属性信息</div>";
            },
            content: function (o) {
                var html = "<link href='/liaocheng/LCXXH/css/popupTab.css' rel='stylesheet'>" +
                    "<table class='popupTab'>";
                html += "<tr class='even'><td style='width:140px;'>设备名称</td><td>" + "name" + "</td></tr><tr class='odd'><td>位置</td><td>" + "weizhi" + "</td></tr><tr class='even'><td>当前值</td><td>" +"见右侧" + "</td></tr><tr class='odd'><td>检测时间</td><td>" + "time" + "</td></tr><tr class='even'><td>状态</td><td>" +"1" + "</td></tr>";
                html+= "</table>";

                return html;
            }
            // content:function (o) {
            //     return o.attributes.name;
            // },
            // title:"点"
        },
        isCenter: true
    });
}
