var roleId = localStorage.getItem("roleID");
var oldFullName, oldPhone, oldEmail;

$(document).ready(function () {
    var account = {
        userName: localStorage.getItem("username")
    }
    if (roleId == 3 || roleId == 4) {
        $("#editInfo").addClass('hide');
        $("#fullNameDiv").addClass('hide');
        $("#phoneDiv").addClass('hide');
        $("#emailDiv").addClass('hide');
    }
    if (roleId != 3 && roleId != 4) {
        $('#classDiv').addClass('hide');
    }
    $.ajax({
        url: '/api/user/viewinformation',
        type: 'POST',
        data: JSON.stringify(account),
        beforeSend: function () {
            $('body').addClass("loading")
        },
        complete: function () {
            $('body').removeClass("loading")
        },
        success: function (data) {
            $('#fullName').attr('value', data.fullName);
            $('#username').attr('value', data.userName);
            $('#phone').attr('value', data.phone);
            $('#email').attr('value', data.email);
            $('#className').attr('value', data.className);
            $('#roleName').attr('value', data.roleName);
            oldFullName = $('#fullName').val();
            oldPhone = $('#phone').val();
            oldEmail = $('#email').val();
        },
        failure: function (errMsg) {
            $('.userInfo-err').text(errMsg);
        },
        dataType: "json",
        contentType: "application/json"
    });
});

$("#editInfo").click(function () {
    if (roleId != 3 && roleId != 4) {
        $('#fullName').prop('disabled', false);
        $('#phone').prop('disabled', false);
        $('#email').prop('disabled', false);
    }
    $('#editInfo').attr('value', 'XONG');

    $("#editInfo").click(function () {
        $('#editInfo').attr('data-target', '#editInfoSuccess');
        $('#editInfoSuccess').addClass('fade');
        var emailRegex = '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$';
        var phoneRegex = '^[0-9\\-\\+]{9,15}$';
        var fullName = $('#fullName').val().trim();
        var phone = $('#phone').val().trim();
        var email = $('#email').val().trim();
        if (fullName == oldFullName && phone == oldPhone && email == oldEmail) {
            $('.userInfo-err').text("Hãy thay đổi thông tin.");
            return false;
        } else if (phone != "" && !phone.match(phoneRegex)) {
            $('.userInfo-err').text("SĐT không đúng định dạng.");
            return false;
        } else if (email != "" && !email.match(emailRegex)) {
            $('.userInfo-err').text("Email không đúng định dạng.");
            return false;
        } else {
            $('.userInfo-err').text("");
            $('#fullName').prop('disabled', true);
            $('#phone').prop('disabled', true);
            $('#email').prop('disabled', true);
            var info = {
                userName: localStorage.getItem("username"),
                fullName: fullName,
                phone: phone,
                email: email
            }
            $.ajax({
                url: '/api/user/editinformation',
                type: 'POST',
                data: JSON.stringify(info),
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
                        $('.modal-body').html('');
                        $('.modal-body').append(`
                            <img class="mb-3 mt-3" src="https://img.icons8.com/material/100/007bff/ok--v1.png"/>
                            <h5>Thông tin sửa thành công!</h5>
                        `);
                    } else {
                        $('.modal-body').html('');
                        $('.modal-body').append(`
                            <img class="mb-3 mt-3" src="https://img.icons8.com/flat_round/100/000000/error--v1.png"/>
                            <h5>` + message + `</h5>
                        `);
                    }
                },
                failure: function (errMsg) {
                    $('.modal-body').html('');
                    $('.modal-body').append(`
                        <img class="mb-3 mt-3" src="https://img.icons8.com/flat_round/100/000000/error--v1.png"/>
                        <h5>` + errMsg + `</h5>
                    `);
                },
                dataType: "json",
                contentType: "application/json"
            });
        }
    });
});

/*Check Role has create or not*/
if (roleId == null) {
    $('.userInfo-err').append(`Hãy <a href="login">ĐĂNG NHẬP</a> để có thể sửa thông tin!`);
    $('#editInfo').prop('disabled', true);
}