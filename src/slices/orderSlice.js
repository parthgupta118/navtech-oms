import { createSlice } from "@reduxjs/toolkit";

// Configured Initial Order State
const initialOrderState = {
  order: null,
  orders: [],
  filteredOrders: [],
  loading: true,
  edit: false,
};

// Created Initial Order slice from Initial Order state
const orderSlice = createSlice({
  name: "order",
  initialState: initialOrderState,
  reducers: {
    /**
     * It will get the current logged in user data stored in localStorage and load to do list form it.
     * @param {payload} payload - It will contain the to do list data data
     */
    loadOrders(state, { payload }) {
      state.orders = payload.orders;
      state.filteredOrders = payload.orders;
    },

    /**
     * It will add order to the orders in "order" state.
     * @param {payload} payload - It will contain the to do list data
     */
    addOrder(state, { payload }) {
      state.orders = [...state.orders, payload];
      state.filteredOrders = [...state.filteredOrders, payload];
    },

    /**
     * It will edit order to the orders in "order" state.
     * @param {payload} payload - It will contain the to do list data
     */
    editOrder(state, { payload }) {
      state.order = payload;
      state.orders = [
        ...state.orders.filter((order) => order.id !== payload.id),
        payload,
      ];
      state.filteredOrders = [
        ...state.filteredOrders.map((order) => {
          if (order.id !== payload.id) {
            return order;
          }
          return payload;
        }),
      ];
    },

    /**
     * It will delete order to the orders in "order" state.
     * @param {payload} payload - It will contain the to do list data
     */
     deleteOrder(state, { payload }) {
      state.orders = state.orders.filter((order) => order.id !== payload.id);
      state.filteredOrders = state.filteredOrders.filter(
        (order) => order.id !== payload.id
      );
    },

    /**
     * It will check the status to done in "order" state.
     * @param {payload} payload - It will contain the to do list data
     */
     checkOrder(state, { payload }) {
      state.orders = [
        ...state.orders.filter((order) => order.id !== payload.id),
        payload,
      ];
      state.filteredOrders = [
        ...state.filteredOrders.map((order) => {
          if (order.id !== payload.id) {
            return order;
          }
          return payload;
        }),
      ];
    },

    // Filter actions
    filterAll(state) {
      state.filteredOrders = state.orders;
    },
    filterCompleted(state) {
      state.filteredOrders = state.orders.filter((order) => order.status === "Done");
    },
    filterActive(state) {
      state.filteredOrders = state.orders.filter(
        (order) => order.status === "In Progress"
      );
    },

    // Sort Actions
    sortByAdded(state) {
      state.filteredOrders = state.filteredOrders.sort(
        (a, b) =>
          new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
      );
    },
    sortByDue(state) {
      state.filteredOrders = state.filteredOrders.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
    },
  },
});

export default orderSlice;
export const orderActions = orderSlice.actions;
