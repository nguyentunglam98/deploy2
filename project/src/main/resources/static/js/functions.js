/*Value default*/
var roleID = localStorage.getItem("roleID");
var username = localStorage.getItem("username");
var pathname = $(location).attr('pathname');

/*Set navigation bar*/
$(document).ready(function () {
    var loginSuccess = localStorage.getItem("loginSuccess");
    if (loginSuccess == 0) {
        $("#loginSuccessMenu").addClass("show");
        $("#loginSuccessMenu .nav-link").html(username + `<i class="fa fa-caret-down"></i>`);
        $('#loginMenu').css('display', 'none');
        //ROLEID_ADMIN
        if (roleID == 1) {
            $("#adminMenu").addClass("show");
            $('#gradingToEmulationMenu').removeClass('hide');
            $('#createPostMenu').removeClass('hide');
        }
        //ROLEID_TIMETABLE_MANAGER
        if (roleID == 2) {
            $("#scheduleManagerMenu").addClass("show");
        }
        //ROLEID_REDSTAR
        if (roleID == 3) {
            $('#gradingToEmulationMenu').removeClass('hide');
        }
        //ROLEID_MONITOR
        if (roleID == 4) {
            $('#sendPostMenu').removeClass('hide');
        }
        //    ROLEID_SUMMERIZEGROUP
        if (roleID == 5) {
            $('#gradingToEmulationMenu').removeClass('hide');
        }
        //    ROLEID_CLUBLEADER
        if (roleID == 6) {
            $('#sendPostMenu').removeClass('hide');
        }
    } else {
        $('#loginMenu').css('display', 'block');
        $("#loginSuccessMenu").removeClass("show");
        $("#adminMenu").removeClass("show");
        $("#scheduleManagerMenu").removeClass("show");
    }
    $("#logout").click(function () {
        localStorage.clear();
    })

    $('#adminMenu').on('click', function () {
        $('.mega-menu.show').not($(this).find('.mega-menu')).removeClass('show');
        $('.dropdown-menu.show').removeClass('show');
        $('.nav-link .fa').not($(this).find('.fa')).removeClass('up');
        $(this).find('.mega-menu').toggleClass('show');
        $(this).find('.fa').toggleClass('up');
    })
    $('#loginSuccessMenu').click(function () {
        $('.mega-menu.show').removeClass('show');
        $('.dropdown-menu.show').not($(this).find('.dropdown-menu')).removeClass('show');
        $('.nav-link .fa').not($(this).find('.fa')).removeClass('up');
        $(this).find('.dropdown-menu').toggleClass('show');
        $(this).find('.fa').toggleClass('up');
    });

    // /*Menu responsive*/
    // if ($(document).width() < 992) {
    //     $('.nav-item.dropdown .nav-link').not($('#loginSuccessMenu .nav-link')).append('<i class="fa fa-caret-down"></i>');
    //     dropMenu();
    // } else {
    //     $('.nav-item.dropdown .nav-link').removeChild('i')
    // }

    /*Add active class on menu*/
    $('#navbarMenu li a').each(function () {
        var href = '/' + $(this).attr('href');
        if (href == '//') {
            href = '/';
        }
        if (href == pathname) {
            if (pathname == '/') {
                $('.homePage').addClass('active');
            } else {
                $('.homePage').removeClass('active');
                $(this).closest('.nav-item').find('.nav-link').addClass('active');
                $(this).addClass('active');
            }
        }
    })
});

function dropMenu() {
    var dropMenu = $('.dropdown-menu');
    dropMenu.click(function () {
        $('.mega-menu.show').removeClass('show');
        $('.dropdown-menu.show').not($(this).find('.dropdown-menu')).removeClass('show');
        $('.nav-link .fa').not($(this).find('.fa')).removeClass('up');
        $(this).find('.dropdown-menu').toggleClass('show');
        $(this).find('.fa').toggleClass('up');
    })
}

// /*Fixed header*/
// $(document).change(function () {
//     var divHeight = $('header .navbar').height();
//     $('header').css('height', divHeight + 'px');
// })

/*Loading page*/
$(document).on({
    ajaxStart: function () {
        $('body').addClass("loading");
    },
    ajaxComplete: function () {
        $('body').removeClass("loading");
    }
})

/*Select Checkbox*/
function selectCheckbox() {
    var checkbox = $('table tbody input[type="checkbox"]');
    $(checkbox).on('change', function (e) {
        row = $(this).closest('tr');
        if ($(this).is(':checked')) {
            row.addClass('selected');
            if (jQuery.inArray($(this).val(), list) == -1) {
                list.push($(this).val());
            }
        } else {
            row.removeClass('selected');
            var removeItem = $(this).val();
            list = $.grep(list, function (value) {
                return value != removeItem;
            });
        }
    });

    $("#selectAll").click(function () {
        var checkbox = $('table tbody input[type="checkbox"]');
        if (this.checked) {
            checkbox.each(function () {
                this.checked = true;
                $('tbody tr').addClass('selected');
                if (jQuery.inArray($(this).val(), list) == -1) {
                    list.push($(this).val());
                }
            });
        } else {
            checkbox.each(function () {
                this.checked = false;
                $('tbody tr').removeClass('selected');
                var removeItem = $(this).val();
                list = $.grep(list, function (value) {
                    return value != removeItem;
                });
            });
        }
    });
    checkbox.click(function () {
        if (!this.checked) {
            $("#selectAll").prop("checked", false);
        }
    });
}

/*Check user is selected or not*/
function isCheck(user) {
    if (list == null || list.length == 0) {
        return false;
    }
    for (var i = 0; i < list.length; i++) {
        if (list[i] == user) {
            return true;
        }
    }
    return false;
}

