
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyB8-5UtaFSd49oiyXNykcTkq5RS-U81KPk",
  authDomain: "tu-mascota-c6640.firebaseapp.com",
  projectId: "tu-mascota-c6640",
  storageBucket: "tu-mascota-c6640.appspot.com",
  messagingSenderId: "46177280922",
  appId: "1:46177280922:web:5525ac056433011d3a5023"
};

const app = initializeApp(firebaseConfig);

export const GetFirestoreApp=()=>{
    return app
}
export const storage= getStorage(app)