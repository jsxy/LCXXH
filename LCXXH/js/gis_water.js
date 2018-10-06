
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

    getjichuData();
    addjichubujian();
}

function getjichuData() {
    $.ajax({
        url:"json/water.json",
        type:"get",
        async:false,
        success:function(data){
            jichuData=data.data;

        },
        error:function () {
            alert("数据传输错误！")
        }
    })
}
var waterData=
    [
        {"xzqh": "dongchangfu",//东昌府区
            "name":"东昌府区",
        "data": [
            {"x": 12920276.183535732, "y": 4343726.474546317},
            {"x": 12916660.183535732, "y": 4340206.474546317},
            {"x": 12914260.183535732, "y": 4336174.474546317},
            {"x": 12917972.183535732, "y": 4336558.474546317},
            {"x": 12907508.183535732, "y": 4339950.474546317},
            {"x": 12913076.183535732, "y": 4337070.474546317},
            {"x": 12907423.848579822, "y": 4335465.801494764},
            {"x": 12913535.848579822, "y": 4342633.801494764},
            {"x": 12915935.848579822, "y": 4335081.801494764}]},
        {"xzqh": "linqing",//临清
            "name":"临清市",
            "data": [
                {"x": 12880568.943662085, "y": 4391476.836980986},
                {"x": 12887576.943662085, "y": 4392228.836980986},
                {"x": 12879704.943662085, "y": 4387636.836980986},
                {"x":  12883560.943662085, "y": 4390852.836980986},
                {"x": 12885976.943662085, "y": 4389044.836980986},
                {"x":  12882872.943662085, "y": 4388676.836980986}]},
        {"xzqh": "chiping",//茌平县
            "name":"茌平县",
            "data": [
                {"x": 12936518.081703924, "y": 4358149.633813593},
                {"x": 12941766.081703924, "y": 4359781.633813593},
                {"x": 12947094.081703924, "y": 4356821.633813593},
                {"x": 12937590.081703924, "y": 4352709.633813593},
                {"x": 12938806.081703924, "y": 4354853.633813593},
                {"x": 12942198.081703924, "y": 4356805.633813593},
                {"x": 12943270.081703924, "y": 4359765.633813593},
                {"x": 12942438.081703924, "y": 4352165.633813593},
                {"x": 12937878.081703924, "y": 4356757.633813593}]},
        {"xzqh": "donge",//东阿县
            "name":"东阿县",
            "data": [
                {"x": 12943516.118590325, "y": 4326708.836980987},
                {"x": 12938716.118590325, "y": 4325204.836980987},
                {"x": 12937820.118590325, "y": 4321428.836980987},
                {"x": 12944732.118590325, "y": 4320084.836980987},
                {"x": 12945308.118590325, "y": 4325780.836980987},
                {"x": 12943420.118590325, "y": 4321300.836980987},
                {"x": 12942300.118590325, "y": 4324532.836980987},
                {"x": 12943708.118590325, "y": 4325716.836980987}]},
        {"xzqh": "guan",//冠县
            "name":"冠县",
            "data": [
                {"x": 12849796.978246061, "y": 4343606.503776782},
                {"x":  12857620.978246061, "y": 4343942.503776782},
                {"x": 12856404.978246061, "y": 4338678.503776782},
                {"x": 12852964.978246061, "y": 4343846.503776782},
                {"x": 12853684.978246061, "y": 4342886.503776782}]},
        {"xzqh": "gaotang",//高唐县
            "name":"高唐县",
            "data": [
                {"x": 12934582.081703924, "y": 4396437.633813593},
                {"x": 12942358.081703924, "y": 4398485.633813593},
                {"x":12943350.081703924, "y": 4393749.633813593},
                {"x": 12940278.081703924, "y": 4389909.633813593},
                {"x": 12934678.081703924, "y": 4391573.633813593},
                {"x": 12938358.081703924, "y": 4395221.633813593},
                {"x":  12940342.081703924, "y": 4399061.633813593},
                {"x": 12941078.081703924, "y": 4392821.633813593},
                {"x": 12944662.081703924, "y": 4389653.633813593}]},
        {"xzqh": "yanggu",//阳谷县
            "name":"阳谷县",
            "data": [
                {"x": 12892664.94366208, "y": 4296164.836980988},
                {"x": 12884152.94366208, "y": 4289796.836980988},
                {"x": 12892280.94366208, "y": 4289540.836980988},
                {"x": 12888888.94366208, "y": 4293220.836980988},
                {"x": 12891512.94366208, "y": 4291524.836980988}]},
        {"xzqh": "xin",//莘县
            "name":"莘县",
            "data": [
                {"x":  12874342.081703922, "y": 4312866.82468552},
                {"x": 12880550.081703922, "y": 4314146.82468552},
                {"x":12881126.081703922, "y": 4311234.82468552},
                {"x": 12872454.081703922, "y": 4306754.82468552},
                {"x": 12877926.081703922, "y": 4312866.82468552},
                {"x": 12879910.081703922, "y": 4309794.82468552},
                {"x": 12877862.081703922, "y": 4305570.82468552},
                {"x":  12874918.081703922, "y": 4310018.82468552},
                {"x": 12885766.081703922, "y": 4307330.82468552},
                {"x": 12880966.081703922, "y": 4301602.82468552},
                {"x": 12869990.081703922, "y": 4308514.82468552}]}];
