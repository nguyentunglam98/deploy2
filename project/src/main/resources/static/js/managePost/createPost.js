/*Valude default*/
var roleID = localStorage.getItem("roleID");
var username = localStorage.getItem("username");
var editor = CKEDITOR.replace('post-editor-text-content', {
    cloudServices_uploadUrl: 'https://73438.cke-cs.com/easyimage/upload/',
    cloudServices_tokenUrl: 'https://73438.cke-cs.com/token/dev/de62f27633e0ccc284486ba070dbacf5b61e59390a805c23d58fc080b306',
    width: '100%',
    height: 500,
    extraPlugins: 'easyimage',
});
var imageCover = CKEDITOR.replace('imageCover', {
    cloudServices_uploadUrl: 'https://73438.cke-cs.com/easyimage/upload/',
    cloudServices_tokenUrl: 'https://73438.cke-cs.com/token/dev/de62f27633e0ccc284486ba070dbacf5b61e59390a805c23d58fc080b306',
    width: 250,
    height: 200,
    extraPlugins: 'easyimage',
    // extraPlugins: 'autogrow',
    removePlugins: 'image',
    removeDialogTabs: 'link:advanced',
    // autoGrow_minHeight: 50,
    // autoGrow_maxHeight: 600,
    // autoGrow_bottomSpace: 0,
    // removePlugins: 'resize',
    toolbar: [
        {
            name: 'insert',
            items: ['EasyImageUpload']
        }
    ],
});

if (roleID == 1) {
    $('.form-check').removeClass('hide');
}

/*Save button*/
$('#savePost').on('click', function () {
    var titleName = $('#titleName').val().trim();
    // var image = $('#imagePreview').attr('src');
    var image = imageCover.getData();
    var data = editor.getData();
    var gim;
    if ($('input[type="checkbox"]').prop("checked") == true) {
        gim = 1;
    } else {
        gim = 0;
    }
    if (titleName == "") {
        $('.createPost-err').text('Hãy nhập tiêu đề của bài viết.');
        return false;
    } else if (image.trim() == "") {
        $('.createPost-err').text('Hãy nhập ảnh bìa của bài viết.');
        return false;
    } else if (data == "") {
        $('.createPost-err').text('Hãy nhập nội dung của bài viết.');
        return false;
    } else {
        image = image.split('src=')[1].split('"')[1];
        console.log(image);
        var request = {
            username: username,
            header: titleName,
            headerImage: image,
            content: data,
            gim: gim,
            roleId: roleID,
        }
        if (gim == 1) {
            request.gim = 0;
            $('#saveModal .modal-footer').html(`
                    <input type="button" class="btn btn-danger" id="newGim" value="XÁC NHẬN">
                    <input type="button" class="btn btn-primary" id="closeBtn" data-dismiss="modal" value="ĐÓNG">
                `);
            messageModal('saveModal', 'img/img-question.png', 'Bạn có muốn <b>GHIM</b> bài viết này không?<h6>Bài viết được ghim trước đó sẽ bị bỏ ghim!</h6>');
            $('#newGim').on('click', function () {
                request.gim = 1;
                addNewPost(request);
            })
        } else {
            addNewPost(request);
        }
    }
})

function addNewPost(request) {
    console.log(JSON.stringify(request))
    $.ajax({
        url: "/api/newsletter/addnewsletter",
        type: "POST",
        data: JSON.stringify(request),
        beforeSend: function () {
            $('body').addClass("loading")
        },
        complete: function () {
            $('body').removeClass("loading")
        },
        success: function (data) {
            var messageCode = data.message.messageCode;
            var message = data.message.message;
            sessionStorage.setItem('newsletterId', data.newsletterId);
            if (messageCode == 0) {
                $('#saveModal .modal-footer').html(`
                    <a href="postDetail" class="btn btn-danger" id="viewPost">XEM BÀI VIẾT</a>
                    <a href="createPost" class="btn btn-primary">ĐÓNG</a>
                `)
                messageModal('saveModal', 'img/img-success.png', "Tạo bài viết thành công!");
            } else {
                messageModal('saveModal', 'img/img-error.png', message);
            }
        },
        failure: function (errMsg) {
            messageModal('saveModal', 'img/img-error.png', errMsg);
        },
        dataType: "json",
        contentType: "application/json"
    });
}

/*Upload image*/
var loadFile = function (event) {
    var form = $('#form-post');
    var formData = new FormData(form[0]);
    formData.append('ckCsrfToken', 'CKJl3IP2xVAP5q9s6O86yt3C6fCzO4ChvpHIaj53');

    $.ajax({
        type: "POST",
        url: "https://73438.cke-cs.com/easyimage/upload/",
        data: formData,
        async: false,
        headers: {
            authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjp7ImNvbGxhYm9yYXRpb24iOnsiKiI6eyJyb2xlIjoid3JpdGVyIn19fSwidXNlciI6eyJlbWFpbCI6InZlYXplbWVAZXhhbXBsZS5jb20iLCJuYW1lIjoiTHVyYSBXYWxrZXIifSwic3ViIjoiZGV2LXVzZXItQnBBb2NjQUU1aFZTVEVUYWJ2RjEiLCJpc0RldlRva2VuIjp0cnVlLCJ0aW1lc3RhbXAiOjE1OTYwMTAyMTc5NjcsInNpZ25hdHVyZSI6IjA5NDk3OWU4ODVkOWY5NzlhOWJmMDk0NDZmZjg2ZjBhYzIzYmZmMzhlNzdhNzRiYjQ4ZDM3OGYyNGU4YTY1YTUiLCJhdWQiOiJCcEFvY2NBRTVoVlNURVRhYnZGMSIsImp0aSI6ImluYkYtUnJySWU3eDkxc212dDdWSXBjZWh3X2xmNWdYIiwiaWF0IjoxNTk2MDEwMjE3fQ.teiHdZp-YsLlsGU0lTu5k3-sVFBFrv_Od8640h4g9Ic',
        },
        beforeSend: function () {
            $('body').addClass("loading")
        },
        complete: function (resp) {
            $('body').removeClass("loading");
            console.log(resp);
            // temp1[0].object["a"].authorization
        },
        success: function (data) {
            $('#imagePreview').prop('src', data.default);
            $('#imagePreview').prop('alt', 'Ảnh bìa bài viết');
            console.log(data.default);
        },
        failure: function (errMsg) {
            messageModal('overrideSuccess','img/img-error.png', errMsg);
        },
        cache: false,
        contentType: false,
        processData: false,
    });
};