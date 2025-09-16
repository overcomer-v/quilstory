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

  const profilesTable = "profiles";
  const journalsTable = "journals";

  async function uploadEvent(event, image, currentUserId) {
    if (image) {
      try {
        const imageData = await uploadImage(image, currentUserId);
        if (imageData) {
          const { error } = await supabase
            .from(journalsTable)
            .insert([{ ...event, image_url: imageData }]);

          if (error) {
            throw error;
          }
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    } else {
      try {
        const { error } = await supabase.from(journalsTable).insert([event]);
        if (error) {
          throw error;
        }
      } catch (error) {
        console.log(error);
        throw error;
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

  async function deleteJournalInfo(itemId) {
    try {
      const { error } = await supabase
        .from(journalsTable)
        .delete()
        .eq("id", itemId);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.log("documentInfo", error);
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
        await deleteJournalInfo(itemId);
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
      console.log(currentUserId);
      setIsDataLoading(true);
      try {
        const { data, error } = await supabase
          .from(journalsTable)
          .select("*")
          .eq("user_id", currentUserId);

        if (error) {
          throw error;
        }

        const items = await Promise.allSettled(
          data.map(async (obj) => {
            return {
              ...obj,
              imageSrc: await getImageUrl(obj.image_url),
            };
          })
        );

        setEvent(items.map((e) => e.value));
      } catch (error) {
        console.error(error);
        throw error;
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
      const { data, error } = await supabase
        .from(journalsTable)
        .select("*")
        .eq("id", itemId);

      if (error) {
        throw error;
      }

      if (data.length != 0) {
        return {
          ...data[0],
          imageSrc: await getImageUrl(data[0].image_url),
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

  async function updateItem(currentUserId, itemId, item, oldImagePath, image) {
    if (image) {
      if (oldImagePath) {
        const { error } = await supabase.storage
          .from("journal-images")
          .remove([oldImagePath]);

        if (error) {
          throw error;
        }
      }

      const newImagePath = await uploadImage(image, currentUserId);
      try {
        const { error } = await supabase
          .from(journalsTable)
          .update({ ...item, image_url: newImagePath })
          .eq("id", itemId);

        if (error) {
          throw error;
        }
        console.log("Document updated");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { error } = await supabase
          .from(journalsTable)
          .update(item)
          .eq("id", itemId);

        if (error) {
          throw error;
        }

        console.log("Document updated");
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function queryJournals(keyword) {
    try {
      const { data, error } = await supabase
        .from(journalsTable)
        .select("*")
        .or(
          `title.ilike.%${keyword}%,event.ilike.%${keyword}%,tag.ilike.%${keyword}%`
        );
      if (error) {
        throw error;
      }
      const items = await Promise.allSettled(
          data.map(async (obj) => {
            return {
              ...obj,
              imageSrc: await getImageUrl(obj.image_url),
            };
          })
        );

        return items.map((e)=> e.value)
       
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return {
    events,
    isJournalLoading,
    uploadEvent,
    loadEvents,
    getImageUrl,
    deleteItem,
    getItem,
    updateItem,
    queryJournals,
  };
}

export function useNoteDatabaseManager() {
  const [notes, setNotes] = useState([]);
  const [isNotesLoading, setIsDataLoading] = useState(true);
  // const [notesError, setError] = useState("");

  const notesTable = "notes";

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  async function uploadNotes(note, currentUserId) {
    try {
      const { error } = await supabase.from(notesTable).insert([note]);

      if (error) {
        throw error;
      }

      await loadNotes(currentUserId);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function loadNotes(currentUserId) {
    if (currentUserId) {
      setIsDataLoading(true);
      try {
        const { error, data } = await supabase
          .from(notesTable)
          .select("*")
          .eq("user_id", currentUserId);

        if (error) {
          throw error;
        }

        setNotes(data);
      } catch (error) {
        console.error(error);
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

      const { data, error } = await supabase
        .from(notesTable)
        .select("*")
        .eq("id", noteId);

      if (error) {
        throw error;
      }

      if (data) {
        console.log(data);

        return data[0];
      } else {
        console.log("document does not exist");
      }
    } catch (error) {
      console.error("An error occurred", error);
      throw error;
    } finally {
      setIsDataLoading(false);
    }
  }

  async function deleteNoteItem(currentUserId, noteId) {
    try {
      const { error } = await supabase
        .from(notesTable)
        .delete()
        .eq("id", noteId);

      if (error) {
        throw error;
      }

      loadNotes(currentUserId);
      console.log("Note deleted successfully");
    } catch (error) {
      console.log("An Error Occured", error);
    }
  }
  async function updateNoteItem(currentUserId, noteId, noteItem) {
    try {
      const { error } = await supabase
        .from(notesTable)
        .update(noteItem)
        .eq("id", noteId);

      if (error) {
        throw error;
      }

      console.log("Note Updated");
    } catch (error) {
      console.error("An error occured", error);
      throw error;
    }
  }

   async function queryNotes(keyword) {
    try {
      const { data, error } = await supabase
        .from(notesTable)
        .select("*")
        .or(
          `title.ilike.%${keyword}%,note.ilike.%${keyword}%`
        );
      if (error) {
        throw error;
      }
     
        return data;
       
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return {
    notes,
    isNotesLoading,
    uploadNotes,
    loadNotes,
    getNoteItem,
    updateNoteItem,
    deleteNoteItem,
    queryNotes
  };
}
