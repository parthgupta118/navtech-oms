import React, { Fragment, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglass,
  faPencil,
  faSquareCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";

import { orderActions } from "../../slices/orderSlice";
import EditOrderModal from "../EditOrderModal/EditOrderModal";

import "./OrderItem.css";
import { THEME_COLORS } from "../../utils/constant";

function OrderItem({ orderData, selectedFilter }) {
  const dispatch = useDispatch();

  const arrayOfColors = Object.values(THEME_COLORS);

  // Will strikethrough/check the order to "Done"
  const checkOrder = () => {
    const status = orderData.status === "In Progress" ? "Done" : "In Progress";
    const updatedOrderData = { ...orderData, status };
    dispatch(orderActions.checkOrder(updatedOrderData));
  };

  // Every time the Order status state changes, it will sort or filter accordingly.
  useEffect(() => {
    if (selectedFilter === "completed") {
      dispatch(orderActions.filterCompleted());
    }

    if (selectedFilter === "active") {
      dispatch(orderActions.filterActive());
    }
  }, [orderData.status]);

  return (
    <Fragment>
      {/* Order Item Row */}
      <div
        style={{
          textDecoration: orderData.status === "Done" ? "line-through" : "none",
          backgroundColor:
            orderData.status === "Done"
              ? "gray"
              : arrayOfColors[orderData.id % 3],
        }}
        className="row px-3 mb-5 align-items-center order-item"
      >
        <div className="col-1 m-1 p-0 d-flex align-items-start">
          <h2 className="m-0 p-0">
            <FontAwesomeIcon
              className="text-white"
              style={{ cursor: "pointer" }}
              icon={orderData.status === "Done" ? faSquareCheck : faSquare}
              onClick={checkOrder}
            />
          </h2>
        </div>
        <div className="col-8 px-1 m-1">
          <div
            className="col fs-5 border-0 bg-transparent rounded pt-2 px-2 my-0"
            title={orderData.id}
          >
            <b>Order #{orderData.id}</b>
          </div>

          <div
            style={{
              textDecoration:
                orderData.status === "Done" ? "line-through" : "none",
            }}
            className="col fs-6 border-0 bg-transparent rounded px-2 text-white"
            title={orderData.id}
          >
            {orderData.dueDate}
          </div>
        </div>

        <div className="col-12 px-1 m-1">
          <div className="">
            {" "}
            <b>Name:</b> {orderData.name}
          </div>
          <div>
            {" "}
            <b>Mobile No: </b> {orderData.number}
          </div>
          <div>
            {" "}
            <b>
              Delivery Address: <br />
            </b>{" "}
            {orderData.address}
          </div>
        </div>

        <hr className="border-2 my-2 border-top border-white" />

        <div className="col-12 px-1 m-1">
          <div className="row">
            <span className="col-4 order-total-text px-1 m-1">
              Total: <b> $&nbsp;{orderData.total}</b>
            </span>

            <span className="col-7 fs-5 px-1 m-1 d-flex justify-content-end">
              <h5 className="action-icon me-3 p-0 px-2 py-1 d-inline bg-light">
                <i
                  data-bs-target={`#exampleModal-${orderData.id}`}
                  data-bs-toggle="modal"
                  className="text-info btn m-0 p-0"
                  data-placement="bottom"
                  title="Edit Order"
                >
                  <FontAwesomeIcon icon={faPencil} />
                </i>
              </h5>
              <h5 className="action-icon me-3 p-0 px-2 py-1 d-inline bg-light">
                <i
                  className="text-danger btn m-0 p-0"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Delete Order"
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() =>
                      dispatch(orderActions.deleteOrder(orderData))
                    }
                  />
                </i>
              </h5>
            </span>
          </div>
        </div>
      </div>

      {/* Edit To Do Modal
          Opens after clicking on edit icon
      */}
      <EditOrderModal key={orderData.id} order={orderData} />
    </Fragment>
  );
}

export default OrderItem;
