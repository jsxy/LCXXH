
var query,layer,util,loc;
var jichuData;
function gis_load_end(obj) {
    query = obj.getQueryObj();
    layer=obj.getLayerObj();
    util=obj.getUtilObj();
    loc=obj.getLocation();
    getjichuData();

    var lay=['heat1','heat2','heat3','heat4','heat5','heat6','heat7','heat8'];
    for(var i=0;i<jichuData.length;i++){
        layer.addHeatPoints({
            list:jichuData[i],
            layerName:lay[i],
            blurRadius:12,
            fieldHeat: "value",
            colors:["rgba(27,162,136,0)","rgba(27,162,136,0.9)","rgba(228,188,0,0.9)","rgba(255,64,33,0.9)"],
            maxPixelIntensity:500,
            minPixelIntensity:1
        })
    }

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

function locHeat(name) {
    var p;
    switch (name){
        case "东昌府区":
            p={x:12910996.183535732, y: 4339758.474546317};
            break;
        case "临清市":
            p={x:12883632.50324769, y: 4390712.859845945};
            break;
        case "茌平县":
            p={x:12941232.503247691, y: 4356472.859845946};
            break;
        case "东阿县":
            p={x:12942864.503247691, y: 4324472.859845946};
            break;
        case "冠县":
            p={x:12853377.719174838, y: 4342068.165376324};
            break;
        case "高唐县":
            p={x:12939204.68090187, y: 4394020.906786849};
            break;
        case "阳谷县":
            p={x:12889756.796690404, y: 4291423.866081675};
            break;
        case "莘县":
            p={x:12877797.82003997, y: 4310185.140148822};
            break;
    }
    loc.CenterAtPoint(p);
}
