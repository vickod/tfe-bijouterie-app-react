import { createSlice } from "@reduxjs/toolkit";
import { updatePanier, addDecimals } from "../utils/panierUtils";

//localStorage.setItem('panier', JSON.stringify({ articlesDuPanier: [] }));
// const initialState = localStorage.getItem('panier') 
// ? JSON.parse(localStorage.getItem('panier')) 
// : {articlesDuPanier: [], payementMethod: 'Paypal'};  //verificationAdresse: {}
const initialState = 
    localStorage.getItem('panier')
    ? JSON.parse(localStorage.getItem('panier'))
    : { articlesDuPanier: [], payementMethod: 'Paypal' }



const panierSlice = createSlice({
    name: "panier",
    initialState,
    reducers: {
        ajouterAuPanier: (state, action)=> {
            const newArticle = action.payload;
            const articleExistant = state.articlesDuPanier.find((article)=> 
            article.id === newArticle.id && article.taille === newArticle.taille)
          
            if(articleExistant){  //maj 
              state.articlesDuPanier = state.articlesDuPanier.map((article)=>
                article.id === articleExistant.id && article.taille === newArticle.taille ? newArticle : article)
            } else {
              //state.articlesDuPanier.push(newArticle); // ajout du nouvel article dans le panier
              state.articlesDuPanier = [...state.articlesDuPanier, newArticle]
            }
            return updatePanier(state); // retourne les calcules sur le prix, tva... 
        },
        supprimerDuPanier: (state, action) => {
            const { id, taille } = action.payload;
            state.articlesDuPanier = state.articlesDuPanier.filter(
              (article) => !(article.id === id && article.taille === taille)
            );
            return updatePanier(state);
        },
        // saveShippingAdresse: (state, action) => {
        //     state.shippingAdresse = action.payload;
        //     return updatePanier(state)
        // },
        savePayementMethod: (state, action) => {
            state.payementMethod = action.payload;
            return updatePanier(state)
        },
        effacerPanier: (state, action) => {
            state.articlesDuPanier = [];
            return updatePanier(state);
        },
    }
})
export const {ajouterAuPanier, 
  supprimerDuPanier, 
  //saveShippingAdresse, 
  savePayementMethod,
  effacerPanier,
} = panierSlice.actions

export default panierSlice.reducer;
