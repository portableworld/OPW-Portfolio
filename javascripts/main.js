$(document).ready(function(){
    $('#home').hide();
    $('.canvas').hide();
    $('#artGallery').hide();

    postLoadElements();
    getGithubRepos();

    // Get Stack image dimensions for hover events
    // Getting dimensions of just one will work since they
    // are all the same size
    var stackHeight = $('#web_stack').height();
    var stackWidth = $('#web_stack').width();

    // Variables for Contact Info
    var contactEmail = 'Email: <a href="mailto:charlie@ourportableworld.com">' +
    'charlie@ourportableworld.com</a>';
    var contactTwitter = 'Twitter: @portableworld';
    var contactFacebook = 'Facebook: <a href="http://www.facebook.com/portableworld" ' +
    'target="_blank">www.facebook.com/portableworld</a>';

    /*
     * All Hover Events Here
     */

    // Navigation Hover Events
    $('#portfolio').hover(function(){
        $(this).attr('src', 'images/portfolio_hover.png');
    }, function(){
        $(this).attr('src', 'images/portfolio.png');
    });
    $('#contact').hover(function(){
        $(this).attr('src', 'images/contact_hover.png');
    }, function(){
        $(this).attr('src', 'images/contact.png');
    });
    $('#home').hover(function(){
        $(this).attr('src', 'images/home_hover.png');
    }, function(){
        $(this).attr('src', 'images/home.png');
    });

    // Stack Hover Events
    $('.stack').hover(function() {
        // Yes, declaring without 'var' makes them 'global'
        // I did this on purpose. Making them 'scope'
        // caused side-effects when mouseout occured too quickly after mousein
        offSet = (stackHeight * 0.15)/2;
        p = $(this).position();
        $(this)
        .css('height', (stackHeight * 1.15)+"px")
        .css('width', (stackWidth * 1.15)+"px")
        .css('top', (p.top - offSet)+"px")
        .css('left', (p.left - offSet)+"px");
    }, function() {
        $(this)
        .css('height', stackHeight+"px")
        .css('width', stackWidth+"px")
        .css('top', (p.top)+"px")
        .css('left', (p.left)+"px");
    });

    /*
     * All Click Events Here
     */
    $('#portfolio').click(function(){
        // Get rid of Contact Info Box if it is on the stage
        if ($('#tBox').length != 0) {
            $('.contact_info, #tBox').animate({
                'opacity' : 'hide'
            }, 1000,
            function(){
                $(this).remove();
            })
        };



        $('img:not(#name, #contact, #home)').fadeOut(1500);
        $('#name').animate({
            left: '0px'
        }, 2500);
        $('#contact').animate({
            left: '14px',
            top: '100px'
        }, 2500);
        $('#home').animate({
            top: '138px',
            opacity: "show"
        }, 2500, function(){
            $('.canvas').fadeIn(2000);

        // Start function to start loading images from server
        // for digital art
        /*
        $.ajax({
            type: "GET",
            url: "lib/digiart.php",
            success: function(msg) {
                var fileNames = msg.split(":");
                //$.get('test.php', null, null, 'script');
                for (var i = 0; i < fileNames.length-1; i++) {
			$('<div class="simpleSlide-slide" rel="1" alt="'+i+'"></div>')
				.html('<img src="digiart/' + fileNames[i] +
					'" class="digiArt" />')
				.appendTo('#artGallery');
                }
            }

        });
             */

        });
        return false;
    });

    $('#home').click(function(){
        $('.canvas').fadeOut(1000);
        $('#code_content').animate({
            'opacity' : 'hide'
        }, 1000, function(){
            $(this).remove();
        });
        $('#artGallery').animate({
            'opacity' : 'hide'
        }, 1000, function(){
            $(this).html('');
        });
        //$('#back').fadeOut(1000);
        $('#back').animate({
            'opacity' : 'hide'
        }, 1000, function(){$(this).remove();});
        $('img:not(.canvas)').fadeIn(2500);
        $('#name').animate({
            left: '500px'
        }, 2500);
        $('#contact').animate({
            left: '500px',
            top: '200px'
        }, 2500);
        $('#home').animate({
            top: '580px',
            opacity: "hide"
        }, 2500, function() {
            $('#web_label').css({
                'top': '410px',
                'left': '320px'
            });
            $('#art_label').css({
                'top': '410px',
                'left': '760px'
            });
            $('#code_label').css({
                'top': '660px',
                'left': '343px'
            });
        });
        // Remove Contact Info if it is on the stage
        if ($('#tBox').length != 0) {
            $('.contact_info, #tBox').animate({
                'opacity' : 'hide'
            }, 1000,
            function(){
                $(this).remove();
            })
        }
        if ($('#web_message').length != 0) {
                $('#web_message').animate({'opacity' : 'hide'}, 1000, function(){
                        $('#web_message').remove();
                    });
            }

        if ($('.artLinks').length != 0) {
            $('.artLinks').fadeOut(1000);
        }
        return false;
    });

    $('#contact').click(function() {
        // If statement to test if new title_box has already been added to stage
        // Prevents multiple instances of title_box on multiple clicks
        if ($('#tBox').length != 0) {
            return false
            };

        // Check location of #contact. If it is lesser than 150
        // then the Portfolio Canvas is open
        if (this.offsetLeft < 150) {
            var tBox = new Image();
            $(tBox)
            .attr('src', 'images/little_box.png')
            .attr('id', 'tBox')
            .css({
                'position' : 'absolute',
                'z-index' : '2',
                'left' : '450px',
                'top' : '-150px'
            })
            .appendTo('body')
            .animate({
                'top' : '15px'
            }, 1500, function() {
                $('<div></div>')
                .attr('class', 'contact_info')
                .css({
                    'position' : 'absolute',
                    'z-index' : '2',
                    'left' : '490px',
                    'top' : '50px'
                })
                .html(
                    contactEmail +
                    '<br />' +
                    contactTwitter +
                    '<br />' +
                    contactFacebook
                    )
                .hide()
                .appendTo('body')
                .fadeIn(2000);
                $('<div></div>')
                .attr('class', 'contact_info')
                .css({
                    'position' : 'absolute',
                    'z-index' : '3',
                    'left' : '765px',
                    'top' : '27px',
                    'cursor' : 'pointer'
                })
                .html('close[x]')
                .hide()
                .appendTo('body')
                .fadeIn(2000)
                .click(function(){
                    $('.contact_info, #tBox').animate({
                        'opacity' : 'hide'
                    }, 1000,
                    function(){
                        $(this).remove();
                    })
                });
            });

            return false;
        }

        // Produce a new title_box image in the exact place as the other
        var tBox = new Image();
        $(tBox)
        .attr('src', 'images/box.png')
        .attr('id', 'tBox')
        .css({
            'position' : 'absolute',
            'z-index' : '1',
            'left' : '450px',
            'top' : '10px'
        })
        .appendTo('body');
        // Move title_box to new location
        $(tBox).animate({
            'top' : '450px',
            'left' : '500px'
        }, 2500, function(){
            $('.contact_info').fadeIn(2500)
            });
        // Append Div to contain contact info
        $('<div></div>')
        .attr('class', 'contact_info')
        .css({
            'position' : 'absolute',
            'z-index' : '3',
            'left' : '565px',
            'top' : '535px'
        })
        .html(
            contactEmail +
            '<br /><br />' +
            contactTwitter +
            '<br /><br />' +
            contactFacebook
            )
        .hide()
        .appendTo('body');
        $('<div></div>')
        .attr('class', 'contact_info')
        .css({
            'position' : 'absolute',
            'z-index' : '3',
            'left' : '975px',
            'top' : '490px',
            'cursor' : 'pointer'
        })
        .html('close[x]')
        .hide()
        .appendTo('body')
        .click(function(){
            $('.contact_info, #tBox').animate({
                'opacity' : 'hide'
            }, 1000,
            function(){
                $(this).remove();
            })
        });
        return false;
    });

    $('.stack').click(function() {
        $('.stack').fadeOut(1000);
        var id = $(this).attr('id');
        var stack;
        if (id === 'web_stack') {
            stack = $('#web_label');
        } else if (id === 'art_stack') {
            stack = $('#art_label');
        } else if (id === 'code_stack') {
            stack = $('#code_label');
        } else {
            console.log ('Error: Stack ID = ' + id);
        }


        stack.animate({
            top: '225px',
            left: '335px'
        }, 2000, function() {
            addBackButton();
            if (id === 'art_stack') {
                if ($('#web_message').length != 0) {
                $('#web_message').animate({'opacity' : 'hide'}, 1000, function(){
                        $('#web_message').remove();
                    });
            }
                if ($('#code_content').length != 0) {
                    $('#code_content').animate({'opacity' : 'hide'}, 1000, function(){
                        $('#code_content').remove();
                    });
                }
                if ($('.artLinks').length == 0) {
                    // Build a list of slideshows to choose from with a intro icon
                    // generateArtDivs(typeName, top, left)
                    generateArtDivs('Illustrator',280,300);
                    generateArtDivs('3D-Art',530,300);
                    generateArtDivs('Photoshop',280,760);
                } else {
                    $('.artLinks').fadeIn(2000);
                }

                // They all trigger the same function but all pass different params

                // Display message about upcoming captions and descriptions
        } else if (id === 'code_stack') {
            if ($('#web_message').length != 0) {
                $('#web_message').animate({'opacity' : 'hide'}, 1000, function(){
                        $('#web_message').remove();
                    });
            }
            if ($('.artLinks').length != 0) {
                    $('.artLinks').animate({'opacity' : 'hide'}, 1000, function(){
                        $('.artLinks').remove();
                    });
                }
            if ($('#slideshow').length != 0) $('#slideshow').remove();
            $('<div></div>')
            .attr('id', 'code_content')
            .css({
                'position' : 'absolute',
                'top' : '320px',
                'left' : '300px',
                'z-index' : '4'
            })
            .html(codeContent)
            .hide()
            .appendTo('body')
            .animate({
                'opacity' : 'show'
            }, 1500);
        } else if (id === 'web_stack') {
            if ($('#slideshow').length != 0) $('#slideshow').remove();
            if ($('.artLinks').length != 0) {
                    $('.artLinks').animate({'opacity' : 'hide'}, 1000, function(){
                        $('.artLinks').remove();
                    });
                }
            if ($('#code_content').length != 0) {
                    $('#code_content').animate({'opacity' : 'hide'}, 1000, function(){
                        $('#code_content').remove();
                    });
                }
            // Display message about upcoming feature
            $('<div></div>')
                .attr('id', 'web_message')
                .css({
                    'position' : 'absolute',
                    'top' : '320px',
                    'left' : '300px',
                    'text-shadow' : '2px 2px 2px #000',
                    'font-size' : '14pt',
                    'z-index' : '4'
                })
                .html('There are no website links to <br />' +
                    'speak of at this time. Bummer, I know. <br />' +
                    'I\'m working on it. ')
                .hide()
                .appendTo('body')
                .animate({'opacity' : 'show'}, 1500);
        }





        });


    var labelArray = $('.label:not(#'+stack[0].id+')');
        var topVal = 170;
        for (var i=0;i<=labelArray.length;i++) {
            topVal += 50;
            $('#'+labelArray[i].id)
            .animate({
                top: (topVal)+'px',
                left: '30px'
            }, 2000);
        }

        return false;
    });

$('.label').hover(function() {
    $(this)
    .css('cursor', 'pointer');
}, function() {
    $(this)
    .css('cursor', 'default')
});

$('.label').click(function() {
    id = this.id
    id = id.split('_');

    $('#'+id[0]+'_stack').trigger('click');
});






});
/*
 * Misc Functions Here
 */
