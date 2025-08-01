// components/common/SharedUserForm.jsx

import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  firstName: Yup.string().max(30, "Max 30 characters"),
  lastName: Yup.string().max(30, "Max 30 characters"),
  age: Yup.number()
    .nullable()
    .min(0, "Age cannot be negative")
    .max(150, "Age seems unrealistic"),
  gender: Yup.string().oneOf(["male", "female", "other", ""], "Invalid gender"),
  dob: Yup.date().nullable(),
  phone: Yup.string()
    .nullable()
    .matches(
      /^\+?\d{10,15}$/,
      "Phone number must be 10–15 digits and can start with +"
    ),
  address: Yup.object({
    city: Yup.string().nullable(),
    state: Yup.string().nullable(),
  }),
  role: Yup.string().oneOf(["user", "admin"], "Invalid role"),
  status: Yup.string().oneOf(["active", "inactive"], "Invalid status"),
});

const SharedUserForm = ({ initialValues,onSubmit,isEditMode = false,isSubmitting = false,}) => {
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit,
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      display="flex"
      flexDirection="column"
      gap={2}
      maxWidth={600}
      mx="auto"
    >
      <Typography variant="h6" textAlign="center">
        {isEditMode ? "Edit Profile" : "Register New User"}
      </Typography>

      <TextField
        name="username"
        label="Username"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
      />

      <TextField
        name="email"
        label="Email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <TextField
        name="firstName"
        label="First Name"
        value={formik.values.firstName}
        onChange={formik.handleChange}
      />

      <TextField
        name="lastName"
        label="Last Name"
        value={formik.values.lastName}
        onChange={formik.handleChange}
      />

      <TextField
        name="age"
        label="Age"
        type="number"
        value={formik.values.age || ""}
        onChange={formik.handleChange}
        error={formik.touched.age && Boolean(formik.errors.age)}
        helperText={formik.touched.age && formik.errors.age}
      />

      <TextField
        name="gender"
        label="Gender"
        select
        value={formik.values.gender || ""}
        onChange={formik.handleChange}
      >
        <MenuItem value="">Select</MenuItem>
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
        <MenuItem value="other">Other</MenuItem>
      </TextField>

      <TextField
        name="dob"
        label="Date of Birth"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formik.values.dob ? formik.values.dob.substring(0, 10) : ""}
        onChange={formik.handleChange}
      />

      <TextField
        name="phone"
        label="Phone"
        value={formik.values.phone || ""}
        onChange={formik.handleChange}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
      />

      <TextField
        name="address.city"
        label="City"
        value={formik.values.address?.city || ""}
        onChange={formik.handleChange}
      />

      <TextField
        name="address.state"
        label="State"
        value={formik.values.address?.state || ""}
        onChange={formik.handleChange}
      />

      {/* Admin-only fields (show only if passed in initialValues) */}
      {formik.values.role !== undefined && (
        <TextField
          name="role"
          label="Role"
          select
          value={formik.values.role}
          onChange={formik.handleChange}
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>
      )}

      {formik.values.status !== undefined && (
        <TextField
          name="status"
          label="Status"
          select
          value={formik.values.status}
          onChange={formik.handleChange}
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
      )}

      <Button type="submit" variant="contained" disabled={isSubmitting}>
        {isSubmitting
          ? "Submitting..."
          : isEditMode
          ? "Save Changes"
          : "Register"}
      </Button>
    </Box>
  );
};

export default SharedUserForm;


// formik.handleSubmit internally calls the parent onSubmit function with:
// values: all form field data
// { resetForm, setSubmitting, ... }: useful helper functions
// ...and you get them as parameters in the parent!