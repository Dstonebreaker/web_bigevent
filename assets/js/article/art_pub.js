$(function() {
    const form = layui.form



    // 初始化分类下拉列表
    initCate()

    function initCate() {
        $.ajax({
            method: 'GET',
            url: 'my/article/cates',
            success: function(res) {
                if (res.status !== 0) layer.msg(res.message)

                // 调用模板引擎，渲染下拉列表
                const htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    // 初始化富文本编辑器
    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
})