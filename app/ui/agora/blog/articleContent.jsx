import React from 'react';

const ArticleContent = ({ content }) => {
  return (
    <div className="">
      <div className="flex" dangerouslySetInnerHTML={{ __html: content }} />
      {/* Puedes agregar estilos futuristas aquí */}
    </div>
  );
};

export default ArticleContent;
