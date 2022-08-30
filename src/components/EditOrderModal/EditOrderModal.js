import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { orderActions } from "../../slices/orderSlice";

export default function EditOrderModal({ order }) {
  const [orderData, setOrderData] = useState(order);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    e.preventDefault();
    console.log(e.target.name, "name");
    setOrderData({ ...order, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    e.preventDefault();
    setOrderData({
      ...order,
      dueDate: new Date(e.target.value).toUTCString().slice(5, 16),
    });
  };

  const updateOrder = () => {
    dispatch(orderActions.editOrder(orderData));
    toast.success("Updated Order Successfully");
  };

  return (
    <Fragment>
      {/* Edit Modal for Order */}
      <div
        class="modal fade"
        id={`exampleModal-${orderData.id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={`exampleModalLabel-${orderData.id}`}
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id={`exampleModalLabel-${orderData.id}`}>
                Edit Order
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="col col-12 rounded mx-auto">
                <div className="form-floating col w-100 bg-white p-0 mb-3">
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

                <div className="form-floating col w-100 bg-white p-0 mb-3">
                  <input
                    onChange={handleInputChange}
                    className="form-control form-control-md border-1 add-todo-input bg-transparent"
                    type="number"
                    id="floatingInput"
                    name="number"
                    placeholder="Customer Phone No."
                    value={orderData.number}
                  />
                  <label for="floatingInput">Mobile No.</label>
                </div>

                <div className="form-floating col w-100 bg-white p-0 mb-3">
                  <textarea
                    rows="4"
                    onChange={handleInputChange}
                    className="form-control form-control-md rounded border-1 add-todo-input bg-transparent rounded"
                    type="text"
                    name="address"
                    placeholder="Customer Address"
                    value={orderData.address}
                  />
                  <label for="floatingInput">Address</label>
                </div>
                <div className="col-auto m-0 p-0 w-100 d-flex align-items-center justify-content-between">
                  <div>
                    <label className="text-secondary my-2 p-0 px-1 view-opt-label due-date-label">
                      Set Due Date:
                    </label>

                    <input
                      type="date"
                      onChange={handleDateChange}
                      value={new Date(order.dueDate).toLocaleDateString(
                        "en-CA"
                      )}
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={updateOrder}
                      className="btn btn-primary"
                      data-dismiss="modal"
                    >
                      Update Order
                    </button>
                  </div>
                </div>
                <div className="col-auto px-0 mx-0 me-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
