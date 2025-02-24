import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const menuItems = [
  {
    id: "1",
    title: "Account Settings",
    icon: "account-cog",
    color: "#3B82F6",
  },
  {
    id: "2",
    title: "Notifications",
    icon: "bell",
    color: "#10B981",
  },
  {
    id: "3",
    title: "Payment Methods",
    icon: "credit-card",
    color: "#F59E0B",
  },
  {
    id: "4",
    title: "Security",
    icon: "shield-check",
    color: "#8B5CF6",
  },
  {
    id: "5",
    title: "Help & Support",
    icon: "help-circle",
    color: "#EC4899",
  },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <Pressable style={styles.settingsButton}>
            <MaterialCommunityIcons name="cog" size={24} color="#64748B" />
          </Pressable>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <MaterialCommunityIcons
                name="account"
                size={40}
                color="#FFFFFF"
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>Alex Johnson</Text>
              <Text style={styles.email}>alex.johnson@example.com</Text>
            </View>
          </View>
          <Pressable style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </Pressable>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <Pressable key={item.id} style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: item.color },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={20}
                    color="#FFFFFF"
                  />
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#64748B"
              />
            </Pressable>
          ))}
        </View>

        {/* Preferences */}
        <View style={styles.preferencesSection}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceTitle}>Dark Mode</Text>
            <Switch
              value={false}
              trackColor={{ false: "#E2E8F0", true: "#93C5FD" }}
              thumbColor={false ? "#3B82F6" : "#FFFFFF"}
            />
          </View>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceTitle}>Push Notifications</Text>
            <Switch
              value={true}
              trackColor={{ false: "#E2E8F0", true: "#93C5FD" }}
              thumbColor={true ? "#3B82F6" : "#FFFFFF"}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#0F172A",
  },
  settingsButton: {
    padding: 4,
  },
  profileCard: {
    margin: 20,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
  },
  email: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },
  editButton: {
    backgroundColor: "#EFF6FF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  editButtonText: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "500",
  },
  menuSection: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 14,
    color: "#0F172A",
  },
  preferencesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 16,
  },
  preferenceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  preferenceTitle: {
    fontSize: 14,
    color: "#0F172A",
  },
});
