import { useState, useEffect, useCallback } from 'react';
import { collection, query, onSnapshot, addDoc, updateDoc, doc } from 'firebase/firestore';

const usePlantacoes = (db, userId, isAuthReady) => {
  const [plantacoes, setPlantacoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const appId = process.env.REACT_APP_FIREBASE_APP_ID || "default-agro-gestor-app";

  const getCollectionRef = useCallback(() => {
    if (db) {
      return collection(db, "artifacts", appId, "public", "data", "plantacoes");
    }
    return null;
  }, [db, appId]);

  useEffect(() => {
    if (!isAuthReady || !db) {
      setIsLoading(false);
      return;
    }

    const q = query(getCollectionRef());

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const listaPlantacoes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        listaPlantacoes.sort(
          (a, b) => new Date(b.dataPlantio) - new Date(a.dataPlantio)
        );
        setPlantacoes(listaPlantacoes);
        setIsLoading(false);
      },
      (err) => {
        console.error("Erro ao carregar plantações:", err);
        setError(
          "Falha ao carregar dados. Verifique sua conexão ou permissões."
        );
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [db, isAuthReady, getCollectionRef]);

  const addPlantacao = async (novaPlantacao) => {
    if (!db) {
      setError("Banco de dados não está pronto.");
      return;
    }
    try {
      await addDoc(getCollectionRef(), {
        ...novaPlantacao,
        userId: userId,
        createdAt: new Date().toISOString(),
        dadosCrescimento: [],
        aplicacoes: [],
        rendimentoFinal: null,
      });
    } catch (err) {
      console.error("Erro ao adicionar plantação:", err);
      setError("Não foi possível salvar a nova plantação.");
    }
  };

  const updatePlantacao = async (id, dados) => {
    if (!db) return;
    try {
      const docRef = doc(
        db,
        "artifacts",
        appId,
        "public",
        "data",
        "plantacoes",
        id
      );
      await updateDoc(docRef, dados);
    } catch (err) {
      console.error("Erro ao atualizar plantação:", err);
      setError("Não foi possível atualizar a plantação.");
    }
  };

  const getCustoTotalPlantacao = useCallback(
    (plantacaoId) => {
      const plantacao = plantacoes.find((p) => p.id === plantacaoId);
      return (
        plantacao?.aplicacoes?.reduce(
          (sum, app) => sum + (app.custo || 0),
          0
        ) || 0
      );
    },
    [plantacoes]
  );

  return {
    plantacoes,
    isLoading,
    error,
    addPlantacao,
    updatePlantacao,
    getCustoTotalPlantacao,
  };
};

export default usePlantacoes;