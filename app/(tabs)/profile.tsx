import { useState } from "react";
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
import { useUser } from "../../context/UserContext";
import EditProfileModal from "../../components/EditProfileModal";
import { toast } from "sonner-native";

const menuItems = [
  {
    id: "1",
    title: "Account Settings",
    icon: "account-cog",
    color: "#3B82F6",
    action: "account",
  },
  {
    id: "2",
    title: "Notifications",
    icon: "bell",
    color: "#10B981",
    action: "notifications",
  },
  {
    id: "3",
    title: "Payment Methods",
    icon: "credit-card",
    color: "#F59E0B",
    action: "payment",
  },
  {
    id: "4",
    title: "Security",
    icon: "shield-check",
    color: "#8B5CF6",
    action: "security",
  },
  {
    id: "5",
    title: "Help & Support",
    icon: "help-circle",
    color: "#EC4899",
    action: "help",
  },
];

export default function ProfileScreen() {
  const { profile, settings, updateProfile, updateSettings } = useUser();
  const [editProfileVisible, setEditProfileVisible] = useState(false);

  const handleMenuItemPress = (action: string) => {
    switch (action) {
      case "account":
        setEditProfileVisible(true);
        break;
      case "notifications":
        updateSettings({ notifications: !settings.notifications });
        toast.success(
          `Notifications ${settings.notifications ? "disabled" : "enabled"}`
        );
        break;
      case "payment":
        toast.info("Payment methods feature coming soon");
        break;
      case "security":
        toast.info("Security settings feature coming soon");
        break;
      case "help":
        toast.info("Help & Support feature coming soon");
        break;
      default:
        break;
    }
  };

  const handleUpdateProfile = (updatedProfile: any) => {
    updateProfile(updatedProfile);
  };

  const handleToggleDarkMode = () => {
    updateSettings({ darkMode: !settings.darkMode });
  };

  const handleToggleNotifications = () => {
    updateSettings({ notifications: !settings.notifications });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <Pressable
            style={styles.settingsButton}
            onPress={() => toast.info("Settings feature coming soon")}
          >
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
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.email}>{profile.email}</Text>
            </View>
          </View>
          <Pressable
            style={styles.editButton}
            onPress={() => setEditProfileVisible(true)}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </Pressable>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <Pressable
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuItemPress(item.action)}
            >
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
              value={settings.darkMode}
              trackColor={{ false: "#E2E8F0", true: "#93C5FD" }}
              thumbColor={settings.darkMode ? "#3B82F6" : "#FFFFFF"}
              onValueChange={handleToggleDarkMode}
            />
          </View>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceTitle}>Push Notifications</Text>
            <Switch
              value={settings.notifications}
              trackColor={{ false: "#E2E8F0", true: "#93C5FD" }}
              thumbColor={settings.notifications ? "#3B82F6" : "#FFFFFF"}
              onValueChange={handleToggleNotifications}
            />
          </View>
        </View>

        {/* Logout Button */}
        <Pressable
          style={styles.logoutButton}
          onPress={() => toast.info("Logout feature coming soon")}
        >
          <MaterialCommunityIcons name="logout" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </ScrollView>

      <EditProfileModal
        visible={editProfileVisible}
        onClose={() => setEditProfileVisible(false)}
        currentProfile={profile}
        onUpdateProfile={handleUpdateProfile}
      />
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
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 40,
    marginTop: 20,
    padding: 16,
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
  },
  logoutText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
