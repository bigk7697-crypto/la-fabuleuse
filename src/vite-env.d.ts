/// <reference types="vite/client" />

// React type declarations
declare namespace React {
  interface FC<T = {}> {
    (props: T): React.ReactElement | null;
  }
  interface ReactElement {
    type: any;
    props: any;
    key: any;
  }
}

// Firebase type declarations
declare namespace firebase {
  interface FirebaseApp {
    options: any;
    name?: string;
    automaticDataCollectionEnabled?: boolean;
  }
  interface Auth {
    app: FirebaseApp;
    currentUser: any;
    onAuthStateChanged: (callback: (user: any) => void) => () => void;
  }
  interface Firestore {
    app: FirebaseApp;
  }
}

// Module declarations for missing types
declare module 'firebase/app' {
  export const initializeApp: (config: any, name?: string) => firebase.FirebaseApp;
  export const getApp: (name?: string) => firebase.FirebaseApp;
  export const getApps: () => firebase.FirebaseApp[];
  export type FirebaseApp = firebase.FirebaseApp;
  export default function firebase(config: any): any;
}

declare module 'firebase/auth' {
  export const getAuth: (app?: firebase.FirebaseApp) => firebase.Auth;
  export type Auth = firebase.Auth;
  export * from 'firebase/auth';
}

declare module 'firebase/firestore' {
  export const getFirestore: (app?: firebase.FirebaseApp) => firebase.Firestore;
  export const collection: (db: any, path: string) => any;
  export const query: (ref: any, ...constraints: any[]) => any;
  export const onSnapshot: (ref: any, callback: (snapshot: any) => void) => () => void;
  export const doc: (db: any, path: string) => any;
  export const getDoc: (ref: any) => Promise<any>;
  export type Firestore = firebase.Firestore;
  export * from 'firebase/firestore';
}

declare module 'firebase/analytics' {
  export const getAnalytics: (app?: firebase.FirebaseApp) => any;
  export * from 'firebase/analytics';
}

declare module 'react' {
  export const useState: <T>(initialValue: T) => [T, (value: T) => void];
  export const useEffect: (effect: () => void, deps?: any[]) => void;
  export const StrictMode: React.FC;
  export const createRoot: (container: Element) => any;
  export const Fragment: React.FC;
  export default function React(props: any): any;
}

declare module 'react-dom' {
  export * from 'react-dom';
}

declare module 'react/jsx-runtime' {
  export const Fragment: React.FC;
  export const jsx: any;
  export const jsxs: any;
}

declare module 'motion/react' {
  export const motion: any;
  export const AnimatePresence: any;
  export * from 'motion/react';
}

declare module 'lucide-react' {
  export const X: React.FC<any>;
  export const Menu: React.FC<any>;
  export const User: React.FC<any>;
  export const ShoppingCart: React.FC<any>;
  export const Plus: React.FC<any>;
  export const Minus: React.FC<any>;
  export const Trash2: React.FC<any>;
  export const MessageCircle: React.FC<any>;
  export const MapPin: React.FC<any>;
  export const Phone: React.FC<any>;
  export const Facebook: React.FC<any>;
  export const Instagram: React.FC<any>;
  export const Mail: React.FC<any>;
  export const Clock: React.FC<any>;
  export const Globe: React.FC<any>;
  export const UtensilsCrossed: React.FC<any>;
  export * from 'lucide-react';
}

declare module 'react-hot-toast' {
  export const toast: any;
  export const Toaster: React.FC<any>;
  export * from 'react-hot-toast';
}

declare module 'react-router-dom' {
  export const BrowserRouter: React.FC<any>;
  export const Routes: React.FC<any>;
  export const Route: React.FC<any>;
  export const Link: React.FC<any>;
  export * from 'react-router-dom';
}

declare module 'clsx' {
  export default function clsx(...inputs: any[]): string;
  export * from 'clsx';
}

declare module 'tailwind-merge' {
  export default function twMerge(...inputs: any[]): string;
  export * from 'tailwind-merge';
}

declare module 'express' {
  export default function express(): any;
  export * from 'express';
}

declare module 'better-sqlite3' {
  export default class Database {
    constructor(filename: string);
    prepare(sql: string): any;
    exec(sql: string): void;
  }
  export * from 'better-sqlite3';
}

declare module 'dotenv' {
  export const config: any;
  export * from 'dotenv';
}

declare module '@google/genai' {
  export * from '@google/genai';
}

declare module '@tailwindcss/vite' {
  export * from '@tailwindcss/vite';
}

declare module '@vitejs/plugin-react' {
  export * from '@vitejs/plugin-react';
}

declare module 'autoprefixer' {
  export * from 'autoprefixer';
}

declare module 'tailwindcss' {
  export * from 'tailwindcss';
}

declare module 'tsx' {
  export * from 'tsx';
}

declare module 'typescript' {
  export * from 'typescript';
}

declare module 'vite' {
  export * from 'vite';
}

// Environment variables
interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
