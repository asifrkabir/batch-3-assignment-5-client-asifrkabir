import { TQueryParam, TResponseRedux } from "../../../types";
import { TRental } from "../../../types/rental.type";
import { baseApi } from "../../api/baseApi";

const rentalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRentals: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/rentals/all",
          method: "GET",
          params,
        };
      },
      providesTags: ["rentals"],
      transformResponse: (response: TResponseRedux<TRental[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getAllRentalsByUser: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/rentals",
          method: "GET",
          params,
        };
      },
      providesTags: ["rentals"],
      transformResponse: (response: TResponseRedux<TRental[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    returnBike: builder.mutation({
      query: (options) => ({
        url: `/rentals/${options.id}/return`,
        method: "PUT",
      }),
      invalidatesTags: ["rentals", "bikes"],
    }),
  }),
});

export const {
  useGetAllRentalsQuery,
  useGetAllRentalsByUserQuery,
  useReturnBikeMutation,
} = rentalApi;
