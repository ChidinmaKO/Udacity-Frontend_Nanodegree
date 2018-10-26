/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {

    /* This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {

        /* Test 1: Test to ensure that the variable "allFeeds" 
         * is defined and it is not empty.
        */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test 2: Test to make sure that each feed in the allFeeds 
         * object has a URL property defined and it is not empty.
        */
        it('has URL defined and is not empty', () => {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            })
        })


        /* Test 3: Test to check that every feed in the allFeeds object
         * has a name property defined and it is not void.
        */
        it('has name defined and it is not empty', () => {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        })
    });


    /* The Menu Test Suite
     * This suite is all about the menu
    */
    describe('The menu', () => {

        // Select the body tag and menu-icon-link class
        const body = $('body');
        const menuIcon = $('.menu-icon-link');

        /* Test 1: Test to ensure that the menu element is hidden by default */
        it('has class menu-hidden and the menu is hidden by default', () => {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        
        /* Test 2: Test to make certain that the menu changes visibility 
         * when the menu icon is clicked. 
         * First click shows the menu and the second click hides it.
        */
        it('toggles the visibility of the menu', () => {

            // first click
            menuIcon.trigger('click');
            // menuIcon.click(); also works
            expect(body.hasClass('menu-hidden')).toBe(false);

            // second click
            menuIcon.trigger('click');
            // menuIcon.click(); also works
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

    });
        

         

    /* The Initial Entries Test Suite. */
    describe('Initial Entries', () => {

        /* Test 1: When the loaded function is completed, there has to be at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
        */
        beforeEach(done => {
            loadFeed(0, done);
        });

        it('has a single entry within the feed container', () => {

            // const feed and entries need to be inside the "it-function" declared at the right time
            const feed = document.querySelector('.feed');
            const entries = feed.querySelectorAll('.entry');
            expect(entries.length).toBeGreaterThan(0);
        });
    });


    /* New Feed Selection Test Suite */
    describe('New Feed Selection', () => {

        let firstFeed,
            secondFeed,
            feed = $('.feed');

        /* Test 1: Test to confirm that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
        */

        beforeEach(done => {
            loadFeed(0, () => {
                firstFeed = feed.html();

                loadFeed(1, () => {
                    secondFeed = feed.html();
                    done();
                });
            });
        });

        it('has different feeds', () => {
           expect(firstFeed === secondFeed).not.toBe(true);
        });
    });

}());
