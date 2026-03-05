import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  QueryConstraint,
  type DocumentData,
} from 'firebase/firestore';
import { db, app } from './config';
import { Product, Order, Category, User } from '@/types';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../mockData';

const isFirebaseActive = !!app;

/** Converts Firestore Timestamp fields to Date in place. */
function convertTimestamp<T>(data: Record<string, unknown>): T {
  if (data && typeof data === 'object') {
    Object.keys(data).forEach((key) => {
      const val = data[key];
      if (val instanceof Timestamp) {
        data[key] = val.toDate();
      } else if (val && typeof val === 'object' && !Array.isArray(val) && !(val instanceof Date)) {
        data[key] = convertTimestamp(val as Record<string, unknown>) as unknown;
      }
    });
  }
  return data as T;
}

/** Maps a Firestore document snapshot to an entity with id and converted timestamps. */
function mapDocToEntity<T extends { id: string }>(
  docSnap: { id: string; data: () => DocumentData }
): T {
  const data = docSnap.data() as Record<string, unknown>;
  const converted = convertTimestamp<Omit<T, 'id'>>(data);
  return { ...converted, id: docSnap.id } as T;
}

// --- Products ---
export const getProducts = async (categoryId?: string): Promise<Product[]> => {
  if (!isFirebaseActive || !db) {
    if (categoryId) return MOCK_PRODUCTS.filter(p => p.categoryId === categoryId);
    return MOCK_PRODUCTS;
  }
  try {
    const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
    if (categoryId) constraints.unshift(where('categoryId', '==', categoryId));
    const q = query(collection(db, 'products'), ...constraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => mapDocToEntity<Product>(d));
  } catch (error) {
    console.error('[Firestore] getProducts failed:', error);
    if (categoryId) return MOCK_PRODUCTS.filter(p => p.categoryId === categoryId);
    return MOCK_PRODUCTS;
  }
};

export const getProduct = async (id: string): Promise<Product | null> => {
  if (!isFirebaseActive || !db) return MOCK_PRODUCTS.find(p => p.id === id) || null;
  try {
    const docSnap = await getDoc(doc(db, 'products', id));
    return docSnap.exists() ? mapDocToEntity<Product>(docSnap) : null;
  } catch (error) {
    console.error('[Firestore] getProduct failed:', error);
    return MOCK_PRODUCTS.find(p => p.id === id) || null;
  }
};

export const createProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  if (!isFirebaseActive || !db) return 'mock_id';
  const docRef = await addDoc(collection(db, 'products'), { ...product, createdAt: Timestamp.now(), updatedAt: Timestamp.now() });
  return docRef.id;
};

export const updateProduct = async (id: string, product: Partial<Omit<Product, 'id' | 'createdAt'>>): Promise<void> => {
  if (!isFirebaseActive || !db) return;
  await updateDoc(doc(db, 'products', id), { ...product, updatedAt: Timestamp.now() });
};

export const deleteProduct = async (id: string): Promise<void> => {
  if (!isFirebaseActive || !db) return;
  await deleteDoc(doc(db, 'products', id));
};

// --- Categories ---
export const getCategories = async (): Promise<Category[]> => {
  if (!isFirebaseActive || !db) return MOCK_CATEGORIES;
  try {
    const q = query(collection(db, 'categories'), orderBy('name', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => mapDocToEntity<Category>(d));
  } catch (error) {
    console.error('[Firestore] getCategories failed:', error);
    return MOCK_CATEGORIES;
  }
};

export const getCategory = async (id: string): Promise<Category | null> => {
  if (!isFirebaseActive || !db) return MOCK_CATEGORIES.find(c => c.id === id) || null;
  try {
    const docSnap = await getDoc(doc(db, 'categories', id));
    return docSnap.exists() ? mapDocToEntity<Category>(docSnap) : null;
  } catch (error) {
    console.error('[Firestore] getCategory failed:', error);
    return MOCK_CATEGORIES.find(c => c.id === id) || null;
  }
};

export const createCategory = async (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  if (!isFirebaseActive || !db) return 'mock_cat';
  const docRef = await addDoc(collection(db, 'categories'), { ...category, createdAt: Timestamp.now(), updatedAt: Timestamp.now() });
  return docRef.id;
};

export const updateCategory = async (id: string, category: Partial<Omit<Category, 'id' | 'createdAt'>>): Promise<void> => {
  if (!isFirebaseActive || !db) return;
  await updateDoc(doc(db, 'categories', id), { ...category, updatedAt: Timestamp.now() });
};

export const deleteCategory = async (id: string): Promise<void> => {
  if (!isFirebaseActive || !db) return;
  await deleteDoc(doc(db, 'categories', id));
};

// --- Orders ---
export const getOrders = async (userId?: string): Promise<Order[]> => {
  if (!isFirebaseActive || !db) return [];
  try {
    const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
    if (userId) constraints.unshift(where('userId', '==', userId));
    const q = query(collection(db, 'orders'), ...constraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => mapDocToEntity<Order>(d));
  } catch (error) {
    console.error('[Firestore] getOrders failed:', error);
    return [];
  }
};

export const getOrder = async (id: string): Promise<Order | null> => {
  if (!isFirebaseActive || !db) return null;
  try {
    const docSnap = await getDoc(doc(db, 'orders', id));
    return docSnap.exists() ? mapDocToEntity<Order>(docSnap) : null;
  } catch (error) {
    console.error('[Firestore] getOrder failed:', error);
    return null;
  }
};

export const createOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  if (!isFirebaseActive || !db) return 'order_' + Math.random().toString(36).slice(2, 11);
  const docRef = await addDoc(collection(db, 'orders'), { ...order, createdAt: Timestamp.now(), updatedAt: Timestamp.now() });
  return docRef.id;
};

export const updateOrder = async (id: string, order: Partial<Omit<Order, 'id' | 'createdAt'>>): Promise<void> => {
  if (!isFirebaseActive || !db) return;
  await updateDoc(doc(db, 'orders', id), { ...order, updatedAt: Timestamp.now() });
};

export const deleteOrder = async (id: string): Promise<void> => {
  if (!isFirebaseActive || !db) return;
  await deleteDoc(doc(db, 'orders', id));
};

// --- Users ---
export const getUsers = async (): Promise<User[]> => {
  if (!isFirebaseActive || !db) return [];
  try {
    const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => mapDocToEntity<User>(d));
  } catch (error) {
    console.error('[Firestore] getUsers failed:', error);
    return [];
  }
};

export const getUser = async (id: string): Promise<User | null> => {
  if (!isFirebaseActive || !db) return null;
  try {
    const docSnap = await getDoc(doc(db, 'users', id));
    return docSnap.exists() ? mapDocToEntity<User>(docSnap) : null;
  } catch (error) {
    console.error('[Firestore] getUser failed:', error);
    return null;
  }
};

export const updateUser = async (id: string, userData: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<void> => {
  if (!isFirebaseActive || !db) return;
  await updateDoc(doc(db, 'users', id), { ...userData, updatedAt: Timestamp.now() });
};

