$(function() {
        var layer = layui.layer
        getUserInfo()
            // 点击退出账号，返回至登陆页面
        $('#btnLogout').on('click', function() {
            var layer = layui.layer
                // 提示用户是否确定退出
            layer.confirm('确认退出?', { icon: 3, title: '提示' }, function(index) {
                localStorage.removeItem('token')
                location.href = '/login.html'
                layer.close(index)
            })
        })

    })
    // 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) return layer.msg('获取失败')
                // 获取成功后渲染用户图像信息
            renderAvatar(res.data)
        },
        complete: function(res) {
            // 禁止无正确token值调转至主页
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }
    })
}
// 封装渲染用户图像信息函数
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 判断用户是否有上传自己的图像，有则渲染出来并将文本图像隐藏，没有则隐藏图像显示文本头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
            // 获取用户名第一个字母
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}