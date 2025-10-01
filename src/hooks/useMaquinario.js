import { useState, useEffect, useCallback } from 'react';
import { collection, query, onSnapshot, addDoc, updateDoc, doc, serverTimestamp, orderBy } from 'firebase/firestore';

const useMaquinario = (db, userId, isAuthReady) => {
  const [maquinario, setMaquinario] = useState([]);
  const [isLoadingMaquinario, setIsLoadingMaquinario] = useState(true);
  const appId = process.env.REACT_APP_FIREBASE_APP_ID || "default-agro-gestor-app";

  const getCollectionRef = useCallback(() => {
    if (db) {
      return collection(db, "artifacts", appId, "public", "data", "maquinario");
    }
    return null;
  }, [db, appId]);

  useEffect(() => {
    if (!isAuthReady || !db) {
      setIsLoadingMaquinario(false);
      return;
    }
    const q = query(getCollectionRef(), orderBy("nome"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const listaMaquinario = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMaquinario(listaMaquinario);
        setIsLoadingMaquinario(false);
      },
      (err) => {
        console.error("Erro ao carregar maquinário:", err);
        setIsLoadingMaquinario(false);
      }
    );

    return () => unsubscribe();
  }, [db, isAuthReady, getCollectionRef]);

  const addMaquina = async (novaMaquina) => {
    if (!db) return;
    try {
      await addDoc(getCollectionRef(), {
        ...novaMaquina,
        userId,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Erro ao adicionar máquina:", err);
    }
  };

  const updateMaquina = async (id, dados) => {
    if (!db) return;
    try {
      const docRef = doc(db, "artifacts", appId, "public", "data", "maquinario", id);
      await updateDoc(docRef, dados);
    } catch (err) {
      console.error("Erro ao atualizar máquina:", err);
    }
  };

  return { maquinario, isLoadingMaquinario, addMaquina, updateMaquina };
};

export default useMaquinario;
