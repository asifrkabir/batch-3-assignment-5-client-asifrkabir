import { TBike, TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBike: builder.mutation({
      query: (bikeInfo) => ({
        url: "/bikes",
        method: "POST",
        body: bikeInfo,
      }),
      invalidatesTags: ["bikes"],
    }),
    getAllBikes: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/bikes",
          method: "GET",
          params,
        };
      },
      providesTags: ["bikes"],
      transformResponse: (response: TResponseRedux<TBike[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getBikeById: builder.query({
      query: (id) => ({
        url: `/bikes/${id}`,
        method: "GET",
      }),
      providesTags: ["bikes"],
    }),
  }),
});

export const {
  useCreateBikeMutation,
  useGetAllBikesQuery,
  useGetBikeByIdQuery,
} = bikeApi;
