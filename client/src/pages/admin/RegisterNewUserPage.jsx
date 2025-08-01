// pages/admin/RegisterNewUserPage.jsx

import { useState } from "react";
import { Box, Typography, Alert } from "@mui/material";
import axios from "../../api/axios";
import SharedUserForm from "../../components/common/SharedUserForm";

const RegisterNewUserPage = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    dob: "",
    phone: "",
    address: { city: "", state: "" },
    role: "user",
    status: "active",
  };

  const handleSubmit = async (values, { resetForm }) => {
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      await axios.post("/auth/register", {
        ...values,
        password: "DefaultPass123", // Backend can override or require admin to set it later
      });

      setSuccess("User registered successfully");
      resetForm();
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box maxWidth="800px" mx="auto" mt={4}>
      <SharedUserForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isEditMode={false}
        isSubmitting={isSubmitting}
      />
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default RegisterNewUserPage;
