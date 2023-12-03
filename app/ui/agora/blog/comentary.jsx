import { addComment } from '@/app/lib/actions';
import { auth } from '@/app/auth';
import Image from 'next/image';
import { GrAddCircle } from 'react-icons/gr';

const Comentary = async ({ articleId }) => {
  const user = await auth();
  const fechaActual = new Date();
  const formatoFecha = { day: '2-digit', month: '2-digit', year: '2-digit' };

  const handleSubmit = async (formData) => {
    'use server';
    const serverResponse = Object.fromEntries(formData);
    const content = serverResponse.content;
    const author = user.username;
    const authorId = user.id;
    const likes = user.id;
    console.log(content);
    // Llama a la función de servidor para agregar un comentario
    await addComment({ content, author, authorId, articleId, likes });
  };

  return (
    <div>
      <div className="bg-green-800  rounded-md border-2 border-fuchsia-200/20">
        <form action={handleSubmit} className="flex gap-4">
          <button type="submit">
            <GrAddCircle size={30} />
          </button>
          <input
            name="content"
            type="text"
            placeholder="Comment something.."
            className="bg-transparent outline-none"
          />
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
