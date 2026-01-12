import * as yup from "yup";

export const ProfileDetailsValidationSchema = yup.object({
  name: yup.string().required("Please provide your name"),
  userName: yup.string().required("Please provide your username"),
});

export const PasswordValidationSchema = yup.object({
  oldPassword: yup.string().required("Please enter your current password"),

  newPassword: yup
    .string()
    .required("Please enter your new password")
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password is too long")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[^a-zA-Z0-9]/, "Must contain at least one special character"),

  confirmNewPassword: yup
    .string()
    .required("Please confirm your new password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

export const TeamValidationSchema = yup.object({
  name: yup.string().required("Please provide your team name"),
  about: yup.string().required("Please provide your team about info"),
});
