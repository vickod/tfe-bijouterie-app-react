
export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2); // arrondi a 2 decimales apres la virgules
}

export const updatePanier = (state) => {

// calcule du prix de l'article
  state.prixArticle = addDecimals(state.articlesDuPanier.reduce((accumulation, article) => 
  accumulation + article.prix * article.qty, 0));
// calcule de la tva
  state.htva = addDecimals(Number((state.prixArticle/1.21).toFixed(2)));
  // prix htva 
  state.tva = addDecimals(Number((state.prixArticle - state.htva).toFixed(2)));

// calcule du prix totale
  state.prixTotale = (
    Number(state.prixArticle) 
    //Number(state.taxe) 
  ).toFixed(2);
    //reduction -5% premier commande
  state.promo5 = addDecimals(Number((state.prixTotale * 0.05).toFixed(2)));
  state.prixApresRabais5 = addDecimals(Number(((state.prixTotale)-state.prixTotale * 0.05).toFixed(2)));

  localStorage.setItem('panier', JSON.stringify(state)); // Mettez à jour uniquement les articles du panier

  return state
}