function postLoadElements() {
    $('<img alt="Canvas" class="canvas" id="canvas" ' +
        'src="images/canvas.png" />').appendTo('body').hide();
    $('<img alt="Home" border="0" id="home" src="images/home.png" />').appendTo('body').hide();
    $('<img alt="Websites_label" class="canvas label" border="0" id="web_label" src="images/websites_label.png" />').appendTo('body').hide();
    $('<img alt="Art_label" class="canvas label" border="0" id="art_label" src="images/art_label.png" />').appendTo('body').hide();
    $('<img alt="Code_label" class="canvas label" border="0" id="code_label" src="images/code_label.png" />').appendTo('body').hide();
    $('<img alt="Web_stack" class="canvas stack" id="web_stack" src="images/web_stack.png" />').appendTo('body').hide();
    $('<img alt="Art_stack" class="canvas stack" id="art_stack" src="images/art_stack.png" />').appendTo('body').hide();
    $('<img alt="Code_stack" class="canvas stack" id="code_stack" src="images/code_stack.png" />').appendTo('body').hide();
}

function addBackButton() {
    if ($('#back').length == 0) {
        $('<img alt="Go Back" id="back" src="images/back.png" />')
        .appendTo('body')
        .hide()
        .animate({
            'opacity' : 'show'
        }, 2000)
        .click(function() {
    $('#back').fadeOut(1500);
    if ($('#web_message').length != 0) {
                $('#web_message').animate({'opacity' : 'hide'}, 1000, function(){
                        $('#web_message').remove();
                    });
            }
    if ($('#slideshow').length != 0) $('#slideshow').remove();
            if ($('.artLinks').length != 0) {
                    $('.artLinks').animate({'opacity' : 'hide'}, 1000, function(){
                        $('.artLinks').remove();
                    });
                }
            if ($('#code_content').length != 0) {
                    $('#code_content').animate({'opacity' : 'hide'}, 1000, function(){
                        $('#code_content').remove();
                    });
                }
    $('#web_label').animate({
                'top': '410px',
                'left': '320px'
            }, 2000);
            $('#art_label').animate({
                'top': '410px',
                'left': '760px'
            }, 2000);
            $('#code_label').animate({
                'top': '660px',
                'left': '343px'
            }, 2000, function() {
                $('.stack').fadeIn(1500);

            });
});
    } else {
        $('#back').fadeIn(2000);
    }

}

