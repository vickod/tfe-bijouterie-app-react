import { ARTICLES_URL, UPLOAD_URL} from '../constants';
import { apiSlice } from './apiSlice';


export const articlesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getArticles: builder.query({
            query: () => ({
                url: `${ARTICLES_URL}/list`,
            }),
            providesTags: ['Articles'],
            keepUnusedDataFor: 5 //les données chargée seront effacé de la memoire cache apres 5sec  
        }),
        createArticle: builder.mutation({
            query: () => ({
                url: `${ARTICLES_URL}`,
                method: 'POST',
            }),
            invalidatesTags: ['Article'],
        }),
        updateArticle: builder.mutation({
            query: (data) => ({
                url: `${ARTICLES_URL}/${data.id}/edit`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Article'],
        }),
        ajoutDeTaille: builder.mutation({
            query: (data) => ({
                url: `${ARTICLES_URL}/${data.id}/addTaille`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Article'],
        }),
        suppressionTaille: builder.mutation({
            query: (data) => ({
                url: `${ARTICLES_URL}/${data.id}/deleteTaille`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Article'],
        }),
        modifStock: builder.mutation({
            query: (data) => ({
                url: `${ARTICLES_URL}/${data.id}/modifStock`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Article'],
        }),
        modifPierre: builder.mutation({
            query: (data) => ({
                url: `${ARTICLES_URL}/${data.id}/modifPierre`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Article'],
        }),
        modifPerle: builder.mutation({
            query: (data) => ({
                url: `${ARTICLES_URL}/${data.id}/modifPerle`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Article'],
        }),
        suppressionPierre: builder.mutation({
            query: (data) => ({
                url: `${ARTICLES_URL}/${data.id}/deletePierre`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Article'],
        }),
        suppressionPerle: builder.mutation({
            query: (data) => ({
                url: `${ARTICLES_URL}/${data.id}/deletePerle`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Article'],
        }),
        uploadImagesArticles: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
        deleteArticle: builder.mutation({
            query: (id) => ({
                url: `${ARTICLES_URL}/${id}/deleteArticle`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Article'],
        }),
    }),
})
     
export const {useGetArticlesQuery, 
    useCreateArticleMutation, 
    useUpdateArticleMutation, 
    useAjoutDeTailleMutation,
    useSuppressionTailleMutation,
    useModifStockMutation,
    useUploadImagesArticlesMutation,
    useDeleteArticleMutation,
    useModifPierreMutation,
    useModifPerleMutation,
    useSuppressionPerleMutation,
    useSuppressionPierreMutation
} = articlesApiSlice; // genere le hook pour fetch la data

