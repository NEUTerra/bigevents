$(function () {
    const layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    const $image = $('#image');
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    $('#upload').on('click', function (e) {
        $('#file').click();
    })
    $('#file').on('change', function (e) {
        const url = URL.createObjectURL(e.target.files[0]);
        $image.cropper('destroy').prop('src', url).cropper(options);
    })
    $('#submit').on('click', function () {
        const base64URL = $image
            .cropper('getCroppedCanvas', {
                width: 100,
                height: 100
            })
            .toDataURL('image/png');
        $.ajax({
            type: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: base64URL
            },
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                if (window.parent) {
                    window.parent.getUserInfo();
                }
            }
        })
    })
});