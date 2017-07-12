function click_graph(evt, cityName) {
    alert('click graph method called');
//    var i, tabcontent, tablinks;
//    tabcontent = document.getElementsByClassName("tabcontent");
//    for (i = 0; i < tabcontent.length; i++) {
//        tabcontent[i].style.display = "none";
//    }
//    tablinks = document.getElementsByClassName("tablinks");
//    for (i = 0; i < tablinks.length; i++) {
//        tablinks[i].className = tablinks[i].className.replace(" active", "");
//    }
//    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
    if(cityName=='analytics1'){
       draw_myAnalytics();
    }
    if(cityName=='dashboard'){
       draw_myDashboard();

    }

}



function draw_myAnalytics(){
google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Month', 'Criteria One', 'Another Criteria', 'Third Criteria','More Criteria','Final Criteria'],
          [1,  10,      40,      39,      12,      10],
          [3,  11,      46,      21,      23,      40],
          [5,  6,       11,      32,      15,      30],
          [7,  10,      5,       50,      28,      10],
          [9,  10,      32,      21,      19,      20],
          [11, 21,      16,      42,      19,      10],
          [13, 16,      11,      10,      32,      23],
          [15, 10,      40,      19,      25,      33],
          [17, 10,      4,       30,      32,      39],
          [19, 11,      46,      29,      11,      27],
          [21, 26,      11,      32,      24,      39],
          [23, 10,      54,      41,      19,      20],
          [25, 10,      40,      18,      22,      29],
          [27, 11,      46,      21,      31,      49],
          [29, 6,       11,      43,      28,      16],
          [31, 10,       5,      50,      54,      36]

]);
 var columnRange = data.getColumnRange(1);
        var options = {
         height:'300',
         width:'900',
         hAxis: {
            textStyle: {
            color: 'white'
        },
            title: '',
            titleTextStyle: {
                color: 'white'
            },
            gridlines: {
                color: '#CBD4E5',
                count: 16,
                opacity: 1.0
            },
            baselineColor: '#ffffff',
          /*viewWindow: {
            min: Math.floor(columnRange.min),
            max: Math.ceil(columnRange.max)
           },*/
            //showTextEvery : 1,
            minorGridlines: {count: 1},
            //ticks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
            format: '####'
        },
        vAxis: {
            textStyle: {
               color: 'white'
             },
            minValue: 0,
            //baselineColor: red,
            gridlines: {
                color: 'transparent',
                count: 5
            },
         },
         series: {
                   
		0: {pointshape: 'square'},
		1: {pointshape: 'square'},
		2: {pointshape: 'square'},
		3: {pointshape: 'square'},
		4: {pointshape: 'square'}
          },
          fontSize : 12,
          isStacked: true,                       		areaOpacity:'0.8',																																																																																																											
          //dataOpacity: 1.0,
          //colors:['#c97f18','#e5b870','#a8531e','#129934','#7ded9f'],
          colors:['#B87A00','#DBB84F','#B24A00','#009F38','#70C279'],
          legend: {position: 'bottom', textStyle: {color: 'white', fontSize: 12},maxLines: 3,alignment: 'start'},
         // backgroundColor.strokeWidth: 2,
          //axisTitlesPosition: 'none',
          // aggregationTarget: 'category',
          title: 'Bitrate',titleTextStyle: {
                color: 'white'
            },
         backgroundColor : '#29326D'         // selectionMode: 'multiple',
         // isStacked: 'obsolute',


   	  
        };
