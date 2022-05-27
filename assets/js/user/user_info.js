$(function() {
    const form = layui.form

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: 'my/userinfo',
            success: function(res) {
                if (res.status !== 0) return layer.msg('获取用户信息失败')
                form.val('formUserInfo', res.data)
            }
        })
    }

    initUserInfo()

    // 重置表单数据
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })

    // 提交按钮 
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('提交修改失败！')
                layer.msg('提交修改成功！')

                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
})