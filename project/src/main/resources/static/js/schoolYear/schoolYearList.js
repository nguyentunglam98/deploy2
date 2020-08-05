var schoolYearId;

$.ajax({
    url: '/api/admin/schoolyearlist',
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
            if (data.schoolYearList != null) {
                var id = 0;
                $('tbody').html("");
                $.each(data.schoolYearList, function (i, item) {
                    var fromDate, toDate, yearName;
                    schoolYearId = item.schoolYearId;
                    id += 1;
                    if (item.fromDate == null) {
                        fromDate = "-";
                    } else {
                        fromDate = convertDate(item.fromDate,'-');
                    }
                    if (item.toDate == null) {
                        toDate = "-";
                    } else {
                        toDate = convertDate(item.toDate,'-');
                    }
                    if (item.yearName == null) {
                        yearName = "-";
                    } else {
                        yearName = item.yearName;
                    }

                    $('tbody').append(
                        `<tr>
                            <td><span>` + id + `</span></td>
                            <td><span id="yearName">` + yearName + `</span></td>
                            <td><span id="fromDate">` + fromDate + `</span></td>
                            <td><span id="toDate">` + toDate + `</span></td>
                            <td><span id="action">
                                <a href="editSchoolYear" title="Sửa" class="mx-2 btnEdit" name="` + schoolYearId + `">
                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                </a>
                                <a href="#deleteModal" title="Xóa" class="mx-2 btnDelete" name="` + schoolYearId + `" data-toggle="modal">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                </a>
                            </span></td>
                        </tr>
                    `);
                });
                $('#tableSchoolYear').DataTable({
                    lengthMenu: [30],
                    bLengthChange: false,
                    bFilter: false,
                    bInfo: false,
                    paging: false,
                });
                getSchoolYearId();
                deleteYear();
                manageBtn();
            }
        } else {
            $('tbody').html("");
            $('tbody').append(
                `<tr>
                    <td colspan="5" class="userlist-result">` + message + `</td>
                </tr>`
            )
        }
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

/*Get schoolYear ID*/
function getSchoolYearId() {
    var btnEdit = $('.btnEdit');
    $(btnEdit).on('click', function (e) {
        schoolYearId = $(this).prop('name');
        sessionStorage.setItem('schoolYearId', schoolYearId);
    });
}

/*Delete School Year*/
function deleteYear() {
    var btnDelete = $('.btnDelete');
    $(btnDelete).on('click', function (e) {
        schoolYearId = $(this).prop('name');
        console.log(schoolYearId);
    });
    $('#deleteModal .modal-body').html('');
    $('#deleteModal .modal-body').append(`
        <img class="mb-3 mt-3" src="img/img-question.png"/>
        <h5>Bạn có muốn <b>XÓA</b> năm học này không?</h5>
    `);

    $('#btnDeleteModal').on('click', function () {
        var schoolYear = {
            schoolYearId: schoolYearId
        }
        console.log(JSON.stringify(schoolYear))
        $.ajax({
            url: '/api/admin/delschoolyear',
            type: 'POST',
            data: JSON.stringify(schoolYear),
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
                    $("#deleteSuccess .modal-body").html("");
                    $('#deleteSuccess .modal-body').append(`
                    <img class="mb-3 mt-3" src="img/img-success.png"/>
                    <h5 id="message-delete">Xóa năm học thành công!</h5>
                `);
                } else {
                    $("#deleteSuccess .modal-body").html("");
                    $('#deleteSuccess .modal-body').append(`
                    <img class="mb-3 mt-3" src="img/img-error.png"/>
                    <h5>` + message + `</h5>
                `);
                }
            },
            failure: function (errMsg) {
                $("#deleteSuccess .modal-body").html("");
                $('#deleteSuccess .modal-body').append(`
                    <img class="mb-3 mt-3" src="img/img-success.png"/>
                    <h5>` + errMsg + `</h5>
            `);
            },
            dataType: "json",
            contentType: "application/json"
        });
    })
}

function manageBtn() {
    if (localStorage.getItem('roleID') != 1) {
        $('.manageBtn').addClass('hide');
        $('thead th:last-child').addClass('hide');
        $('tbody tr td:last-child').addClass('hide');
        $('.table-title').addClass('pb-4');
    }
}



