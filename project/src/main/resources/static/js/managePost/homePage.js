/*Slider Image*/
$('.slider').each(function () {
    var $this = $(this);
    var $group = $this.find('.slide_group');
    var $slides = $this.find('.slide');
    var bulletArray = [];
    var currentIndex = 0;
    var timeout;

    function move(newIndex) {
        var animateLeft, slideLeft;

        advance();

        if ($group.is(':animated') || currentIndex === newIndex) {
            return;
        }

        bulletArray[currentIndex].removeClass('active');
        bulletArray[newIndex].addClass('active');

        if (newIndex > currentIndex) {
            slideLeft = '100%';
            animateLeft = '-100%';
        } else {
            slideLeft = '-100%';
            animateLeft = '100%';
        }

        $slides.eq(newIndex).css({
            display: 'block',
            left: slideLeft
        });
        $group.animate({
            left: animateLeft
        }, function () {
            $slides.eq(currentIndex).css({
                display: 'none'
            });
            $slides.eq(newIndex).css({
                left: 0
            });
            $group.css({
                left: 0
            });
            currentIndex = newIndex;
        });
    }

    function advance() {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            if (currentIndex < ($slides.length - 1)) {
                move(currentIndex + 1);
            } else {
                move(0);
            }
        }, 4000);
    }

    $('.next_btn').on('click', function () {
        if (currentIndex < ($slides.length - 1)) {
            move(currentIndex + 1);
        } else {
            move(0);
        }
    });

    $('.previous_btn').on('click', function () {
        if (currentIndex !== 0) {
            move(currentIndex - 1);
        } else {
            move($slides.length - 1);
        }
    });

    $.each($slides, function (index) {
        var $button = $('<a class="slide_btn">&bull;</a>');

        if (index === currentIndex) {
            $button.addClass('active');
        }
        $button.on('click', function () {
            move(index);
        }).appendTo('.slide_buttons');
        bulletArray.push($button);
    });

    advance();
});

/*Load Homepage*/
$.ajax({
    url: "/api/newsletter/loadhomepage",
    type: "POST",
    data: JSON.stringify({pageNumber: 0}),
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
            if (data.listLetter != null) {
                var totalPages = data.listLetter.totalPages;
                if (totalPages > 1) {
                    $('.table-paging').removeClass('hide');
                    paging(inforSearch, totalPages);
                }
                var count = 0;
                $('.container-header .flex-wrap').html('')
                $('.container-paging .flex-wrap').html('');
                $('.homepage-message').text('');
                $('.container .content-wrap').removeClass('hide');
                if (data.listLetter.content.length != 0) {
                    $.each(data.listLetter.content, function (i, item) {
                        if (i == 0) {
                            $('.container-header .card-pin').html(`
                            <a href="postDetail" class="card" id="` + item.newsletterId + `">
                                <div class="img-post">
                                    <img class="lazy card-img-top" data-original="` + item.headerImage + `">
                                </div>
                                <div class="card-block">
                                    <h3 class="card-title">` + item.header + `</h3>
                                    <div class="card-date">` + item.createDate + `</div>
                                    <div class="card-text hide content-hide">` + item.content + `</div>
                                    <div class="card-text">` + limitedText(item.content) + `</div>
                                </div>
                            </a>
                        `);
                        } else {
                            count++;
                            if (count <= 4) {
                                $('.container-header .flex-wrap').append(`
                            <div class="post-gird col-md-6">
                                <a href="postDetail" class="card card-120" id="` + item.newsletterId + `">
                                    <div class="img-post">
                                    <img class="lazy card-img-top" data-original="` + item.headerImage + `">
                                    </div>
                                    <div class="card-block">
                                        <h3 class="card-title">` + item.header + `</h3>
                                        <div class="card-date">` + item.createDate + `</div>
                                    </div>
                                </a>
                            </div>
                        `);
                            } else {
                                $('.container-paging .flex-wrap').append(`
                            <div class="post-gird col-md-4">
                                <a href="postDetail" class="card card-200" id="` + item.newsletterId + `">
                                    <div class="img-post">
                                        <img class="lazy card-img-top" data-original="` + item.headerImage + `">
                                    </div>
                                    <div class="card-block">
                                        <h3 class="card-title">` + item.header + `</h3>
                                        <div class="card-date">` + item.createDate + `</div>
                                    </div>
                                </a>
                            </div>
                            `);
                            }
                        }
                    });
                    pagingClick();
                    getNewsletterId();
                    lazyLoad();
                } else {
                    $('.homepage-message').text('Danh sách bài viết trống.');
                    $('.container .content-wrap').addClass('hide');
                    $('.table-paging').addClass('hide');
                }
            } else {
                $('.homepage-message').text('Danh sách bài viết trống.');
                $('.container .content-wrap').addClass('hide');
                $('.table-paging').addClass('hide');
            }
        } else {
            $('.container .content-wrap').addClass('hide');
            $('.table-paging').addClass('hide');
            $('.homepage-message').text(message);
        }
    },
    failure: function (errMsg) {
        $('.container .content-wrap').addClass('hide');
        $('.table-paging').addClass('hide');
        $('.homepage-message').text(errMsg);
    },
    dataType: "json",
    contentType: "application/json"
});

