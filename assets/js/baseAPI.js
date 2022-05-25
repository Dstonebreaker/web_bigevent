// jquery提供的过滤器，在调用$.ajax之后，请求真正发给后台之前，调用这个过滤器
// 进行路径的拼接
// 在这个函数中，可以拿到我们给ajax提供的配置对象，传给形参options
$.ajaxPrefilter(options => {
    options.url = 'http://api-breakingnews-web.itheima.net/' + options.url

    if (options.url.indexOf('my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || '',
        }
    }

    options.complete = function(res) {
        // complete回调函数，无论请求成功或失败，最终都会调用
        // 在complete回调函数中，可以使用res.responseJSON获取服务器响应的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})