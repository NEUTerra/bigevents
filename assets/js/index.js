function getUserInfo() {
    $('.text-avatar, .img-avatar').hide();
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // 请求头 配置对象
        success: res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            const name = res.data.nickname || res.data.username;
            $('#welcome').html('欢迎&nbsp;' + name);
            if (res.data.user_pic) {
                $('.text-avatar').hide();
                $('.img-avatar').prop('src', res.data.user_pic).show();
            } else {
                $('.img-avatar').hide();
                $('.text-avatar').html(name[0].toUpperCase()).show();
            }
        },
        // error: res => {

        // },
        // 不管是成功或失败，在成功或失败之后一定会执行这个回调
        // complete: res => {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token');
        //         location.replace('/login.html');
        //     }
        // }
    });
}

function logout() {
    layer.confirm('确定退出登录？', {
        icon: 3,
        title: '提示'
    }, function (index) {
        localStorage.removeItem('token');
        location.href = '/login.html';
        // location.replace('/login.html');
        layer.close(index);
    });

}
$(function () {
    getUserInfo();
    $('#logout').on('click', logout);
});