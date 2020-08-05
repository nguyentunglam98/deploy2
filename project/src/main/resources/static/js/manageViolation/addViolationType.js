$("#submit").click(function (e) {
    var name = $('#description').val().trim();
    var totalGrade = $('#totalGrade').val().trim();

    if (name == "") {
        $('.addViolationType-err').text("Hãy nhập mô tả nội quy!");
        return false;
    } else if (totalGrade == "") {
        $('.addViolationType-err').text("Hãy nhập điểm cho nội quy!");
        return false;
    } else if (totalGrade <= 0) {
        $('.addViolationType-err').text("Hãy nhập điểm nội quy lớn hơn 0!");
        return false;
    }
    var model = {
        name: name,
        totalGrade: totalGrade
    };
    e.preventDefault();
    $.ajax({
        url: '/api/admin/addviolationtype',
        type: 'POST',
        data: JSON.stringify(model),
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
                $('#createSuccess').modal('show');
                $('#createSuccess .modal-body').html('');
                $('#createSuccess .modal-body').append(
                    `<img class="mb-3 mt-3" src="img/img-success.png"/>
                    <h5>Đã thêm nội quy thành công!</h5>
                `);
                $('.addViolationType-err').text("");
            } else {
                $('.addViolationType-err').text(message);
            }
        },
        failure: function (errMsg) {
            $('.addViolationType-err').text(errMsg);
        },
        dataType: "json",
        contentType: "application/json"
    });
});

if (localStorage.getItem('roleID') != 1) {
    $('.addViolationType-err').text('Bạn không có quyền thêm nội quy!');
    $('#submit').prop('disabled', true);
}