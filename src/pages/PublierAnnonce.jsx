const PublierAnnonce = () => {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold">Publier une Annonce</h1>
        <form className="bg-white p-6 shadow-md rounded-md">
          <input type="text" placeholder="Titre de l'annonce" className="border p-2 w-full mb-4" />
          <textarea placeholder="Description" className="border p-2 w-full mb-4"></textarea>
          <input type="number" placeholder="Prix (FCFA)" className="border p-2 w-full mb-4" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Publier</button>
        </form>
      </div>
    );
  };
  
  export default PublierAnnonce;
  