import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAQS32x0N3MGm_BC_mZ3_W_rBMScPl_D7E",
  authDomain: "crud-monitorias.firebaseapp.com",
  projectId: "crud-monitorias",
  storageBucket: "crud-monitorias.appspot.com",
  messagingSenderId: "1002784921402",
  appId: "1:1002784921402:web:1cc0f83b401b63f2e32203"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export  { db };