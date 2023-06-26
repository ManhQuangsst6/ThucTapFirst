const app_config = {
    WEB_TEST_HEATMAP: 'http://localhost:3000/',

    API_LOCAL: 'http://localhost:5037/',
    API_LOCAL1: 'https://localhost:44312/',
    API_LOCAL3: 'http://bdsbgd.hopto.org:5003/apibds/',
    API_SERVER: 'http://bdsbgd.hopto.org:5003/apibds/',

    GEO_URL1: "http://bdsbgd.hopto.org:5003/apibds/api/GisOsmPoisFree/GeoMap",
    
    GEO_URL: "http://gconnect-host.hopto.org:8888/geoserver/BDS/wms",

    CALL_BACK_URL_SEVER: "http://bdsbgd.hopto.org:8082/fallback",
    CALL_BACK_URL_LOCAL: "http://localhost:8080",
    CLIENT_ID_LOCAL: "DNoW4q482RZfMLfzbDfKwN_Nm1sa",
    CLIENT_ID_SEVER: "XCYgfuajoQpkG7fiVxiElYyEadga",
    CLIENT_SECRET_LOCAL: "STKI7jOL3g189nul4Bt1gKFRpvUa",
    CLIENT_SECRET_SEVER: "9GeJq7b9lwlq0IfIqwxlLyroCD8a",
    GEO_PROJECT: "BDS",
    LAT: 105.855, 
    LON: 21.03,
    ZOOM: 13,
    LAYERS_THX: ["Tỉnh", "Huyện", "Xã"],
    PIN_MARKER: "/images/icons/pin.png",
    
    LAYERS_TRUONG_MAC_DINH: [{"id":"01","ma":"01","name":"Mầm non","moTa":"Thêm mới","ngayCapNhat":"2023-04-04","soThuTu":0,"tenVietTat":"Mầm nonn","tenUrl":"mam-non","value":"01","label":"Mầm non","show":true,"truongColor":"#00aa51"},{"id":"02","ma":"02","name":"Tiểu học","moTa":".","ngayCapNhat":"2023-03-23","soThuTu":1,"tenVietTat":"THCS","tenUrl":"tieu-hoc","value":"02","label":"Tiểu học","show":true,"truongColor":"#fafbfc"},{"id":"03","ma":"03","name":"Trung học cơ sở","ngayCapNhat":"2023-03-22","soThuTu":2,"tenVietTat":"THCS","tenUrl":"trung-hoc-co-so","value":"03","label":"Trung học cơ sở","show":true,"truongColor":"#ffc43d"},{"id":"04","ma":"04","name":"Trung học phổ thông","ngayCapNhat":"2023-03-22","soThuTu":3,"tenVietTat":"THPT","tenUrl":"trung-hoc-pho-thong","value":"04","label":"Trung học phổ thông","show":true,"truongColor":"#00a1b6"},{"id":"05","ma":"05","name":"Giáo dục thường xuyên","ngayCapNhat":"2023-04-04","soThuTu":4,"tenVietTat":"GDTX","tenUrl":"giao-duc-thuong-xuyen","value":"05","label":"Giáo dục thường xuyên","show":true,"truongColor":"#005275"}],
};
export default app_config;
