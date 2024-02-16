// import { addLikeComment } from '@/app/lib/actions';
// import { AiFillLike } from 'react-icons/ai';
// import { BsCalendarDate } from 'react-icons/bs';
// import { FaUserNinja } from 'react-icons/fa';
// import Link from 'next/link';

// const SeeComments = ({ comment, user }) => {
//   function formatDate(dateString) {
//     const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
//     const formattedDate = new Date(dateString).toLocaleDateString(
//       'es-ES',
//       options
//     );
//     return formattedDate;
//   }
//   const handleLikeClick = (comment) => async () => {
//     'use server';
//     try {
//       await addLikeComment({ likeId: comment._id, userId: user.id });
//       console.log('likeId:', comment._id, ' userId:', user.id);
//     } catch (error) {
//       console.error('Error adding like:', error.message);
//     }
//   };

//   return (
//     <div key={comment._id}>
//       {/* Mostrar el contenido del comentario, autor, etc. */}
//       {console.log('comment:', comment)}
//       <p>{comment.content}</p>
//       <div className="flex justify-around">
//         <a
//           role="button"
//           onClick={handleLikeClick(comment)} // <- hacer funcion anonima para que solo se active cuando se clica i no al renderizar
//           className="flex gap-2 w-10"
//         >
//           <AiFillLike color={comment.likes.includes(user.id) ? 'red' : ''} />
//           {comment.likes.length}
//         </a>
//         {/* Hay que hacer que solo se pueda ir al agora del author si este es Store o Eliminar esta parte */}
//         <Link
//           href={`/main/agora/${comment.author}`}
//           className="flex gap-2 w-20"
//         >
//           <FaUserNinja />
//           {comment.author}
//         </Link>

//         <p className="flex gap-2 w-25">
//           <BsCalendarDate /> {formatDate(comment.createdAt)}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SeeComments;
