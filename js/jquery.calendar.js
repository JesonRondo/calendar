/**
 * @desc    jquery calendar plugin
 * @author  LongZhou
 * @email   pancnlz@gmail.com
 * @version 1.0
 */
(function($) {
    $.fn.calendar = function(options) {
        var now = new Date();
        var y = '' + now.getFullYear();
        var m = now.getMonth() + 1;
        m = m < 10 ? '0' + m : '' + m;

        var settings = $.extend({
            cur_month : y + '-' + m,    // current month
            next_limit: y + '-' + m,    // next limit
            prev_limit: '1900-01'       // prev limit
        }, options);

        var fence_month = settings.cur_month;

        var $target = $(this);

        var getNextMonth = function() {
            // arrive next limit
            if (settings.next_limit === fence_month) {
                return false;
            }
            
            var fence_time = new Date(parseInt(fence_month.substr(0, 4), 10), parseInt(fence_month.substr(5, 2), 10) - 1, 1);
            fence_time.setMonth(fence_time.getMonth() + 1);
            
            fence_month = fence_time.getFullYear() + "-" + (fence_time.getMonth() + 1 < 10 ? "0" + (fence_time.getMonth() + 1) : fence_time.getMonth() + 1);
            
            return true;
        };
        
        var getPrevMonth = function() {
            // arrive prev limit
            if (settings.prev_limit === fence_month) {
                return false;
            }
            
            var fence_time = new Date(parseInt(fence_month.substr(0, 4), 10), parseInt(fence_month.substr(5, 2), 10) - 1, 1);
            fence_time.setMonth(fence_time.getMonth() - 1);
            
            fence_month = fence_time.getFullYear() + "-" + (fence_time.getMonth() + 1 < 10 ? "0" + (fence_time.getMonth() + 1) : fence_time.getMonth() + 1);
            
            return true;
        };

        var bindEvent = function() {
            // last month
            $('.jq_calendar .lm').live('click', function() {
                // prev month
                if (getPrevMonth()) {
                    randerCal();
                }
            });
            
            // next month
            $('.jq_calendar .nm').live('click', function() {
                // next month
                if (getNextMonth()) {
                    randerCal();
                }
            });
        };

        var getDom = function(month, $date) {
            var $calendar = '<div class="jq_calendar">\
                                <div class="month">\
                                    <a href="javascript:void(0);" class="lm" hidefocus="true">&lt;&lt;</a>\
                                    <span id="signpad_month">' + month + '</span>\
                                    <a href="javascript:void(0);" class="nm" hidefocus="true">&gt;&gt;</a>\
                                </div>\
                                <ul class="week">\
                                    <li class="weekend">周日</li>\
                                    <li>周一</li>\
                                    <li>周二</li>\
                                    <li>周三</li>\
                                    <li>周四</li>\
                                    <li>周五</li>\
                                    <li class="weekend">周六</li>\
                                </ul>\
                                <ul class="date">' + $date + '</ul>\
                            </div>';

            return $calendar;
        };

        var randerCal = function() {
            var month = fence_month;
            // get data
            var cur_day = new Date(parseInt(month.substr(0, 4), 10), parseInt(month.substr(5, 2), 10) - 1, 1);
            var month_value = cur_day.getMonth();
            var blanknum = cur_day.getDay();
            
            // set tpl month
            var $date = '';
            var i = 0;
            
            // create date dom
            do {
                if (blanknum > 0) {
                    $date += '<li></li>';
                    blanknum--;
                    i++;
                } else if (cur_day.getMonth() === month_value) {
                    $date += '<li>' + cur_day.getDate() + '</li>';
                    i++;
                    
                    // next day
                    cur_day = new Date(cur_day.getTime() + 1000 * 60 * 60 * 24);
                    
                    if (cur_day.getMonth() !== month_value) {
                        blanknum = (7 - (i % 7)) %7;
                    }
                }
            } while(!(cur_day.getMonth() !== month_value && blanknum === 0));
            
            var $dom = getDom(month, $date);
            $target.html($dom);
        };

        return this.each(function() {
            randerCal();
            bindEvent();
        });
    };
}(jQuery));