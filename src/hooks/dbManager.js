import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/mfirebase";
import { supabase } from "../utils/supabase-client";

export function useJournalDatabaseManager() {
  const [events, setEvent] = useState([]);
  const [isJournalLoading, setIsDataLoading] = useState(true);
  const [journalError, setError] = useState("");

  async function uploadEvent(event, image, currentUserId) {
    if (image) {
      try {
        const imageData = await uploadImage(image, currentUserId);
        if (imageData) {
          await addDoc(collection(db, "users", currentUserId, "events"), {
            ...event,
            imageUrl: imageData,
          });
        }
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

  async function getImageUrl(filePath) {
    if (filePath) {
      try {
        const { data, error } = await supabase.storage
          .from("journal-images")
          .createSignedUrl(filePath, 60);

        if (error) {
          throw error;
        } else {
          return data.signedUrl;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  async function uploadImage(file, userId) {
    try {
      const filePath = `${userId}/${Date.now()}-${file.name}`;

      const { data, error } = await supabase.storage
        .from("journal-images")
        .upload(filePath, file);

      if (error) {
        console.log(error);
        return null;
      } else {
        console.log("success", data.path);
        return data.path;
      }
    } catch (error) {
      console.log("failed", error);
    }
  }

  async function deleteImageFromSupabase(imagePath) {
    const { error } = await supabase.storage
      .from("journal-images")
      .remove([imagePath]);

    if (error) {
      console.log(error);
      throw error;
    }

    console.log("image deleted");
  }

  async function deleteDocumentFromFirestore(itemId, currentUserId) {
    const docRef = doc(db, "users", currentUserId, "events", itemId);
    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.log("firebase", error);
    }
    console.log("items deleted");
  }

  async function deleteItem(currentUserId, itemId, imagePath) {
    try {
      if (imagePath) {
        await deleteImageFromSupabase(imagePath);
      } else {
        console.log("No imagePath");
      }
      if (itemId) {
        await deleteDocumentFromFirestore(itemId, currentUserId);
      } else {
        console.log("No item id");
      }
      loadEvents(currentUserId);
    } catch (error) {
      console.error("error deleting files :", error.message);
    }
  }

  async function loadEvents(currentUserId) {
    if (currentUserId) {
      setIsDataLoading(true);
      try {
        const fetchedDocs = await getDocs(
          collection(db, "users", currentUserId, "events")
        );

        const items = await Promise.allSettled(
          fetchedDocs.docs.map(async (obj) => {
            return {
              ...obj.data(),
              id: obj.id,
              imageSrc: await getImageUrl(obj.data().imageUrl),
            };
          })
        );

        setEvent(items.map((e) => e.value));
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

  async function getItem(currentUserId, itemId) {
    try {
      setIsDataLoading(true);
      console.log(itemId);
      const docRef = doc(db, "users", currentUserId, "events", itemId);
      const docSnap = await getDoc(docRef);
      setIsDataLoading(false);
      if (docSnap.exists()) {
        return {
          imageSrc: await getImageUrl(docSnap.data().imageUrl),
          ...docSnap.data(),
          id: docSnap.id,
        };
      } else {
        console.log("Document does not exist");
        return null;
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsDataLoading(false);
    }
    return null;
  }

  async function updateItem(currentUserId, itemId, item, oldImagePath,  image) {
    if (image) {
      if (oldImagePath) {
        await supabase.storage.from("journal-images").remove([oldImagePath]);
      }

      const newImagePath = await uploadImage(image, currentUserId);
      try {
        const docRef = doc(db, "users", currentUserId, "events", itemId);
        await updateDoc(docRef, { ...item, imageUrl:newImagePath });
        console.log("Document updated");
      } catch (error) {
        console.log(error);
      }
    }else{
      
    try {
      const docRef = doc(db, "users", currentUserId, "events", itemId);
      await updateDoc(docRef, item);
      console.log("Document updated");
    } catch (error) {
      console.log(error);
    }
    }

  }
  return {
    events,
    isJournalLoading,
    uploadEvent,
    loadEvents,
    journalError,
    getImageUrl,
    deleteItem,
    getItem,
    updateItem,
  };
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
      setIsDataLoading(true);
      try {
        const fetchedDocs = await getDocs(
          collection(db, "users", currentUserId, "notes")
        );
        const items = fetchedDocs.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setNotes(items);
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

  async function getNoteItem(currentUserId, noteId) {
    try {
      setIsDataLoading(true);
      const docRef = doc(db, "users", currentUserId, "notes", noteId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          ...docSnap.data(),
          id: docSnap.id,
        };
      } else {
        console.log("document does not exist");
      }
    } catch (error) {
      console.error("An error occurred", error);
    } finally {
      setIsDataLoading(false);
    }
  }

  async function deleteNoteItem(currentUserId, noteId) {
    try {
      const docRef = doc(db, "users", currentUserId, "notes", noteId);
      await deleteDoc(docRef);
      loadNotes(currentUserId);
      console.log("Note deleted successfully");
    } catch (error) {
      console.log("An Error Occured", error);
    }
  }
  async function updateNoteItem(currentUserId, noteId, noteItem) {
    try {
      const docRef = doc(db, "users", currentUserId, "notes", noteId);
      await updateDoc(docRef, noteItem);
      console.log("Note Updated");
    } catch (error) {
      console.error("An error occured", error);
    }
  }

  return {
    notes,
    isNotesLoading,
    uploadNotes,
    loadNotes,
    notesError,
    getNoteItem,
    updateNoteItem,
    deleteNoteItem,
  };
}
