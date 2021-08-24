var express = require("express");
var router = express.Router();

router.get("/livecheck", function (req, res, next) {
  res.send("ok");
});

module.exports = router;
/**
 * @openapi
 * /livecheck:
 *   get:
 *     summary: livecheck for application
 *     description: livecheck for application
 *     responses:
 *       '200':
 *         description: Users were obtained
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
