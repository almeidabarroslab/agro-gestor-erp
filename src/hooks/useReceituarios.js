import { useState, useEffect, useCallback } from 'react';
import { collection, query, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, orderBy } from 'firebase/firestore';

const useReceituarios = (db, userId, isAuthReady) => {
  const [receituarios, setReceituarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const appId = process.env.REACT_APP_FIREBASE_APP_ID || "default-agro-gestor-app";

  const getCollectionRef = useCallback(() => {
    if (db) {
      return collection(db, "artifacts", appId, "public", "data", "receituarios");
    }
    return null;
  }, [db, appId]);

  useEffect(() => {
    if (!isAuthReady || !db) {
      setIsLoading(false);
      return;
    }
    const q = query(getCollectionRef(), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReceituarios(lista);
        setIsLoading(false);
      },
      (err) => {
        console.error("Erro ao carregar receituários:", err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [db, isAuthReady, getCollectionRef]);

  const addReceituario = async (novoReceituario) => {
    if (!db) return;
    try {
      await addDoc(getCollectionRef(), {
        ...novoReceituario,
        userId,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Erro ao adicionar receituário:", err);
    }
  };

  const updateReceituario = async (id, dados) => {
    if (!db) return;
    try {
      const docRef = doc(db, "artifacts", appId, "public", "data", "receituarios", id);
      await updateDoc(docRef, dados);
    } catch (err) {
      console.error("Erro ao atualizar receituário:", err);
    }
  };

  const deleteReceituario = async (id) => {
    if (!db) return;
    try {
      const docRef = doc(db, "artifacts", appId, "public", "data", "receituarios", id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error("Erro ao excluir receituário:", err);
    }
  };

  return { receituarios, isLoading, addReceituario, updateReceituario, deleteReceituario };
};

export default useReceituarios;
