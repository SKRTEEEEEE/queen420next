'use client';

import { addComment } from '@/app/lib/actions';
import Image from 'next/image';
import { useState } from 'react';
import { GrAddCircle } from 'react-icons/gr';

const Comentary = ({ articleId, user }) => {
  const [err, setErr] = useState();
  const [commentContent, setCommentContent] = useState(''); // Estado para realizar un seguimiento del contenido del comentario
  const fechaActual = new Date();
  const formatoFecha = { day: '2-digit', month: '2-digit', year: '2-digit' };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const serverResponse = Object.fromEntries(formData);
    const content = serverResponse.content;
    const author = user.username;
    const authorId = user.id;
    const likes = user.id;

    try {
      // Llama a la función de servidor para agregar un comentario
      const data = await addComment({
        content,
        author,
        authorId,
        articleId,
        likes,
      });

      // Si hay un error en la respuesta, actualiza el estado de error
      data?.error && setErr(data.error);

      // Limpia el contenido del comentario después de enviar el formulario
      setCommentContent('');
    } catch (error) {
      // Maneja errores de manera más robusta, por ejemplo, mostrándolos en la interfaz de usuario
      console.error('Error al enviar el comentario:', error);
      setErr('Error al enviar el comentario. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <div className="bg-green-800  rounded-md border-2 border-fuchsia-200/20">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <button type="submit">
            <GrAddCircle size={30} />
          </button>
          <input
            name="content"
            type="text"
            placeholder="Comment something.."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)} // Actualiza el estado del contenido del comentario
            className="bg-transparent outline-none"
          />
          {err && <div className="text-red-500">{err}</div>}
        </form>

        <div className="">
          <div className="flex" key="">
            <div className="flex">
              <Image
                src="/p1.jpeg"
                alt=""
                width={50}
                height={50}
                className=""
              />

              <div className="">
                <div className="">{user.username}</div>
                <div className="">
                  {fechaActual.toLocaleDateString('es-ES', formatoFecha)}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Puedes agregar estilos futuristas aquí */}
      </div>
    </div>
  );
};

export default Comentary;
