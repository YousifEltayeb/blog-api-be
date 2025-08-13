const { body, validationResult } = require("express-validator");
const prisma = require("./prismaClient");

// validation for creating posts & comments and updating a post
const emptyErr = "cannot be empty";
const existErr = "field must exist";
const emailErr = "must be a valid email";
const passwordErr = "must be at least 8 characters";
const alphaErr = "must only contain english letters.";

const validateSignup = [
  body("name")
    .exists()
    .withMessage(`Name ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`Name ${emptyErr}`)
    .bail()
    .isAlpha("en-US", { ignore: " " })
    .withMessage(`Name ${alphaErr}`),
  ,
  body("email")
    .exists()
    .withMessage(`Email ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`Email ${emptyErr}`)
    .bail()
    .isEmail()
    .withMessage(`Email ${emailErr}`)
    .custom(async (value) => {
      const author = await prisma.author.findUnique({
        where: {
          email: value,
        },
      });

      if (author) {
        throw new Error("Email is already used");
      }
    }),

  body("password")
    .exists()
    .withMessage(`Password ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyErr}`)
    .bail()
    .isLength({ min: 8 })
    .withMessage(`Password ${passwordErr}`),

  body("confirmPassword")
    .exists()
    .withMessage(`Password Confimation ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`Password Confimation ${emptyErr}`)
    .bail()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`Passwords must match`),
];

const validateLogin = [
  body("email")
    .exists()
    .withMessage(`Email ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`Email ${emptyErr}`)
    .bail()
    .isEmail()
    .withMessage(`Email ${emailErr}`),
  body("password")
    .exists()
    .withMessage(`Password ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyErr}`)
    .bail()
    .isLength({ min: 8 })
    .withMessage(`Password ${passwordErr}`),
];
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
  validateLogin,
  validateSignup,
};
