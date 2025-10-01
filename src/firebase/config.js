import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { useState, useEffect, useMemo } from "react";
import { INITIAL_RESOURCES } from "../utils/constants";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  database: "ggagro",
};

let app, auth, db;

const initFirebase = () => {
  try {
    if (!app) {
      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      db = getFirestore(app);
    }
  } catch (error) {
    console.error("Erro ao inicializar Firebase:", error);
  }
  return { db, auth };
};

export const useFirebase = () => {
  const [user, setUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [dbInstance, setDbInstance] = useState(null);

  useEffect(() => {
    const { db: firestoreDb, auth: firebaseAuth } = initFirebase();
    setDbInstance(firestoreDb);

    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      async (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        } else {
          try {
            await signInAnonymously(firebaseAuth);
          } catch (error) {
            console.error("Erro na autenticação anônima:", error);
          }
        }
        setIsAuthReady(true);
      }
    );

    return () => unsubscribe();
  }, []);

  const userId = useMemo(
    () =>
      user?.uid ||
      (typeof crypto !== "undefined" ? crypto.randomUUID() : "guest-user"),
    [user]
  );

  return { db: dbInstance, auth, userId, isAuthReady };
};

export const setupInitialData = async (db, userId) => {
  const appId =
    process.env.REACT_APP_FIREBASE_APP_ID || "default-agro-gestor-app";
  const recursosRef = collection(
    db,
    "artifacts",
    appId,
    "public",
    "data",
    "recursos"
  );

  try {
    const q = query(recursosRef, where("isInitial", "==", true));
    const snapshot = await getDocs(q);

    const hasInitialData = snapshot.docs.length > 0;

    if (!hasInitialData) {
      console.log("Configurando insumos iniciais...");
      for (const recurso of INITIAL_RESOURCES) {
        await addDoc(recursosRef, {
          ...recurso,
          userId: userId,
          createdAt: new Date().toISOString(),
        });
      }
      console.log("Insumos iniciais cadastrados com sucesso.");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Erro ao configurar dados iniciais:", error);
  }
  return false;
};