var chart = new google.visualization.AreaChart(document.getElementById('analytics'));
        chart.draw(data, options);
      }
}
function draw_myDashboard(){
google.load("visualization", "1", {packages: [ "corechart", "bar" ]});
google.charts.load('current', {'packages':['corechart','table']});
google.charts.load('current', {'packages':['table']});


google.setOnLoadCallback(drawCombo);
google.charts.setOnLoadCallback(drawQoEChart);
//google.charts.setOnLoadCallback(drawTable);
//draw firstchart QoE
    function drawQoEChart() {
        var data = google.visualization.arrayToDataTable([
          ['Year',  'Expenses'],
          ['2013',       400],
          ['2014',       360],
          ['2015',       210],
          ['2016',       440],
          ['2017',       300],
          ['2018',       460],
          ['2019',       500],
          ['2020',       670]
        ]);

        var options = {
          title: 'QOE',titleTextStyle: {color: 'white'},
          isStacked: 'true',
          //backgroundColor: '#29326D',
          backgroundColor: {fill: '#29326D'},
          width: 150,
          height: 150,
          hAxis: {textStyle: {color: 'transparent'},baslineColor: 'transparent'},
          vAxis: {gridlines: {color: 'transparent'},textStyle: {color: 'transparent'}},
          legend: 'none',
          colors:['white','#004422','#29326D'],
          focusTarget: 'category',
          series: [
                 {color: 'white', visibleInLegend: false}
               
           ],
          is3D: true
          //chartArea:{backgroundColor: 'yellow', stroke: '#333'}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('QoE_div'));
        chart.draw(data, options);
        var chart1 = new google.visualization.AreaChart(document.getElementById('QoE_div1'));
        chart1.draw(data, options);
        var chart2 = new google.visualization.AreaChart(document.getElementById('QoE_div2'));
        chart2.draw(data, options);
        var chart3 = new google.visualization.AreaChart(document.getElementById('QoE_div3'));
        chart3.draw(data, options);
        var chart4 = new google.visualization.AreaChart(document.getElementById('QoE_div4'));
        chart4.draw(data, options);
        var chart = new google.visualization.AreaChart(document.getElementById('QoE_div5'));
        chart.draw(data, options);

      }

function drawCombo() {
    // Some raw data (not necessarily accurate)
    /*var data = google.visualization.arrayToDataTable([
        [ 'Day', 'QoE', 'Widening Success %'],
        [ 'Mon', 165, 230],
        [ 'Tue', 135, 350],
        [ 'Wed', 157, 108],
        [ 'Thu', 139, 176],
        [ 'Fri', 179,200 ],
        [ 'Sat', 180, 297],
        [ 'Sun', 154, 191]
    ]);*/
var colorPallette = ['#273746','#707B7C','#dc7633','#f1c40f','#1e8449','#2874a6','#6c3483','#922b21'];
 var data = new google.visualization.DataTable();
        data.addColumn('number', 'Day');
        data.addColumn('number', 'QoE');
        data.addColumn('number', 'Widening Success %');

data.addRows([
        [{v: 0, f:'Mon'}, 165, 230],
        [{v: 1, f:'Tue'}, 135, 350],
        [{v: 2, f:'Wen'}, 157, 108],
        [{v: 3, f:'Thu'}, 139, 176],
        [{v: 4, f:'Fri'}, 179, 200],
        [{v: 5, f:'Sat'}, 180, 297],	
        [{v: 6, f:'Sun'}, 154, 191]
    ]);
    var options = {
        title: 'QoE/ Widening Success',titleTextStyle: {color: 'white'},
        //width: 400,
        //height: 300,
        chs:'50*50',
        chxt:'x,y,r',

        //reverseCategories: 'true',
        seriesType: 'bars',
        aggregationTarget: 'category',
        

        series: {
            //0: { type: "bars", targetAxisIndex: 0,  color: '#B87A00'}, // Bind series 0 to an axis named 'QoE'.
            //1: { type: "line", targetAxisIndex: 1, lineWidth: '5', color: '#DBB84F' }, // Bind series 1 to an axis named 'Widening Success'.
            //2: { type: "line", targetAxisIndex: 2, lineWidth: '5', color: '' },
              0:{type: 'bar',color: '#B87A00',targetAxisIndex: 0},
              1:{type: 'area', color: '#DBB84F',targetAxisIndex: 1,lineWidth: '5',areaOpacity: '0.04'},
                // 0: { annotations: { textStyle: {fontSize: 12, color: 'red' },targetAxisIndex: 0}  },
                 //1: { annotations: {  textStyle: {fontSize: 12, color: 'red' },targetAxisIndex: 1}}
           
           
        },
	/*vAxes: [{},
    	      {
      		textStyle: {color: 'white'},
                //baseline: 300,
                	
   	       }
  ],*/ vAxes: {
    0: {
      viewWindow: {
        min: 0,
        max: 200
      },
      //ticks: [0, 5, 10, 15, 20]
    },
    1: {baselineColor: 'white',
      viewWindow: {
        min: 0,
        max: 400
      },
      //ticks: [0, 50, 100, 150,200,250]
    }
  }  ,
        vAxis: {           
                  textStyle: {color: 'white'},
                  minValue: -4,
                  baselineColor: 'white',
                  gridlines: {color: 'transparent', count: 7},
                  //direction: 1,
                  //minorGridlines: {color: 'red', count: 7},
                  //ticks: [50,100,150,200]
              
               },
        hAxis: {
    	          	textStyle: {color: 'white'},
            	  	baselineColor: 'white',
                        minValue: -0.7,
                        //logscale: true,
                        //ticks: [50,125,175,20	0],
                        allowContainerBoundaryTextCufoff: true,
            	  	baseline: -0.6,
            	  	titleTextStyle: {color: 'white'},
            	 	gridlines: {color: 'white',count: 7},
            		ticks: [{v: 0, f:'Mon'},{v: 1, f:'Tue'},{v: 2, f:'Wed'},{v: 3, f:'Thu'},{v: 4, f:'Fri'},{v: 5, f:'Sat'},{v: 6, f:'Sun'}],
            	  	minorGridlines: {count: 0},
            	  	format: '####'//,
        	},
        areaOpacity: '0.05',
        bar: { groupWidth: '40%'},
        backgroundColor : '#29326D',
        legend: {position: 'bottom', textStyle: {color: 'white', fontSize: 12},maxLines: 3,alignment: 'start'},
        explorer: { axis: 'horizontal' },
        explorer: { actions: ['dragToZoom', 'rightClickToReset'] },
        focusTarget: 'category',
        curveType: 'none'
       
      
    };

    var chart = new google.visualization.ComboChart(document.getElementById('QoE/Widening_div'));
    chart.draw(data, options);
}
/*function drawTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', '');
        data.addColumn('number', '');
        data.addRows([
          ['Game of Thrones S07 E01',  {v: 4.9, f: '4,9'}],
          ['Game of Thrones S07 E01',  {v: 4.9, f: '4,9'}],
          ['Game of Thrones S07 E01',  {v: 4.9, f: '4,9'}],
          ['Game of Thrones S07 E01',  {v: 4.9, f: '4,9'}],
          ['Game of Thrones S07 E01',  {v: 4.9, f: '4,9'}],
          ['Game of Thrones S07 E01',  {v: 4.9, f: '4,9'}],
          ['Game of Thrones S07 E01',  {v: 4.9, f: '4,9'}]
        ]);
       var options = {
                        showRowNumber: true,
                        //title: 'Top QoE',titleTextStyle: {color: 'white'},
                        //backgroundColor : '#29326D',
                        width: '100%', 
                        height: '100%'
};

        var table1 = new google.visualization.Table(document.getElementById('table_div'));
        table1.draw(data, options);
      }

*/
}

