import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { orderActions } from "../../slices/orderSlice";

export default function CreateOrder() {
  const [orderData, setOrderData] = useState({});
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    e.preventDefault();
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    e.preventDefault();
    setOrderData({
      ...orderData,
      dueDate: new Date(e.target.value).toUTCString().slice(5, 16),
    });
  };

  const addOrder = () => {
    const finalOrderData = {
      ...orderData,
      dateAdded: new Date(Date.now()).toUTCString().slice(5, 16),
      id: Math.floor(Math.random() * 1000),
      status: "In Progress",
    };

    dispatch(orderActions.addOrder(finalOrderData));
    setOrderData({});
  };

  return (
    <Fragment>
      <div className="row m-1 p-3">
        <div
          className="col col-11 rounded mx-auto"
          style={{
            background: "linear-gradient(to right, #dfd6fa55, #dfd6fa55)",
          }}
        >
          <div className="col rounded p-4 align-items-center justify-content-center">
            {/* Text Field for Customer name */}
            <div className="form-floating col bg-white p-0 mb-3">
              <input
                onChange={handleInputChange}
                // className="form-control form-control-lg border-1 add-todo-input bg-transparent rounded-pill"
                className={`form-control form-control-md rounded border-1 add-todo-input bg-transparent rounded ${
                  orderData.name ? "is-valid" : "is-invalid"
                }`}
                type="text"
                id="floatingInput"
                name="name"
                placeholder="Customer Name"
                value={orderData.name}
              />
              <label for="floatingInput">Customer Name</label>
            </div>

            {/* Number Field for Customer Mobile Number */}
            <div className="form-floating col bg-white p-0 mb-3">
              <input
                onChange={handleInputChange}
                className="form-control form-control-md rounded border-1 add-todo-input bg-transparent rounded"
                type="number"
                name="number"
                placeholder="Customer Phone No."
                value={orderData.number}
              />

              <label for="floatingInput">Mobile No.</label>
            </div>

            {/* Text Area for Customer Address */}
            <div className="form-floating col bg-white p-0 mb-3">
              <textarea
                rows="4"
                onChange={handleInputChange}
                className="form-control form-control-md rounded border-1 add-todo-input bg-transparent rounded"
                type="text"
                name="address"
                placeholder="Address"
              />
              <label for="floatingInput">Address</label>

            </div>

            {/* Number Field for Total Value */}
            <div className="form-floating col bg-white p-0 mb-3">
              <input
                onChange={handleInputChange}
                className="form-control form-control-md rounded border-1 add-todo-input bg-transparent rounded"
                type="number"
                name="total"
                placeholder="Order Total"
              />
              <label for="floatingInput">Order Total (in $)</label>
            </div>

            {/* Date Field to set due date for input Orders */}
            <div className="col-auto m-0 p-0 w-100 d-flex align-items-center justify-content-between">
              <div>
                <label className="text-secondary my-2 p-0 px-1 view-opt-label due-date-label">
                  Set Order Due Date:
                </label>

                <input type="date" onChange={handleDateChange} />
              </div>
              <div>
                <button
                  type="button"
                  onClick={addOrder}
                  className="btn btn-primary"
                >
                  Add Order
                </button>
              </div>
            </div>
            <div className="col-auto px-0 mx-0 me-2"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
