$(function () {
    // 1.获取要裁剪的图片
    const $image = $('#image')
    // 2.初始化裁剪区域 cropper()
    $image.cropper({
        // 指定的长宽比
        aspectRatio: 1,
        // 裁剪事件
        crop: function (event) {
            // 裁剪区的坐标位置
            // console.log(event.detail.x);
            // console.log(event.detail.y);
        },
        // 指定预览区,提供元素选择器
        preview: '.img-preview'
    })
    // 3.点击后上传图片
    $('#upload-btn').click(function () {
        // 3.1手动触发文件框的点击事件
        $('#file').click()
    })
    // 4.监听文件框状态改变事件 change :file ,checkbox,select
    $('#file').change(function () {
        // 4.1获取用户上传的文件列表
        console.log(this.files);//伪数组
        // 判断用户是否上传
        if (this.files.length == 0) {
            return
        }

        // 4.2把文件转成url地址的形式
        const imgUrl = URL.createObjectURL(this.files[0])
        console.log(imgUrl);

        // 4.3替换裁剪区的图片
        $image.cropper('replace', imgUrl)
        // // 或者使用下面的方法，先销毁再替换图片，最后重新初始化
        // $image.cropper('destroy').pro('src', imgUrl).cropper({
        //     // 指定的长宽比
        //     aspectRatio: 1,
        //     // 指定预览区,提供元素选择器
        //     preview: '.img-preview'
        // })
    })
    // 5.点击确定，上传图片到服务器
    $('#save-btn').click(function () {
        // 5.1获取裁剪后图片的base64格式
        const dataUrl = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        }).toDataURL('image/png')
        console.log(dataUrl);
        // 5.2手动构建查询参数
        const search = new URLSearchParams()
        // 使用 append() 方法天剑一条参数
        search.append('avatar', dataUrl)
        // 5.3发送请求，提交到服务器
        axios.post('/my/update/avatar', search).then(res => {
            console.log(res);
            // 5.4判断失败
            if (res.status !== 0) {
                return layer.msg('上传失败！')
            }
            // 提示
            layer.msg('上传成功')
            // 5.5更新页面并更新头像
            window.parent.getUserInfo()
        })
    })
})