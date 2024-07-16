import Link from "next/link";
import { useEffect, useState, useRef } from "react";
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
import Modal from "@aio/components/Modal";

export default function AddOrder() {
  var currentDate = new Date().toISOString().slice(0, 10);

  const [customerId, setCustomerId] = useState(null);
  const [productId, setProductId] = useState([]);
  const [OrderDate, setOrderDate] = useState(currentDate);
   let [storeTotalAmount, setStoreTotalAmount] = useState("");
  const [Status, setStatus] = useState("");
  const [Quantity, setQuantity] = useState("");
  //const [UnitPrice, setUnitPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [customerSearch, setCustomerSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderId, SetOrderId] = useState("");
  const [isPdfDownload, setIsPdfDownload] = useState(false);
  const [tableProductsData, setTableProductsData] = useState([]);
  const isInitialRender = useRef(true);
  const [selectproduct, setSelectProduct] = useState([]);
  const [billingNo, setBillingNo] = useState();

  const router = useRouter();

  //use effect used for fetching data from customer table and product table

  useEffect(() => {
    setIsLoading(true);
    //This is used for fetching customer Data
    const token = Cookies.get("token");
    const parseToken = JSON.parse(token) || {};
    const fetchCustomerData = async () => {
      const response = await fetch(
        `${API_BASE_URL}/customer/getAllActiveCustomers?search=${customerSearch}`,
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

        setCustomerList(data.activeCustomers);
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
        `${API_BASE_URL}/product/getAllActiveProduct?search=${productSearch}`,
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

        setProductList(data.activeProducts);
        setIsLoading(false);
      } else {
        const data = await response.json();
        setIsLoading(false);
      }
    };
    fetchProductData();
    fetchCustomerData();
  }, [customerId, productId, customerSearch, productSearch]);

  //Perform Add Functionality

  const addOrderCategory = () => {
    // if (name.trim() === "" || description.trim() === "") {
    //   alert("Please fill required fields.");
    //   return;
    // }
    setIsLoading(true);
    const token = Cookies.get("token");
    const parseToken = JSON.parse(token) || {};

    

   
const keyChange={value:"productId"}
function changeKeyNames(array, keyMap) {
  return array.map(obj => {
    const newObj = {};
    for (const oldKey in obj) {
      if (obj.hasOwnProperty(oldKey)) {
        const newKey = keyMap[oldKey] || oldKey;
        newObj[newKey] = obj[oldKey];
      }
    }
    return newObj;
  });
}
const productArray=changeKeyNames(tableProductsData, keyChange)

    let orderDetail = {
      customerId: customerId?.value ? customerId?.value : undefined,
     // productId: productId?.value ? productId?.value : undefined,
      OrderDate: OrderDate.trim() ? OrderDate : undefined,
      //Quantity: Quantity.trim() ? Quantity : undefined,
      Status: Status.trim() ? Status : undefined,
      products: productArray,
      BillNumber:billingNo
    };
    
    // Filter out undefined values from the object
    orderDetail = Object.fromEntries(
      Object.entries(orderDetail).filter(([_, v]) => v !== undefined)
    );

    const fetchData = async () => {
      const response = await fetch(`${API_BASE_URL}/order/addOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parseToken}`,
        },
        body: JSON.stringify(orderDetail),
      });

      if (response.ok) {
        const data = await response.json();
        SetOrderId(data.data._id);
        setIsModalOpen(true);
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

 

  const productChange = (selectedOptions) => {
    setProductId(selectedOptions);
    const productIdStore = selectedOptions;
    const updateTableData = async () => {
      const updatedTableData = await Promise.all(
        productIdStore.map(async (item) => {
          const existingProduct = tableProductsData.find((p) => p.value === item.value);  
      if (existingProduct) {
        // If the product is already in the table, update its information
        return {
          ...existingProduct,
        };
      } else {
            const {
              productName,
              sellingPrice,
              boardWarrent,
              smpsWarrent,
              timerWarrenty,
              ledModuleWarrenty,
              quantity,
            } = await fetchProductDataById(item.value);
            return {
              ...item,
              productName,
              sellingPrice,
              boardWarrent,
              smpsWarrent,
              timerWarrenty,
              ledModuleWarrenty,
              quantity,
            };
          }
          
        })
      );
      
      if(updatedTableData){
        storeTotalAmount=0;
        updatedTableData.map((obj)=>{
          const prdQuantity=obj.quantity
          const prdAmount =obj.quantity*obj.sellingPrice
          storeTotalAmount+=prdAmount
          setStoreTotalAmount(storeTotalAmount)
        })
      }
      setTableProductsData(updatedTableData);
    };
   
    setIsLoading(true);
    const token = Cookies.get("token");
    const parseToken = JSON.parse(token) || {};

    const fetchProductDataById = async (selectProductId) => {
      const response = await fetch(
        `${API_BASE_URL}/product/getProductById/${selectProductId}`,
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
        return {
          productName: data.result.ProductName,
          sellingPrice: data.result.sellingPrice,
          boardWarrent: data.result.boardWarrent,
          smpsWarrent: data.result.smpsWarrent,
          timerWarrenty: data.result.timerWarrenty,
          ledModuleWarrenty: data.result.ledModuleWarrenty,
          quantity: data.result.StockQuantity,
        };
     
      } else {
        const data = await response.json();
        setIsLoading(false);
      }
    };
    
    if(productIdStore.length== 0){
      setStoreTotalAmount(" ")
      updateTableData();
    }else{
      updateTableData();
    }
   
    
  };

  const handleTableInputChange = (itemId, field, value) => {
    const updatedTableData = tableProductsData.map((item) =>
      item.value === itemId ? { ...item, [field]: value } : item
    );
   
    if(updatedTableData){
      storeTotalAmount=0;
      updatedTableData.map((obj)=>{
        const prdQuantity=obj.quantity
        const prdAmount =obj.quantity*obj.sellingPrice
        storeTotalAmount+=prdAmount
        setStoreTotalAmount(storeTotalAmount)
      })
    }
    setTableProductsData(updatedTableData);
  };
  //Perform action on MOdal

  const handleDataSubmit = () => {
    setIsModalOpen(false);
    toast.success("Add successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
    router.push("/order");
    setIsLoading(false);
  };

  const handleDownLoadPdf = (orderId) => {
    const token = Cookies.get("token");
    const parseToken = JSON.parse(token) || {};
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch(
        `${API_BASE_URL}/order/orderPdf/${orderId}`,
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
        const url = data.url;
        window.open(url, "_blank");
        toast.success("Add successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        router.push("/order");
        setIsLoading(false);
        setIsModalOpen(false);
        setIsPdfDownload(true);
      } else {
        const data = await response.json();
        setIsLoading(false);
      }
    };
    fetchData();
  };
  const closeModal = () => {
    setIsModalOpen(false);
    toast.success("Add successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
    router.push("/order");
    setIsLoading(false);
  };
  return (
    <Section>
      {isLoading && <Spinner />}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        heading="Do you want Download the Order Details PDF? "
        positiveText="Yes"
        negativeText="No"
        onSubmit={() => handleDownLoadPdf(orderId)}
        onCancel={handleDataSubmit}
      />
      <div className="donarPage w-100">
        <ToastContainer position="top-right" autoClose={5000} />

        <div className="addDonarForm">
          <h2 className={`${styles.formHeaderext}`}>Enter Order Details</h2>
          <form>
            <div className="formMainDiv">
              {/* <div className="label-form eventInp">
                <label htmlFor="customerid">Customer</label>
                <br />
                <select
                  name="customerid"
                  onChange={(e) => setCustomerId(e.target.value)}
                >
                  <option>Select One</option>
                  {customerList.map((val) => (
                    <option key={val._id} value={val._id}>
                      {val.Name}
                    </option>
                  ))}
                </select>
              </div> */}

              <div className="label-form eventInp">
                <label htmlFor="customerid" className="required">
                  Customer
                </label>
                <br />

                <Select
                  // name="customerid"
                  options={customerList.map((element) => ({
                    value: element._id,
                    label: element.Name,
                  }))}
                  placeholder="Select One"
                  defaultValue={customerId}
                  onChange={setCustomerId}
                  onInputChange={handleInputChangeCustomer}
                  //isSearchable
                />
              </div>

              {/* <div className="label-form eventInp">
                <label htmlFor="productid">Product</label>
                <br />
                <select
                  name="productid"
                  onChange={(e) => setProductId(e.target.value)}
                >
                  <option>Select One</option>
                  {productList.map((val) => (
                    <option key={val._id} value={val._id}>
                      {val.ProductName}
                    </option>
                  ))}
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
                  //min={new Date().toISOString().split("T")[0]}
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
                  <option value={""}>Select one</option>
                  <option value={"Pending"}>Pending</option>
                  <option value={"Shipped"}>Shipped</option>
                  <option value={"Delivered"}>Delivered</option>
                </select>
              </div>
              <div className="label-form eventInp">
                <label htmlFor="productid" className="required">
                  Product
                </label>
                <br />

                <Select
                  // name="customerid"
                  options={productList.map((element) => ({
                    value: element._id,
                    label: element.ProductName,
                  }))}
                  placeholder="Select One"
                  // defaultValue={productId}
                  onChange={productChange}
                  onInputChange={handleInputChangeProduct}
                  isMulti
                  //onClose={handleMenuClose}
                  //components={{ MultiValueRemove }}
                  //isSearchable
                />
              </div>
              {/* {productId.map((product) => (
                <div key={product.value} className="label-form eventInp">
                  <label htmlFor="quantity" className="required">
                    Quantity for {product.label}
                  </label>
                  <br />
                  <input
                    type="number"
                    id="name"
                    //value={Quantity}
                    //onChange={(e) => setQuantity(e.target.value)}
                    value={
                      (
                        products.find(
                          (item) => item.productId === product.value
                        ) || {}
                      ).quantity || ""
                    }
                    onChange={(e) =>
                      handleQuantityChange(product.value, e.target.value)
                    }
                  />
                </div>
              ))} */}

              <div className="label-form eventInp">
                <label htmlFor="billingNo" className="required">Biiling Number</label>
                <br />
                <input
                  type="text"
                  id="name"
                  value={billingNo}
                  onChange={(e) => setBillingNo(e.target.value)}
                />
              </div>
              <div className="label-form eventInp">
                <label htmlFor="totalamount" >Total Amount</label>
                <br />
                <input
                  type="number"
                  id="name"
                  value={storeTotalAmount }
                  disabled
                  //onChange={(e) => setBillingNo(e.target.value)}
                />
              </div>
            </div>
            {tableProductsData.length !==0 ? (<div className="table-responsive w-100">
              
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" >Product Name</th>
                    <th scope="col" className="required">
                      Quantity
                    </th>
                    <th scope="col" className="required">Selling Price</th>
                    <th scope="col">Board Warranty</th>
                    <th scope="col">SMPS Warranty</th>
                    <th scope="col">Timer Warranty</th>
                    <th scope="col">LED Module Warranty </th>
                  </tr>
                </thead>

                <tbody>
                  {tableProductsData.map(
                    (product) => (
                     
                        <tr className="forCenter" key={product.value}>
                          <td >{product.productName}</td>
                          <td>
                            <div className="label-form eventInp">
                              <label htmlFor="quantity" >
                              </label>
                              <br />
                              <input
                                className="tableInput"
                                type="number"
                                id="name"
                                value={product.quantity}
                                onChange={(e) =>
                                  handleTableInputChange(
                                    product.value,
                                    "quantity",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <div className="label-form eventInp">
                              <label htmlFor="sellingPrice" >
                              </label>
                              <br />
                              <input
                                className="tableInput"
                                type="number"
                                id="name"
                                value={
                                  product.sellingPrice
                                }
                                onChange={(e) =>
                                  handleTableInputChange(
                                    product.value,
                                    "sellingPrice",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <div className="label-form eventInp">
                              <label htmlFor="boardWarrent" >
                              </label>
                              <br />
                              <input
                                className="tableInput"
                                type="text"
                                id="name"
                                value={
                                  product.boardWarrent
                                }
                                onChange={(e) =>
                                  handleTableInputChange(
                                    product.value,
                                    "boardWarrent",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <div className="label-form eventInp">
                              <label htmlFor="smpsWarrent" >
                              </label>
                              <br />
                              <input
                                className="tableInput"
                                type="text"
                                id="name"
                                value={
                                  product.smpsWarrent
                                }
                                onChange={(e) =>
                                  handleTableInputChange(
                                    product.value,
                                    "smpsWarrent",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <div className="label-form eventInp">
                              <label htmlFor="timerWarrenty" >
                              </label>
                              <br />
                              <input
                                className="tableInput"
                                type="text"
                                id="name"
                                value={
                                  product.timerWarrenty
                                }
                                onChange={(e) =>
                                  handleTableInputChange(
                                    product.value,
                                    "timerWarrenty",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <div className="label-form eventInp">
                              <label htmlFor="ledModuleWarrenty" >
                              </label>
                              <br />
                              <input
                                className="tableInput"
                                type="text"
                                id="name"
                                value={
                                  product.ledModuleWarrenty
                                }
                                onChange={(e) =>
                                  handleTableInputChange(
                                    product.value,
                                    "ledModuleWarrenty",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </td>
                        </tr>
                     
                    )
                  )}
                </tbody>
              </table>
            </div>):(" ")}
            

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
                  onClick={addOrderCategory}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
}
