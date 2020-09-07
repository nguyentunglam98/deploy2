$.ajax({
    type: 'POST',
    url: "/api/user/getAdminInfor",
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
            if (data.userList.content.length != 0) {
                $.each(data.userList.content, function (i, item) {
                    if (item.phone != null && item.phone.trim() != "") {
                        $('.user-info').append(`<p>` + item.name + ` - ` + validatePhone(item.phone) + `</p>`)
                    } else {
                        $('.user-info').append(`<p>` + item.name + `</p>`)
                    }
                })
            } else {
                $('.user-info').html(`<p>Chưa có thông tin liên hệ!</p>`)
            }
        } else {
            $('.user-info').html(`<p>` + message + `</p>`)
        }
    },
    failure: function (errMsg) {
        $('.user-info').html(`<p>` + errMsg + `</p>`)
    },
    dataType: "json",
    contentType: "application/json"
});
