// jquery提供的过滤器，在调用$.ajax之后，请求真正发给后台之前，调用这个过滤器
// 进行路径的拼接
$.ajaxPrefilter(options => {
    options.url = 'http://api-breakingnews-web.itheima.net/' + options.url
})