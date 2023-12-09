import {apiSlice} from './apiSlice';
import {COMMANDES_URL, PAYPAL_URL, LIVRAISON_URL} from '../constants';


export const commandesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCommande: builder.mutation({
            query: (commande) => ({
                url: COMMANDES_URL,
                method: 'POST',
                body: commande

            })
        }),
        getDetailsCommande: builder.query({
            query: (commandeId) => ({
                url: `${COMMANDES_URL}/${commandeId}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5 
        }),
        payCommande: builder.mutation({
            query: ({commandeId, details}) => ({
                url: `${COMMANDES_URL}/${commandeId}/pay`,
                method: 'PUT',
                body: {...details},
            }),
            keepUnusedDataFor: 5 
        }),
        getPaypalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL,
                method: 'GET',
            }),
            keepUnusedDataFor: 5 
        }),
        getMesCommandes: builder.query({
            query: () => ({
                url: `${COMMANDES_URL}/mes_commandes`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5, 
        }),
        //ADMIN:
        getCommandes: builder.query({
            query: () => ({
                url: COMMANDES_URL,
                method: 'GET',
            }),
            keepUnusedDataFor: 5, 
        }),
        commandeDeliver: builder.mutation({
            query: (commandeId) => ({
                url: `${COMMANDES_URL}/${commandeId}/deliver`,
                method: 'PUT',
            }),
            keepUnusedDataFor: 5, 
        }),

      
        //LIVREUR:
        getCommandesLivreur: builder.query({
            query: () => ({
                url: `${LIVRAISON_URL}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5, 
        }),
        commandeDeliverLivreur: builder.mutation({
            query: (commandeId) => ({
                url: `${LIVRAISON_URL}/${commandeId}/deliver/livreur`,
                method: 'PUT',
            }),
            keepUnusedDataFor: 5, 
        })
    })
})
export const {useCreateCommandeMutation, 
    useGetDetailsCommandeQuery, 
    usePayCommandeMutation, 
    useGetPaypalClientIdQuery,
    useGetMesCommandesQuery,
    useGetCommandesQuery,
    useCommandeDeliverMutation,
    useCommandeDeliverLivreurMutation,
    useGetCommandesLivreurQuery,
} = commandesApiSlice;