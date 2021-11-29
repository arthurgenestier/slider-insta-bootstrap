// jQuery Ajax for feed Instagram Graph API
if ($('#instagram-feed1').length != 0) {

    var token = 'IGQVJWbWZAJWlJiQXN6Q2REWWZAuYmJZAS0tzc2M2ck1tenZAkYk1vVXZAUSV92Ny13OUFVMlZASRXM5RG9SREFRRDVxZA3h3ZAmZASaDNaSE1YdXZAqUEtoemZAOc3AzYXNuRGVGV0llQml6dk5FQ1ZACaUZApQTFlTgZDZD';
    var fields = 'id,media_type,media_url,thumbnail_url,timestamp,permalink,caption';
    var limit = 50; // Set a number of display items

    $.ajax({
        url: 'https://graph.instagram.com/me/media?fields=' + fields + '&access_token=' + token + '&limit=' + limit,
        type: 'GET',
        success: function (response) {
            var index = 0;
            for (var x in response.data) {
                var link = response.data[x]['permalink'],
                    caption = response.data[x]['caption'],
                    image = response.data[x]['media_url'],
                    image_video = response.data[x]['thumbnail_url'],
                    html = '';

                /*if (response.data[x]['media_type'] == 'VIDEO') {
                    html += '<div class="instagram_new">';
                    html += '<a class="insta-link" href="' + link + '" rel="noopener" target="_blank">';
                    html += '<img src="' + image_video + '" loading="lazy" alt="' + caption + '" class="insta-image" />';
                    html += '</a>';
                    html += '</div>';
                }
                */

                html += '<div class="carousel-item col-md-3';
                if (index == 0) html += ' active';
                html += '">';
                html += '<a class="insta-link" href="' + link + '" rel="noopener" target="_blank">';
                if (response.data[x]['media_type'] == 'VIDEO') {
                    html += '<img src="' + image_video + '" loading="lazy" alt="' + caption + '" class="img-fluid mx-auto d-block" style="max-height: 15rem;"/>';
                }
                else {
                    html += '<img src="' + image + '" loading="lazy" alt="' + caption + '" class="img-fluid mx-auto d-block" style="max-height: 15rem;"/>';
                }
                html += '</a>';
                html += '</div>';

                index++;


                $('#instagram-feed1').append(html);
                $('#carouselExampleSlidesOnly').carousel();

                $('#carouselExampleSlidesOnly').on('slide.bs.carousel', function (e) {


                    var $e = $(e.relatedTarget);
                    var idx = $e.index();
                    var itemsPerSlide = 4;
                    var totalItems = $('.carousel-item').length;

                    if (idx >= totalItems - (itemsPerSlide - 1)) {
                        var it = itemsPerSlide - (totalItems - idx);
                        for (var i = 0; i < it; i++) {
                            // append slides to end
                            if (e.direction == "left") {
                                $('.carousel-item').eq(i).appendTo('.carousel-inner');
                            }
                            else {
                                $('.carousel-item').eq(0).appendTo('.carousel-inner');
                            }
                        }
                    }
                });
            }
        },
        error: function (data) {
            var html = '<div class="class-no-data">No Images Found</div>';
            $('#instagram-feed1').append(html);
        }
    });
}
