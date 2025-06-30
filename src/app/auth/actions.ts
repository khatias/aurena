"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../../../utils/supabse/server";
import Stripe from "stripe";

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
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-05-28.basil",
  });
  const supabase = await createClient();

  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("email", formData.get("email"))
    .single();

  if (existingUser) {
    return {
      success: false,
      error:
        "This email is already registered. Please login or reset your password.",
    };
  }
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  // Validate inputs
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof confirmPassword !== "string"
  ) {
    return { success: false, error: "Invalid form data. Please try again." };
  }

  if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
    return { success: false, error: "All fields are required." };
  }

  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters." };
  }

  const { data, error } = await supabase.auth.signUp({ email, password });

  const userId = data?.user?.id;
  if (!userId) {
    return {
      success: false,
      error: "Could not create user. Please try again.",
    };
  }

  if (error) {
    return { success: false, error: error.message };
  }
  try {
    const customer = await stripe.customers.create({
      email: email,
    });
    const { error: updateError } = await supabase
      .from("users")
      .update({ stripe_customer_id: customer.id })
      .eq("id", userId);
    if (error) {
      console.error("Error creating Stripe customer:", error);
      return {
        success: false,
        error:
          "An error occurred while creating your account. Please try again.",
      };
    }
    if (updateError) {
      console.error(
        "Error updating user with Stripe customer ID:",
        updateError
      );
      return {
        success: false,
        error:
          "An error occurred while creating your account. Please try again.",
      };
    }
  } catch (error) {
    console.error("Error creating Stripe customer:", error);
    return {
      success: false,
      error: "An error occurred while creating your account. Please try again.",
    };
  }

  return {
    success: true,
    message: "Check your email for a confirmation link.",
  };
}
