import { getStorage, ref, deleteObject } from 'firebase/storage';
import { app } from './firebaseConfig';

//cat nos referimos a la carpeta del storage de Firebase
export const useFileDelete = async (cat, fileUrl) => {
  try {
    function getFileNameFromURL(url) {
      try {
        const urlObject = new URL(url);
        const pathArray = urlObject.pathname.split('/');
        let path = pathArray[pathArray.length - 1];

        const prefix = `${cat}%2F`;
        if (path.startsWith(prefix)) {
          path = path.substring(prefix.length);
        }
        const fileName = path;
        return fileName;
      } catch (error) {
        console.error('Error getting file name from URL:', error);
        return null;
      }
    }
    const fileName = getFileNameFromURL(fileUrl);
    // Construir la referencia al archivo en Firebase
    const storage = getStorage(app);
    const imageRef = ref(storage, `${cat}/${fileName}`);

    // Eliminar el archivo
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error deleting item from Firebase:', error);
  }
};
