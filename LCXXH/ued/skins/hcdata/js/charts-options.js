  function get_cpu_used_option(){
    var cpuUsedOptions = {
      title: {
        text: 'CPU使用率'
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params, ticket, callback) {
          var res = "时间：" + params[0].name;
          for(i = 0; i < params.length; i++){
            res += '<br/>' + params[i].seriesName + ' : ' + params[i].value + "%";
          }
          return res;
        }
      },
      legend: {
        data: ['CPU使用率','CPU用户使用率','CPU系统使用率']
      },
      xAxis: [
        {
          type: 'category',
          data: []
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitNumber: 2
        }
      ],
      series: [
        {
          name: 'CPU使用率',
          type: 'line',
          symbol: 'none',
          stack: '总量',
          itemStyle:{normal:{areaStyle:{type:'default'}}},
          data: []
        },{
          name: 'CPU用户使用率',
          type: 'line',
          symbol: 'none',
          data: []
        },{
          name: 'CPU系统使用率',
          type: 'line',
          symbol: 'none',
          data: []
        }
      ]
    };
    return cpuUsedOptions;
  }

  function get_load_avg_option(){
    var loadAvgOptions = {
      title: {
        text: '平均负载'
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params, ticket, callback) {
          var res = "时间：" + params[0].name;
          for(i = 0; i < params.length; i++){
            res += '<br/>' + params[i].seriesName + ' : ' + params[i].value;
          }
          return res;
        }
      },
      legend: {
        data: ['平均负载(1min)','平均负载(5min)','平均负载(15min)']
      },
      xAxis: [
        {
          type: 'category',
          data: []
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitNumber: 2
        }
      ],
      series: [
        {
          name: '平均负载(1min)',
          type: 'line',
          symbol: 'none',
          data: []
        },
        {
          name: '平均负载(5min)',
          type: 'line',
          symbol: 'none',
          data: []
        },
        {
          name: '平均负载(15min)',
          type: 'line',
          symbol: 'none',
          data: []
        },
      ]
    };
    return loadAvgOptions;
  }

  function get_mem_usage_option(){
    var memoryUsageOptions = {
      title: {
        text: '内存使用情况'
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params, ticket, callback) {
          var res = "时间：" + params[0].name;
          for(i = 0; i < params.length; i++){
            res += '<br/>' + params[i].seriesName + ' : ' + params[i].value + "%";
          }
          return res;
        }
      },
      legend: {
        data: ['使用率']
      },
      xAxis: [
        {
          type: 'category',
          data: []
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitNumber: 2
        }
      ],
      series: [
        {
          name: '使用率',
          type: 'line',
          symbol: 'none',
          stack: '总量',
          itemStyle:{normal:{areaStyle:{type:'default'}}},
          data: []
        }
      ]
    };
    return memoryUsageOptions;
  }

  function get_network_option(){
    var networkOptions = {
      title: {
        text: '主机网络吞吐量'
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params, ticket, callback) {
          var res = "时间：" + params[0].name;
          for(i = 0; i < params.length; i++){
            res += '<br/>' + params[i].seriesName + ' : ' + params[i].value + "mb";
          }
          return res;
        }
      },
      legend: {
        data: ['上行','下行']
      },
      xAxis: [
        {
          type: 'category',
          data: []
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitNumber: 2
        }
      ],
      series: [
        {
          name: '上行',
          type: 'line',
          symbol: 'none',
          data: []
        },
        {
          name: '下行',
          type: 'line',
          symbol: 'none',
          data: []
        }
      ]
    };
    return networkOptions;
  }

  function get_swap_usage_option(){
    var swapUsageOptions = {
      title: {
        text: '交换空间使用率'
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params, ticket, callback) {
          var res = "时间：" + params[0].name;
          for(i = 0; i < params.length; i++){
            res += '<br/>' + params[i].seriesName + ' : ' + params[i].value + "%";
          }
          return res;
        }
      },
      legend: {
        data: ['使用率']
      },
      xAxis: [
        {
          type: 'category',
          data: []
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitNumber: 2
        }
      ],
      series: [
        {
          name: '使用率',
          type: 'line',
          symbol: 'none',
          itemStyle:{normal:{areaStyle:{type:'default'}}},
          data: []
        }
      ]
    }
    return swapUsageOptions;
  }