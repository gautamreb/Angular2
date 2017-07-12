    var inputArr=[];
    var inputArrGraphRow = [];
    var intClick=false;
    var fromDate;
    var toDate;
    var filtvar='AL';
    var chartValue='chart_div';
    var sortType='1';
    var formatVal='# K';
    var testArry = [];
    var dataDaily = [];
    var myJsonString = [];
    var currentDataSetWeekGraph = [];
    var currentDataSetWeekTable = [];
    var currentDataSetMonthGraph = [];
    var currentDataSetMonthTable = [];
    var currentDataSetTable = [];
    var totReq;
    var totSucess;
    var dataVolume;
    var revenue;
    
    var loggedInEntityName = '';
    var loggedInEntityId = '';
    var loggedInUserRole = '';
    
    $(document).ready(function () {
        
    loggedInEntityName = $.cookie('entityName');
    loggedInUserRole = $.cookie('userRole');

         if ('MNO_ADMIN' == loggedInUserRole) {
             loggedInEntityId = $.cookie('mnoId');
        }
        if ("INTERNAL" == loggedInUserRole) {
             loggedInEntityId = $.cookie('cdnId');
        }
        if ("MNO" == loggedInUserRole) {
             loggedInEntityId = $.cookie('mnoId');
        }

        //Setting looged in username as title
        $('#titleHeader').html(loggedInEntityName);
       //$('#titleHeader').html("VODAFONE");
        
        google.charts.load("current", {packages: ["corechart", "table", "gauge"]});
        $("#menu li a").click(function (e) {
        e.preventDefault();
        //$("#menu li a").addClass("currentLink").not(this).removeClass("currentLink");
        $("#menu li a").addClass("moduleSubTab-Selected").not(this).removeClass("moduleSubTab-Selected");
        }); 
        $("#linkGraph li a").click(function (e) {
        e.preventDefault();
        $("#linkGraph li a").addClass("currentGraph").not(this).removeClass("currentGraph");
        }); 
        document.getElementById("btn").disabled=true;
        changeFiltertype(filtvar);
        $('.pickerContainer.basic').DatePicker({mode: "single", date: new Date(), inline: true});
                $('.pickerContainer.range').DatePicker({mode: "range", date: ['2012-10-20', new Date()], inline: true, calendars: 2});
                $('.pickerContainer.tworanges').DatePicker({mode: "tworanges", date: ['2012-10-20', '2012-10-29', '2012-10-10', '2012-10-19'], inline: true, calendars: 2});
                $('.pickerContainer.widget').DateRangesWidget();
                prettyPrint();
        $('#tab-container').easytabs({
            animate: true,
            animationSpeed: 500,
            panelActiveClass: "active-content-div",
            collapsedByDefault: true,
            deferRender: true,
            updateHash: false
        });
    });
    
    function changeFiltertype(value)
    {
        var name1="totalReq_li";
        filtvar=value;
        changeTabs(name1);
    }
    var tabsLiArray = ["totalReq_li", "successReq_li", "avgBit_li", "QOS_li"]

    function changeTabs(name) {
        console.log("filtvar==>"+filtvar);
        if(filtvar == 'AL')
        {
            $("#btn").hide();
        }else if(filtvar == 'NET-WRK' || filtvar == 'GEO-GRPY' || filtvar == 'SER-TYP')
        {
            $("#btn").show();
        }
        if(name === "totalReq_li")
        {
            sortType = '1';
            formatVal='# K';
        }else if(name === "successReq_li")
        {
            sortType = '2';
            formatVal='# %';
        }else if(name === "avgBit_li")
        {
            sortType = '3';
            formatVal='# G';
        }else if(name === "QOS_li")
        {
            sortType = '4';
            formatVal='# K';
        }
        if(intClick=== true || ((fromDate === undefined) && (toDate === undefined)))
        {
            var today = new Date();
            today.setDate(today.getDate() - 7); //getting 7 days before date
            var dd = today.getDate();
            if(dd < 10)
            {
                dd="0"+dd;
            }
            var mm = today.getMonth()+1; //January is 0!
            var dd = today.getDate();
            if(mm < 10)
            {
                mm="0"+mm;
            }
            var yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;
            var sysDay=new Date();
            sysDay.setDate(sysDay.getDate()-1); // getting yesterday date
            var sysdd = sysDay.getDate();
            if(sysdd < 10)
            {
                sysdd="0"+sysdd;
            }
            var sysmm = sysDay.getMonth()+1; //January is 0!
            if(sysmm < 10)
            {
                sysmm="0"+sysmm;
            }
            var sysyyyy = sysDay.getFullYear();
            sysDay= sysdd + '/' + sysmm + '/' + sysyyyy;
            fromDate =today;
            toDate =sysDay;
        }else
        {
            var selfrmDate;
            var seltoDate;
            var DtlStr=[];
            var DtlrFrm=[];
            var DtlrTo=[];
            var ResultStr = $('span.main').html();
            if (! (ResultStr === undefined))
            {
                DtlStr = ResultStr.split("-");
                fromDate=DtlStr[0];
                DtlrFrm = fromDate.split("/");
                var Fdd=DtlrFrm[0];
                var Fmm=DtlrFrm[1];
                var Fyyyy= DtlrFrm[2];
                if(Fdd < 10)
                {
                    Fdd="0"+Fdd;
                }
                if(Fmm < 10)
                {
                    Fmm="0"+Fmm;
                }
                selfrmDate = Fdd + '/' + Fmm + '/' + Fyyyy;
                fromDate= selfrmDate.trim();
                toDate=DtlStr[1].trim();
                DtlrTo = toDate.split("/");
                var Tdd=DtlrTo[0];
                var Tmm=DtlrTo[1];
                var Tyyyy=DtlrTo[2];
                if(Tdd < 10)
                {
                    Tdd="0"+Tdd;
                }
                if(Tmm < 10)
                {
                    Tmm="0"+Tmm;
                }
                seltoDate = Tdd + '/' + Tmm + '/' + Tyyyy;
                toDate= seltoDate.trim();
            }
        }
        
        
        for (var i = 0; i < tabsLiArray.length; i++) {
            if (name === tabsLiArray[i]) {
                var id_name = tabsLiArray[i];
                $("#" + id_name).css({"height": "180px"});
                $("#" + id_name).css({"border": "none"});
                var nameVal = id_name.replace("_li", "");
                $("#" + nameVal).css({"height": $("#" + nameVal).height()});
            } else {
                var id_name = tabsLiArray[i];
                $("#" + id_name).css({"height": "150px"});
                $("#" + id_name).css({"border": "2px solid #192E5D"});
            }
        }
         $.ajax({
            // url: baseURL + "account/mnogenericanalytics/overview?fromDate="+fromDate+"&toDate="+toDate+"&filterType="+ filtvar +"&mnoId="+loggedInEntityId+"&sortType="+ sortType +"&graphType="+sortType,
            url: "http://localhost:8080/sawridgewebservices-mno/account/mnogenericanalytics/overview?fromDate="+fromDate+"&toDate="+toDate+"&filterType="+ filtvar +"&mnoId=465&sortType="+ sortType +"&graphType="+sortType,
            dataType: 'json',
            method: 'get',
            crossDomain: true,
            contentType: 'application/json',
            cache: false,
            async: false,
            success: function (response) {
                if (200 == response.responseCode) {
                    console.log("response----", response.obj);
                    console.log("response.obj[0]==>" + response.obj[0]);
                    console.log("response.payLoad==>" +JSON.stringify(response.Payload));
                    totReq=response.map['Total request'];
                    $("#totReqId").html(totReq);
                    totSucess=response.map['%Success'];
                    $("#totSuccessId").html(totSucess + " %");
                    dataVolume=response.map['Data volume'];
                    $("#dataVolId").html(dataVolume);
                    revenue=response.map['Revenue'];
                    $("#revenueId").html(revenue);
                    var len = response.Payload.length;
                    var inputArrGraphCol = [];
                    var inputArrGraphColCal = [];
                    inputArrGraphRow = [];
                    inputArrGraphRowCal = [];
                    var DtlrTo1=[];
                    inputArrGraphRow.push(response.Payload[0]);
                    inputArrGraphRowCal.push(response.Payload[0]);
                    for(var i=1; i<len; i++)  
                    {

                        inputArrGraphCol = [];
                        inputArrGraphColCal = [];
                        for(var j=0 ; j < response.Payload[i].length; j++)
                        {

                            if(j===0)
                            {
                                inputArrGraphColCal.push(response.Payload[i][j]);
                                DtlrTo1 = response.Payload[i][j].split("-");
                                var Tyyyy=DtlrTo1[0];
                                var Tmm=DtlrTo1[1];
                                var Tdd=DtlrTo1[2];
                                var selfrmDate1 = new Date (Tyyyy + ',' + Tmm + ',' + Tdd);
                                //inputArrGraphCol.push(response.Payload[i][j]);
                                inputArrGraphCol.push(selfrmDate1);
                            }else
                            {
                                inputArrGraphCol.push(parseInt(response.Payload[i][j]));
                                inputArrGraphColCal.push(parseInt(response.Payload[i][j]));
                            }

                        }
                        console.log("inputArrGraphCol==>"+inputArrGraphCol);
                        inputArrGraphRow.push(inputArrGraphCol);
                        inputArrGraphRowCal.push(inputArrGraphColCal);
                    }
                    console.log("inputArrGraphRow ==>" +JSON.stringify(inputArrGraphRow));
                    console.log("inputArrGraphRowCal ==>" +JSON.stringify(inputArrGraphRowCal));
                    drawChart(inputArrGraphRow);
                    response.obj.shift(response.obj[0]);
                    drawTable(response.obj);

                } else {
                    alert(response.messageDesc, 3);
                    drawChart(inputArrGraphRow);
                    drawTable(inputArrEmt);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Error in operation");
            }

        });
        
        intClick=false;
    }

    function drawDailyGraph()
    {   
        drawChart(inputArrGraphRow);

    }
    function drawWeekGraph()
    {
        currentDataSetWeekGraph = getWeeklyData(inputArrGraphRow);
        console.log("currentDataSet==>" + JSON.stringify(currentDataSetWeekGraph));
        drawChart(currentDataSetWeekGraph);
    }
    function drawMonthGraph()
    {
        currentDataSetMonthGraph = convertMonthIndexToName("M", getMonthlyData(inputArrGraphRow));
        console.log("currentDataSet==>" + JSON.stringify(currentDataSetMonthGraph));
        drawChart(currentDataSetMonthGraph);
    }
    function drawTable(inputArr) {
        var DurationLbl='';
        if(filtvar==='NET-WRK')
        {
            DurationLbl='Network';
        }else if(filtvar==='GEO-GRPY')
        {
            DurationLbl='Region';
        }else if(filtvar==='SER-TYP')
        {
            DurationLbl='Service Type';
        }
        if(filtvar==='AL')
        {
          $('#example').DataTable({
            data: inputArr,
            columns: [
                {title: "Select"},
                {title: DurationLbl},
                {title: "Total request"},
                {title: "% success"},
                {title: "Data volume (in GB)"},
                {title: "Revenue"},
                {title: "ID"}
            ],
            'columnDefs': [
                {"className": "dt-center", "targets": "_all"},
                {
                    'targets': 0,
                    'searchable': false,
                    'orderable': false,
                    'className': 'dt-body-center',
                    'render': function (data, type, full, meta) {
                    var temp='<input type="checkbox" name="case[]" id="checkId" class="ok" onclick=\"collectSelectedId(this)\" value=\"' + full[0] + '\">'; 
                    return temp;
                    }
                },
                { 'visible': false, "targets": 6 ,"defaultContent": ""}
                ],
            order: [[1, 'asc']],
            "bDestroy": true,
            "paging": false,
            "ordering": true,
            "info": false,
            scrollY: '50vh',
            scrollCollapse: true
        });
        
    }else
    {
        $('#example').DataTable({
            data: inputArr,
            columns: [
                {title: "Duration"},
                {title: "Total request"},
                {title: "% success"},
                {title: "Data volume (in GB)"},
                {title: "Revenue"},
                {title: "Revenue1"},
                {title: "Select"}
            ],
            'columnDefs': [
                { 'visible': false, "targets": 5 ,"defaultContent": ""},
                {"className": "dt-center", "targets": "_all"},
                {
                    'targets': 6,
                    'searchable': false,
                    'orderable': false,
                    'visible': false,
                    'className': 'dt-body-center',
                    'render': function (data, type, full, meta) {
                        return '<input type="checkbox" name="case[]" id="checkId" class="ok" onclick=\"collectSelectedId(this)\" value=\"' + full[0] + '\">';
                    }
                }],
                order: [[1, 'asc']],
                "bDestroy": true,
                "paging": false,
                "ordering": true,
                "info": false,
                scrollY: '50vh',
                scrollCollapse: true
            });
    }
        $('#example_filter').hide();
    }
    var contentHeight = $("#mainContent").height();

    $("#sidebarContent").css({"height": contentHeight});

    google.load("visualization", "1", {packages: ["corechart", "bar"]});
    google.charts.load('current', {'packages': ['corechart', 'table']});

    function drawChart(inputArr) {
        var data = google.visualization.arrayToDataTable(inputArr);
        var options = {
            //height:'300',
            //width:'900',
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
                    count: 25,
                    opacity: 1.0
                },
                baselineColor: '#ffffff',
                minorGridlines: {count: 1},
                format: 'dd MMM'
            },
            vAxis: {
                textStyle: {
                    color: 'white'
                },
                minValue: 0,
                gridlines: {
                    color: 'transparent',
                    count: 5
                },
            },
            chartArea: {left: 50, top: 20, width: "90%", height: "80%"},
            fontSize: 10,
            isStacked: true, areaOpacity: '0.8',
            //dataOpacity: 1.0,
            //colors:['#c97f18','#e5b870','#a8531e','#129934','#7ded9f'],
            colors: ['#B87A00', '#DBB84F', '#B24A00', '#009F38', '#70C279'],
            legend: {position: 'bottom', textStyle: {color: 'white', fontSize: 12}, maxLines: 3, alignment: 'start'},
            // backgroundColor.strokeWidth: 2,
            //axisTitlesPosition: 'none',
            // aggregationTarget: 'category',
            //explorer: { axis: 'horizontal' },
            //explorer: { axis: 'horizontal', actions: ['dragToZoom', 'rightClickToReset'] },
            explorer: { axis: 'horizontal'||'vertical',actions: ['dragToZoom', 'rightClickToReset'] } ,
            backgroundColor: '#192E5D'         // selectionMode: 'multiple',
                    // isStacked: 'obsolute',
        };
        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }


    function getSidebarMenus() {
        var menus = [
            {
                id: "1",
                name: "Dashboard",
                icon: "icon-lhs-dashboard.png",
                appId: "0",
                childrens: []
            },
            {
                id: "2",
                name: "Analytics",
                icon: "icon-lhs-analytics.png",
                appId: "33",
                childrens: []
            },
            {
                id: "3",
                name: "Config",
                icon: "icon-lhs-configuration.png",
                appId: "0",
                childrens: []
            },
            {
                id: "4",
                name: "KPI Analytics",
                icon: "icon-lhs-analytics.png",
                appId: "33",
                childrens: []
            },
            {
                id: "5",
                name: "Fault Analytics",
                icon: "icon-lhs-analytics.png",
                appId: "0",
                childrens: []
            },
            {
                id: "6",
                name: "Billing/Payment",
                icon: "icon-lhs-analytics.png",
                appId: "0",
                childrens: []
            }
        ];

        for (var i = 0; i < menus.length; i++) {
            var parentId = "sidebarContent";
            addmenu(menus[i], parentId);
        }
//        $.ajax({
//            url: baseURL + "account/User/roleBasedAccess?userId=" + $.cookie('userId') + "&userType=" + $.cookie('userTypeId') + "&role=" + $.cookie('userRoleId') + "&jSessionId=" + $.cookie('jSessionId'),
//            type: "GET",
//            dataType: "json",
//            //cache: false,
//            success: function (dataSet) {
//                var data = dataSet.Payload;
//                // alert(JSON.stringify(data));
//                console.log("data--", data);
//                //  globalMenuData = data;
//                var menus = data;
//                for (var i = 0; i < menus.length; i++) {
//                    var parentId = "sidebarContent";
//                    addmenu(menus[i], parentId);
//                }
//            }
//        });

    }

    function addmenu(data, id) {
        console.log("data.childrens.length---", data.childrens.length, id);
        var item = '<div class="row menuButton">' +
                '<div class="col-sm-12" style="text-align: center;" id="sideRow_' + data.id + '" onclick="clickofAnalytics(' + data.id + ',\''+data.urlORfunction + '\');">' +
                '<img src="assets/img/' + data.icon + '"' + 'alt="" /><br/>' +
                '<span id="dashboard_mno">' + data.name + '</span> ' +
                '</div>' +
                '</div>';
        $("#" + id).append(item);

        $("#sideRow_2").addClass("active");
        
       // $("#sideRow_2").parent().css({"background-color": "#2C4887"})
       $("#sideRow_2").parent().addClass('lhsTab-Selected');

    }

    function submitsidebarMenu(appId) {
        submitForm('internal', appId);
    }

    getSidebarMenus();
    function getWeeklyData(data) {
        var MonthData = [];
        var tempMonthHeading = data[0];
        MonthData.push(tempMonthHeading);

        for (var i = 1; i < data.length; i++)
        {
            var obj = data[i];
            var tempGetMonthSum = [];

            var attrName = obj[0];

            var tempYear = parseInt(attrName.substring(0, 4));
            var tempMonth = parseInt(attrName.substring(6, 7));
            var tempDate = parseInt(attrName.substring(8, 10));

            var d = new Date();
            d.setFullYear(tempYear);
            d.setMonth(tempMonth - 1);
            d.setDate(tempDate);
            var WeekNumber = getWeek(d);
            var currentKeymonthname = getValueWithMonthName("DYY", attrName);
            var monthName = currentKeymonthname.toString().substr(3, 6);
            if (tempMonth == 1 && (WeekNumber == 53 || WeekNumber == 52)) {
                tempYear = tempYear - 1;
            }
            var currentKey = "Week-" + WeekNumber + "," + monthName;
            var CurrentValueWeek = isValueExist(MonthData, currentKey);
            if (CurrentValueWeek == false) {
                tempGetMonthSum.push(currentKey);
                for (var ZeroFlag = 1; ZeroFlag < obj.length; ZeroFlag++) {
                    tempGetMonthSum.push(0);
                }
            }
            if (tempGetMonthSum.length > 0)
                MonthData.push(tempGetMonthSum);
            for (var j = 1; j < obj.length; j++) {

                var attrValue = obj[j];
                var CurrentValue = getValue(MonthData, currentKey, j);
                if (CurrentValue >= 0) {
                    var CurrentIndexValue = parseInt(CurrentValue);
                    setValue(MonthData, currentKey, parseInt(CurrentIndexValue) + parseInt(attrValue), j);
                }
            }
        }
        return MonthData;
    }

    function getWeeklyDataTable(data) {
        var MonthData = [];
        for (var i = 0; i < data.length; i++)
        {
            var obj = data[i];
            var tempGetMonthSum = [];

            var attrName = obj[0];

            var tempYear = parseInt(attrName.substring(0, 4));
            var tempMonth = parseInt(attrName.substring(6, 7));
            var tempDate = parseInt(attrName.substring(8, 10));

            var d = new Date();
            d.setFullYear(tempYear);
            d.setMonth(tempMonth - 1);
            d.setDate(tempDate);
            var WeekNumber = getWeek(d);
            var currentKeymonthname = getValueWithMonthName("DYY", attrName);
            var monthName = currentKeymonthname.toString().substr(3, 6)
            if (tempMonth == 1 && (WeekNumber == 53 || WeekNumber == 52)) {
                tempYear = tempYear - 1;
            }
            var currentKey = "Week-" + WeekNumber + "," + monthName;
            var CurrentValueWeek = isValueExist(MonthData, currentKey);
            if (CurrentValueWeek == false) {
                tempGetMonthSum.push(currentKey);
                for (var ZeroFlag = 1; ZeroFlag < obj.length; ZeroFlag++) {
                    tempGetMonthSum.push(0);
                }
            }
            if (tempGetMonthSum.length > 0)
                MonthData.push(tempGetMonthSum);
            for (var j = 1; j < obj.length; j++) {
                var attrValue = obj[j];
                var CurrentValue = getValue(MonthData, currentKey, j);
                if (CurrentValue >= 0) {
                    var CurrentIndexValue = parseInt(CurrentValue);
                    setValue(MonthData, currentKey, parseInt(CurrentIndexValue) + parseInt(attrValue), j);
                }
            }
        }
        return MonthData;
    }

    function getValueWithMonthName(TypeOfValue, isValue) {
        var MonthArray = ["Month", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var monthIndex = isValue.substring(5, 7);
        var yearValue = isValue.substring(0, 4);
        var returnStr = "";
        if (isValue.length <= 10 || isValue.length == 13) {
            if (TypeOfValue == "M") {

                returnStr = MonthArray[parseInt(monthIndex)] + "-" + yearValue
            } else
            if (TypeOfValue == "D") {
                var dateValue = isValue.substring(8, 10);
                returnStr = dateValue + "-" + MonthArray[parseInt(monthIndex)] + "-" + yearValue;//.substring(2,4);
            } else
            if (TypeOfValue == "DYY") {
                var dateValue = isValue.substring(8, 10);
                returnStr = dateValue + "-" + MonthArray[parseInt(monthIndex)] + "'" + yearValue.substring(2, 4);
            } else {
                var dateValue = isValue.substring(11, 13);
                returnStr = dateValue;
            }
        } else {
            returnStr = isValue;
        }
        return returnStr;
    }
    function isValueExist(obj, Key) {
        for (var key1 in obj) {
            var attrName = obj[key1][0];
            if (attrName == Key) {
                return true;
            }

        }
        return false;
    }
    function getValue(obj, Key, Index) {
        for (var key1 in obj)
        {
            var attrName = obj[key1][0];
            var attrValue = obj[key1][Index];
            if (attrName == Key) {
                return attrValue;
            }
        }
    }
    function setValue(obj, Key, Value, Index) {
        for (var key1 in obj)
        {
            var attrName = obj[key1][0];
            if (attrName == Key) {
                obj[key1][Index] = Value;
                return obj;
            }
        }
    }

    function getWeek(date2) {
        var date = new Date(date2);
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + 3 - (date.getDay()));
        var dated = new Date(date2);
        var week1 = (0 | dated.getDate() / 7) + 1;
        return week1;
    }

    function addDateRangeInSelectOption(items) {
        var ChartFrom = ""
        listOfDates = [];
        $.each(items, function (i, item) {
            var obj = items[i];
            if (i > 0) {
                listOfDates.push(obj[0]);
            }
        });
    }

    function convertMonthIndexToName(ViewType, isArray)
    {
        var MonthData = [];
        for (var i = 0; i < isArray.length; i++)
        {
            var obj2 = isArray[i];
            if (i > 0)
                obj2[0] = getValueWithMonthName(ViewType, obj2[0]);
            MonthData.push(obj2);
        }
        return MonthData;
    }

    function convertMonthIndexToNameTable(ViewType, isArray)
    {
        var MonthData = [];
        for (var i = 0; i < isArray.length; i++)
        {
            var obj2 = isArray[i];
            obj2[0] = getValueWithMonthName(ViewType, obj2[0]);
            MonthData.push(obj2);
        }
        return MonthData;
    }
    function getMonthlyData(data) {
        var MonthDataDayCount = [];
        var MonthData = [];
        var tempMonthHeading = data[0];//["DAY","Total Services"];  
        MonthData.push(tempMonthHeading);
        MonthDataDayCount.push(tempMonthHeading);
        for (var i = 1; i < data.length; i++)
        {
            var obj = data[i];
            var attrName = obj[0];
            var currentKey = attrName.substring(0, 7);
            var GotHead = getHead(MonthData, MonthDataDayCount, obj, currentKey);
            MonthData = GotHead[0];
            MonthDataDayCount = GotHead[1];
            var GotArray = SubObjOpt(MonthData, MonthDataDayCount, obj, currentKey)
            MonthData = GotArray[0];
            MonthDataDayCount = GotArray[1];
        }
        if (getValueType(tempMonthHeading[0]) == "%")
        {
            MonthData = getAverage(MonthData, MonthDataDayCount);
        }
        return MonthData;
    }

    function getMonthlyDataTable(data) {
        var MonthDataDayCount = [];
        var MonthData = [];
        for (var i = 0; i < data.length; i++)
        {
            var obj = data[i];
            var attrName = obj[0];
            var currentKey = attrName.substring(0, 7);
            var GotHead = getHead(MonthData, MonthDataDayCount, obj, currentKey);
            MonthData = GotHead[0];
            MonthDataDayCount = GotHead[1];
            var GotArray = SubObjOpt(MonthData, MonthDataDayCount, obj, currentKey)
            MonthData = GotArray[0];
            MonthDataDayCount = GotArray[1];
        }
        console.log(MonthData);
        return MonthData;
    }

    function getHead(MonthData, MonthDataDayCount, obj, currentKey, col)
    {
        var finalArray = [];
        var tempGetMonthSum = [];
        var tempMonthDataDayCount = [];
        var InitialValue = 1;
        var ObjLength = obj.length;
        var tempcol = parseInt(col);

        if (tempcol > 0) {
            ObjLength = tempcol + 1;
            InitialValue = tempcol;
        }
        var CurrentValueMonth = isValueExist(MonthData, currentKey);
        if (CurrentValueMonth == false)
        {
            max = 0;
            tempGetMonthSum.push(currentKey);
            tempMonthDataDayCount.push(currentKey);

            if (tempcol > 0) {
                tempGetMonthSum.push(0);
                tempMonthDataDayCount.push(0);
            } else {
                for (var ZeroFlag = InitialValue; ZeroFlag < ObjLength; ZeroFlag++) {
                    tempGetMonthSum.push(0);
                    tempMonthDataDayCount.push(0);
                }
            }
        }
        if (tempGetMonthSum.length > 0) {
            MonthData.push(tempGetMonthSum);
            MonthDataDayCount.push(tempMonthDataDayCount);
        }
        finalArray.push(MonthData, MonthDataDayCount)
        return finalArray;
    }

    function SubObjOpt(MonthData, MonthDataDayCount, obj, currentKey, col) {
        var finalArray = [];
        var InitialValue = 1;
        var ObjLength = obj.length;
        var tempcol = parseInt(col);
        if (isNaN(tempcol)) {
            tempcol = getLegendIndexValue(MonthData, col);
        }
        if (tempcol > 0) {
            ObjLength = tempcol + 1
            InitialValue = tempcol;
        }
        for (var j = InitialValue; j < ObjLength; j++)
        {
            var attrValue = obj[j];
            var CurrentValue = "";
            var CurrentCount = "";
            if (tempcol > 0) {
                CurrentValue = getValue(MonthData, currentKey, 1);
                CurrentCount = getValue(MonthDataDayCount, currentKey, 1);
            } else {
                CurrentValue = getValue(MonthData, currentKey, j);
                CurrentCount = getValue(MonthDataDayCount, currentKey, j);
            }
            if (CurrentValue >= 0)
            {
                var CurrentIndexValue = parseFloat(CurrentValue);

                if (parseInt(attrValue) > 0)
                {
                    if (tempcol > 0) {
                        setValue(MonthDataDayCount, currentKey, parseInt(CurrentCount) + 1, 1);
                    } else {
                        setValue(MonthDataDayCount, currentKey, parseInt(CurrentCount) + 1, j);
                    }
                }

                if (MonthData[0][0].toString().split('_')[1] == "MAX")
                {
                    if (CurrentIndexValue > parseFloat(attrValue))
                    {
                        max = CurrentIndexValue;
                    } else
                    {
                        max = parseFloat(attrValue);
                    }
                    if (tempcol > 0)
                    {
                        setValue(MonthData, currentKey, max, 1);
                    } else
                    {
                        setValue(MonthData, currentKey, max, j);
                    }
                } else
                {
                    if (tempcol > 0) {
                        setValue(MonthData, currentKey, CurrentIndexValue + parseFloat(attrValue), 1);
                    } else {
                        setValue(MonthData, currentKey, CurrentIndexValue + parseFloat(attrValue), j);
                    }
                }
            }
        }

        finalArray.push(MonthData, MonthDataDayCount);
        return finalArray;
    }

    function getLegendIndexValue(obj, Key) {
        var LegendArray = obj[0];
        for (var IndexValue in LegendArray)
        {
            var attrValue = LegendArray[IndexValue];
            if (attrValue == Key)
            {
                return IndexValue;
            }
        }
        return false;
    }

    function getAverage(originalArray, divArray) {
        var localArray = [];
        for (var i = 0; i < originalArray.length; i++)
        {
            var tinyArray = originalArray[i];
            var tinydivArray = divArray[i];

            if (i == 0)
            {
                localArray.push(tinyArray);
            } else
            {
                var temptinyArray = [];
                for (var j = 0; j < tinyArray.length; j++)
                {
                    if (j == 0) {
                        temptinyArray.push(tinyArray[0]);
                    } else
                    {
                        if (tinydivArray[j] > 0 && tinyArray[j] > 0) {
                            temptinyArray.push(parseFloat((parseFloat(tinyArray[j]) / parseFloat(tinydivArray[j])).toFixed(3)));
                        } else
                        {
                            temptinyArray.push(parseFloat(parseFloat(tinyArray[j]).toFixed(3)))
                        }
                    }
                }
                localArray.push(temptinyArray);
            }
        }
        return localArray;
    }

    function getValueType(Value)
    {
        var IndexValue = Value.indexOf("_");
        if (IndexValue > 0)
        {
            return Value.substring(IndexValue + 1, IndexValue + 2)
        }
        return false;
    }

    function collectSelectedId(obj) {
        testArry = [];
        var cnt=0;
        $.each($("input[name='case[]']:checked"), function (index, value) {
            var data = $(this).val();
            if (index >= 0)
            {
                testArry.push(data);
                cnt++;
                if (cnt> 5 ){
			alert("You can only select a maximum of 5 checkboxes")
			obj.checked=false;
                }
            }
            if(cnt>0)
            {
                document.getElementById("btn").disabled=false;
            }
        });
        if(testArry.length == 0)
        {
            document.getElementById("btn").disabled=true;
        }
    }

    $('#btn').click(function () {
        $.ajax({
            //url: baseURL + "account/mnogenericanalytics/overview?fromDate="+fromDate+"&toDate="+toDate+"&filterType="+ filtvar +"&mnoId=465&sortType="+ sortType +"&graphType="+sortType+"&checked="+testArry,
            url: "http://localhost:8080/sawridgewebservices-mno/account/mnogenericanalytics/overview?fromDate="+fromDate+"&toDate="+toDate+"&filterType="+ filtvar +"&mnoId=465&sortType="+ sortType +"&graphType="+sortType+"&checked="+testArry,
            dataType: 'json',
            method: 'get',
            crossDomain: true,
            contentType: 'application/json',
            cache: false,
            async: false,
            success: function (response) {
                console.log("response on button click----", response.obj);
                console.log("response.obj[0] on button click==>" + response.obj[0]);
                console.log("response.payLoad on button click==>" +JSON.stringify(response.Payload));
                var len = response.Payload.length;
                var inputArrGraphCol = [];
                var inputArrGraphRowButton = [];
                inputArrGraphRowButton.push(response.Payload[0]);
                for(var i=1; i<len; i++)  
                {
                    inputArrGraphCol = [];
                    for(var j=0 ; j < response.Payload[i].length; j++)
                    {
                        if(j===0)
                        {
                            console.log("0th position on button click"+response.Payload[i][j].toString());
                            inputArrGraphCol.push(response.Payload[i][j]);
                        }else
                        {
                            inputArrGraphCol.push(parseInt(response.Payload[i][j]));
                        }
                    }
                    console.log("inputArrGraphCol on button click==>"+inputArrGraphCol);
                    inputArrGraphRowButton.push(inputArrGraphCol);
                }
                console.log("inputArrGraphRowButton on button click==>" +JSON.stringify(inputArrGraphRowButton));
                drawChart(inputArrGraphRowButton);
                response.obj.shift(response.obj[0]);
                drawTable(response.obj);
                testArry=[];
            },
            error: function (xhr, textStatus, errorThrown) {
            }

        });
        
    });
function clickofAnalytics(id)
{
//    intClick=true;
//    changeFiltertype(filtvar);
    switch(id)
    {
        case 1:
            window.location = 'newUIDashBoard.jsp';
            break;
        case 2:
            //window.location = 'newUIAnalytics.jsp';
            break;
        case 3:
            window.location = 'newUIConfig.jsp';
            break;
        case 4:
            window.location = 'newUIKPIAnalytics.jsp';
            break;
        case 5:
            window.location = 'newUIFaultAnalytics.jsp';
            break;
        case 6:
            window.location = 'newUIBilling.jsp';
            break;
        default :
            break;
    }

}