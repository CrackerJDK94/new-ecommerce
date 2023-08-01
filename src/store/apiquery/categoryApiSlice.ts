import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../Utils/Generals';

const createNoCorsFetchBaseQuery = () =>
  fetchBaseQuery({
    baseUrl: BASE_URL,
    mode: 'no-cors', // Set the 'no-cors' mode here
});

export const categoryApiSlice = createApi({
    
    reducerPath : 'api/categories',
    baseQuery : createNoCorsFetchBaseQuery(),
    tagTypes : ['Categories'],

    endpoints : (builder) => ({

        getAllCategories : builder.query(({
            query : () => '/category',
            providesTags : ['Categories']
        })),

        getCategory : builder.query({
            query : (category) => `/category/${category.id}`,
            providesTags : ['Categories']
        }),

        createCategory: builder.mutation({
            query : (category) => ({
                url : `/category/create`,
                method : 'POST',
                body : category,
            }),
           invalidatesTags : ['Categories']
        }),

        updateCategory: builder.mutation({
            query : (data) => ({
                url : 'category/edit',
                method : 'POST',
                body : data,
            }),
            invalidatesTags : ['Categories']
        }),

        deleteCategory: builder.mutation({
            query : (id : number) => ({
                url : '/category/delete',
                method : 'DELETE',
                body : {id}
            }),
            invalidatesTags : ['Categories']
        })
    })
})


export const {
    useGetAllCategoriesQuery,
    useGetCategoryQuery,
    useUpdateCategoryMutation,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
 } = categoryApiSlice;