var inforSearch = {
    header: "",
    pageNumber: 0
}

$('#searchLetter').keypress(function (e) {
    if (e.which == 13) {
        search();
        return false;
    }
});

/*Search*/
function search() {
    inforSearch.header = $('#searchLetter').val();
    console.log(JSON.stringify(inforSearch));
    $.ajax({
        url: "/api/newsletter/searchletter",
        type: "POST",
        data: JSON.stringify(inforSearch),
        beforeSend: function () {
            $('body').addClass("loading")
        },
        complete: function () {
            $('body').removeClass("loading")
        },
        success: function (data) {
            var messageCode = data.message.messageCode;
            var message = data.message.message;
            $('.table-paging').html('')
            if (messageCode == 0) {
                if (data.listLetter != null) {
                    var totalPages = data.listLetter.totalPages;
                    if (totalPages > 1) {
                        $('.table-paging').removeClass('hide');
                        paging(inforSearch, totalPages);
                    }
                    var count = 0;
                    $('.container-header .flex-wrap').html('')
                    $('.container-paging .flex-wrap').html('');
                    $('.homepage-message').text('');
                    $('.container .content-wrap').removeClass('hide');
                    if (data.listLetter.content.length != 0) {
                        $.each(data.listLetter.content, function (i, item) {
                            if (i == 0) {
                                $('.container-header .card-pin').html(`
                            <a href="postDetail" class="card" id="` + item.newsletterId + `">
                                <div class="img-post">
                                    <img class="lazy card-img-top" data-original="` + item.headerImage + `">
                                </div>
                                <div class="card-block">
                                    <h3 class="card-title">` + item.header + `</h3>
                                    <div class="card-date">` + item.createDate + `</div>
                                    <div class="card-text">` + limitedText(item.content) + `</div>
                                </div>
                            </a>
                        `);
                            } else {
                                count++;
                                if (count <= 4) {
                                    $('.container-header .flex-wrap').append(`
                            <div class="post-gird col-md-6">
                                <a href="postDetail" class="card card-120" id="` + item.newsletterId + `">
                                    <div class="img-post">
                                    <img class="lazy card-img-top" data-original="` + item.headerImage + `">
                                    </div>
                                    <div class="card-block">
                                        <h3 class="card-title">` + item.header + `</h3>
                                        <div class="card-date">` + item.createDate + `</div>
                                    </div>
                                </a>
                            </div>
                        `);
                                } else {
                                    $('.container-paging .flex-wrap').append(`
                            <div class="post-gird col-md-4">
                                <a href="postDetail" class="card card-200" id="` + item.newsletterId + `">
                                    <div class="img-post">
                                        <img class="lazy card-img-top" data-original="` + item.headerImage + `">
                                    </div>
                                    <div class="card-block">
                                        <h3 class="card-title">` + item.header + `</h3>
                                        <div class="card-date">` + item.createDate + `</div>
                                    </div>
                                </a>
                            </div>
                            `);
                                }
                            }
                        });
                        pagingClick();
                        getNewsletterId();
                        lazyLoad();
                    } else {
                        $('.homepage-message').text('Danh sách bài viết trống.');
                        $('.container .content-wrap').addClass('hide');
                        $('.table-paging').addClass('hide');
                    }
                } else {
                    $('.homepage-message').text('Danh sách bài viết trống.');
                    $('.container .content-wrap').addClass('hide');
                    $('.table-paging').addClass('hide');
                }
            } else {
                $('.container .content-wrap').addClass('hide');
                $('.table-paging').addClass('hide');
                $('.homepage-message').text(message);
            }
        },
        failure: function (errMsg) {
            $('.container .content-wrap').addClass('hide');
            $('.table-paging').addClass('hide');
            $('.homepage-message').text(errMsg);
        },
        dataType: "json",
        contentType: "application/json"
    });
}

/*Get newsletterId */
function getNewsletterId() {
    var newsletterId = $('.card');
    $(newsletterId).on('click', function (e) {
        newsletterId = $(this).prop('id');
        console.log(newsletterId)
        sessionStorage.setItem("newsletterId", newsletterId);
    });
}

lazyLoad();