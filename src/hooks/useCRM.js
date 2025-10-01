import { useState, useEffect, useCallback } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

const useCRM = (db, userId, isAuthReady) => {
  const [contatos, setContatos] = useState([]);
  const [isLoadingCRM, setIsLoadingCRM] = useState(true);
  const appId = process.env.REACT_APP_FIREBASE_APP_ID || "default-agro-gestor-app";

  const getCollectionRef = useCallback(() => {
    if (db) {
      return collection(db, "artifacts", appId, "public", "data", "crm");
    }
    return null;
  }, [db, appId]);

  useEffect(() => {
    if (!isAuthReady || !db) {
      setIsLoadingCRM(false);
      return;
    }
    const q = query(getCollectionRef(), orderBy("nome"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const listaContatos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContatos(listaContatos);
        setIsLoadingCRM(false);
      },
      (err) => {
        console.error("Erro ao carregar contatos:", err);
        setIsLoadingCRM(false);
      }
    );

    return () => unsubscribe();
  }, [db, isAuthReady, getCollectionRef]);

  const addContato = async (novoContato) => {
    if (!db) return;
    try {
      await addDoc(getCollectionRef(), {
        ...novoContato,
        userId,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Erro ao adicionar contato:", err);
    }
  };

  const updateContato = async (id, dados) => {
    if (!db) return;
    try {
      const docRef = doc(db, "artifacts", appId, "public", "data", "crm", id);
      await updateDoc(docRef, dados);
    } catch (err) {
      console.error("Erro ao atualizar contato:", err);
    }
  };

  return { contatos, isLoadingCRM, addContato, updateContato };
};

export default useCRM;