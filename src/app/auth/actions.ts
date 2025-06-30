"use server";

import { revalidatePath } from "next/cache";

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

  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("email", formData.get("email")) // the email to check if it exists
    .single();

  // throw an error if a record is found.
  if (existingUser) {
    return {
      success: false,
      error:
        "This email is already registered. Please login or reset your password.",
    };
  }
  const email = formData.get("email");
  const password = formData.get("password");
  if (typeof email !== "string" || typeof password !== "string") {
    return { success: false, error: "Invalid form data. Please try again." };
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return { success: false, error: "Invalid form data. Please try again." };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters." };
  }

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    return { success: false, error: error.message };
  }

  // No error: signup went through OR confirmation was resent
  return {
    success: true,
    message: "Check your email for a confirmation link.",
  };
}
