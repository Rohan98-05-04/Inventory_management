import Link from 'next/link';
import React, { createContext } from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect , useState } from 'react';
import { useRouter } from "next/router";
import { API_BASE_URL } from '../../../../utils/config';
import Pagination from "react-js-pagination";
import Switch from "react-switch";
import Section from '@aio/components/Section';
import styles from "../product.module.css";
import { AiFillEdit } from 'react-icons/ai';
import Spinner from '../../../components/Spinner'; 
import { MdDeleteForever } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image'
import flower from '../../../../image/images.jpg'
import Cookies from "js-cookie";







export default function DetailProduct () {
  const [ProductName, setProductName] = useState("");
  const [Description, setProductDetail] = useState("");
  const [costPrice, setProductCostPrice] = useState();
  const [sellingPrice, setProductsellingPrice] = useState();
  const [image, setProductImage] = useState("");
  const [StockQuantity, setProductStockQty] = useState();
  const [warrentyPeriod, setProductWarrentyPeriod] = useState("");
  const [weight, setProductWeight] = useState("");
  const [dimension, setProductDimension] = useState("");
  const [CategoryID, setProductCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [SupplierID, setSupplierName] = useState("");
  const[boardWarrent,setBoardWarrent]=useState("");
const[timerWarrenty,setTimerWarrenty]=useState("")
const[smpsWarrent,setSmpsWarrent]=useState("");
const[ledModuleWarrenty,setLedModuleWarrenty]=useState("");

const [lengthProduct, setLength] = useState("");
const [width, setwidth] = useState("");
const [height, setHeight] = useState("");
  const [defaultCategoryName, setDefaultCategoryName] = useState({});
  const [defaultSupplierName, setDefaultSupplierName] = useState({});


 
  const router = useRouter();

  const details = router.query;
  
  
  const productItemId = details.details;
  
  

  useEffect(() => {
    if (productItemId) {
      setIsLoading(true);
      const token = Cookies.get("token");
      const parseToken = JSON.parse(token) || {};

      const fetchProductDataById = async (productItemId) => {
        

        const response = await fetch(
          `${API_BASE_URL}/product/getProductById/${productItemId}`,
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
          
          setProductName(data?.result?.ProductName || " ");
          setProductDetail(data?.result?.Description || " ");
          setProductCostPrice(data?.result?.costPrice || 0);
          setProductsellingPrice(data?.result?.sellingPrice || 0);
          setProductStockQty(data?.result?.StockQuantity || 0);
          setProductImage(data?.result?.image || " ");
          setBoardWarrent(data?.result?.boardWarrent || " ");
          setTimerWarrenty(data?.result?.timerWarrenty || " ");
          setSmpsWarrent(data?.result?.smpsWarrent || " ");
          setLedModuleWarrenty(data?.result?.ledModuleWarrenty || " ");
          setProductWeight(data?.result?.weight || " ");
          setLength(data?.result?.length || " ");
          setwidth(data?.result?.width || " ");
          setHeight(data?.result?.height || " ");
          setProductCategory(data?.result?.CategoryID || " ");
          setSupplierName(data?.result?.SupplierID || " ");
         // setDefaultCategoryValue(data?.result?.CategoryID?._id || " ")
          //setDefaultSupplierValue(data?.result?.SupplierID?._id || " ")
          setDefaultCategoryName({
            value:data?.result?.CategoryID?._id ,
            label:data?.result?.CategoryID?.CategoryName
          })
          setDefaultSupplierName({
            value:data?.result?.SupplierID?._id ,
            label:data?.result?.SupplierID?.SupplierName
          })

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
      fetchProductDataById(productItemId);
    }
  }, [productItemId]);
  //This is used fetching all supplier data
  useEffect(() => {
    const token = Cookies.get("token");
    const parseToken = JSON.parse(token) || {};
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch(
        `${API_BASE_URL}/supplier/getSuppliers`,
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
        
        setSupplierList(data.data);
        setIsLoading(false);
      } else {
        const data = await response.json();
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const token = Cookies.get("token");
        const parseToken = JSON.parse(token) || {};
        setIsLoading(true);
        
        const fetchData = async () => {
          const response = await fetch(`${API_BASE_URL}/product/getProducts`, {

            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
               'Authorization': `Bearer ${parseToken}`,
              
            },
            body: JSON.stringify(),
          });
          
          if (response.ok) {
            
            const data = await response.json();
            setProductData(data.data) 
            setIsLoading(false);
            

          } else {
            const data = await response.json();
            setIsLoading(false);
  }
  }
  fetchData();
}, []);

    return(
        <div className='donarPage'>
            {isLoading &&    <Spinner/>  }
        <div className='donarDetailMainPage'>
        <Section>
        <div>
            <h2 className={`${styles.formHeaderext}`}>Product Details</h2>
        </div>
        <div className={`${styles.donationButtons} d-flex justify-content-between mb-3  `}>
        <div className={`${styles.addDonarsearchMain} input-group `}>   
              <div className="input-group-append">
                <Link href='/product'><button  className={`btn addDonarBtn ${styles.button}`} type="button">Back</button></Link>
            </div>
        </div>
      </div>
        </Section>
        <Section className={`${styles.SectionBox}`}>
          <div className={`${styles.detailsBox}`}>
            <div className={`${styles.container}`}>
                <div className={`${styles.box1}`}>
                    <img
                        className={`${styles.imageDetails}`}
                        src={image}
                        width={400}
                        height={400}
                    />
                </div>
                <div className={`${styles.verticalLine}`}></div>
                <div className={`${styles.box2}`}>
                    <h5 className={`${styles.boxP}`}><b>{defaultCategoryName.label}</b></h5>
                    <h2 className={`${styles.boxItem}`}><b>{ProductName}</b></h2>
                    <h5 className={`${styles.boxItem}`}><i>{Description}</i></h5><hr />
                    <p className={`${styles.boxItem}`}>Cost Price : <b>&#8377;{costPrice}</b></p>
                    <p className={`${styles.boxItem}`}>Selling Price : <b>&#8377;{sellingPrice}</b></p><hr />
                    {StockQuantity != " " ? (<h4 className={`${styles.boxItem}`}>Stock Quantity : {StockQuantity}</h4>) : (<p></p>)}
                    {boardWarrent != " " ? (<h4 className={`${styles.boxItem}`}>Board Warranty : {boardWarrent}</h4>) : (<h4></h4>)}
                    {smpsWarrent != " " ? (<h4 className={`${styles.boxItem}`}>SMPS Warranty : {smpsWarrent}</h4>) : (<p></p>)}
                    {timerWarrenty != " " ? (<h4 className={`${styles.boxItem}`}>Timer Warranty : {timerWarrenty}</h4>) : (<p></p>)}
                    {ledModuleWarrenty != " " ? (<h4 className={`${styles.boxItem}`}>Led Module Warranty : {ledModuleWarrenty}</h4>) : (<p></p>)}
                    {weight != " " ? (<h3 className={`${styles.boxItem}`}>Weight : {weight}</h3>) : (<h4></h4>)}
                    {lengthProduct != " " ? (<h4 className={`${styles.boxItem}`}>Dimension :  {lengthProduct}×{width}×{height}</h4>) : (<h4></h4>)}<hr />
                    {defaultSupplierName.label ? (<p className={`${styles.boxItem}`}>Supplier Name : <b>{defaultSupplierName.label}</b></p>) : (<p ></p>)}
                </div>
              </div>
            </div>
        </Section>
        </div>
        </div>
    )
}