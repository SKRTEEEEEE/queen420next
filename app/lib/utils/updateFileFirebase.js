'use client';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  StorageError,
} from 'firebase/storage';
import { useEffect } from 'react';
import { app } from './firebaseConfig';

const useFileUpdate = (file, currentImageUrl, onSuccess, onError) => {
  useEffect(() => {
    const storage = getStorage(app);

    const uploadFile = async () => {
      try {
        if (!file) {
          return;
        }

        // Validar si la URL proporcionada es una URL de Firebase Storage
        if (
          currentImageUrl &&
          currentImageUrl.startsWith('https://firebasestorage.googleapis.com')
        ) {
          const storageRef = ref(storage, currentImageUrl);

          // Subir el nuevo archivo (si se proporciona)
          if (file) {
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Lógica para monitorear el progreso de la carga si es necesario
            uploadTask.on('state_changed' /* ... */);

            // Esperar a que se complete la carga antes de continuar
            await uploadTask;
          }

          // Actualizar la metadata del archivo (puedes incluir más información si es necesario)
          await getDownloadURL(storageRef); // Simplemente para esperar a que la carga se complete

          // Obtener la URL de descarga actualizada
          const updatedDownloadURL = await getDownloadURL(storageRef);

          onSuccess && onSuccess(updatedDownloadURL);
        } else {
          // Manejar el caso en que la URL no es válida
          const error = new StorageError(
            'storage/invalid-url',
            'Invalid Firebase Storage URL'
          );
          throw error;
        }
      } catch (error) {
        console.error('Error updating image:', error);
        onError && onError(error);
      }
    };

    uploadFile();
  }, [file]);
};

export default useFileUpdate;
