import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, gProvider } from "./mfirebase";
import JournalEvent from "../models/Event";
import { supabase } from "./supabase-client";

const currentDate = Date.now().toLocaleString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const demoEvent = `This message is a demo message, you can delete it.
This app is a simple journaling app designed to help you capture your thoughts, reflect on your day, 
and track your mood overtime.
Whether you are documenting daily events, setting goals, or practicing gratitude, 
QuilStory provides a safe and private space for self expression
`;

const demoJournal = {
  title: `Welcome`,
  tag: "#Journaling",
  event: demoEvent,
};

export async function signUp(email, password, userName) {
  try {
    const { data, error } = await supabase.auth.signUp({
      password: password,
      email: email,
    });

    if (error) {
      throw error;
    }

    console.l

    const { error: profileError } = await supabase
      .from("profiles")
      .insert([{ username: userName }]);
    if (profileError) {
      throw profileError;
    }

    const { error: journalError } = await supabase
      .from("journals")
      .insert([demoJournal]);
    if (journalError) {
      throw journalError;
    }


    console.log("successfull")
    console.log(data.user);
  } catch (error) {
    console.error(error);
    throw error;
  }

  // await uploadCallback(demoJournal.toObject(),userCredential.user.uid);
  //  return updateProfile(userCredential.user, { displayName: userName });
}
export async function logIn(email, password) {
  try {
    const { data,error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    console.log("Successfull",data);

  } catch (error) {
    console.error(error);
    throw error;
  }
}
