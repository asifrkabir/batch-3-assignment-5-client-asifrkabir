import { TCoupon, TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCoupon: builder.mutation({
      query: (data) => ({
        url: "/coupons",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["coupons"],
    }),
    getAllCoupons: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/coupons",
          method: "GET",
          params,
        };
      },
      providesTags: ["coupons"],
      transformResponse: (response: TResponseRedux<TCoupon[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getCouponById: builder.query({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: "GET",
      }),
      providesTags: ["coupons"],
    }),
    updateCouponById: builder.mutation({
      query: (options) => ({
        url: `/coupons/${options.id}`,
        method: "PATCH",
        body: options.data,
      }),
      invalidatesTags: ["coupons"],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["coupons"],
    }),
    assignCouponToUser: builder.mutation({
      query: (data) => ({
        url: "/coupons/user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["myCoupon"],
    }),
    getUserCouponByUserId: builder.query({
      query: (userId) => ({
        url: `/coupons/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["myCoupon"],
    }),
    updateUserCoupon: builder.mutation({
      query: (userCouponId) => ({
        url: `/coupons/user/${userCouponId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["myCoupon"],
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useGetAllCouponsQuery,
  useGetCouponByIdQuery,
  useUpdateCouponByIdMutation,
  useDeleteCouponMutation,
  useAssignCouponToUserMutation,
  useGetUserCouponByUserIdQuery,
  useUpdateUserCouponMutation,
} = couponApi;
