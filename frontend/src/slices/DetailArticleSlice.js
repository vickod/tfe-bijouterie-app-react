import { ARTICLES_URL} from '../constants';
import { apiSlice } from './apiSlice';


export const detailArticleApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDetailArticle: builder.query({
            query: (articleId) => ({
                url: `${ARTICLES_URL}/${articleId}`,
            }),
            keepUnusedDataFor: 5 
        })
    }),
})     
export const {useGetDetailArticleQuery} = detailArticleApiSlice; 