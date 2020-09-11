const form = layui.form,
    layer = layui.layer;

let userInfo;

function initUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: res => {
            if (res.status !== 0) {
                return layer.msg('获取信息失败！');
            }
            userInfo = res.data;
            form.val('editinfo', res.data)
        }
    })
}

$(function () {
    initUserInfo();
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        form.val('editinfo', userInfo)
    })
    form.verify({
        nickname: value => {
            if (value.length > 6)
                return '必须在1-6个字符之间';
        }
    });
    form.on('submit(editinfo)', data => {
        console.log(data.field);
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: {
                id: data.field.id,
                nickname: data.field.nickname,
                email: data.field.email
            },
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message)
                window.parent.getUserInfo();
            }
        })
        return false;
    });
})