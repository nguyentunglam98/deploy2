/*Valude default*/
var roleID = localStorage.getItem("roleID");
var username = localStorage.getItem("username");
var editor = CKEDITOR.replace('post-editor-text-content', {
    cloudServices_uploadUrl: 'https://73999.cke-cs.com/easyimage/upload/',
    cloudServices_tokenUrl: 'https://73999.cke-cs.com/token/dev/26d99879d9d20ba5d60497fc1556aa7f821ea78b8cc4c0df6f9f056e7b4e',
    width: '100%',
    height: 500,
    extraPlugins: 'easyimage',
});
// var editor = CKEDITOR.replace('post-editor-text-content', {
//     height: 500,
//     width: '100%',
// });
var imageCover = CKEDITOR.replace('imageCover', {
    cloudServices_uploadUrl: 'https://73999.cke-cs.com/easyimage/upload/',
    cloudServices_tokenUrl: 'https://73999.cke-cs.com/token/dev/26d99879d9d20ba5d60497fc1556aa7f821ea78b8cc4c0df6f9f056e7b4e',
    width: 250,
    height: 200,
    extraPlugins: 'easyimage',
    removePlugins: 'image',
    removeDialogTabs: 'link:advanced',
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
        } else if (!image.includes('src=')) {
            $('.createPost-err').text('Ảnh bìa của bài viết không đúng định dạng.');
            return false;
    } else if (data == "") {
        $('.createPost-err').text('Hãy nhập nội dung của bài viết.');
        return false;
    } else {
        image = image.split('src=')[1].split('"')[1];
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
            if (messageCode == 0) {
                $('#saveModal .modal-footer').html(`
                    <a href="postDetail?id=` + data.newsletterId + `" class="btn btn-danger" id="viewPost">XEM BÀI VIẾT</a>
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
    // var file = event.target.files[0];
    // var output = $('#imagePreview');
    // output.attr('src', URL.createObjectURL(file));
    // output.prop('alt', 'Ảnh bìa bài viết');
    // output.onload = function () {
    //     URL.revokeObjectURL(output.src);
    // }
    var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/hnm0yiigx/upload';
    var CLOUDINARY_UPLOAD_PRESET = 'mrpq6qtl';
    var file = event.target.files[0]
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    $.ajax({
        type: "POST",
        url: 'https://api.cloudinary.com/v1_1/hnm0yiigx/upload',
        data: formData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Headers": "Cache-Control, Content-Disposition, Content-MD5, Content-Range, Content-Type, DPR, Viewport-Width, X-CSRF-Token, X-Prototype-Version, X-Requested-With, X-Unique-Upload-Id",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            "Access-Control-Allow-Credentials": "true",
            "Server": "cloudinary",
            "X-Request-Id": "721ea13f46d4409d27bbe73f637c4943",
            "Access-Control-Allow-Origin": "https://api.cloudinary.com/v1_1/hnm0yiigx/upload",
            // 'Sec-Fetch-Mode': 'no-cors',
            // 'Sec-Fetch-Site': 'none'
        }, fetch: {
            mode: 'no-cors'
        },
        crossDomain: true,
        skipAuthorization: true,
        beforeSend: function () {
            $('body').addClass("loading")
        },
        complete: function () {
            $('body').removeClass("loading");
        },
        success: function (data) {
            $('#imagePreview').prop('src', data.url);
            $('#imagePreview').prop('alt', 'Ảnh bìa bài viết');
            console.log(data)
        },
        failure: function (errMsg) {
            messageModal('overrideSuccess', 'img/img-error.png', errMsg);
        },
        cache: false,
        contentType: false,
        processData: false,
    });
};
