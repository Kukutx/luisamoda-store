import { getStorage, ref, uploadBytes, getDownloadURL, FirebaseStorage } from 'firebase/storage';
import { app, storage } from './config';

const isStorageActive = !!app && !!storage;

export const uploadImage = async (file: File, path: string): Promise<string> => {
  if (!isStorageActive || !storage) {
    console.warn('Storage is offline. Image upload failed.');
    return '';
  }
  const storageRef = ref(storage as FirebaseStorage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};
