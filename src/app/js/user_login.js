$(document).ready(function () {
    validateUserExistence();

    if (localStorage.user_type == "CDN") {
        $("#lable_div").append("<h5>CDN LOGIN</h5>");
    }
    if (localStorage.user_type == "MNO") {
        $("#lable_div").append("<h5>MNO LOGIN</h5>");
    }
    if (localStorage.user_type == "EMS") {
        $("#lable_div").append("<h5>EMS LOGIN</h5>");
    }
    if (localStorage.user_type == "MASTER_ADMIN") {
        $("#lable_div").append("<h5>ADMIN LOGIN</h5>");
    }
    if (localStorage.user_type == "CONTENT_PROVIDER") {
        $("#lable_div").append("<h5>CONTENT PROVIDER LOGIN</h5>");
    }
    var sessionId = '';
    $("#button1").click(function () {
        loginAction();
    });


    $("input").keypress(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            loginAction();

        }
    });
    //Set default language to cookie
    $.cookie('language', 'en');
    $.cookie('isMaster', 'no');

    $("#lang").change(function () {
        var language = $("#lang").val();
        $.cookie('language', language);
        $("#defaultLangSelect").attr('value', lang);
        changeLang(language);
    });
});
function loginAction() {
    validateUserExistence();
    var resultElement = $("#result");
    var LoginID = $("#user").val();


    var Password = $("#pass").val();


    if (LoginID === "") {
        resultElement.html('<h2> Username is required</h2>');
        return false;
    }
    if (Password === "") {
        resultElement.html('<h2> Password is required</h2>');
        return false;
    }

    $.ajax({
        url: baseURL + 'account/LoginController',
        method: 'get',
        data: {strLoginId: LoginID, strPassword: Password},
        dataType: 'json',
        success: function (data) {
            if (401 == data.responseCode)
            {
                resultElement.html('<h2>' + data.messageDesc + '</h2>');
            } else if (402 == data.responseCode) {
                resultElement.html('<h2>' + data.messageDesc + '</h2>');
            } else if (403 == data.responseCode) {

                if (confirm("An active session exists with this user name. Please confirm to continue with new session")) {

                    $.getJSON(baseURL + 'account/getLastLoginSession', {strLoginId: LoginID}, function (data1) {

                        $.ajax({
                            url: baseURL + 'account/InvalidateSession',
                            method: 'get',
                            data: {strJsessionId: data1, strLoginId: LoginID},
                            dataType: 'json',
                            success: function (data) {
                                $.getJSON(baseURL + 'account/LoginController', {strLoginId: LoginID, strPassword: Password}, function (data) {

                                    var username = data.UserName;
                                    var userId = data.id;
                                    var jSessionId = data.JSessionId;

                                    userType = data.userType;
                                    var userRole = data.userRole;
                                    var userRoleId = data.userRoleId;
                                    var defaultlang = data.defaultLang;
                                    var entityName = data.entityName;
                                    var userTypeId = data.userTypeId;
                                    if ('MNO_ADMIN' == userRole) {
                                        var mno_id = data.mnoId;
                                        $.cookie('mnoId', mno_id);
//                                        alert(mno_id);
                                    }
                                    if ("INTERNAL" == userType) {
                                        $.cookie('cdnId', data.cdnId);
                                    }
                                    if ("MNO" == userType) {
                                        $.cookie('mnoId', data.mnoId);
                                    }



                                    $.cookie('userType', userType);
                                    $.cookie('loginId', LoginID);
                                    $.cookie('jSessionId', jSessionId);
                                    $.cookie('userRole', userRole);
                                    $.cookie('userRoleId', userRoleId);
                                    $.cookie('userId', userId);
                                    $.cookie('language', defaultlang);
                                    $.cookie('username', username);
                                    $.cookie('entityName', entityName);
                                    $.cookie('userTypeId', userTypeId);

                                    if (401 == data.responseCode)
                                    {
                                        resultElement.html('<h2>' + data.messageDesc + '</h2>');
                                    } else if (402 == data.responseCode) {
                                        resultElement.html('<h2>' + data.messageDesc + '</h2>');
                                    } else {

                                        if ("EMS" == userType)
                                        {
                                            window.location = getFilename("emshomepage") + '?userName=' + username + '&language=' + defaultlang + '&jSessionId=' + jSessionId + '&userId=' + userId + '&userType=' + userType;
                                        } else if ("MASTER_ADMIN" == userType) {
                                            $.cookie('isMaster', 'yes');
                                            window.location = 'index_1.jsp?userType=' + userType + '&appId=' + 35 + '&metaType=CDN';
                                        } else if ("CONTENT_PROVIDER" == userType) {
                                            window.location = 'index_1.jsp?userType=' + userType + '&appId=' + 269 + '&metaType=';
                                        }  else
                                        {
                                            //window.location = 'index_1.jsp?userType=' + userType + '&appId=' + 33 + '&metaType=';
                                            window.location = 'jsp/newUIAnalytics.jsp?userType=' + userType + '&appId=' + 33 + '&metaType=';

                                        }

                                    }

                                });
                            },
                            error: function (xhr, textStatus, errorThrown) {


//                                alert('failed');
                            }

                        });
                    });
                }

            } else {
//                alert(data);
                var username = data.UserName;
                var userId = data.id;
                var jSessionId = data.JSessionId;
                userType = data.userType;
                var userRole = data.userRole;
                var userRoleId = data.userRoleId;
                var defaultlang = data.defaultLang;
                var entityName = data.entityName;
                var userTypeId = data.userTypeId;
//                alert(userTypeId);

                $.cookie('userType', userType);
                $.cookie('loginId', LoginID);
                $.cookie('jSessionId', jSessionId);
                $.cookie('userRole', userRole);
                $.cookie('userTypeId', userTypeId);
                $.cookie('userRoleId', userRoleId);
                if ('MNO_ADMIN' == userRole) {
                    var mno_id = data.mnoId;
                    $.cookie('mnoId', mno_id);
                    // alert(mno_id);
                }
                if ("INTERNAL" == userType) {
                    $.cookie('cdnId', data.cdnId);
                }
                if ("MNO" == userType) {
                    $.cookie('mnoId', data.mnoId);
                }


                $.cookie('userId', userId);
                $.cookie('language', defaultlang);
                $.cookie('username', username);
                $.cookie('entityName', entityName);

                if ("EMS" == userType)
                {
                    window.location = getFilename("emshomepage") + '?userName=' + username + '&language=' + defaultlang + '&jSessionId=' + jSessionId + '&userId=' + userId + '&userType=' + userType;
                } else if ("MASTER_ADMIN" == userType) {
                    $.cookie('isMaster', 'yes');
                    window.location = 'index_1.jsp?userType=' + userType + '&appId=' + 35 + '&metaType=CDN';
                } else if ("CONTENT_PROVIDER" == userType) {
                    window.location = 'index_1.jsp?userType=' + userType + '&appId=' + 269 + '&metaType=';
                } else
                {
                    //window.location = 'index_1.jsp?userType=' + userType + '&appId=' + 33 + '&metaType=';
                    window.location = 'jsp/newUIAnalytics.jsp?userType=' + userType + '&appId=' + 33 + '&metaType=';

                }

            }

        },
        error: function (xhr, textStatus, errorThrown) {
//            alert(xhr.responseText);
            if (xhr.status == 420) {
                alert("Cofiguration Error. Any combination of MNO,CDN,EMS can't be configured at a time.");
            } else if (xhr.status == 421) {
                alert("service is currently unavailable");
            } else if (xhr.status == 422) {
                alert("Cofiguration Error");
            } else {
                alert('Error in Operation');
            }

        }

    });

}
function getSessionId(loginId) {
    var result = '';


    return result;
}
function changeLang(lang) {

    $.i18n.properties({
        name: 'Messages',
        path: '',
        mode: 'both',
        language: lang,
        callback: function (lang) {

            $('#user').attr('placeholder', msg_username);
            $('#pass').attr('placeholder', msg_password);
            $("#login1").html(msg_login);
            $("#signup1").html(msg_signup);
            $("#rem").html(msg_remember);
            $("#forgot").html(msg_forgot);
            $("#language_key").html(msg_language);

        },
    });
}
function validateUserExistence() {
    var jSessionId = $.cookie('jSessionId');

    $.ajax({
        url: baseURL + 'account/isSessionValid',
        method: 'get',
        data: {strJsessionId: jSessionId},
        dataType: 'json',
        success: function (data) {

            if (data == 200) {
                $.cookie('isMaster', 'no');
                if ($.cookie("userType") == "EMS")
                    window.location = getFilename("emshomepage") + '?userName=' + $.session.get("userName") + '&language=' + $.cookie("language") + '&jSessionId=' + jSessionId + '&userId=' + $.cookie("userId") + '&userType=' + $.cookie("userType");
                else if ("MASTER_ADMIN" == userType) {
                    $.cookie('isMaster', 'yes');
                    window.location = 'index_1.jsp?userType=' + userType + '&appId=' + 35 + '&metaType=CDN';
                } else
                    window.location = 'index_1.jsp?userType=' + userType + '&appId=' + 0 + '&metaType=';
            } else
            {
                $.cookie('isMaster', 'no');
                $.session.clear();
                var cookies = $.cookie();
                for (var cookie in cookies) {
                    if (cookie != undefined)
                        $.removeCookie(cookie, null, {path: '/'});
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $.session.clear();
            var cookies = $.cookie();
            for (var cookie in cookies) {
                if (cookie != undefined)
                    $.removeCookie(cookie, null, {path: '/'});
            }
        }

    });
}