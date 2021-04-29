const router = require("express").Router();
const FirebaseCollectionFactory = require("../factory/FirebaseCollectionFactory");
const pointsController = require("../controller/points.controller");

router.use((req, res, next) => {
    req.pointsCollectionRef = (new FirebaseCollectionFactory(`users/${req.body.id}/points`)).getReference();
    next();
});


router.post("/api/users/points/create", pointsController.createPoints);
router.get("/api/users/points/:id", pointsController.getPoints);
router.put("/api/users/points/update", pointsController.updatePoints);
router.delete("/api/users/points/delete/:id", pointsController.deletePoints);


module.exports = router;