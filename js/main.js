$(function() {

/*
 "строгино": {
 "x": "145",
 "y": "867",
 "w": "159",
 "h": "24"
 },
 */

    window.stations = [];

    var marks = $('.marks'),
        mark = null,
        isMoving = false,
        lastX,
        lastY;

    marks.on('mousedown', '.mark', function(e) {

        mark && mark.css('border', '2px solid red');

        mark = $(this);
        mark.css('border', '2px solid blue');

        lastX = e.screenX;
        lastY = e.screenY;

        isMoving = true;

        console.log('mousedown')
    });

    $(window).on('mouseup', function() {
        isMoving = false;
    });

    //$(window).on('mousemove', function(e) {
    //    if (mark && isMoving) {
    //        mark.css('left', mark.position().left + (e.screenX - lastX));
    //        lastX = e.screenX;
    //
    //        mark.css('top', mark.position().top + (e.screenY - lastY));
    //        lastY = e.screenY;
    //
    //        console.log(stations[mark.data('idx')]);
    //    }
    //});

    // TODO: keyboard

    $(document).keydown(function(e) {
        if (!mark) {
            return;
        }

        switch(e.which) {
            case 37: // left
                mark.css('left', mark.position().left - 1);
                updateStation(mark, 'x', -1);
                break;

            case 38: // up
                mark.css('top', mark.position().top - 1);
                updateStation(mark, 'y', -1);
                break;

            case 39: // right
                mark.css('left', mark.position().left + 1);
                updateStation(mark, 'x', +1);
                break;

            case 40: // down
                mark.css('top', mark.position().top + 1);
                updateStation(mark, 'y', +1);
                break;

            // size:

            case 65: // left
                mark.css('width', mark.width() - 1);
                updateStation(mark, 'w', -1);
                break;

            case 87: // up
                mark.css('height', mark.height() - 1);
                updateStation(mark, 'h', -1);
                break;

            case 68: // right
                mark.css('width', mark.width() + 1);
                updateStation(mark, 'w', +1);
                break;

            case 83: // down
                mark.css('height', mark.height() + 1);
                updateStation(mark, 'h', +1);
                break;

            case 8: // backspace
                stations[mark.data('idx')] = null;
                mark.remove();
                break;


            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });
    // TODO: change size

    $.getJSON('stations.json', function(newStations) {
        stations = newStations;
        _.forEach(stations, function(station, idx) {

            marks.append(
                $('<div class="mark"></div>')
                    .css({
                        width: +station.w + 14,
                        height: +station.h + 12,
                        left: +station.x,
                        top: +station.y
                    })
                    .attr('title', station.name)
                    .attr('data-idx', idx)
            );

        })    });

    var updateStation = function(mark, attr, value) {
        stations[mark.data('idx')][attr] = '' + (+stations[mark.data('idx')][attr] + value);
    };

});
