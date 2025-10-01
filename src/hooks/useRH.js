import { useState, useEffect, useCallback } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

const useRH = (db, userId, isAuthReady) => {
  const [equipe, setEquipe] = useState([]);
  const [isLoadingRH, setIsLoadingRH] = useState(true);
  const appId = process.env.REACT_APP_FIREBASE_APP_ID || "default-agro-gestor-app";

  const getCollectionRef = useCallback(() => {
    if (db) {
      return collection(db, "artifacts", appId, "public", "data", "rh");
    }
    return null;
  }, [db, appId]);

  useEffect(() => {
    if (!isAuthReady || !db) {
      setIsLoadingRH(false);
      return;
    }
    const q = query(getCollectionRef(), orderBy("nome"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const listaEquipe = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEquipe(listaEquipe);
        setIsLoadingRH(false);
      },
      (err) => {
        console.error("Erro ao carregar equipe:", err);
        setIsLoadingRH(false);
      }
    );

    return () => unsubscribe();
  }, [db, isAuthReady, getCollectionRef]);

  const addMembro = async (novoMembro) => {
    if (!db) return;
    try {
      await addDoc(getCollectionRef(), {
        ...novoMembro,
        userId,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Erro ao adicionar membro:", err);
    }
  };

  const updateMembro = async (id, dados) => {
    if (!db) return;
    try {
      const docRef = doc(db, "artifacts", appId, "public", "data", "rh", id);
      await updateDoc(docRef, dados);
    } catch (err) {
      console.error("Erro ao atualizar membro:", err);
    }
  };

  return { equipe, isLoadingRH, addMembro, updateMembro };
};

export default useRH;