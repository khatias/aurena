"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "../../../utils/supabse/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  //get email and password from formData
  const email = formData.get("email");
  const password = formData.get("password");

  //validate email and password
  if (typeof email !== "string" || typeof password !== "string") {
    return { success: false, error: "Invalid form data. Please try again." };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // Validate password length (e.g., minimum 6 characters)
  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters." };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false, error: error.message };
  }
  // Revalidate the root path to ensure the session is updated
  revalidatePath("/", "layout");
  // Redirect to the home page after successful login 
  return { success: true };
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const email = formData.get("email");
  const password = formData.get("password");

  // 1) Validate presence
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email ||
    !password
  ) {
    return { success: false, error: "Please enter both email and password." };
  }

  // 2) Validate email format (simple but effective)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
