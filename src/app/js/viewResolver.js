//This file is build for dynamically resolving view names from one place
//provides flexibility to change view file names
//reference files are viewfile_resolver.properties, viewResolver.js

function getFilename(key)
{
    var filename;
    try {
        $.i18n.properties({
            name: 'viewfile_resolver',
            path: '',
            mode: 'both',
            language: 'en_US',
            callback: function () {
                //return $.i18n.prop(key);
                var val = key;

                filename = "" + $.i18n.prop(val);

            },
        });
    } catch (err)
    {
        console.log(err);
    }

    return filename;
}

//include jsp for all pages

$(document).ready(function ()
{

    $.i18n.properties({
        name: 'viewfile_resolver',
        path: '',
        mode: 'both',
        language: 'en_US',
        callback: function () {
            //return $.i18n.prop(key);


            $('#headerincl').load($.i18n.prop("header")).after(function () {

                $('#footerincl').load($.i18n.prop("footer"));
            });



        },
    });

});


function getSideBar()
{
    $.i18n.properties({
        name: 'viewfile_resolver',
        path: '',
        mode: 'both',
        language: 'en_US',
        callback: function () {
            //return $.i18n.prop(key);
            userType = $.cookie('userType');


            // if ('EMS' == userType) {
            //$("#ems_sidebar_show").show();
            $("#headerincl").after($("<div></div>").attr('id', 'ems_sidebar_show').load($.i18n.prop("emssidebar")));
            // }

//                    if ('CDN' == userType) {
//                        
//                        $("#headerincl").after($("<div></div>").attr('id','cdn_sidebar_show').load($.i18n.prop("cdnsidebar")));
//                    }
//                    if ('SUBSCRIBER' == userType) {
//                        $("#headerincl").after($("<div></div>").attr('id','subscriber_sidebar_show').load($.i18n.prop("subscribersidebar")));
//                    }
//
//                    if ('INTERNAL' == userType) {
//                        $("#headerincl").after($("<div></div>").attr('id','internal').load($.i18n.prop("leftsidemenu")));
//                    }
//                    if ('MNO' == userType) {
//                        $("#headerincl").after($("<div></div>").attr('id','mno_sidebar_show').load($.i18n.prop("mnosidebar")));
//                    }

        },
    });
}

bootstrap_alert = function () {}
bootstrap_alert.warning = function (message) {
    
    bootbox.alert(message);
$(".modal-dialog").css("left","0px");
}
        