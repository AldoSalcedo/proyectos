import * as React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ThemedView } from "@/components/themed";

export default function UserInfoScreen() {
  return (
    <ThemedView className="flex-1">
      <ThemeToggle />
    </ThemedView>
  );
}
