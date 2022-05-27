$(function() {
    const form = layui.form
    const laypage = layui.laypage

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)
        let y = dt.getFullYear()
        let m = dt.getMonth() + 1
        let d = dt.getDate()
        let hh = dt.getHours()
        let mm = dt.getMinutes()
        let ss = dt.getSeconds()
        return `${y}-${padZero(m)}-${padZero(d)} ${padZero(hh)}:${padZero(mm)}:${padZero(ss)}`
    }

    // 补零函数
    function padZero(num) {
        return num < 10 ? '0' + num : num
    }

    // 定义一个查询的参数对象
    const q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示数据的条数，默认2条
        cate_id: '', // 文章分类的id
        state: '' // 文章的发布状态
    }

    initTable()
    initCates()

    // 初始化列表
    function initTable() {
        $.ajax({
            method: 'GET',
            url: 'my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                    // 使用模板引擎渲染页面的数据
                const htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                    // 调用渲染分页的方法
                renderPage(res.total)
            }
        })
    }

    // 初始化文章分类的方法
    function initCates() {
        $.ajax({
            method: 'GET',
            url: 'my/article/cates',
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                    // 调用模板引擎渲染分类的可选项
                const htmlStr = template('tpl-cates', res)
                $('[name=cate_id]').html(htmlStr)
                    // 通知layui重新渲染表单区域
                form.render()
            }
        })
    }

    // 为筛选表单绑定submit事件
    $('#form-search').on('submit', function(e) {
        e.preventDefault()
            // 获取表单中选中项的值
        const cate_id = $('[name=cate_id]').val()
        const state = $('[name=state]').val()
            // 为查询参数对象q对应的属性赋值
        q.cate_id = cate_id
        q.state = state
        initTable()
    })

    // 定义渲染分页的方法
    function renderPage(total) {
        // 调用laypage.render()方法来渲染分页的结构
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页发生切换的时候，触发jump回调
            jump: function(obj, first) {
                // 把最新的页码值复制到q查询对象中
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                    // 根据最新的q获取对应的数据列表
                if (!first) initTable()
            }
        })
    }

    // 通过代理的形式给删除按钮绑定点击事件删除
    $('tbody').on('click', '.btn-delete', function() {
        const len = $('.btn-delete').length
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: 'my/article/delete/' + $(this).attr('data-id'),
                success: function(res) {
                    if (res.status !== 0) return layer.msg(res.message)
                    layer.msg(res.message)
                        // 当数据删除完成后，需要判断当前这一页中，是否还有剩余的数据
                        // 如果没有剩余的数据了，则让页码值-1之后再重新调用initTable方法
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                    layer.close(index);
                }
            })
        });
    })
})