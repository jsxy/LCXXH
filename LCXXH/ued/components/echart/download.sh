rm -f ./echarts*.js
wget -c http://echarts.baidu.com/dist/echarts.common.min.js
wget -c http://echarts.baidu.com/dist/echarts.simple.min.js
wget -c http://echarts.baidu.com/dist/echarts.min.js
wget -c http://echarts.baidu.com/dist/echarts.js

cd ./theme
rm -f ./*
wget -c http://echarts.baidu.com/asset/theme/vintage.js
wget -c http://echarts.baidu.com/asset/theme/dark.js
wget -c http://echarts.baidu.com/asset/theme/macarons.js
wget -c http://echarts.baidu.com/asset/theme/infographic.js
wget -c http://echarts.baidu.com/asset/theme/shine.js
wget -c http://echarts.baidu.com/asset/theme/roma.js
