$(function() {
    const layer = layui.layer
    const form = layui.form
        // 获取文章分类列表
    initArtCateList()

    // 初始化页面函数
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: 'my/article/cates',
            success: function(res) {
                // 渲染模板引擎
                const htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 为添加类别按钮绑定点击事件
    let indexAdd = null
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html(),
        })
    })

    // 通过事件委托，给form-add表单绑定submit事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                initArtCateList()
                layer.msg('添加成功！')
                layer.close(indexAdd)
            }
        })
    })

    // 通过事件委托，给编辑按钮绑定点击事件
    let indexEdit = null
    $('tbody').on('click', '.btn-edit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html(),
        })

        const id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: 'my/article/cates/' + id,
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.messag)
                form.val('form-edit', res.data)
            }
        })
    })

    // 通过事件委托，给form-edit表单绑定submit事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                initArtCateList()
                layer.msg('修改成功！')
                layer.close(indexEdit)
            }
        })
    })

    // 通过事件委托，给编辑按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
        const id = $(this).attr('data-Id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: 'my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) return layer.msg(res.message)
                    layer.msg(res.message)
                    layer.close(index)
                    initArtCateList()
                }
            })
        })
    })
})