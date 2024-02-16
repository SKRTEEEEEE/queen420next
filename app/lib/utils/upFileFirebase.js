'use client';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { useEffect } from 'react';
import { app } from './firebaseConfig';

//cat nos referimos a la carpeta del storage de Firebase

const useFileUpload = (cat, file, onSuccess, onError) => {
  useEffect(() => {
    const storage = getStorage(app);

    const uploadFile = async () => {
      try {
        if (file) {
          const timestamp = new Date().getTime();
          let fileName;

          // Manejar diferentes tipos de archivos
          if (file.type.includes('audio')) {
            // Si es un archivo de audio, usa una convención de nombres
            fileName = `${timestamp}_audio.${file.type.split('/')[1]}`;
          } else {
            // Si es cualquier otro tipo de archivo, usa el enfoque original
            fileName = `${timestamp}_${file.name}`;
          }
          const storageRef = ref(storage, `${cat}/${fileName}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              console.error('Error during upload:', error);
              onError && onError(error);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                );
                onSuccess && onSuccess(downloadURL);
              } catch (error) {
                console.error('Error getting download URL:', error);
                onError && onError(error);
              }
            }
          );
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        onError && onError(error);
      }
    };

    if (!file) {
      return;
    }

    uploadFile();
  }, [file]);
};

export default useFileUpload;
