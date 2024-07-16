
import Link from 'next/link';
import React, { createContext } from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect , useState } from 'react';
import { API_BASE_URL } from '../../../utils/config';
import Pagination from "react-js-pagination";
import Switch from "react-switch";
import Section from '@aio/components/Section';
import styles from "./product.module.css";
import { AiFillEdit } from 'react-icons/ai';
import Spinner from '../../components/Spinner'; 
import { MdDeleteForever } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import { GrView } from "react-icons/gr";
import Image from 'next/image'
import flower from '../../../image/images.jpg'
import Cookies from "js-cookie";




const Product = () => {
// const [TempleData, setTempleData] = useState([]);
// const [Data, setData] = useState([]);
const [productData, setProductData] = useState([]);
const [activePage, setActivePage] = useState(1);
const [page, setPage] = useState(1);
const [size, setsize] = useState(10);
const [paginationData, setPaginationData] = useState([]);
const [search, setSearch] = useState('');
const [isActive, setIsActive] = useState([]);
const [eventId, seteventId] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [isProductDeleted, setIsProductDeleted] = useState(false);
const [productID,setProductID] = useState([]);



const handleSearchChange = (event) => {
  setSearch(event.target.value);
};

const handleSwitchChange = (checked, index) => {

  const updatedIs_id = [...productID];
  
  const updatedIsActive = [...isActive];
  updatedIsActive[index] = checked;
  setIsActive(updatedIsActive);
  const token = Cookies.get("token");
  const parseToken = JSON.parse(token) || {};
  setIsLoading(true);
  
  const fetchData = async () => {
    const response = await fetch(`${API_BASE_URL}/product/changeActivation/${updatedIs_id[index]} `, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${parseToken}`,
        
      },
      body: JSON.stringify({ "isActive":checked}),
    });
    
    if (response.ok) {
      
      const data = await response.json();
      
      if(data.data.isActive == true){
        toast.success('Product is Active', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }else{
        toast.success('Product is InActive', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setIsLoading(false);
    } else {
      const data = await response.json();
     
      console.error(data.errorMessage);
      setIsLoading(false);
    }
    }
    fetchData();
};

useEffect(() => {
          const token = Cookies.get("token");
          const parseToken = JSON.parse(token) || {};
          setIsLoading(true);
          
          const fetchData = async () => {
            const response = await fetch(`${API_BASE_URL}/product/getProducts?page=${activePage}&size=${size}&search=${search}`, {

              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                 'Authorization': `Bearer ${parseToken}`,
                
              },
              body: JSON.stringify(),
            });
            
            if (response.ok) {
              
              const data = await response.json();

              
              setPaginationData(data)
              setProductData(data.data) 
              const initialIsActive = data.data.map((product) => product.isActive);
              const initialProductId = data.data.map((product) => product._id);
              setProductID(initialProductId);
              setIsActive(initialIsActive);
              
              setIsLoading(false);
              

            } else {
              const data = await response.json();
              setIsLoading(false);
    }
    }
    fetchData();
}, [isProductDeleted,activePage,search]);


const handlePageChange = (pageNumber) => {
  setActivePage( pageNumber);
}



//For delete function 
// const deleteProductData=(productid)=>{
//   setIsLoading(true);

//   const token = localStorage.getItem('token');
//           const parseToken = JSON.parse(token) || {};
//   const fetchProductData = async () => {
//     const response = await fetch(`${API_BASE_URL}/product/deleteProduct/${productid}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//          'Authorization': `Bearer ${parseToken}`,
        
//       },
//       body: JSON.stringify(),
//     });
    
//     if (response.ok) {
      
//       const data = await response.json();
//     
//       if(isProductDeleted===true){
//         setIsProductDeleted(false)
//       }else{
//         setIsProductDeleted(true)
//       }
      
      
//       setIsLoading(false);
//     } else {
//       const data = await response.json();
//       setIsLoading(false);
// }
// }
// fetchProductData();
// }
//Update function performed

// const updateProductData=(productid)=>{
//   setIsLoading(true);

//   const token = localStorage.getItem('token');
//   const parseToken = JSON.parse(token) || {};
//   const fetchProductDataById = async () => {
//     const response = await fetch(`${API_BASE_URL}/product/changeActivation/${productid}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//          'Authorization': `Bearer ${parseToken}`,
        
//       },
//       body: JSON.stringify(),
//     });
    
//     if (response.ok) {
      
//       const data = await response.json();

//       if(data.isActive === false){
//         setIsActive(true);
//       } else {
//         setIsActive(false);
//       }
//       setIsLoading(false);
//     } else {
//       const data = await response.json();
//       setIsLoading(false);
// }
// }
// fetchProductDataById(productid);
// }
  return (
    
      <div className='donarPage'>
       
         {isLoading &&    <Spinner/>  }
        <div className='donarDetailMainPage'>
        <Section>
      <ToastContainer position="top-right" autoClose={5000} />

        <div>
  <h2 className={`${styles.formHeaderext}`}>Product Details</h2>
</div>
      <div className={`${styles.donationButtons} d-flex justify-content-between mb-3  `}>
        <div className={`${styles.addDonarsearchMain} input-group `}>
        <input type="text"  className={`${styles.addDonarSearch} form-control  `}
           placeholder="Search"
           onChange={(e) => setSearch(e.target.value)}
            aria-label="Search" />        
              <div className="input-group-append">
            <button onClick={handleSearchChange} className={`btn btn-outline-secondary searchBtn ${styles.button}`} type="button">
              Search
            </button>
          </div>
        </div>
       <Link href='/product/add-product'> <button  className={`btn addDonarBtn ${styles.button}`}>Add Product</button></Link>
       <Link href='/product/add-product-category'> <button  className={`btn addDonarBtn ${styles.button}`}>Add Products Category</button></Link>
       {/* <Link href='/event/add-event-category'> <button className={`btn  addDonarBtn ${styles.button}`}>Add Event Category</button></Link> */}

      </div>
      </Section>
      <Section>
      {productData.length !==0 ? (
     <div className='table-responsive w-100'>
      <table className='table'>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Image </th>
          <th scope="col">Cost Price</th>
          <th scope="col">Selling Price</th>
          <th scope="col">Quantity </th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
      {productData.map((product, index) => (
              <tr key={index} className={` ${styles.tableRow}`}>
                <td>{product.ProductName}</td>
                <td>{product.image ? (<img
                    className={`${styles.imageCircle}`}
                    src={product.image}
                    width={100}
                    height={100}
                  />) : (<img className={`${styles.imageNo}`} src="" alt="" />) }</td>
                <td>{product.costPrice}</td>
                <td>{product.sellingPrice}</td>
                <td>{product.StockQuantity}</td>
                <td><Link href={`/product/${product._id}`} >
               <AiFillEdit className='red'/></Link>
               <Link href={`/product/show-data/${product._id}`} >
               <GrView className={`red ${styles.dltbutton}`} /></Link>
                <Switch 
                    className={`red ${styles.dltbutton}`} 
                    onChange={(checked) => handleSwitchChange(checked, index)}
                    checked={isActive[index]}
                />
               {/* <MdDeleteForever className={`red ${styles.dltbutton}`} onClick={()=>deleteProductData(product._id)}/> */}
                </td>
              </tr>
            ))}
      </tbody>
    </table>
    </div>
     ) : (
      <div className='errorImage'> 
            <Image className='noDataFoundImg'
            src={"/no_data_found.png"} width={"400"} height={"400"} alt="logo"
            />
      </div>
    )}
    </Section>
    <Section>
    {productData.length !==0 ? (
    <div>
    {paginationData?.totalDocuments !== undefined&&(
        <Pagination
          activePage={activePage}
          itemsCountPerPage={size}
          totalItemsCount={paginationData?.totalDocuments}
          pageRangeDisplayed={5}
          onChange={handlePageChange.bind(this)}
          itemClass="page-item"
      linkClass="page-link"

        />
        )}
      </div>
      ) : (
          <p></p>
         )}
      </Section>

    </div>
    </div>
  );
};

export default Product;



