$(function() {
    // 点击去注册账号
    $('#link_sign').on('click', function() {
            $('.login-box').hide()
            $('.sign-box').show()
        })
        // 点击去登录
    $('#link_login').on('click', function() {
            $('.login-box').show()
            $('.sign-box').hide()
        })
        // 自定义表单验证规则(通过layui指定验证规则，需要利用layui获取表单对象)
        // 1.获取form对象
    var form = layui.form
    var layer = layui.layer
        // 2.通过form.verify定义规则
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            // 验证密码
            repwd: function(value) {
                var pwd = $('.sign-box [name=password]').val()
                if (pwd !== value) return '两次密码不一致'
            }
        })
        // 表单提交时间监听

    $('#form-sign').on('submit', function(e) {
        e.preventDefault()
        var data = {
            username: $('#form-sign [name=username]').val(),
            password: $('#form-sign [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg('注册成功，去登录')
            $('#link_login').click()
        })
    })
    $('#form-login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            data: $(this).serialize(),
            method: 'POST',
            success: function(res) {
                if (res.status !== 0) return layer.msg('登陆失败')
                layer.msg('登录成功')
                    //    将token值保存至本地保持登录
                localStorage.setItem('token', res.token)
                    // 跳转至网站主页
                location.href = '/index.html'
            }
        })
    })




})