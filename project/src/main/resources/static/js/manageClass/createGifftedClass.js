var giftedClassName;

// click button summit to create gifted class name
$("#submit").click(function (e) {
    giftedClassName = $('#giftedClassName').val().trim();
    if (giftedClassName == "") {
        $('.giftedClassName-err').text("Hãy nhập tên hệ chuyên !");
        return false;
    } else {
        var addGiftedClass = {
            giftedClassName: giftedClassName
        }
        e.preventDefault();
        $.ajax({
            url: '/api/admin/addgifftedclass',
            type: 'POST',
            data: JSON.stringify(addGiftedClass),
            beforeSend: function () {
                $('body').addClass("loading")
            },
            complete: function () {
                $('body').removeClass("loading")
            },
            success: function (data) {
                var messageCode = data.messageCode;
                var message = data.message;
                if (messageCode == 0) {
                    $("#createSuccess .modal-body").html("");
                    $("#createSuccess .modal-body").append(`
                        <img class="mb-3 mt-3" src="img/img-success.png"/>
                        <h5>Tạo hệ chuyên thành công!</h5>
                    `)
                    $('#createSuccess .modal-footer').html('');
                    $('#createSuccess .modal-footer').append(`
                        <a type="button" class="btn btn-customer" href="createClass">TẠO LỚP</a>
                        <a type="button" class="btn btn-primary" href="createGifftedClass">ĐÓNG</a>
                    `);
                    $('.giftedClassName-err').text("");
                } else {
                    $("#createSuccess .modal-body").html("");
                    $("#createSuccess .modal-body").append(`
                        <img class="mb-3 mt-3" src="img/img-error.png"/>
                        <h5>` + message + `</h5>
                    `);
                    $('#createSuccess .modal-footer').html('');
                    $('#createSuccess .modal-footer').append(`
                        <input type="button" class="btn btn-primary" data-dismiss="modal" value="ĐÓNG"/>
                    `);
                }
            },
            failure: function (errMsg) {
                $("#createSuccess .modal-body").html("");
                $("#createSuccess .modal-body").append(`
                    <img class="mb-3 mt-3" src="img/img-error.png"/>
                    <h5>` + errMsg + `</h5>
                `);
                $('#createSuccess .modal-footer').html('');
                $('#createSuccess .modal-footer').append(`
                    <input type="button" class="btn btn-primary" data-dismiss="modal" value="ĐÓNG"/>
                `);
            },
            dataType: "json",
            contentType: "application/json"
        });
    }
});

/*Check Role has create or not*/
if (localStorage.getItem('roleID') != 1) {
    $('.giftedClassName-err').text("Bạn không có quyền hệ chuyên!");
    $('#submit').prop('disabled', true);
}