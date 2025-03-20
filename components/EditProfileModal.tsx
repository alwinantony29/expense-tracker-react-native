import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { toast } from "sonner-native";
import { UserProfile } from "../context/UserContext";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  currentProfile: UserProfile;
  onUpdateProfile: (profile: Partial<UserProfile>) => void;
}

export default function EditProfileModal({
  visible,
  onClose,
  currentProfile,
  onUpdateProfile,
}: EditProfileModalProps) {
  const [name, setName] = useState(currentProfile.name || "");
  const [email, setEmail] = useState(currentProfile.email || "");

  const handleUpdateProfile = () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    onUpdateProfile({
      name: name.trim(),
      email: email.trim(),
    });

    toast.success("Profile updated successfully");
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Edit Profile</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialCommunityIcons name="close" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <MaterialCommunityIcons
                  name="account"
                  size={60}
                  color="#FFFFFF"
                />
              </View>
              <TouchableOpacity style={styles.changeAvatarButton}>
                <Text style={styles.changeAvatarText}>Change Photo</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleUpdateProfile}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    height: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
  },
  closeButton: {
    padding: 4,
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  changeAvatarButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#EFF6FF",
    borderRadius: 20,
  },
  changeAvatarText: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "500",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    marginTop: "auto",
  },
  saveButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
