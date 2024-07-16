import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { API_BASE_URL } from "../../../../utils/config";
// import { Multiselect } from "multiselect-react-dropdown";
import { ToastContainer, toast } from "react-toastify";
import Section from "@aio/components/Section";
import styles from "../order.module.css";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../../components/Spinner";
import Select from "react-select";
import Cookies from "js-cookie";
export default function UpdateOrder() {
  // var currentDate=new Date().toISOString().slice(0,10);

  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [OrderDate, setOrderDate] = useState("");
  let [storeTotalAmount, setStoreTotalAmount] = useState("");
  const [Status, setStatus] = useState("");
  const [Quantity, setQuantity] = useState("");
  //const [UnitPrice, setUnitPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [customerSearch, setCustomerSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [defaultCustomerValue, setDefaultCustomerValue] = useState("");
  const [defaultProductValue, setDefaultProductValue] = useState("");
  const [defaultCustomerName, setDefaultCustomerName] = useState({});
  const [defaultProductName, setDefaultProductName] = useState({});
  const [tableProductsData, setTableProductsData] = useState([]);
  const [billingNo, setBillingNo] = useState();

  const router = useRouter();
  //it is used for get id from the existing data in table
  const slug = router.query;

  const orderItemId = slug.slug;

  //use effect used for fetching data from customer table and product table
  useEffect(() => {
    setIsLoading(true);

    //This is used for fetching customer Data
    const token = Cookies.get("token");
    const parseToken = JSON.parse(token) || {};

    const fetchCustomerData = async () => {
      const response = await fetch(
        `${API_BASE_URL}/customer/getCustomer?search=${customerSearch}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parseToken}`,
          },
          body: JSON.stringify(),
        }
      );

      if (response.ok) {
        const data = await response.json();

        setCustomerList(data.data);
        // setData(data.data);
        // setTempleData(data.data.data);
        // const initialIsActive = data.data.data.map((event) => event.isActive);
        // setIsActive(initialIsActive);
        // const initialeventId = data.data.data.map((event) => event._id);
        // seteventId(initialeventId);
        setIsLoading(false);
      } else {
        const data = await response.json();
        setIsLoading(false);
      }
    };

    //This is used for fetching product Data
    const fetchProductData = async () => {
      const response = await fetch(
        `${API_BASE_URL}/product/getProducts?search=${productSearch}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parseToken}`,
          },
          body: JSON.stringify(),
        }
      );

      if (response.ok) {
        const data = await response.json();

        setProductList(data.data);
        setIsLoading(false);
      } else {
        const data = await response.json();
        setIsLoading(false);
      }
    };
    fetchProductData();
    fetchCustomerData();
  }, [customerId, productId, , customerSearch, productSearch]);

  //Update function performed
  useEffect(() => {
    if (orderItemId) {
      setIsLoading(true);
      const token = Cookies.get("token");
      const parseToken = JSON.parse(token) || {};
      const fetchProductDataById = async (orderItemId) => {
        const response = await fetch(
          `${API_BASE_URL}/order/getOrderById/${orderItemId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${parseToken}`,
            },
            body: JSON.stringify(),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setTableProductsData(data.result.products);
          setBillingNo(data?.result?.BillNumber || " ");
          setCustomerId(data?.result?.customerId || " ");
          setProductId(data?.result?.productId || " ");
          setOrderDate(data?.result?.OrderDate.slice(0, 10) || " ");
          setStoreTotalAmount(data?.result?.TotalAmount || " ");
          setStatus(data?.result?.Status || " ");
          setQuantity(data?.result?.Quantity || " ");
          // setUnitPrice(data?.result?.UnitPrice || " ")
          //setDefaultCustomerValue(data?.result?.customerId?._id || " ");
          //setDefaultProductValue(data?.result?.productId?._id || " ");
          //setDefaultCustomerName(data?.result?.customerId?.Name || " ")
          setDefaultCustomerName({
            value: data?.result?.customerId?._id,
            label: data?.result?.customerId?.Name,
          });
          // setDefaultProductName(data?.result?.productId?. ProductName|| " ")

          setDefaultProductName({
            value: data?.result?.productId?._id,
            label: data?.result?.productId?.ProductName,
          });
          // setData(data.data);
          // setTempleData(data.data.data);
          // const initialIsActive = data.data.data.map((event) => event.isActive);
          // setIsActive(initialIsActive);
          // const initialeventId = data.data.data.map((event) => event._id);
          // seteventId(initialeventId);
          setIsLoading(false);
        } else {
          const data = await response.json();
          setIsLoading(false);
        }
      };
      fetchProductDataById(orderItemId);
    }
  }, [orderItemId]);

  //perform submit functionality

  const updateOrderCategoryById = (orderItemId) => {
    // if (name.trim() === "" || description.trim() === "") {
    //   alert("Please fill required fields.");
    //   return;
    // }

    // const token = localStorage.getItem("token");
    // const parseToken = JSON.parse(token) || {};
    setIsLoading(true);
    //Here we check the id is object format or string format for Customer name id
    let customerNameId = "";
    if (customerId.value) {
      customerNameId = customerId.value;
    } else {
      customerNameId = customerId._id;
    }

    //Here we check the id is object format or string format for Product name id
    // let productNameId = "";
    // if (productId.value) {
    //   productNameId = productId.value;
    // } else {
    //   productNameId = productId._id;
    // }

    const updatedArray = tableProductsData.map((obj) => ({
      ...obj,
      quantity:
        typeof obj.quantity === "string"
          ? parseInt(obj.quantity, 10) || 0
          : obj.quantity,
    }));
    let orderDetail = {
      customerId: customerNameId.trim() ? customerNameId : undefined,
      //productId: productNameId.trim() ? productNameId : undefined,
      OrderDate: OrderDate.trim() ? OrderDate : undefined,
      // Quantity:
      //   Quantity !== undefined && Quantity !== null && Quantity !== 0
      //     ? Quantity
      //     : undefined,
      //Quantity: Quantity.trim() ? Quantity : undefined,
      Status: Status.trim() ? Status : undefined,
      BillNumber: billingNo.trim() ? billingNo : undefined,
      products: updatedArray,
    };
    // Filter out undefined values from the object
    orderDetail = Object.fromEntries(
      Object.entries(orderDetail).filter(([_, v]) => v !== undefined)
    );

    const token = Cookies.get("token");
    const parseToken = JSON.parse(token) || {};
    const fetchData = async () => {
      const response = await fetch(
        `${API_BASE_URL}/order/updateOrderById/${orderItemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parseToken}`,
          },
          body: JSON.stringify(orderDetail),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success("Update successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        router.push("/order");
        setIsLoading(false);
      } else {
        const data = await response.json();
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
      }
    };
    fetchData();
  };

  //It is used for get the value when change the value in dropdown list
  const handleInputChangeCustomer = (inputValue) => {
    // Implement searching logic here if needed

    setCustomerSearch(inputValue);
  };
  const handleInputChangeProduct = (inputValue) => {
    // Implement searching logic here if needed

    setProductSearch(inputValue);
  };
  const handleProductChange = (userData) => {
    setDefaultProductName(userData);
    setProductId(userData);
  };
  const handleCustomerChange = (userData) => {
    setDefaultCustomerName(userData);
    setCustomerId(userData);
  };
  const handleTableInputChange = (itemId, field, value) => {
    const updatedTableData = tableProductsData.map((item) =>
      item.productId === itemId ? { ...item, [field]: value } : item
    );

    if (updatedTableData) {
      storeTotalAmount = 0;
      updatedTableData.map((obj) => {
        const prdQuantity = obj.quantity;
        const prdAmount = obj.quantity * obj.sellingPrice;
        storeTotalAmount += prdAmount;
        setStoreTotalAmount(storeTotalAmount);
      });
    }
    setTableProductsData(updatedTableData);
  };

  return (
    <Section>
      {isLoading && <Spinner />}
      <div className="donarPage w-100">
        <ToastContainer position="top-right" autoClose={5000} />

        <div className="addDonarForm">
          <h2 className={`${styles.formHeaderext}`}>
            Update the Order Details
          </h2>
          <form>
            <div className="formMainDiv">
              <div className="label-form eventInp">
                <label htmlFor="customerid" className="required">
                  Customer
                </label>
                <br />
                <Select
                  name="customerid"
                  options={customerList.map((element) => ({
                    value: element._id,
                    label: element.Name,
                  }))}
                  placeholder="Select One"
                  //defaultValue={defaultCustomerName}
                  onChange={handleCustomerChange}
                  onInputChange={handleInputChangeCustomer}
                  value={defaultCustomerName}
                  isDisabled={true}
                  //isSearchable
                />
              </div>

              {/* <div className="label-form eventInp">
              <label htmlFor="customerid">Customer</label>
              <br />
              <select name="customerid" 
                onChange={(e) =>setCustomerId(e.target.value)}>
                  <option value={customerId._id}>{customerId.Name}</option>
                   {customerList.map(val=><option key={val._id} value={val._id}>{val.Name}</option>) }

                </select>
            </div>


            <div className="label-form eventInp">
              <label htmlFor="productid">Product</label>
              <br />
              <select name="productid" 
                onChange={(e) =>setProductId(e.target.value)}>
                  <option value={productId._id}>{productId.ProductName}</option>
                   {productList.map(val=><option key={val._id}  value={val._id}>{val.ProductName}</option>) }

                </select>
            </div> */}

              <div className="label-form eventInp">
                <label htmlFor="orderdate" className="required">
                  Order Date
                </label>
                <br />
                <input
                  type="date"
                  id="name"
                  value={OrderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                  disabled
                />
              </div>
              {/* <div className="label-form eventInp">
              <label htmlFor="totalamount">Total Amount</label>
              <br />
              <input
                type="number"
                id="name"
                value={TotalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
              />
            </div> */}
              <div className="label-form eventInp">
                <label htmlFor="status" className="required">
                  Status
                </label>
                <br />
                <select onChange={(e) => setStatus(e.target.value)}>
                  <option value={Status}>{Status}</option>
                  <option value={"Pending"}>Pending</option>
                  <option value={"Shipped"}>Shipped</option>
                  <option value={"Delivered"}>Delivered</option>
                </select>
              </div>
              {/* <div className="label-form eventInp">
                <label htmlFor="quantity" className="required">Quantity</label>
                <br />
                <input
                  type="number"
                  id="name"
                  value={Quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div> */}
              {/* <div className="label-form eventInp">
                <label htmlFor="productid" className="required">
                  Product
                </label>
                <br />

                <Select
                  name="productid"
                  options={productList.map((element) => ({
                    value: element._id,
                    label: element.ProductName,
                  }))}
                  placeholder="Select One"
                  //defaultValue={defaultProductName}
                  onChange={handleProductChange}
                  onInputChange={handleInputChangeProduct}
                  value={tableProductsData.map((products)=>({
                   
                    value: products.productId,
                    label: products.ProductName,

                  }))}
                  //isDisabled={true}
                  isMulti
                  //isSearchable
                />
              </div> */}
              <div className="label-form eventInp">
                <label htmlFor="billingNo" className="required">
                  Biiling Number
                </label>
                <br />
                <input
                  type="text"
                  id="name"
                  value={billingNo}
                  onChange={(e) => setBillingNo(e.target.value)}
                  disabled
                />
              </div>
              <div className="label-form eventInp">
                <label htmlFor="totalamount">Total Amount</label>
                <br />
                <input
                  type="number"
                  id="name"
                  value={storeTotalAmount}
                  disabled
                  //onChange={(e) => setBillingNo(e.target.value)}
                />
              </div>

              {/* <div className="label-form eventInp">
              <label htmlFor="unitprice">Unit Price</label>
              <br />
              <input
                type="number"
                id="name"
                value={UnitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
              />
            </div> */}
              <div className="table-responsive w-100">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Product Name</th>
                      <th scope="col" className="required">
                        Quantity
                      </th>
                      <th scope="col" className="required">
                        Selling Price
                      </th>
                      <th scope="col">Board Warranty</th>
                      <th scope="col">SMPS Warranty</th>
                      <th scope="col">Timer Warranty</th>
                      <th scope="col">LED Module Warranty </th>
                    </tr>
                  </thead>

                  <tbody>
                    {tableProductsData.map((product) => (
                      <tr className="forCenter" key={product.productId}>
                        <td>{product.productName}</td>
                        <td>
                          <div className="label-form eventInp">
                            <label htmlFor="quantity"></label>
                            <br />
                            <input
                              className="tableInput"
                              type="number"
                              id="name"
                              defaultValue={product.actualQuantity}
                              //value={product.actualQuantity}
                              onChange={(e) =>
                                handleTableInputChange(
                                  product.productId,
                                  "quantity",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <div className="label-form eventInp">
                            <label htmlFor="sellingPrice"></label>
                            <br />
                            <input
                              className="tableInput"
                              type="number"
                              id="name"
                              value={product.sellingPrice}
                              onChange={(e) =>
                                handleTableInputChange(
                                  product.productId,
                                  "sellingPrice",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <div className="label-form eventInp">
                            <label htmlFor="boardWarrent"></label>
                            <br />
                            <input
                              className="tableInput"
                              type="text"
                              id="name"
                              value={product.boardWarrent}
                              onChange={(e) =>
                                handleTableInputChange(
                                  product.productId,
                                  "boardWarrent",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <div className="label-form eventInp">
                            <label htmlFor="smpsWarrent"></label>
                            <br />
                            <input
                              className="tableInput"
                              type="text"
                              id="name"
                              value={product.smpsWarrent}
                              onChange={(e) =>
                                handleTableInputChange(
                                  product.productId,
                                  "smpsWarrent",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <div className="label-form eventInp">
                            <label htmlFor="timerWarrenty"></label>
                            <br />
                            <input
                              className="tableInput"
                              type="text"
                              id="name"
                              value={product.timerWarrenty}
                              onChange={(e) =>
                                handleTableInputChange(
                                  product.productId,
                                  "timerWarrenty",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <div className="label-form eventInp">
                            <label htmlFor="ledModuleWarrenty"></label>
                            <br />
                            <input
                              className="tableInput"
                              type="text"
                              id="name"
                              value={product.ledModuleWarrenty}
                              onChange={(e) =>
                                handleTableInputChange(
                                  product.productId,
                                  "ledModuleWarrenty",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="d-flex ">
              <div className="submitEvent addDonarSubmitBtnMain">
                <Link href="/order">
                  {" "}
                  <button className="addDonarSubmitBtn" type="button">
                    Back
                  </button>
                </Link>
              </div>
              <div className="nextDonarSubmitBtnMain">
                <button
                  className="addDonarSubmitBtn"
                  type="button"
                  onClick={() => updateOrderCategoryById(orderItemId)}
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
}
