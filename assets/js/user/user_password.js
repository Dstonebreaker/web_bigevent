$(function() {
    var form = layui.form

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码输入不一致'
            }
        }
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layui.layer.msg('修改密码失败！')
                    // layui.layer.msg('修改密码成功！')
                $('.layui-form')[0].reset()

                // 自动跳转
                var layer = layui.layer;
                layer.open({
                    title: '提示',
                    content: '修改密码成功，请重新登陆<br>5s后自动跳转，点击确定立即跳转',
                    success: function() {
                        setTimeout(() => {
                            localStorage.removeItem('token')
                            window.parent.location.href = 'http://127.0.0.1:5500/login.html'
                        }, 3000);
                    },
                    end: function() {
                        localStorage.removeItem('token')
                        window.parent.location.href = 'http://127.0.0.1:5500/login.html'
                    }
                });
            }
        })
    })
})