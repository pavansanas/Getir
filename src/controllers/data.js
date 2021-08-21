var express = require("express");
const { body, validationResult } = require("express-validator");
var router = express.Router();

router.post(
  "/data",
  body("startDate").isDate().withMessage("date format should be yyyy-MM-dd"),
  body("endDate").isDate().withMessage("date format should be yyyy-MM-dd"),
  body("minCount").isNumeric().withMessage("it should be number"),
  body("maxCount").isNumeric().withMessage("it should be number"),
  function (req, res) {
    const { isValidate, errorMessage } = validateRequest(req);
    if (!isValidate) {
      return res.status(400).json(errorMessage);
    }
    return res.send("ok");
  }
);
/**
 * @typedef {Object} ValidationResult
 * @property {boolean} isValidate - true if req is validate otherwise false
 * @property {string} errorMessage - error message if validation fail
 */
/**
 * validate request body
 * @param  req
 * @returns {ValidationResult}
 *     validation Result
 */
function validateRequest(req) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let message = "";
    errors.array().forEach((err) => {
      message = `${message} ${err.param}:${err.msg},`;
    });
    return {
      isValidate: false,
      errorMessage: {
        error_message: (message = message.substring(0, message.length - 1)),
        internal_code: 400,
      },
    };
  }
  return { isValidate: true };
}

module.exports = router;

/**
 * @openapi
 * "/v0/data":
 *   post:
 *     tags:
 *     - User Data
 *     description: Get Data
 *     operationId: getData
 *     requestBody:
 *       description: input data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 required: true
 *               endDate:
 *                 type: string
 *                 format: date
 *               minCount:
 *                 type: integer
 *               maxCount:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Users were obtained
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   format: int32
 *                 msg:
 *                   type: string
 *                 records:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       key:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       totalCount:
 *                         type: integer
 *                         format: int32
 *       '400':
 *         description: Invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/Error"
 *               example:
 *                 message: Input data validation fail
 *                 internal_code: invalid_parameters
 *       '500':
 *         description: Invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/Error"
 *               example:
 *                 message: internal server fail
 *                 internal_code: internal_error
 */
