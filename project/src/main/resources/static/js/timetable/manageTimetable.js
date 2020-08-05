var date;
$('#date-input').val(moment().format('YYYY-MM-DD'));

$('#submit').on('click', function () {
    date = $('#date-input').val();
    var form = $('#inputFile')[0].files[0];
    console.log(form);
    console.log(date);
    if (date.trim() == "") {
        $('.input-err').text("Hãy điền ngày áp dụng.");
        return false;
    } else if (form == undefined) {
        $('.input-err').text("Hãy chọn tệp gửi lên.");
        return false;
    } else {
        return true;
    }
});

$("#timetableform").submit(function (e) {
    //gửi date lên, nếu messagecode =0 hoạc confirm có thì gửi data lên
    e.preventDefault(); // avoid to execute the actual submit of the form.
    var input = {
        date: date,
    }
    $.ajax({
        url: '/api/timetable/checkDate',
        type: 'POST',
        data: JSON.stringify(input),
        success: function (data) {
            console.log(data);
            if (data.messageCode == 0) {
                $('.input-err').text("");
                update();
            } else if (data.messageCode == 1) {
                //chỗ này hiện dialog lỗi
                dialogErr('#overrideTimetableModal', data.message);
            } else if (data.messageCode == 2) {
                //gọi dialog confirm có muốn ghi đè không nếu có thì gọi update();
                $('#overrideTimetableModal').modal('show');
                $('#overrideTimetableModal .modal-body').html('');
                $('#overrideTimetableModal .modal-body').append(`
                    <img class="mb-3 mt-3" src="https://img.icons8.com/flat_round/100/000000/error--v1.png"/>
                    <h5>Ngày áp dụng của Thời khóa biểu đã tồn tại.</h5>
                    <h6>Thời khóa biểu này sẽ bị ghi đè lên thời khóa biểu trước đó.</h6>
                    <h5>Bạn có muốn ghi đè không?</h5>
                `);
                $('#overrideTimetableModal .modal-footer').html('');
                $('#overrideTimetableModal .modal-footer').append(`
                    <input type="button" class="btn btn-danger" data-dismiss="modal" id="overrideTimetable" value="CÓ">
                    <input type="button" class="btn btn-primary" data-dismiss="modal" value="KHÔNG">
                `);
                overrideTimetable();
            } else {
                dialogErr('#overrideTimetableModal', data.message);
            }
        },
        failure: function (errMsg) {
            dialogErr('#overrideTimetableModal', errMsg);
        },
        dataType: 'JSON',
        contentType: "application/json"
    });
});

function overrideTimetable() {
    $('#overrideTimetable').click(function () {
        $('.input-err').text("");
        $('body').addClass("loading");
        setTimeout(update, 1000);
    })
}

function update() {
    var form = $('#timetableform');
    var formData = new FormData(form[0]);
    $.ajax({
        type: "POST",
        //url: "manageTimetable",
        url: "/api/timetable/update",
        data: formData,//form.serialize(), // serializes the form's elements.
        async: false,
        success: function (data) {
            if (data.messageCode == 0) {
                $('#overrideSuccess').modal('show');
                $('#overrideSuccess .modal-body').html('');
                $('#overrideSuccess .modal-body').append(`
                    <img class="mb-3 mt-3" src="https://img.icons8.com/material/100/007bff/ok--v1.png"/>
                    <h5>Thay đổi Thời khóa biểu thành công!</h5>
                `);
                $('#overrideSuccess .modal-footer').html('');
                $('#overrideSuccess .modal-footer').append(`
                    <a type="button" class="btn btn-primary" href="manageTimetable">ĐÓNG</a>
                `);
            } else {
                dialogErr('#overrideSuccess', data.message);
            }
        },
        failure: function (errMsg) {
            dialogErr('#overrideSuccess', errMsg);
        },
        cache: false,
        contentType: false,
        processData: false,
    });
}

function dialogErr(model, mess) {
    var modalBody = model + " .modal-body";
    var modalFooter = model + " .modal-footer";
    $(model).modal('show');
    $(modalBody).html('');
    $(modalBody).append(`
        <img class="mb-3 mt-3" src="img/img-error.png"/>
        <h5>` + mess + `</h5>
    `);
    $(modalFooter).html('');
    $(modalFooter).append(`
        <input type="button" class="btn btn-primary" data-dismiss="modal" value="ĐÓNG">
    `);
}

if (localStorage.getItem('roleID') != 1 && localStorage.getItem('roleID') != 2) {
    $('.input-err').text('Bạn không có quyền thêm thời khóa biểu!');
    $('#submit').prop('disabled', true);
}