$(function() {

	$(".carousel-brands").owlCarousel({
		loop:true,
    margin:10,
    nav: true,
    navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
    responsiveClass:true,
   
   	responsive:{
        0:{
            items:1,
        },
        630:{
            items:2,
        },
        1200:{
            items:3,
        }
    }
	});

	$(".s-delivery .item-vertical h3").equalHeights();
	$(".s-collections .carousel-wrap h3").equalHeights();

	function heightses() {
		$(".s-delivery .item-vertical h3").height('auto').equalHeights();
		$(".s-collections .carousel-wrap h3").height('auto').equalHeights();
	}
	
	$(".product-item").each(function(e){
		var th = $(this);
		th.attr("href", "#product-img-" + e)
			.find(".product-popup")
				.attr("id", "product-img-" + e);
	})

	$(".product-item").magnificPopup({
		type: 'inline',
		mainClass: 'my-mfp-zoom-in',
		removalDelay: 300,
	});

	$('.mfp-gallery').each(function(){
		$(this).magnificPopup({
			delegate: 'a',
			mainClass: 'mfp-zoom-in',
			type: 'image',
			tLoading: '',
			gallery:{
				enabled:true,
			},
			removalDelay: 300,
			callbacks: {
				beforeChange: function() {
					this.items[0].src = this.items[0].src + '?=' + Math.random(); 
				},
				open: function() {
					$.magnificPopup.instance.next = function() {
						var self = this;
						self.wrap.removeClass('mfp-image-loaded');
						setTimeout(function() { $.magnificPopup.proto.next.call(self); }, 120);
					}
					$.magnificPopup.instance.prev = function() {
						var self = this;
						self.wrap.removeClass('mfp-image-loaded');
						setTimeout(function() { $.magnificPopup.proto.prev.call(self); }, 120);
					}
				},
				imageLoadComplete: function() { 
					var self = this;
					setTimeout(function() { self.wrap.addClass('mfp-image-loaded'); }, 16);
				}
			}
		});
	})
	

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	$(".mouse-icon").click(function() {
		$("html, body").animate({
			scrollTop : $(".s-adv").offset().top
		}, 850);
	});

	$(".novelties").click(function() {
		$("html, body").animate({
			scrollTop : $(".s-expert").offset().top
		}, 850);
	});

	$(".recomendation").click(function() {
		$("html, body").animate({
			scrollTop : $(".s-products").offset().top
		}, 850);
	});

	$(".delivery").click(function() {
		$("html, body").animate({
			scrollTop : $(".s-delivery").offset().top
		}, 850);
	});

	$(".catalog").click(function() {
		$("html, body").animate({
			scrollTop : $(".s-collections").offset().top
		}, 850);
	});

	$(".s-adv").waypoint(function(){
		$({blurRadius: 2}).animate({blurRadius: 0}, {
			duration: 1000,
			easing: 'swing',
			step: function() {
				$(".s-adv-item h3 span").css({
					"-webkit-filter": "blur("+this.blurRadius+"px)",
					"filter": "blur("+this.blurRadius+"px)"
				});
			}
		});
		var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ');
		$(".s-adv-item h3 span").each(function() {
			var tcount = $(this).data("count");
			$(this).animateNumber({ number: tcount,
				easing: 'easeInQuad',
				"font-size": "34px",
				numberStep: comma_separator_number_step},
				1000);
		});
		this.destroy();
	}, {
		offset: '70%'
	});

	$(".toggle-mnu").click(function() {
		$(this).toggleClass("on");
		$(".main-mnu").slideToggle();
		return false;
	});

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

/*
 * Replace all SVG images with inline SVG
 */
 $('img.img-svg').each(function(){
 	var $img = $(this);
 	var imgID = $img.attr('id');
 	var imgClass = $img.attr('class');
 	var imgURL = $img.attr('src');

 	$.get(imgURL, function(data) {
				// Get the SVG tag, ignore the rest
				var $svg = $(data).find('svg');

				// Add replaced image's ID to the new SVG
				if(typeof imgID !== 'undefined') {
					$svg = $svg.attr('id', imgID);
				}
				// Add replaced image's classes to the new SVG
				if(typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass+' replaced-svg');
				}

				// Remove any invalid XML tags as per http://validator.w3.org
				$svg = $svg.removeAttr('xmlns:a');

				// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
				if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
					$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
				}

				// Replace image with new SVG
				$img.replaceWith($svg);

			}, 'xml');

 });
 $(window).resize(function(){
 	heightses();
 })
});
