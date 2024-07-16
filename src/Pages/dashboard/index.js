import { useEffect, useRef, useState } from "react";
import styles from "./Home.module.css";
import Table from "react-bootstrap/Table";
import { MdDeleteForever, MdOutlinePayment, MdSell } from "react-icons/md";
import Pagination from "react-js-pagination";
import { GiExpense } from "react-icons/gi";
import { GiProfit } from "react-icons/gi";
import { BsFillCartCheckFill, BsFillPersonPlusFill } from "react-icons/bs";
import HeaderSection from "@aio/components/HeaderSection";
import Section from "@aio/components/Section";
import { API_BASE_URL } from "../../../utils/config";
import Spinner from "../../components/Spinner";
import React from "react";
import { Line } from "react-chartjs-2";
import Cookies from "js-cookie";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import Image from "next/image";
import { BiPurchaseTagAlt } from "react-icons/bi";
import PositiveModal from "@aio/components/profitloss/positive/positive";
import NegativeModal from "@aio/components/profitloss/negative/negative";
import Link from 'next/link';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [topCustomerrData, setTopCustomerData] = useState([]);
  const [totalCountData, setTotalCountData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [orderTotal, setOrderTotal] = useState([]);
  const [orderPending, setOrderPending] = useState([]);
  const [orderShipped, setOrderShipped] = useState([]);
  const [orderDelivered, setOrderDelivered] = useState([]);
  const [cusmtomerData, setCustomerData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [activePageCust, setActivePageCust] = useState(1);
  const [activePageSupplier, setActivePageSupplier] = useState(1);
  const [page, setPage] = useState(1);
  const [size, setsize] = useState(6);
  const [sizeCust, setsizeCust] = useState(6);
  const [sizeSupplier, setsizeSupplier] = useState(6);
  const [paginationData, setPaginationData] = useState([]);
  const [paginationDataCustomer, setPaginationDataCustomer] = useState([]);
  const [paginationDataTopCustomer, setPaginationDataTopCustomer] = useState([]);
  const [search, setSearch] = useState("");
  const [searchCust, setSearchCust] = useState("");
  const [searchSupplier, setSearchSupplier] = useState("");
  const [orderData, setOrderData] = useState([]);
  const [lengthSupplierData, setLengthSupplierData] = useState([]);
  const [lengthProductData, setLengthProductData] = useState([]);
  const [lengthCusmtomerData, setLengthCustomerData] = useState([]);
  const [LengthOrderData, setLengthOrderData] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [profitLossData, setProfitLossData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [orderTrackerData, setOrderTrackerData] = useState([]);
  const monthName = graphData?.map((item) => item.monthName);
  const purchaseAmount = graphData?.map((item) => item.totalPurchaseCost);
  const sellAmount = graphData?.map((item) => item.totalSalesRevenue);
  const [orderTrackerStatus, setOrderTrackerStatus] = useState("Pending");
  const [orderTrackerSearch, setOrderTrackerSearch] = useState("");
  const [orderTrackerActivePage, setOrderTrackerActivePage] = useState(1);
  const [orderTrackerPagination, setOrderTrackerPagination] = useState("");
  const [showcurrentmonthdata, setShowCurrentMonthData] = useState([]);
  

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const handleOrderTrackerSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const handleSearchChangeCust = (event) => {
    setSearchCust(event.target.value);
  };
  const handleSearchChangeSupplier = (event) => {
    setSearchSupplier(event.target.value);
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const purchaseOption = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Purchase",
        font: {
          size: 18,
          weight: "bold",
        },
        textAlign: "left",
      },
    },
  };
  const orderOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Order",
        font: {
          size: 18,
          weight: "bold",
        },
        textAlign: "left",
      },
    },
  };
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const monthlyPurchaseData = {
    labels: monthName,
    datasets: [
      {
        label: "Purchase",
        // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        data: purchaseAmount,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const monthlyOrderData = {
    labels: monthName,
    datasets: [
      {
        label: "Order",
        data: sellAmount,
        // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  //Get all Total count for product,customer,order and supplier
  useEffect(() => {
    setIsLoading(true);
    const token = Cookies.get("token");

    const parseToken = JSON.parse(token) || {};
    const fetchData = async () => {
      const response = await fetch(`${API_BASE_URL}/totalCount/getTotalacount`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parseToken}`,
        },
        body: JSON.stringify(),
      });

      if (response.ok) {
        const data = await response.json();
        
        setTotalCountData(data.data);
        //setLengthSupplierData(data.totalDocuments);
        setIsLoading(false);
      } else {
        const data = await response.json();
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  //Get all product data
  // useEffect(() => {
  //   setIsLoading(true);
  //   const token = localStorage.getItem("token");
  //   const parseToken = JSON.parse(token) || {};

  //   const fetchData = async () => {
  //     const response = await fetch(`${API_BASE_URL}/product/getProducts`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${parseToken}`,
  //       },
  //       body: JSON.stringify(),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       
  //       setProductData(data.data);
  //       setLengthProductData(data.totalDocuments);
  //       setIsLoading(false);
  //     } else {
  //       const data = await response.json();
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  //Get all customer data
  // useEffect(() => {
  //   setIsLoading(true);
  //   const token = localStorage.getItem("token");
  //   const parseToken = JSON.parse(token) || {};

  //   const fetchData = async () => {
  //     const response = await fetch(`${API_BASE_URL}/customer/getCustomer`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${parseToken}`,
  //       },
  //       body: JSON.stringify(),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //      
  //       setCustomerData(data.data);
  //       setLengthCustomerData(data.totalDocuments);
  //       setIsLoading(false);
  //     } else {
  //       const data = await response.json();
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const parseToken = JSON.parse(token) || {};
  //   // setIsLoading(true);

  //   const fetchData = async () => {
  //     const response = await fetch(
  //       `${API_BASE_URL}/order/getAllOrder?page=${activePage}&size=${size}&search=${"Pending"}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${parseToken}`,
  //         },
  //         body: JSON.stringify(),
  //       }
  //     );

  //     if (response.ok) {
  //       const data = await response.json();

  //       setPaginationData(data);

  //       setOrderPending(data.data);
  //       setIsLoading(false);
  //     } else {
  //       const data = await response.json();
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [activePage, search]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const parseToken = JSON.parse(token) || {};
  //   // setIsLoading(true);

  //   const fetchData = async () => {
  //     const response = await fetch(
  //       `${API_BASE_URL}/order/getAllOrder?page=${activePage}&size=${size}&search=${"Shipped"}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${parseToken}`,
  //         },
  //         body: JSON.stringify(),
  //       }
  //     );

  //     if (response.ok) {
  //       const data = await response.json();

  //       setPaginationData(data);

  //       setOrderShipped(data.data);
  //       setIsLoading(false);
  //     } else {
  //       const data = await response.json();
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [activePage, search]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const parseToken = JSON.parse(token) || {};
  //   // setIsLoading(true);

  //   const fetchData = async () => {
  //     const response = await fetch(
  //       `${API_BASE_URL}/order/getAllOrder?page=${activePage}&size=${size}&search=${"Delivered"}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${parseToken}`,
  //         },
  //         body: JSON.stringify(),
  //       }
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //       
  //       setPaginationData(data);

  //       setOrderDelivered(data.data);
  //       setIsLoading(false);
  //     } else {
  //       const data = await response.json();
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [activePage, search]);

  //Get all order data
  // useEffect(() => {
  //   setIsLoading(true);
  //   const token = localStorage.getItem("token");
  //   const parseToken = JSON.parse(token) || {};
  //   const fetchData = async () => {
  //     const response = await fetch(`${API_BASE_URL}/order/getAllOrder`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${parseToken}`,
  //       },
  //       body: JSON.stringify(),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       
  //       setOrderData(data.data);
  //       setLengthOrderData(data.totalDocuments);
  //       setIsLoading(false);
  //     } else {
  //       const data = await response.json();
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  //Get order status data for showing in card 
  useEffect(() => {
    setIsLoading(true);
    const token = Cookies.get("token");
    const parseToken = JSON.parse(token) || {};
    const fetchData = async () => {
      const response = await fetch(`${API_BASE_URL}/order/getStatus`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parseToken}`,
        },
        body: JSON.stringify(),
      });

      if (response.ok) {
        const data = await response.json();
        

        setOrderStatus(data);
        setIsLoading(false);
      } else {
        const data = await response.json();
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  //Get total purchase and sell
  useEffect(() => {
    setIsLoading(true);
    const token = Cookies.get("token");
    const parseToken = JSON.parse(token) || {};
    const fetchData = async () => {
      const response = await fetch(
        `${API_BASE_URL}/transaction/getProfitLoss`,
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
        
        setProfitLossData(data.data);
        //setProfitLossAmount(data.data.profitLoss.slice(0,5))
        setIsLoading(false);
      } else {
        const data = await response.json();
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  //Get top customer from table
  useEffect(() => {
    const token = Cookies.get("token");
    const parseToken = JSON.parse(token) || {};
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch(
        `${API_BASE_URL}/order/getTopCustomer?page=${activePageSupplier}&size=${sizeSupplier}&search=${searchSupplier}`,
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
       
        setTopCustomerData(data.data);
        setPaginationDataTopCustomer(data.pagination);
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
    fetchData();
  }, [activePageSupplier, searchSupplier]);

  const handlePageChangeSupplier = (pageNumber) => {
    setActivePageSupplier(pageNumber);
  };

  //This is used for customer box pagination
  useEffect(() => {
    setIsLoading(true);
    const token = Cookies.get("token");
    const parseToken = JSON.parse(token) || {};
    const fetchData = async () => {
      const response = await fetch(
        `${API_BASE_URL}/customer/getCustomer?page=${activePageCust}&size=${sizeCust}&search=${searchCust}`,
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
        
        setCustomerData(data.data);
        setPaginationDataCustomer(data);
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
    fetchData();
  }, [activePageCust, searchCust]);

  //It is used for to show currently month data in monthly overview box
  useEffect(() => {
    setIsLoading(true);
    const token = Cookies.get("token");
    const parseToken = JSON.parse(token) || {};
    const fetchData = async () => {
      const response = await fetch(
        `${API_BASE_URL}/transaction/getmonthWiseProfitLoss`,
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
        
        const currentDate = new Date();

        const currentMonth = new Intl.DateTimeFormat("en-US", {
          month: "long",
        }).format(currentDate);
        const currentMonthData = data.data.find(
          (item) => item.month === currentMonth
        );
        if (currentMonthData) {
          
          setShowCurrentMonthData(currentMonthData);
        } else {
          
        }
        setIsLoading(false);
      } else {
        const data = await response.json();
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePageChangeCustomer = (pageNumber) => {
    setActivePageCust(pageNumber);
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const parseToken = JSON.parse(token) || {};
  //   // setIsLoading(true);

  //   const fetchData = async () => {
  //     const response = await fetch(
  //       `${API_BASE_URL}/order/getAllOrder?page=${activePage}&size=${size}&search=${search}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${parseToken}`,
  //         },
  //         body: JSON.stringify(),
  //       }
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //      
  //       setPaginationData(data);
  //       setOrderData(data.data);
  //       setIsLoading(false);
  //     } else {
  //       const data = await response.json();
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [activePage, search]);
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleOrderTrackerPageChange = (pageNumber) => {
    setOrderTrackerActivePage(pageNumber);
  };

  //Get All graph data
  useEffect(() => {
    setIsLoading(true);
    const token = Cookies.get("token");

    const parseToken = JSON.parse(token) || {};
    const fetchData = async () => {
      const response = await fetch(
        `${API_BASE_URL}/transaction/getMonthWiseData`,
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
        
        const modifiedData = processMonthWiseData(data.data);

        
        setGraphData(modifiedData);
        setIsLoading(false);
      } else {
        const data = await response.json();
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  function getMonthName(monthNumber) {
    // You can define a function to get month names based on monthNumber
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthNumber - 1] || "Unknown";
  }
  function processMonthWiseData(data) {
    // Convert the received data to a map for easier manipulation
    const dataMap = new Map(data.map((item) => [item.monthNumber, item]));

    // Get the current month
    const currentMonth = new Date().getMonth() + 1;

    // Create an array of months up to the current month
    const months = Array.from({ length: currentMonth }, (_, i) => i + 1);

    // Initialize a new array with months, filling in zero values for missing months
    const newData = months.map((monthNumber) => {
      const existingData = dataMap.get(monthNumber);
      if (existingData) {
        return existingData;
      } else {
        return {
          monthNumber,
          monthName: getMonthName(monthNumber),
          totalPurchaseCost: 0,
          totalSalesRevenue: 0,
          profitLoss: 0,
        };
      }
    });

    return newData;
  }

  //Get Order status data for showing in form of table
  useEffect(() => {
    const token = Cookies.get("token");
    const parseToken = JSON.parse(token) || {};
    // setIsLoading(true);

    const fetchData = async () => {
      const response = await fetch(
        `${API_BASE_URL}/order/searchOrder?page=${orderTrackerActivePage}&size=${size}&search=${orderTrackerSearch}&status=${orderTrackerStatus}`,
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
       
        setOrderTrackerPagination(data);
        // setOrderData(data.data);
        setOrderTrackerData(data.data);
        setIsLoading(false);
      } else {
        const data = await response.json();
        setIsLoading(false);
      }
    };
    fetchData();
  }, [orderTrackerActivePage, orderTrackerSearch, orderTrackerStatus]);

  return (
    <>
      {isLoading && <Spinner />}
      <HeaderSection heading={"Dashboard"} subHeading={"Welcome"} />
      <Section>
        <div className="text-center mx-auto">
          <h3>Monthly Purchase and Order</h3>
        </div>

        <div className={styles.ChartMain}>
          <div className={styles.donationChartMain}>
            <Line data={monthlyPurchaseData} options={purchaseOption} />
          </div>
          <div className={styles.donationChartMain}>
            <Line data={monthlyOrderData} options={orderOptions} />
          </div>
        </div>
      </Section>
      <Section>
        <div className={styles.container}>
          <div className={styles.box}>
            <div>
              <p className={styles.boxHead}>Total Customer</p>
              <p className={styles.boxAmount}>{totalCountData.totalCustomers}</p>
            </div>
            <div className={styles.iconContainer}>
              <BsFillPersonPlusFill size={30} />
            </div>
          </div>

          <div className={styles.box}>
            <div>
              <p className={styles.boxHead}>Total Supplier</p>
              <p className={styles.boxAmount}>{totalCountData.totalSuppliers}</p>
            </div>
            <div className={styles.iconContainer}>
              <BsFillPersonPlusFill size={30} />
            </div>
          </div>
          <div className={styles.box}>
            <div>
              <p className={styles.boxHead}>Total Product</p>
              <p className={styles.boxAmount}>{totalCountData.totalProducts}</p>
            </div>
            <div className={styles.iconContainer}>
              <GiExpense size={30} />
            </div>
          </div>
          <div className={styles.box}>
            <div>
              <p className={styles.boxHead}>Total Order</p>
              <p className={styles.boxAmount}>{totalCountData.totalOrders}</p>
            </div>
            <div className={styles.iconContainer}>
              <GiExpense size={30} />
            </div>
          </div>
          <div className={styles.box}>
            <div>
              <p className={styles.boxHead}>Delivered Order</p>
              <p className={styles.boxAmount}>{orderStatus.delivered}</p>
            </div>
            <div className={styles.iconContainer}>
              <GiExpense size={30} />
            </div>
          </div>
          <div className={styles.box}>
            <div>
              <p className={styles.boxHead}>Pending Order</p>
              <p className={styles.boxAmount}>
                {/* <Section>Helllo</Section> */}
                {orderStatus.pending}
              </p>
            </div>
            <div className={styles.iconContainer}>
              <GiExpense size={30} />
            </div>
          </div>
        </div>
      </Section>
      <Section className={styles.sectionMob}>
        {/* <div className={styles.container}> */}
        <div className={`${styles.box1}  col-md-6`}>
          <div className={`${styles.overviewb} `}>
            <div className={styles.overViewBoxHead}>
              <h3 className={styles.boxHead}>Overview</h3>
            </div>
            <div className={styles.overviewBox}>
              <div className={styles.purchaseSell}>
                <div>
                  <p className={styles.boxHead}>Total Purchase</p>
                  <p className={styles.boxAmount}>
                    {profitLossData.totalPurchaseCost}
                  </p>
                </div>
                <div className={styles.iconContainer}>
                  <BsFillCartCheckFill className={styles.overviewIcon} />
                </div>
              </div>
              <div className={styles.purchaseSell}>
                <div>
                  <p className={styles.boxHead}>Total Sale</p>
                  <p className={styles.boxAmount}>
                    {profitLossData.totalSalesRevenue}
                  </p>
                </div>
                <div className={styles.iconContainer}>
                  <MdSell className={styles.overviewIcon} />
                </div>
              </div>
              {profitLossData.profitLoss > 0 ? (
                <PositiveModal number={profitLossData.profitLoss} text={"Profit"} />
              ) : (
                <NegativeModal number={profitLossData.profitLoss} text={"Stock Amount Remaining"} />
              )}
            </div>
          </div>
        </div>
        <div className={`${styles.box1} col-md-6`}>
          <div className={` ${styles.overviewb}  `}>
            <div className={styles.overViewBoxHead}>
              <h5 className={styles.boxHead}>{showcurrentmonthdata.month}</h5>
            </div>
            <div className={styles.overviewBox}>
              <div className={styles.purchaseSell}>
                <div>
                  <p className={styles.boxHead}>Monthly Purchase</p>
                  <p className={styles.boxAmount}>
                    {showcurrentmonthdata.purchaseTotal}
                  </p>
                </div>
                <div className={styles.iconContainer}>
                  <BsFillCartCheckFill className={styles.overviewIcon} />
                </div>
              </div>
              <div className={styles.purchaseSell}>
                <div>
                  <p className={styles.boxHead}>Monthly Sale</p>
                  <p className={styles.boxAmount}>
                    {showcurrentmonthdata.sellTotal}
                  </p>
                </div>
                <div className={styles.iconContainer}>
                  <MdSell className={styles.overviewIcon} />
                </div>
              </div>
              {showcurrentmonthdata.profitLoss > 0 ? (
                <PositiveModal number={showcurrentmonthdata.profitLoss} text={"Profit"} />
              ) : (
                <NegativeModal number={showcurrentmonthdata.profitLoss} text={"Loss"} />
              )}
            </div>
          </div>
        </div>
        {/* </div> */}
      </Section>
      <Section>
        <div className={styles.boxOrderTable}>
          <h5 className={styles.boxHead}>Order Tracker</h5>
          <div className={styles.orderBoxContent}>
            <div
              className={`${styles.donationButtons} d-flex justify-content-between mb-3  `}
            >
              <div className={`${styles.addDonarsearchMain} input-group `}>
                <input
                  type="text"
                  className={`${styles.addDonarSearch} form-control  `}
                  placeholder="Search"
                  onChange={(e) => setOrderTrackerSearch(e.target.value)}
                  aria-label="Search"
                />{" "}
                <div className="input-group-append">
                  <button
                    onClick={handleOrderTrackerSearchChange}
                    className={`btn btn-outline-secondary searchBtn ${styles.button}`}
                    type="button"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.orderTrackerBoxTable}>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => setOrderTrackerStatus("Pending")}
                    className="nav-link active "
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="home-tab-pane"
                    aria-selected="true"
                  >
                    Pending
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => setOrderTrackerStatus("Shipped")}
                    className="nav-link "
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="profile-tab-pane"
                    aria-selected="false"
                  >
                    Shipped
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => setOrderTrackerStatus("Delivered")}
                    className="nav-link "
                    id="contact-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#contact-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="contact-tab-pane"
                    aria-selected="false"
                  >
                    Delivered
                  </button>
                </li>
              </ul>

              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active table-responsive"
                  id="home-tab-pane"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  tabIndex="0"
                >
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Bill Number</th>
                        <th scope="col">Total Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderTrackerData.map((OrderTracker, index) => (
                        <tr key={index}>
                          <td>
                          <Link href={`/order/show-data/${OrderTracker._id}`} className={`${styles.ColorSpan}`}> 
                  {OrderTracker.products.map((element,index)=>(
                   index<=2 ? (<span key={index}>{index > 0 && ', '}
                   {element.productName}</span>):("")
                 
                  ))}
                      {OrderTracker.products.length > 3?(<span>.....</span>):("")} 
                      </Link>
                          </td>
                          <td>{OrderTracker?.BillNumber}</td>
                          <td>{OrderTracker?.TotalAmount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div
                  className="tab-pane fade"
                  id="profile-tab-pane"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                  tabIndex="0"
                >
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Bill Number</th>
                        <th scope="col">Total Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderTrackerData.map((OrderTracker, index) => (
                        <tr key={index}>
                          <td>
                          <Link href={`/order/show-data/${OrderTracker._id}`} className={`${styles.ColorSpan}`}> 
                  {OrderTracker.products.map((element,index)=>(
                   index<=2 ? (<span key={index}>{index > 0 && ', '}
                   {element.productName}</span>):("")
                 
                  ))}
                      {OrderTracker.products.length > 3?(<span>.....</span>):("")} 
                      </Link>
                          </td>
                          <td>{OrderTracker?.BillNumber}</td>
                          <td>{OrderTracker?.TotalAmount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div
                  className="tab-pane fade"
                  id="contact-tab-pane"
                  role="tabpanel"
                  aria-labelledby="contact-tab"
                  tabIndex="0"
                >
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Bill Number</th>
                        <th scope="col">Total Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderTrackerData.map((OrderTracker, index) => (
                        <tr key={index}>
                          <td>
                          <Link href={`/order/show-data/${OrderTracker._id}`} className={`${styles.ColorSpan}`}> 
                  {OrderTracker.products.map((element,index)=>(
                   index<=2 ? (<span key={index}>{index > 0 && ', '}
                   {element.productName}</span>):("")
                 
                  ))}
                      {OrderTracker.products.length > 3?(<span>.....</span>):("")} 
                      </Link>
                          </td>
                          <td>{OrderTracker?.BillNumber}</td>
                          <td>{OrderTracker?.TotalAmount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {orderTrackerPagination?.totalDocuments !== undefined && (
                  <Pagination
                    activePage={orderTrackerActivePage}
                    itemsCountPerPage={size}
                    totalItemsCount={orderTrackerPagination?.totalDocuments}
                    pageRangeDisplayed={5}
                    onChange={handleOrderTrackerPageChange.bind(this)}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section className={styles.sectionMob}>
        {/* <div className={styles.container}> */}
        <div className={`${styles.box2} col-md-6`}>
          <div className={`${styles.overviewb} `}>
            <div className={styles.supplierBox}>
              <h5 className={styles.boxHead}>Top Customer</h5>
              {/* <div
                className={`${styles.donationButtons} d-flex justify-content-between mb-3  `}
              >
                <div className={`${styles.addDonarsearchMain} input-group `}>
                  <input
                    type="text"
                    className={`${styles.addDonarSearch} form-control  `}
                    placeholder="Search"
                    onChange={(e) => setSearchSupplier(e.target.value)}
                    aria-label="Search"
                  />{" "}
                  <div className="input-group-append">
                    <button
                      onClick={handleSearchChangeSupplier}
                      className={`btn btn-outline-secondary searchBtn ${styles.button}`}
                      type="button"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div> */}
              <div className={styles.topCustmerBoxContent}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Total Order</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCustomerrData.map((Temple, index) => (
                      <tr key={index}>
                        <td>{Temple.name}</td>
                        <td>{Temple.totalOrderValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {paginationDataTopCustomer?.totalItems !== undefined && (
                  <Pagination
                    activePage={activePageSupplier}
                    itemsCountPerPage={sizeSupplier}
                    totalItemsCount={paginationDataTopCustomer?.totalItems}
                    pageRangeDisplayed={5}
                    onChange={handlePageChangeSupplier.bind(this)}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.box2} col-md-6`}>
          <div className={`${styles.overviewb} `}>
            <div className={styles.customerBox}>
              <h5 className={styles.boxHead}>Customer</h5>
              {/* <div
                  className={`${styles.donationButtons} d-flex justify-content-between mb-3  `}
                >
                  <div className={`${styles.addDonarsearchMain} input-group `}>
                    <input
                      type="text"
                      className={`${styles.addDonarSearch} form-control  `}
                      placeholder="Search"
                      onChange={(e) => setSearchCust(e.target.value)}
                      aria-label="Search"
                    />{" "}
                    <div className="input-group-append">
                      <button
                        onClick={handleSearchChangeCust}
                        className={`btn btn-outline-secondary searchBtn ${styles.button}`}
                        type="button"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div> */}
              <div className={styles.customerBoxContent}>
                <table className="table ">
                  <thead>
                    <tr>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Phone Number</th>
                      {/* <th scope="col">Total Order</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {cusmtomerData.map((Temple, index) => (
                      <tr key={index}>
                        <td>{Temple.Name}</td>
                        <td>{Temple.Phone}</td>
                        {/* <td></td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {paginationDataCustomer?.totalDocuments !== undefined && (
                <Pagination
                  activePage={activePageCust}
                  itemsCountPerPage={sizeCust}
                  totalItemsCount={paginationDataCustomer?.totalDocuments}
                  pageRangeDisplayed={5}
                  onChange={handlePageChangeCustomer.bind(this)}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              )}
            </div>
          </div>
        </div>
        {/* </div> */}
      </Section>
      {/* <Section>
        <div className={styles.cardbox}>
          <div className={styles.card}>
            <p className={styles.boxHead}>Product Details</p>
            {productData.map((product, index) => (
              <div className="card" key={index}>
                <div className="card-body">
                  <h6 className="card-title">{product.ProductName}</h6>
                  <p className="card-text">
                    <span>Quantity : </span>
                    {product.StockQuantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section> */}
    </>
  );
}
