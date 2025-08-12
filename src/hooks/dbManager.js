import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, storage } from "../utils/mfirebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export function useJournalDatabaseManager() {
  const [events, setEvent] = useState([]);
  const [isJournalLoading, setIsDataLoading] = useState(true);
  const [journalError, setError] = useState("");

  async function uploadEvent(event, image, currentUserId) {
    if (image) {
      try {
        const imgRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imgRef, image);
        const downloadUrl = await getDownloadURL(imgRef);
        await addDoc(collection(db, "users", currentUserId, "events"), {
          ...event,
          imageUrl: downloadUrl,
        });
      } catch (error) {
        alert(error);
        setError(error.message);
      }
    } else {
      try {
        await addDoc(collection(db, "users", currentUserId, "events"), event);
      } catch (error) {
        alert(error);
        setError(error);
      }
    }
    return loadEvents(currentUserId);
  }

  async function loadEvents(currentUserId) {
    if (currentUserId) {
      const listHolder = [];
      setIsDataLoading(true);
      try {
        const fetchedDocs = await getDocs(
          collection(db, "users", currentUserId, "events")
        );
        fetchedDocs.forEach((doc) => {
          listHolder.push(doc.data());
        });
        setEvent(listHolder);
      } catch (error) {
        alert(error.message);
        setError(error.message);
      } finally {
        setIsDataLoading(false);
      }
    } else {
      throw new Error("User Not Sign In");
    }
  }

  return { events, isJournalLoading, uploadEvent, loadEvents, journalError };
}

export function useNoteDatabaseManager() {
  const [notes, setNotes] = useState([]);
  const [isNotesLoading, setIsDataLoading] = useState(true);
  const [notesError, setError] = useState("");

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  async function uploadNotes(note, currentUserId) {
    try {
      await addDoc(collection(db, "users", currentUserId, "notes"), note);
      return loadNotes(currentUserId);
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  }

  async function loadNotes(currentUserId) {
    if (currentUserId) {
      const listHolder = [];
      setIsDataLoading(true);
      try {
        const fetchedDocs = await getDocs(
          collection(db, "users", currentUserId, "notes")
        );
        fetchedDocs.forEach((doc) => {
          listHolder.push(doc.data());
        });
        setNotes(listHolder);
      } catch (error) {
        alert(error.message);
        setError(error.message);
      } finally {
        setIsDataLoading(false);
      }
    } else {
      throw new Error("User Not Sign In");
    }
  }

  return { notes, isNotesLoading, uploadNotes, loadNotes, notesError };
}
