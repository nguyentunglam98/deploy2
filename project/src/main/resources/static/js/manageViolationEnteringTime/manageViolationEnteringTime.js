var list = [];

$.ajax({
    url: '/api/admin/viewenteringtime',
    type: 'POST',
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
            if (data.listEmteringTime != null) {
                $('tbody').html("");
                $.each(data.listEmteringTime, function (i, item) {
                    var violationEnteringTimeId, roleName, dayName, startTime, endTime;
                    if (item.violationEnteringTimeId == null) {
                        violationEnteringTimeId = "-";
                    } else {
                        violationEnteringTimeId = item.violationEnteringTimeId;
                    }
                    if (item.roleName == null) {
                        roleName = "-";
                    } else {
                        roleName = item.roleName;
                    }
                    if (item.dayName == null) {
                        dayName = "-";
                    } else {
                        dayName = item.dayName;
                    }
                    if (item.startTime == null) {
                        startTime = "-";
                    } else {
                        startTime = item.startTime;
                    }
                    if (item.endTime == null) {
                        endTime = "-";
                    } else {
                        endTime = item.endTime;
                    }

                    $('tbody').append(
                        `<tr>
                            <td>
                                <span class="custom-checkbox">
                                    <input type="checkbox" name="options" value="` + violationEnteringTimeId + `">
                                    <label></label>
                                </span>
                            </td>
                            <td><span>` + roleName + `</span></td>
                            <td><span>` + dayName + `</span></td>
                            <td><span>` + startTime + `</span></td>
                            <td><span>` + endTime + `</span></td>
                        </tr>
                    `);
                });
            }
        } else {
            $('tbody').html("");
            $('tbody').append(
                `<tr>
                    <td colspan="5" class="userlist-result">` + message + `</td>
                </tr>`
            )
        }
        selectCheckbox();
        manageBtn();
    },
    failure: function (errMsg) {
        $('tbody').html("");
        $('tbody').append(
            `<tr>
                <td colspan="5" class="userlist-result">` + errMsg + ` </td>
            </tr>`
        )
    },
    dataType: "json",
    contentType: "application/json"
});

/*Check select*/
function checkSelect() {
    if (list.length == 0) {
        $("#deleteModal .modal-body").html("");
        $('#deleteModal .modal-body').append(`
            <img class="mb-3 mt-3" src="img/img-error.png"/>
            <h5>Hãy chọn thời gian mà bạn muốn xóa!</h5>
        `);
        $('#deleteModal .modal-footer .btn-danger').addClass('hide');
        $('#deleteModal .modal-footer .btn-primary').attr('value', 'ĐÓNG');
    } else {
        $("#deleteModal .modal-body").html("");
        $('#deleteModal .modal-body').append(`
            <img class="mb-3 mt-3" src="img/img-question.png"/>
            <h5>Bạn có muốn <b>XÓA</b> thời gian chấm này không?</h5>
        `);
        $('#deleteModal .modal-footer .btn-danger').removeClass('hide');
        $('#deleteModal .modal-footer .btn-primary').attr('value', 'KHÔNG');
    }
}

/*Delete School Year*/
$('#deleteTime').on('click', function () {
    console.log(list)
    listEnteringTime = {
        listEnteringTime: list,
    }
    console.log(JSON.stringify(listEnteringTime))
    $.ajax({
        url: '/api/admin/deleteenteringtime',
        type: 'POST',
        data: JSON.stringify(listEnteringTime),
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
                $('#deleteSuccess .modal-body').html('');
                $('#deleteSuccess .modal-body').append(`
                    <img class="mb-3 mt-3" src="img/img-success.png"/>
                    <h5>Xóa thời gian chấm thành công!</h5>
                `);
            } else {
                $('#deleteSuccess .modal-body').html('');
                $('#deleteSuccess .modal-body').append(`
                    <img class="mb-3 mt-3" src="img/img-error.png"/>
                    <h5>` + message + `</h5>
                `);
            }
        },
        failure: function (errMsg) {
            $('#deleteSuccess .modal-body').html('');
            $('#deleteSuccess .modal-body').append(`
                    <img class="mb-3 mt-3" src="img/img-error.png"/>
                    <h5>` + errMsg + `</h5>
                `);
        },
        dataType: "json",
        contentType: "application/json"
    });
});

/*Show or hide button manage*/
function manageBtn() {
    if (localStorage.getItem('roleID') != 1) {
        $('.manageBtn').addClass('hide');
        $('table > thead > tr > th:first-child').addClass('hide');
        $('tbody > tr > td:first-child').addClass('hide');
        $('.table-title').addClass('pb-3');
    }
}