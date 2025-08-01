// pages/common/ProfilePage.jsx

import { useEffect, useState } from "react";
import { Box, Alert, CircularProgress } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";
import SharedUserForm from "../../components/common/SharedUserForm";

const ProfilePage = () => {
  const { auth, setAuth } = useAuth();
  const [initialValues, setInitialValues] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/users/profile");
      setInitialValues(res.data);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to load profile";
      setError(msg);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await axios.patch("/users/profile", values);

      setSuccess("Profile updated successfully");

      // Refetch latest profile to reflect saved values
      const res = await axios.get("/users/profile");
      setInitialValues(res.data);

      // Update auth context
      setAuth((prev) => ({ ...prev, ...values }));

      // Auto-clear success after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      const msg = err.response?.data?.message || "Update failed";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!initialValues) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth="800px" mx="auto" mt={4}>
      <SharedUserForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isEditMode={true}
        isSubmitting={isSubmitting}
      />

      {success && (
        <Alert severity="success" sx={{ my: 2 }}>
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default ProfilePage;