function getGithubRepos() {
    var content = ""; // HTML that gets returned
    $.getJSON('http://github.com/api/v2/json/repos/show/portableworld?callback=?', function(data) {
        if (data != null) {
            for (var i = 0; i < data.repositories.length; i++) {
                content += "<a href='" + data.repositories[i].url + "' target='_blank'>" +
                data.repositories[i].name + "</a>" +
                "<br />" +
                "Description: " + data.repositories[i].description +
                "<br /><br />";
            }
        }
        // This makes the variable 'codeContent' global
        codeContent = content;
    });
}

function generateArtDivs(typeName, fromTop, fromLeft) {
    /*
     * Replace direct links to Picasa Album Thumbnails with
     * API references using JSON ... I'm just too lazy to do it
     * right this very second
     */
    var thumbnail;
    if (typeName == 'Photoshop') {
        thumbnail = 'http://lh5.ggpht.com/_wrW5VcKJPfM/TBcAuHJerEE/AAAAAAAAFF4/VQTpDSPhmgk/s160-c/Photoshop.jpg';
    } else if (typeName == 'Illustrator') {
        thumbnail = 'http://lh4.ggpht.com/_wrW5VcKJPfM/TBcAFpXT3kE/AAAAAAAAFFw/fVVTkD5e3M0/s160-c/Illustrator.jpg';
    } else if (typeName == '3D-Art') {
        thumbnail = 'http://lh4.ggpht.com/_wrW5VcKJPfM/TBcASp-rTXE/AAAAAAAAFGs/BeqRpWgGbzk/s160-c/3DArt.jpg';
    }
    $('<div></div>')
    .attr('id', typeName + '_link')
    .attr('class', 'artLinks')
    .css({
        'position' : 'absolute',
        'top' : fromTop + 'px',
        'left' : fromLeft + 'px',
        'width' : '170px',
        'height' : '170px',
        'z-index' : '4',
        'cursor' : 'pointer'
    })
    .html(typeName + '<br />' +
        '<image src="' + thumbnail + '" />')
    .hide()
    .appendTo('body')
    .animate({
                'opacity' : 'show'
            }, 1500)
    // TODO Add hover like in the .stack images
    .click(function(){
        $.ajax({
            type : "POST",
            url : "lib/picasa.php",
            data: "type=" + typeName,
            success : function(path) {
                /*
                 * Setting the html() to '' works but
                 * it might be better to remove() #slideshow if it is on stage
                 * Would that save on memory usage on multiple clickings? Hmm
                 */
                slideShowCanvas('add', path);

            }
        });
    });
}

function slideShowCanvas(action, path) {
    if (action == 'add') {
        $('<img alt="Canvas" class="canvas" id="canvasSlide"' +
                'src="images/canvas.png" style="display: block; ">')
            .hide()
            .appendTo('body')
            .animate({
                    'width' : '675px',
                    'opacity' : 'show',
                    'z-index' : '10',
                    'left' : '300px',
                    'top' : '255px'


                }, 2000, function(){
                $('#artGallery').html('');
                $(path).appendTo('#artGallery');
                $('#artGallery').animate({
                    'opacity' : 'show'
                }, 2000);
            });
    } else if (action == 'remove') {
        $('#canvasSlide').animate({'opacity' : 'hide'}, 2000, function(){
            $('canvasSlide').remove();
        });
    } else {
        console.log('function slideShowCanvas param did not match needed params');
    }
}

