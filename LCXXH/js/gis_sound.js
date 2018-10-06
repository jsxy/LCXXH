
var query,layer,util;
var jichuData;
function gis_load_end(obj) {
    query = obj.getQueryObj();
    layer=obj.getLayerObj();
    util=obj.getUtilObj();
    getjichuData();

    layer.addHeatPoints({
        list:jichuData,
        layerName:"atmosphereHeatLayer",
        blurRadius:10,
        fieldHeat: "value",
        colors:["rgba(27,162,136,0)","rgba(27,162,136,0.9)","rgba(228,188,0,0.9)","rgba(255,64,33,0.9)"],
        maxPixelIntensity:500,
        minPixelIntensity:1
    })
}

function getjichuData() {
    $.ajax({
        url:"json/sound.json",
        type:"get",
        async:false,
        success:function(data){
            jichuData=data;

        }
    })
}
