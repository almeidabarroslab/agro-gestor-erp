import { useState, useEffect, useCallback } from 'react';
import { collection, query, onSnapshot, addDoc, updateDoc, doc } from 'firebase/firestore';

const useRecursos = (db, userId, isAuthReady) => {
  const [recursos, setRecursos] = useState([]);
  const [isLoadingRecursos, setIsLoadingRecursos] = useState(true);
  const [errorRecursos, setErrorRecursos] = useState(null);
  const appId = process.env.REACT_APP_FIREBASE_APP_ID || "default-agro-gestor-app";

  const getCollectionRef = useCallback(() => {
    if (db) {
      return collection(db, "artifacts", appId, "public", "data", "recursos");
    }
    return null;
  }, [db, appId]);

  useEffect(() => {
    if (!isAuthReady || !db) {
      setIsLoadingRecursos(false);
      return;
    }

    const q = query(getCollectionRef());

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const listaRecursos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecursos(listaRecursos);
        setIsLoadingRecursos(false);
      },
      (err) => {
        console.error("Erro ao carregar recursos:", err);
        setErrorRecursos("Falha ao carregar insumos. Verifique sua conexão.");
        setIsLoadingRecursos(false);
      }
    );

    return () => unsubscribe();
  }, [db, isAuthReady, getCollectionRef]);

  const addRecurso = async (novoRecurso) => {
    if (!db) return;
    try {
      await addDoc(getCollectionRef(), {
        ...novoRecurso,
        userId: userId,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Erro ao adicionar recurso:", err);
      setErrorRecursos("Não foi possível salvar o novo insumo.");
    }
  };

  const updateRecurso = async (id, dados) => {
    if (!db) return;
    try {
      const docRef = doc(
        db,
        "artifacts",
        appId,
        "public",
        "data",
        "recursos",
        id
      );
      await updateDoc(docRef, dados);
    } catch (err) {
      console.error("Erro ao atualizar recurso:", err);
      setErrorRecursos("Não foi possível atualizar o insumo.");
    }
  };

  return {
    recursos,
    isLoadingRecursos,
    errorRecursos,
    addRecurso,
    updateRecurso,
  };
};

export default useRecursos;