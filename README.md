Installation
============

1. Download IScoll4 from this address http://cubiq.org/iscroll-4
2. Insert these lines inside your head:

        <script src="url_to_scripts/iscroll.js"></script>
        <script src="url_to_scripts/IS.js"></script>

3. You must use divs for header and footer to be able to use this script
4. You must add data-iscroll="enable" to your div[data-role=page]
5. You must add data-iscroll="scroller" to your div that you want to make scrollable
6. Your scrollable div must be at the same level as your footer and header
7. You have to add an additional div inside your scrollable div
8. Add these lines after the div[data-role=page]:

        <script>
            $('div[data-role="page"]').live('pageshow',function(){
                if(window.plugins.is == undefined){
                    window.plugins.is = new IS();
                }
                window.plugins.is.initPageScroll();
            });
        </script>
