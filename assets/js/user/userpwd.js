const form = layui.form,
    layer = layui.layer;

$(function () {
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        newpwd: function (value) {
            const pwd = $('input[name="oldPwd"]').val();
            if (pwd === value) {
                return '原密码和新密码不能相同';
            }
        },
        repwd: function (value) {
            const pwd = $('input[name="newPwd"]').val();
            if (pwd !== value) {
                return '两次输入密码不一致！';
            }
        }
    });
    form.on('submit(editpwd)', data => {
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: data.field,
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message)
                form.val('editpwd', {
                    oldPwd: '',
                    newPwd: '',
                    repwd: ''
                });
            }
        });
        return false;
    })
})