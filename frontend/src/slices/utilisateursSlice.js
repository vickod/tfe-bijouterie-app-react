import { apiSlice } from './apiSlice';
import { UTILISATEURS_URL } from '../constants';

export const utilisateursSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${UTILISATEURS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${UTILISATEURS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
        query: () => ({
          url: `${UTILISATEURS_URL}/logout`,
          method: 'POST',
        }),
      }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${UTILISATEURS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    getUtilisateurs: builder.query({
      query: () => ({
        url: `${UTILISATEURS_URL}`,
        method: 'GET',
      }),
      providesTags: ['Utilisateurs'],
      keepUnusedDataFor: 5,
    }),
    deleteUtilisateur: builder.mutation({
      query: (id) => ({
        url: `${UTILISATEURS_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
    getUtilisateurDetails: builder.query({
      query: (id) => ({
        url: `${UTILISATEURS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUtilisateur: builder.mutation({
      query: (data) => ({
        url: `${UTILISATEURS_URL}/${data.utilisateurId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Utilisateur'],
    }),
  }),
});

export const {useLoginMutation,  
  useLogoutMutation, 
  useRegisterMutation,
  useGetUtilisateursQuery,
  useDeleteUtilisateurMutation,
  useGetUtilisateurDetailsQuery,
  useUpdateUtilisateurMutation,
  useProfileMutation} = utilisateursSlice;