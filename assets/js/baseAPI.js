// ajaxprefilter拦截所以jQuery ajax请求，并获取这次请求全部的配置项，对其进行修改
// options 是 ajax的配置对象
$.ajaxPrefilter(options => {
    console.log(options);
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
});