// jquery提供的过滤器，在调用$.ajax之后，请求真正发给后台之前，调用这个过滤器
// 进行路径的拼接
// 在这个函数中，可以拿到我们给ajax提供的配置对象，传给形参options
$.ajaxPrefilter(options => {
    options.url = 'http://api-breakingnews-web.itheima.net/' + options.url
})