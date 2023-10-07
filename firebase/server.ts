import { getAuth as getAuthAdmin } from "firebase-admin/auth";
import { initializeApp as initializeAppAdmin } from 'firebase-admin/app';
import { FirebaseCredentials } from ".";

export const adminAuth=getAuthAdmin(initializeAppAdmin(FirebaseCredentials))