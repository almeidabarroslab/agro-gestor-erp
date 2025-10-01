import { useState, useEffect, useCallback } from 'react';
import { collection, query, onSnapshot, addDoc, orderBy, serverTimestamp } from 'firebase/firestore';

const useVendas = (db, userId, isAuthReady) => {
  const [vendas, setVendas] = useState([]);
  const [isLoadingVendas, setIsLoadingVendas] = useState(true);
  const [errorVendas, setErrorVendas] = useState(null);
  const appId = process.env.REACT_APP_FIREBASE_APP_ID || "default-agro-gestor-app";

  const getCollectionRef = useCallback(() => {
    if (db) {
      return collection(db, "artifacts", appId, "public", "data", "vendas");
    }
    return null;
  }, [db, appId]);

  useEffect(() => {
    if (!isAuthReady || !db) {
      setIsLoadingVendas(false);
      return;
    }
    const q = query(getCollectionRef(), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const listaVendas = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVendas(listaVendas);
        setIsLoadingVendas(false);
      },
      (err) => {
        console.error("Erro ao carregar vendas:", err);
        setErrorVendas("Falha ao carregar vendas.");
        setIsLoadingVendas(false);
      }
    );

    return () => unsubscribe();
  }, [db, isAuthReady, getCollectionRef]);

  const addVenda = async (novaVenda) => {
    if (!db) return;
    try {
      await addDoc(getCollectionRef(), {
        ...novaVenda,
        userId: userId,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Erro ao adicionar venda:", err);
      setErrorVendas("Não foi possível registrar a venda.");
    }
  };

  return { vendas, isLoadingVendas, errorVendas, addVenda };
};

export default useVendas;