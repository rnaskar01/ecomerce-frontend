import { useState, useEffect } from "react";
import { ITEMS_PER_PAGE } from "../../../app/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateOrderAsync,
  fetchAllOrdersAsync,
  selectTotalOrders,
} from "../../order/orderSlice";
import { selectAllOrders } from "../../order/orderSlice";
import { PencilIcon, EyeIcon,ArrowDownIcon,ArrowUpIcon } from "@heroicons/react/24/outline";
import Pagination from "../../common/Pagination";
import { fetchProductsByFiltersAsync } from "../../Product/Product-Slice";

function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const [sort, setSort] = useState({});

  const totalOrders = 30;
  const [editableOrderId, setEditableOrderId] = useState(-1);
  // console.log("orders"+orders);

  // useEffect(()=>{
  //   dispatch(fetchAllOrdersAsync())

  // },[])

  const handlePage = (page) => {
    setPage(page);
  };
  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort };
    console.log(sort);
    setSort(sort);
  };

  useEffect(() => {
    const pagination = { _start: (page - 1) * 10, _end: page * 10 };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page]);

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleShow = () => {
    //console.log("handleShow");
  };

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(UpdateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 text-left cursor-pointer"
                      onClick={(e) => handleSort({ sort: "id" })}
                    >
                      Order Id {" "}
                      {sort._sort==='id'  ? <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon> : <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>}
                    </th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th className="py-3 px-6 text-center cursor-pointer" onClick={(e) => handleSort({ sort: "totalAmount" })}>Total Amount
                    {sort._sort==='totalAmount'  ? <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon> : <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>}

                    </th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order) => (
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order.items.map((item) => (
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.thumbnail}
                              />
                            </div>
                            <span>{item.title}</span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          ₹ {order.totalAmount}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div>
                          <div>
                            {" "}
                            <strong>{order.selectedAddress.name},</strong>
                          </div>
                          <div>{order.selectedAddress.street},</div>
                          <div>{order.selectedAddress.city},</div>
                          <div>{order.selectedAddress.state},</div>
                          <div>{order.selectedAddress.pincode},</div>
                          <div>{order.selectedAddress.phone}</div>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {order.id === editableOrderId ? (
                          <select onChange={(e) => handleUpdate(e, order)}>
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-110">
                            <EyeIcon
                              className="w-6 h-6"
                              onClick={(e) => handleShow(order)}
                            ></EyeIcon>
                          </div>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <PencilIcon
                              className="w-6 h-6"
                              onClick={(e) => handleEdit(order)}
                            ></PencilIcon>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}
      ></Pagination>
    </div>
  );
}

export default AdminOrders;
