const router = require("express-promise-router")();
const Blind = require("../controllers/blind");
const Controller = require('../controllers/controllers');
const Watcher = require('../controllers/watcher');
const checkAuth = require("../middleware/check-auth");

router.route('/:schema')
    .get(Controller.readAllData)
    .post(Controller.createData)

router.route('/Watcher/find')
    .all(checkAuth)
    .get(Watcher.findWatcherByToken)

router.route('/Watcher/changepassword')
    .all(checkAuth)
    .put(Watcher.changePassword)

router.route('/:schema/:_id')
    .get(Controller.readDataById)
    .put(Controller.updateDataById)
    .delete(Controller.deleteDataById)

 router.route('/Blind/updatelocation/:_id/')
    .post(Blind.addLocationInDataById)

router.route('/Blind/updatewatcher/:_id')
    .post(Blind.addWatcherInBlindById)

router.route('/Watcher/create')
    .post(Watcher.createData)

router.route('/Blind/create')
    .post(Blind.creteData)

router.route('/Watcher/loginwatcher')
    .post(Watcher.loginWatcher)



//router.route('/Watcher/pass')
    //.post(Watcher.createDataHashPassword)
module.exports = router