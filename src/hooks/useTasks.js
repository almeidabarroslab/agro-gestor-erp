import { useState, useEffect, useCallback } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  where,
} from "firebase/firestore";

const useTasks = (db, userId, isAuthReady) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const appId =
    process.env.REACT_APP_FIREBASE_APP_ID || "default-agro-gestor-app";

  const getCollectionRef = useCallback(() => {
    if (db) {
      return collection(db, "artifacts", appId, "public", "data", "tasks");
    }
    return null;
  }, [db, appId]);

  useEffect(() => {
    if (!isAuthReady || !db) {
      setIsLoading(false);
      return;
    }
    const q = query(getCollectionRef(), orderBy("name"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const listaTasks = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setTasks(listaTasks);
        setIsLoading(false);
      },
      (err) => {
        console.error("Erro ao carregar tarefas:", err);
        setIsLoading(false);
      }
    );
    return () => unsubscribe();
  }, [db, isAuthReady, getCollectionRef, userId]);

  const addTask = async (task) => {
    if (!db) return;
    try {
      await addDoc(getCollectionRef(), {
        ...task,
        userId,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Erro ao adicionar tarefa:", err);
    }
  };

  const updateTask = async (id, dados) => {
    if (!db) return;
    try {
      const docRef = doc(db, "artifacts", appId, "public", "data", "tasks", id);
      await updateDoc(docRef, dados);
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err);
    }
  };

  const deleteTask = async (id) => {
    if (!db) return;
    try {
      const docRef = doc(db, "artifacts", appId, "public", "data", "tasks", id);
      await updateDoc(docRef, { deleted: true }); // Soft delete
    } catch (err) {
      console.error("Erro ao excluir tarefa:", err);
    }
  };

  return { tasks, isLoading, addTask, updateTask, deleteTask };
};

export default useTasks;
