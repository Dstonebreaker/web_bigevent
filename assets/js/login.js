$(function() {
    // 点击“去注册账号”链接
    $('#link_reg').on('click', () => {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登陆”链接
    $('#link_login').on('click', () => {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取form对象
    const form = layui.form
        // 通过form.verify（）函数自定义校验规则
    form.verify({
        // 自定义 pwd 规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致
        repwd: function(value) {
            // 通过形参拿到确认密码框的内容
            const pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) return '两次密码不一致'
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        const data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('api/reguser', data,
            function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('注册成功，请登录！')
                $('#link_login').click().parents('#form_reg')[0].reset()
            }
        )
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('登录失败！请稍后重试！')
                layer.msg('登录成功！')
                    // 将登录成功的到的token字符串，保存到localStorage中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})