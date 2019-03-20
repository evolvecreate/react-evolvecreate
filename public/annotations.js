
var annotations = (function(window) {

    function init() {

        setTimeout(function(){
            repositionAnnotator();
            loadAnnotations();
        }, 1000);

        //var annotationDemo = getAnnotationDemo();




        var repositionAnnotatorTimeout = null;

        $(window).resize(function(){

            if (repositionAnnotatorTimeout) {
                clearTimeout(repositionAnnotatorTimeout);
            }

            repositionAnnotatorTimeout = setTimeout(function(){
                repositionAnnotator();
            }, 100);
        });

        $('.button_toggleAnnotationOption').click(function() {
            toggleAnnotationOptions();
        });

        $('.button_highlight-green').click(function(){
            createAnnotationFromSelection({highlightStyle: 'highlight-green'});
        });

        $('.button_highlight-pink').click(function(){
            createAnnotationFromSelection({highlightStyle: 'highlight-pink'});
        });

        $('.button_circle').click(function(){
            createAnnotationFromSelection({highlightStyle: 'circle'});
        });

        $('.button_box').click(function(){
            createAnnotationFromSelection({highlightStyle: 'box'});
        });

        $('.button_underline').click(function(){
            createAnnotationFromSelection({highlightStyle: 'underline'});
        });





        $('.annotator .annotation-list').on('click', '.removeButton', function(event) {
            $annotation = $(event.target).closest('.annotation');
            removeAnnotation($annotation);
        });

        $('.annotator .annotation-list').on('blur', 'textarea', function(event) {
            $annotation = $(event.target).closest('.annotation');
            saveAnnotation($annotation);
        });

        $('#panel_answersheet').on('mouseup', function(event) {
            makeAllAnnotationAndHighlightsInactive();
        });

        $('.articleBody').on('mouseup', function(event) {

            makeAllAnnotationAndHighlightsInactive();

            var selection = window.getSelection();
            var selectionText = selection.toString();
            if (selectionText != '') {

                // TODO: calculate based on button height and highlight placement
                $('.annotation-options').show();
                $('.annotation-options').css('left', event.pageX + 'px');
                $('.annotation-options').css('top', (event.pageY - 60 - $(window).scrollTop()) + 'px');  // adding $(window).scrollTop() since fixed modal
            } else {
                $('.annotation-options').hide();
            }
        });

        $('.articleBody').on('mouseover', '.highlighted-text', function(event){
            var $highlighted = $(event.target);
            var id = $highlighted.data('annotation-id');
            $annotation = getAnnotationByAnnotationID(id);
            makeAnnotationAndHighlightsActive($annotation);
        });

        $('#list_annotation-markers').on('click', '.annotation-marker', function(event){
            //closeAllTourTips(); // TODO: temp
            var $marker = $(event.target);
            var id = $marker.data('annotation-id');
            $annotation = getAnnotationByAnnotationID(id);
            makeAnnotationAndHighlightsActive($annotation);
            var $highlight = $('.highlighted-text[data-annotation-id="' + id + '"]');
            if ($highlight.length == 1) {
                scrollToHighlight($highlight);
            }
        });

        $('.articleBody').on('mouseout', '.highlighted-text', function(event){
            //makeAllAnnotationAndHighlightsInactive();
        });


        /* text highlighting */

        $('.annotator .annotation-list').on('click', '.annotation', function(event) {
            var trigger = $(event.target);
            if (trigger.hasClass('.annotation')) {
                $annotation = trigger;
            } else {
                $annotation = trigger.closest('.annotation');
            }
            makeAnnotationAndHighlightsActive($annotation);
        });

        $('.annotator .annotation-list').on('click', '.prev-annotation', function(event) {
            //closeAllTourTips(); TODO: temp
            $annotation = $(event.target).closest('.annotation');
            $previousAnnotation = $annotation.prev('.annotation');
            if ($previousAnnotation.length == 1) {
                setTimeout(function() {
                    makeAnnotationAndHighlightsActive($previousAnnotation);
                    var annotationID = $previousAnnotation.data('annotation-id');
                    var $highlight = $('.highlighted-text[data-annotation-id="' + annotationID + '"]');
                    if ($highlight.length == 1) {
                        scrollToHighlight($highlight);
                    }
                }, 50);
            }
        });

        $('.annotator .annotation-list').on('click', '.next-annotation', function(event) {
            //closeAllTourTips();  TODO: temp
            $annotation = $(event.target).closest('.annotation');
            $nextAnnotation = $annotation.next('.annotation');
            if ($nextAnnotation.length == 1) {
                setTimeout(function() {
                    makeAnnotationAndHighlightsActive($nextAnnotation);
                    var annotationID = $nextAnnotation.data('annotation-id');
                    var $highlight = $('.highlighted-text[data-annotation-id="' + annotationID + '"]');
                    scrollToHighlight($highlight);
                }, 50);
            }
        });

        $('.annotator .annotation-list').on('click', '.annotation.orphan .tooltip_orphan', function(event) {
            $annotation = $(event.target).closest('.annotation');
            var articleID = $annotation.data('article-id');
            var studentID = $('#hidden_studentID').val();
            if (studentID) {
                var articleURL = _strURL + 'articles/article.php?id=' + articleID + '&stid=' + studentID + '&annotationgrading=t&modal=t';
            } else {
                var articleURL = _strURL + 'articles/article.php?id=' + articleID + '&modal=t';
            }
            $('#button_go-to-orphans-article').click(function(){
               navigateURL(articleURL);
            });
            // display tooltip
            showOrphanAnnotationTip();
        });

        $('.annotator .annotation-list').on('click', 'textarea, .highlighted-text, .removeButton', function(event) {
            //$annotation = $(event.target).closest('.annotation');
            //makeAnnotationAndHighlightsActive($annotation);
        });

    }


    function createAnnotationFromSelection(annotation) {



        // create annotation
        var $annotation = createAnnotation(annotation);

        // make active, focus, and hide annotation options (reset)
        $annotation.addClass('active');
        $annotation.find('textarea').focus();
        $('.annotation-options').removeClass('open').hide();

        ga('send', 'event', 'create annotation');
        // mixpanel.track('create annotation'); // TODO: uncommenting would count student usage in retention and inflate numbers

        return $annotation;

    }

    function toggleAnnotationOptions() {
        $options = $('.annotation-options');
        if ($options.hasClass('open')) {
            $options.removeClass('open');
        } else {
            $options.addClass('open');
        }
    }

    function makeAnnotationAndHighlightsActive($annotation) {
        makeAllAnnotationAndHighlightsInactive();

        $annotation.addClass('active');
        //console.log($annotation);
        var id = $annotation.data('annotation-id');
        //console.log('making active', id);
        getHighlightsByAnnotationID(id).addClass('active');
    }

    function makeAllAnnotationAndHighlightsInactive() {
        $('.annotation').removeClass('active');
        $('.highlighted-text.active').removeClass('active');
    }

    function createAnnotation(annotation, orphan) {

        var $list = $('.annotator .annotation-list');
        var $annotation = $(document.createElement('li')).addClass('annotation').addClass('shadow');

        var $close = $(document.createElement('div')).addClass('removeButton').text('X');
        var $highlightedText = $(document.createElement('span')).addClass('highlighted-text').addClass('shadow');
        var $textarea = $(document.createElement('textarea')).attr('rows', 5);

        var $previous = $(document.createElement('div')).addClass('prev-annotation').html('&lt;');
        var $next = $(document.createElement('div')).addClass('next-annotation').html('&gt;');
        var $orphanTooltip = $(document.createElement('img')).addClass('tooltip_orphan hand');
        $orphanTooltip.attr('src', '/_images/_structure/icons/icon_speech-bubble-question.png').attr('width', 18).attr('height', 18);

        $annotation.append($previous);

        $annotation.append($previous);
        $annotation.append($next);
        $annotation.append($close);
        $annotation.append($orphanTooltip);
        $annotation.append($highlightedText);
        $annotation.append($textarea);


        // update highlightedText within annotation
        if (annotation.highlightedText) {
            var highlightedText = annotation.highlightedText;
        } else {
            var selection = window.getSelection();
            var highlightedText = selection.toString();

            /*
            var regex = /[ÀÁÂÃÄÅÂÂ]/g;
            //var regex = 'Â'; // replace with space
            highlightedText = stringText.replace(regex, '');
            //var regex2 = 'â€™'; // replace with apostrophe
            //highlightedText = highlightedText.replace(/â€™/g, '\'');
            console.log(highlightedText);
            //highlightedText = highlightedText.replace(/’/g, '\'');
            */
        }
        if (highlightedText != '') {
            $highlightedText.text(highlightedText);
        }
        // update textarea with annotation
        $textarea.val(annotation.notes);


        // add highlight style data
        $annotation.data('highlight-style', annotation.highlightStyle);

        // add serialized selection data
        if (annotation.serializedSelection) {
            var serializedSelection = annotation.serializedSelection;
        } else {
            rangy.init();
            var articleID = $('#hidden_articleID').val();
            var body = document.getElementById('articleBody' + articleID);
            var serializedSelection = rangy.serializeSelection(rangy.getSelection(), false, body);
        }
        $annotation.data('serialized-selection', serializedSelection);

        if (!orphan) {
            var $highlighted = createHighlightText(annotation);
        }

        var $marker = createAnnotationMarker(annotation, orphan);


        // add annotationID data
        if (annotation.annotationID) {
            $annotation.data('annotation-id', annotation.annotationID);
            $annotation.attr('data-annotation-id', annotation.annotationID);
            $annotation.data('article-id', annotation.articleID);
        } else {
            saveAnnotation($annotation, $highlighted, $marker);
        }




        $list.append($annotation);



        // do we save here??? if no annotation ID so we can return it for the highlight??


        /* scroll to highlighted text */
        if ($highlighted) {
            var annotationTop = $highlighted.offset().top - $(window).scrollTop() - 40; // adding $(window).scrollTop() since fixed modal
        } else {
            var annotationTop = 0;
        }
        $annotation.css('top', annotationTop + 'px');
        //console.log(annotationTop); // TODO: figure overlap using z-index and .active class for now

        return $annotation;
    }

    function createHighlightText(annotation) {

        var selection = window.getSelection();
        var selectionText = selection.toString();

        if (selectionText != '') {
            var range = selection.getRangeAt(0);

            // create highlight using vanilla js
            var highlighted = document.createElement('span');
            if (annotation.annotationStatus != 'removed') {
                highlighted.setAttribute('class', 'highlighted-text ' + annotation.highlightStyle);
                if (annotation.annotationID) {
                    highlighted.setAttribute('data-annotation-id', annotation.annotationID); // TODO: do we have to do both?? data- is used for search

                }
            }

            highlighted.appendChild(range.extractContents());
            range.insertNode(highlighted);

            selection.removeAllRanges();

            var $highlighted = $(highlighted);

            return $highlighted;


        } else {

            return false;
        }
    }

    function removeAnnotation($annotation) {

        var id = $annotation.data('annotation-id');

        $annotation.remove();
        removeHighlightsById(id);
        removeAnnotationMarkerById(id);
        //reserializeAnnotations();

        if (!getAnnotationDemo()) {
            $.ajax({
                url: '/_system/_controllers/AJAX_annotation.php?func=removeAnnotation',
                type: 'post',
                data: {
                    annotationID: id
                }
            });

        } else {
            console.log('removed demo annotation:', id);
        }
    }

    function removeHighlightsById(id) {
        $highlights = getHighlightsByAnnotationID(id);
        $highlights.attr('class', ''); // keep  span tag for correct node count for future checksums, used in loadAnnotations()
        //$highlights.contents().unwrap();
        //$highlights.replaceWith(function() { return $(this).contents(); });
    }

    function removeAnnotationMarkerById(id) {
        var $marker = $('.annotation-marker[data-annotation-id="' + id + '"]');
        $marker.remove();
        renumberAnnotationMarkers();
    }

    function getAnnotationByAnnotationID(id) {
        var $annotation = $('.annotation[data-annotation-id="' + id + '"]');
        //console.log('annotation length', $annotation.length);
        return $annotation;
    }

    function getHighlightsByAnnotationID(id) {

        $highlights = $('.highlighted-text[data-annotation-id="' + id + '"]');
        return $highlights;
    }

    function saveAnnotation($annotation, $highlighted, $marker) {

        var data = getAnnotationData($annotation);

        if (!getAnnotationDemo()) {

            $.ajax({
                url: '/_system/_controllers/AJAX_annotation.php?func=saveAnnotation',
                type: 'post',
                data: data,
                success: function(response) {

                    if (!data['annotationID']) {

                        //var annotationID = Math.ceil(Math.random() * 100);
                        var annotationID = response;
                        console.log('new annotation with ID: ', annotationID);

                        $annotation.data('annotation-id', annotationID);
                        $annotation.attr('data-annotation-id', annotationID);

                        if ($highlighted) {
                            $highlighted.attr('data-annotation-id', annotationID);
                        }

                        if ($marker) {
                            $marker.attr('data-annotation-id', annotationID);
                        }


                    }
                }

            });

        } else {

            if (!data['annotationID']) {

                var annotationID = Math.floor((Math.random() * 100000) + 1);
                console.log('new annotation with ID: ', annotationID);

                $annotation.data('annotation-id', annotationID);
                $annotation.attr('data-annotation-id', annotationID);

                if ($highlighted) {
                    $highlighted.attr('data-annotation-id', annotationID);
                }

                if ($marker) {
                    $marker.attr('data-annotation-id', annotationID);
                }
            }
        }
    }

    function getAnnotationData($annotation) {

        var highlightedText = $annotation.find('.highlighted-text').text();
        var contextText = highlightedText;
        var serialized = $annotation.data('serialized-selection');
        var notes = $annotation.find('textarea').val();
        var highlightStyle = $annotation.data('highlight-style');
        var articleID = $('#hidden_articleID').val();
        var articlesetID = $('#hidden_articlesetID').val();

        // replace breaks
        if (notes) {
            notes = notes.replace(/\n/g, '<br />');
        }

        var data = {
            highlightedText: highlightedText,
            contextText: contextText,
            serializedSelection: serialized,
            notes: notes,
            highlightStyle: highlightStyle,
            articleID: articleID,
            articlesetID: articlesetID
        };

        if ($annotation.data('annotation-id')) {
            data.annotationID = $annotation.data('annotation-id');
        }

        return data;
    }

    function scrollToHighlight($highlight) {

        var newTop = $highlight.offset().top - 200;

        var openbookAnswersheet = $('#panel_answersheet-body.openbook');
        if (openbookAnswersheet.length == 1) {
            $('#panel_article').animate({scrollTop: newTop}, 1000);
        } else {
            $('body, html').animate({scrollTop: newTop}, 1000);
        }
    }

    function goToHighlightByAnnotationID(id) {

        $annotation = $('.annotation[data-annotation-id="' + id +  '"]');
        if ($annotation.length == 1) {
            makeAnnotationAndHighlightsActive($annotation);
            var $highlight = $('.highlighted-text[data-annotation-id="' + id + '"]');
            if ($highlight.length == 1) {
                scrollToHighlight($highlight);
            }
        }
    }

    function loadAnnotations() {


        var articleBody = $('.articleBody');
        var articleID = articleBody.data('article-id');
        var articlesetID = articleBody.data('articleset-id');
        var studentID = $('#hidden_studentID').val();

        rangy.init();
        var body = document.getElementById('articleBody' + articleID);
        if (body) {
            setTimeout(function() {

                var data = {};
                if (studentID) {
                    data.studentID = studentID;
                }


                $.ajax({
                    url: '/_system/_controllers/AJAX_annotation.php?func=getAnnotations&sid=' + articlesetID,
                    type: 'get',
                    data: data,
                    success: function(response) {

                        var annotations = JSON.parse(response);
                        $.each(annotations, function(index, annotation){

                            // replace breaks
                            if (annotation.notes) {
                                annotation.notes = annotation.notes.replace(/<br \/>/g, '\n');
                            }


                            /* // test if findText() works with weird characters
                            var range = rangy.createRange(body);
                            found = range.findText(annotation.highlightedText);
                            console.log(found + 'using findText() to load: ', annotation.highlightedText);
                             */

                            var found = false;
                            // Try finding serialized first, and if not use findText
                            try {
                                rangy.deserializeSelection(annotation.serializedSelection, body);
                                found = true;
                                console.log('using deserializeSelection() to load: ', annotation.highlightedText + ' - ' + annotation.serializedSelection);
                            }
                            catch(err) {
                                //console.log(err);

                                var range = rangy.createRange();
                                range.selectNode(body);
                                found = range.findText(annotation.highlightedText, {withinRange: range});
                                if (found) {
                                    range.select();
                                    console.log('using findText() to load: ', annotation.highlightedText);
                                } else {
                                    console.log('couldn\'t load using deserializeSelection() or findText()',  annotation.highlightedText);
                                }

                            }

                            if (found) {
                                if (annotation.annotationStatus != 'removed') {
                                    var $annotation = createAnnotation(annotation);
                                } else {
                                    createHighlightText(annotation);
                                }
                            } else {
                                if (annotation.annotationStatus != 'removed') {
                                    var $annotation = createOrphanAnnotation(annotation);
                                } else {
                                    createHighlightText(annotation);
                                }
                            }

                        });

                        var $annotationID = $('#hidden_annotationID');
                        if ($annotationID.length == 1) {
                            var annotationID = $annotationID.val();
                            goToHighlightByAnnotationID(annotationID);
                        }

                    }
                });


            }, 1000);
        }
    }

    function loadAnnotation(annotation){

        rangy.deserializeSelection(annotation['serialized']); // highlights if no errors
        createAnnotationFromSelection('highlight-green');

        var text = annotation['text'];
        var range = rangy.createRange(body);
        var found = range.findText(text);
        if (found) {
            range.select();
            //createAnnotationFromSelection('circle');
            loadAnnotationToSelection(annotation);
        } else {
            loadOrphanAnnotation(annotation);
        }
    }



    function getAnnotations(articleID, studentID) {

        $.ajax({
            url: '/_system/_controllers/AJAX_annotation.php?func=getAll',
            type: 'post',
            data: {
                'articleID': articleID,
                'studentID': studentID
            },
            success: function(){
                // TODO: return promise which resolves to array of annotations
            }

        });
    }

    function loadAnnotationToSelection(annotation) {
        //createAnnotationFromSelection('circle'); ??
        // TODO: load text and data into selection
    }

    function loadOrphanAnnotation(annotation) {



    }

    function createOrphanAnnotation(annotation) {

        $annotation = createAnnotation(annotation, true);
        $annotation.addClass('orphan');

    }


    function createAnnotationMarker(annotation, orphan) {

        var $marker = $(document.createElement('li'));
        $marker.addClass('annotation-marker');
        if (orphan) {
            $marker.addClass('orphan');
        }

        if (annotation.annotationID) {
            $marker.attr('data-annotation-id', annotation.annotationID);
        }

        var totalAnnotations = $('.annotation').length + 1;
        $marker.text(totalAnnotations);

        $('#list_annotation-markers').append($marker);

        return $marker;
    }

    function renumberAnnotationMarkers() {

        var i = 1;
        $('.annotation-marker').each(function(){
           $(this).text(i);
            i++;
        });
    }


    /*
    function reserializeAnnotations(start) {

        // TODO: go through each annotation created after removed and recreate reserialized??
    }
    */

    function repositionAnnotator() {

        var articleWidth = $('.articleBody').width();
        /* var annotatorWidth = $('.annotator').width(); */
        var annotatorWidth = 200 + 20; // side annotator width + annotation padding + annotation right
        var windowWidth = $(window).width();

        if (windowWidth < (articleWidth + (annotatorWidth*2))) {
            $('.annotator').addClass('fixed');
        } else if ($('.annotator').hasClass('always-fixed') == false) {
            $('.annotator').removeClass('fixed');
        }
    }

    function getAnnotationDemo() {

        var annotationDemo = false;
        var $annotationDemo = $('#hidden_annotationDemo');
        if ($annotationDemo.length == 1) {
            if ($annotationDemo.val() == 't') {
                annotationDemo = true;
            }
        }

        return annotationDemo;
    }

    return {
            init: init
        };

})(window);

