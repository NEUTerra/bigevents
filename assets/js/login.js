$(function () {
    const form = layui.form,
        layer = layui.layer;

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            const pwd = $('.reg-box input[name="password"]').val();
            if (pwd !== value) {
                return '两次输入密码不一致！';
            }
        }
    });

    form.on('submit(register)', function (data) {
        // delete data.field.repassword;
        console.log(data.field);
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: data.field.username,
                password: data.field.password
            },
            success: res => {
                if (res.status !== 0) {
                    // return console.log(res.message);
                    return layer.msg(res.message)
                }
                layer.msg('注册成功！请登录');
                $('#link_login').click();
            }
        });
        return false;
    });

    form.on('submit(login)', function (data) {
        console.log(data.field);
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: data.field,
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                console.log(res.token);
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
        return false;
    })

    $('#link_login').click(function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    $('#link_register').click(function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
})