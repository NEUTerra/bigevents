const layer = layui.layer,
    form = layui.form;
$(function () {
    function renderCates() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                res.data.forEach(item => {
                    $('select[name=cate_id]').append(`
                        <option value="${item.Id}">${item.name}</option>
                    `)
                });
                form.render();
            }
        })
    }
    renderCates();
    initEditor();
    var $image = $('#image')
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    $image.cropper(options);
    $('#changeCover').on('click', function () {
        $('#coversrc').trigger('click');
    });
    $('#coversrc').on('change', function (e) {
        const files = e.target.files;
        if (files.length === 0) {
            return;
        }
        var newImgURL = URL.createObjectURL(files[0])
        $image.cropper('destroy')
            .prop('src', newImgURL)
            .cropper(options);
    });
    form.on('submit', data => {
        const fd = new FormData(data.form);
        if (data.elem.id === 'draft') {
            fd.append('state', '草稿');
        } else {
            fd.append('state', '已发布');
        }
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                fd.append('cover_img', blob)
                $.ajax({
                    type: 'post',
                    url: '/my/article/add',
                    contentType: false,
                    processData: false,
                    data: fd,
                    success: res => {
                        if (res.status !== 0) {
                            return layer.msg(res.message);
                        }
                        layer.msg('发布文章成功！');
                        location.href = '/article/articlelist.html';
                    }
                })
            })
        return false;
    });
})