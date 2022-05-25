$(function() {
    const $image = $('#image')

    const options = {
        aspectRato: 1,
        preview: '.img-preview'
    }

    $image.cropper(options)

    $('#btnChooseImage').on('click', function() {
        $('#file').click()
    })

    // 为文件选择框绑定change事件
    $('#file').on('change', function(e) {
        // 获取用户选择的文件
        const fileList = e.target.files
        if (fileList.length === 0) return layer.msg('请选择照片')

        // 拿到用户选择的文件
        const file = e.target.files[0]
            // 根据选择的文件，创建一个对应的URL地址
        var newImgURL = URL.createObjectURL(file)
            // 先销毁旧的裁剪区域，重新设置图片路径，创建新的裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 为确定按钮绑定点击事件
    $('#btnUpload').on('click', function() {
        // 拿到用户裁剪的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 上传到服务器
        $.ajax({
            method: 'POST',
            url: 'my/update/avatar',
            data: {
                avatar: dataURL,
            },
            success: function(res) {

            }
        })
    })
})