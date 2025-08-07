const { body, validationResult } = require("express-validator");

// validation for creating posts & comments and updating a post
const emptyErr = "cannot be empty";
const existErr = "field must exist";
const validateCreatePost = [
  body("title")
    .exists()
    .withMessage(`Title ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`Title ${emptyErr}`)
    .bail()
    .isString(),
  body("content")
    .exists()
    .withMessage(`Content ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`Content ${emptyErr}`)
    .bail()
    .isString(),
];

const validateUpdatePost = [
  body("title")
    .optional({ values: "falsy" })
    .exists()
    .withMessage(`Title ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`Title ${emptyErr}`)
    .bail()
    .isString(),
  body("content")
    .optional({ values: "falsy" })
    .exists()
    .withMessage(`Content ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`Content ${emptyErr}`)
    .bail()
    .isString(),
  body("status")
    .optional({ values: "falsy" })
    .exists()
    .withMessage(`Content ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`Content ${emptyErr}`)
    .bail()
    .isString()
    .custom(async (value) => {
      if (value !== "true" && value !== "false") {
        throw new Error("status can only be true or false");
      }
    }),
];
const validateComment = [
  body("name")
    .exists()
    .withMessage(`Name ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`Name ${emptyErr}`)
    .bail()
    .isString(),
  body("content")
    .exists()
    .withMessage(`Contnet ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`Content ${emptyErr}`)
    .bail()
    .isString(),
];
module.exports = {
  validateCreatePost,
  validationResult,
  validateUpdatePost,
  validateComment,
};