/*Pagination*/
function pagingClick() {
    $('.table-paging input').on('click', function (event) {
        $("#selectAll").prop("checked", false);
        var value = ($(this).val() - 1);
        if ($(this).val() == "Sau") {
            value = $('.table-paging__page_cur').val();
        } else if ($(this).val() == "Trước") {
            value = $('.table-paging__page_cur').val() - 2;
        }
        inforSearch.pageNumber = value;
        $('tbody').html("");
        $('.table-paging').html("");
        search();
    })
}

function paging(inforSearch, totalPages) {
    var pageNumber = parseInt(inforSearch.pageNumber)
    $('.table-paging').append(
        `<input type="button" class="table-paging__page btn-prev" id="prevPage" value="Trước"/>`
    );
    if (pageNumber < 4) {
        var newTotalPages = (totalPages <= 4) ? (totalPages) : (4);
        for (var i = 0; i < newTotalPages; i++) {
            if (i == pageNumber) {
                $('.table-paging').append(
                    `<input type="button" value="` + (i + 1) + `" class="table-paging__page table-paging__page_cur"/>`
                );
            } else {
                $('.table-paging').append(
                    `<input type="button" value="` + (i + 1) + `" class="table-paging__page"/>`
                );
            }
        }
        if (newTotalPages < totalPages) {
            $('.table-paging').append(
                `<input type="button" value="..." class="table-paging__page" disabled/>`
            );
        }
    } else {
        $('.table-paging').append(
            `<input type="button" value="` + (1) + `" class="table-paging__page"/>`
        );
        $('.table-paging').append(
            `<input type="button" value="` + (2) + `" class="table-paging__page"/>`
        );
        $('.table-paging').append(
            `<input type="button" value="..." class="table-paging__page" disabled/>`
        );
        var pageEnd = (pageNumber + 2 < totalPages) ? (pageNumber + 2) : (totalPages);
        for (var i = pageNumber - 1; i < pageEnd; i++) {
            if (i == pageNumber) {
                $('.table-paging').append(
                    `<input type="button" value="` + (i + 1) + `" class="table-paging__page table-paging__page_cur"/>`
                );
            } else {
                $('.table-paging').append(
                    `<input type="button" value="` + (i + 1) + `" class="table-paging__page"/>`
                );
            }
        }
        if (pageEnd < totalPages) {
            $('.table-paging').append(
                `<input type="button" value="..." class="table-paging__page" disabled/>`
            );
        }
    }
    $('.table-paging').append(
        `<input type="button" class="table-paging__page btn-next" id="nextPage" value="Sau"/>`
    );
    if (inforSearch.pageNumber == 0) {
        $('#prevPage').prop('disabled', true);
    } else {
        $('#prevPage').prop('disabled', false);
    }
    if ((inforSearch.pageNumber + 1) == totalPages) {
        $('#nextPage').prop('disabled', true);
    } else {
        $('#nextPage').prop('disabled', false);
    }

};

/*Convert string to form date*/
function convertDate(str, value) {
    str = str.split("-");
    str = str[2].concat(value + str[1] + value + str[0]);
    return str;
}

function toggleClick() {
    $(".panel-heading").on('click', function () {
        $(this).find(".fa-chevron-down").addClass("up");
    })
    $(".panel-heading.collapsed").on('click', function () {
        $(this).find(".fa-chevron-down").removeClass("up");
    })
}

/*Set limited date in year*/
function limitedDate() {
    var fromYear = $('#fromYear').val();
    $('#toYear').val(parseInt(fromYear) + 1);
    var toYear = $('#toYear').val();
    $('#fromDate').attr('min', fromYear + '-01-01');
    $('#fromDate').attr('max', fromYear + '-12-31');
    $('#toDate').attr('min', toYear + '-01-01');
    $('#toDate').attr('max', toYear + '-12-31');
}

/*Limited text*/
function limitedText(str) {
    str = $(str).text();
    if (str.length > 200) {
        str = str.substring(0, 200) + '...'
    }
    return str;
}

/*Lazy Load*/
function lazyLoad() {
    $("img.lazy").lazyload({
        effect: "fadeIn"
    });
}

/*Dialog message*/
function messageModal(modalName, img, message) {
    $('#' + modalName + ' .modal-body').html(`
        <img class="my-3" src="` + img + `"/>
        <h5>` + message + `</h5>
    `)
    $('#' + modalName).modal('show');
}

/*Clear session when leaving page*/
if (pathname != '/teacherInformation') {
    sessionStorage.removeItem('teacherId');
}
if (pathname != '/editClass') {
    sessionStorage.removeItem('classId');
}
if (pathname != '/editViolationType') {
    sessionStorage.removeItem('violationTypeID');
}
if (pathname != '/editViolation') {
    sessionStorage.removeItem('violationId');
}
if (pathname != '/editSchoolYear') {
    sessionStorage.removeItem('schoolYearId');
}
if (pathname != '/violationListOfClass') {
    sessionStorage.removeItem('classIdGrading');
    sessionStorage.removeItem('dateGrading');
}
if (pathname != '/rankByWeek') {
    sessionStorage.removeItem('weekName');
    sessionStorage.removeItem('weekId');
}
if (pathname != '/rankByMonth') {
    sessionStorage.removeItem('monthName');
}
if (pathname != '/rankBySemester') {
    sessionStorage.removeItem('semesterName');
}
if (pathname != '/rankByYear') {
    sessionStorage.removeItem('yearId');
}
if (pathname != '/postDetail') {
    sessionStorage.removeItem('newsletterId');
}
if (pathname != '/editPost') {
    sessionStorage.removeItem('newsletterIdEdit');
}

