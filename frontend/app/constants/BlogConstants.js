var keyMirror = require('react/lib/keyMirror');

var constants = keyMirror({
    BLOG_FETCH: null,
    BLOG_FETCH_SUCCESS: null,
    BLOG_FETCH_FAIL: null,

    ALL_BLOG_FETCH: null,
    ALL_BLOG_FETCH_SUCCESS: null,
    ALL_BLOG_FETCH_FAIL: null,

    //Blog save
    BLOG_POST_SAVE: null,
    BLOG_POST_SAVE_SUCCESS: null,
    BLOG_POST_SAVE_FAIL: null,

    //Login
    LOGIN: null,
    LOGIN_COMPLETED: null,
    LOGIN_ERROR: null,

    AUTHENTICATE: null,
    AUTHENTICATE_COMPLETED: null,
    AUTHENTICATE_ERROR: null
});

module.exports = constants;
