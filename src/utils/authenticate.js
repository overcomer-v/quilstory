import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, gProvider } from "./mfirebase";
import JournalEvent from "../models/Event";


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

    const demoJournal = new JournalEvent({
      title: `Welcome`,
      date: currentDate,
      tags: "#Journaling",
      journalEvent: demoEvent,
    });

export async function signUp(email, password, userName,uploadCallback) {
  
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential.user.uid);
    await uploadCallback(demoJournal.toObject(),userCredential.user.uid);
     return updateProfile(userCredential.user, { displayName: userName });

}

export async function signInWithGoogle(uploadCallback) {
  
    const userCredential = await signInWithPopup(
      auth,
     gProvider
    );
    return await uploadCallback(demoJournal.toObject(),userCredential.user.uid);

}

export async function logIn(email, password) {
 
    return await signInWithEmailAndPassword(auth, email, password);
}
