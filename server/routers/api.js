var express = require('express');
var app = express();
var router = express.Router();
router.post('/user', function (req, res, next) {
    res.send('123');
});
module.exports = router;