function addjichubujian(name) {
    var url="/LCXXH/images/jichusheshi/shuizhi.png";
    // var url="/liaocheng/LCXXH/images/jichusheshi/shuizhi.png";
    var bujianname;
    util.hideWindow();

    if(layer.getLayer("dongchangfu")){
        layer.clearLayer("dongchangfu");
        layer.clearLayer("linqing");
        layer.clearLayer("chiping");
        layer.clearLayer("donge");
        layer.clearLayer("guan");
        layer.clearLayer("gaotang");
        layer.clearLayer("yanggu");
        layer.clearLayer("xin");
    }else{
        layer.addGL("dongchangfu");
        layer.addGL("linqing");
        layer.addGL("chiping");
        layer.addGL("donge");
        layer.addGL("guan");
        layer.addGL("gaotang");
        layer.addGL("yanggu");
        layer.addGL("xin");
    }

    for(var i=0;i<waterData.length;i++){
        layer.addPoints({
            layerName: waterData[i].xzqh,
            list: waterData[i].data,
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
                    html += "<tr class='even'><td style='width:140px;'>色度</td><td>" + Math.round(Math.random() * 70) + "</td></tr>" +
                        "<tr class='odd'><td>浑浊度(TPU)</td><td>" + Math.round(Math.random() * 70) + "</td></tr><tr class='even'><td>臭和味</td><td>" + Math.round(Math.random() * 70) + "</td></tr><tr class='odd'><td>肉眼可见物</td><td>" + Math.round(Math.random() * 70) + "</td></tr><tr class='even'><td>化学需氧量(mg/L)</td><td>" + Math.round(Math.random() * 70) + "</td></tr>";
                    html += "</table>";
                    html += "<div class='record'>" + "查看历史记录>>" + "</div>";
                    return html;
                }
            },
            isCenter: false
        });
    }



}

function showPupoInfo(name) {
    var n,x,y;
    for(var i=0;i<waterData.length;i++){
        if(name=="东昌府区"&&waterData[i].xzqh=="dongchangfu"){
            n=Math.round(Math.random()*waterData[i].data.length);
            x=waterData[i].data[n].x;
            y=waterData[i].data[n].y;
            break;
        }else if(name=="临清市"&&waterData[i].xzqh=="linqing"){
            n=Math.round(Math.random()*waterData[i].data.length);
            x=waterData[i].data[n].x;
            y=waterData[i].data[n].y;
            break;
        }else if(name=="茌平县"&&waterData[i].xzqh=="chiping"){
            n=Math.round(Math.random()*waterData[i].data.length);
            x=waterData[i].data[n].x;
            y=waterData[i].data[n].y;
            break;
        } else if(name=="东阿县"&&waterData[i].xzqh=="donge"){
            n=Math.round(Math.random()*waterData[i].data.length);
            x=waterData[i].data[n].x;
            y=waterData[i].data[n].y;
            break;
        } else if(name=="冠县"&&waterData[i].xzqh=="guan"){
            n=Math.round(Math.random()*waterData[i].data.length);
            x=waterData[i].data[n].x;
            y=waterData[i].data[n].y;
            break;
        } else if(name=="高唐县"&&waterData[i].xzqh=="gaotang"){
            n=Math.round(Math.random()*waterData[i].data.length);
            x=waterData[i].data[n].x;
            y=waterData[i].data[n].y;
            break;
        } else if(name=="阳谷县"&&waterData[i].xzqh=="yanggu"){
            n=Math.round(Math.random()*waterData[i].data.length);
            x=waterData[i].data[n].x;
            y=waterData[i].data[n].y;
            break;
        }else if(name=="莘县"&&waterData[i].xzqh=="xin"){
            n=Math.round(Math.random()*waterData[i].data.length);
            x=waterData[i].data[n].x;
            y=waterData[i].data[n].y;
            break;
        }

    }

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
            html += "<tr class='even'><td style='width:140px;'>色度</td><td>" +Math.round(Math.random()*70)+ "</td></tr>" +
                "<tr class='odd'><td>浑浊度(TPU)</td><td>" +Math.round(Math.random()*70)+ "</td></tr><tr class='even'><td>臭和味</td><td>" +Math.round(Math.random()*70) + "</td></tr><tr class='odd'><td>肉眼可见物</td><td>" + Math.round(Math.random()*70)+ "</td></tr><tr class='even'><td>化学需氧量(mg/L)</td><td>" +Math.round(Math.random()*70) + "</td></tr>";
            html+= "</table>";
            html+="<div class='record'>"+"查看历史记录>>"+"</div>";
            return html;
        }
    })



}
