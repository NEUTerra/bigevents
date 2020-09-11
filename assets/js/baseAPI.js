// ajaxprefilter拦截所以jQuery ajax请求，并获取这次请求全部的配置项，对其进行修改
// options 是 ajax的配置对象
$.ajaxPrefilter(options => {
    console.log(options);
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    if (options.url.indexOf('/my/') !== -1) {
        if (!options.headers) {
            options.headers = {};
        }
        options.headers.authorization = localStorage.getItem('token') || '';
        options.complete = res => {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token');
                if (window.parent) {
                    window.parent.location.replace('/login.html')
                } else {
                    location.replace('/login.html');
                }
            }
        }
    }
});