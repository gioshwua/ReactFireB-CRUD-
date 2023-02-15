import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyDWkzeykdjHse-FDj1tpB1M-JVJI1qkeIc',
  authDomain: 'fir-crudproj.firebaseapp.com',
  projectId: 'fir-crudproj',
  storageBucket: 'fir-crudproj.appspot.com',
  messagingSenderId: '288672728981',
  appId: '1:288672728981:web:27de6496bd0957b83d189c',
  measurementId: 'G-V44SNMB4Q6',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
