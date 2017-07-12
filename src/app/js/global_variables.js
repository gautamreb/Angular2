var id;
var lang;
var userType = '';
var baseURL;

//set url for cdn
if (localStorage.user_type == "CDN") {
    baseURL = localStorage.cdn_url;
}
//set url for mno
if (localStorage.user_type == "MNO") {
    baseURL = localStorage.mno_url;

}
//set url for ems
if (localStorage.user_type == "EMS") {
    baseURL = localStorage.ems_url;
}

//set url for Master Admin
if (localStorage.user_type == "MASTER_ADMIN") {
    baseURL = localStorage.admin_url;
}

//set url for CP
if (localStorage.user_type == "CONTENT_PROVIDER") {
    baseURL = localStorage.cp_url;
}

