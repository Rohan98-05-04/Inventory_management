import Link from 'next/link';
import React, { createContext } from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect , useState } from 'react';
import { API_BASE_URL } from '../../../utils/config';
import Pagination from "react-js-pagination";
import Switch from "react-switch";
import Section from '@aio/components/Section';
import styles from "./users.module.css";
import { AiFillEdit } from 'react-icons/ai';
import Spinner from '../../components/Spinner'; 
import { MdDeleteForever } from 'react-icons/md';
import Modal from "@aio/components/Modal";
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Image from 'next/image'

const Users = () => {
    const [activePage, setActivePage] = useState(1);
    const [page, setPage] = useState(1);
    const [size, setsize] = useState(10);
    const [paginationData, setPaginationData] = useState([]);
    const [search, setSearch] = useState('');
    const [isActive, setIsActive] = useState([]);
    const [eventId, seteventId] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isUserDeleted, setIsUserDeleted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [UsersData, setUsersData] = useState([]);
    const[userId,setUserId]=useState(" ")

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
      };

      const deleteUserData=(userid)=>{
        //setIsLoading(true);
        setIsModalOpen(true);
        setUserId(userid)
      //   const token = localStorage.getItem('token');
      //   const parseToken = JSON.parse(token) || {};
      //   const fetchUserData = async () => {
      //     const response = await fetch(`${API_BASE_URL}/users/deleteUser/${userid}`, {
      //       method: 'DELETE',
      //       headers: {
      //         'Content-Type': 'application/json',
      //         'Authorization': `Bearer ${parseToken}`,
              
      //       },
      //       body: JSON.stringify(),
      //     });
          
      //     if (response.ok) {
            
      //       const data = await response.json();
     
      //       // if(isUserDeleted===true){
      //       //   setIsUserDeleted(false)
      //       // }else{
      //       //   setIsUserDeleted(true)
      //       // }
      //       setIsLoading(false);
      //     } else {
      //       const data = await response.json();
      //       setIsLoading(false);
      //     }
      // }
      // fetchUserData();
      }

      useEffect(()=>{
            setIsLoading(true);
            const token = Cookies.get("token");
            const parseToken = JSON.parse(token) || {};
            const fetchSupplierDataById = async () => {
               
        
              const response = await fetch(`${API_BASE_URL}/role/getAllRole`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${parseToken}`,
                },
                body: JSON.stringify(),
              });
              
              if (response.ok) {
                
                const data = await response.json();
              
              } else {
                const data = await response.json();
                setIsLoading(false);
        }
        }
        fetchSupplierDataById();
    },[])
    
    useEffect(() => {
        const token = Cookies.get("token");
        const parseToken = JSON.parse(token) || {};
        setIsLoading(true);
        
            const fetchData = async () => {
            const response = await fetch(`${API_BASE_URL}/users/getUsers?page=${activePage}&size=${size}&search=${search}`, {

                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${parseToken}`,
                
                },
                body: JSON.stringify(),
            });
            
            if (response.ok) {
                
                const data = await response.json();
                if(activePage>1 && data.data.length==0){
                  setActivePage( activePage-1)
                }
                
                setPaginationData(data)
                setUsersData(data.data);
                setIsLoading(false);
                

            } else {
                const data = await response.json();
                setIsLoading(false);
    }
    }
    fetchData();
    }, [isUserDeleted,activePage,search]);

    const handlePageChange = (pageNumber) => {
        setActivePage( pageNumber);
      }

      const closeModal = () => {
        setIsModalOpen(false);
      }

      const handleModalSubmit = () => {

        setIsLoading(true);
        const token = Cookies.get("token");
        const parseToken = JSON.parse(token) || {};
        const fetchUserData = async () => {
          const response = await fetch(`${API_BASE_URL}/users/deleteUser/${userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${parseToken}`,
              
            },
            body: JSON.stringify(),
          });
          
          if (response.ok) {
            
            const data = await response.json();

           
            setIsLoading(false);
          } else {
            const data = await response.json();
            setIsLoading(false);
          }
          if(isUserDeleted===true){
            setIsUserDeleted(false)
          }else{
            setIsUserDeleted(true)
          }
          setIsModalOpen(false);  
      }
      fetchUserData();
         
      }

      const handleModalCancel = () => {
        setIsModalOpen(false);
      }

    return(
        <div className='donarPage'>
         {isLoading &&    <Spinner/>  }
         <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          heading="Please Confirm to Delete the Order "
          positiveText="Confirm"
          negativeText="Cancel"
          onSubmit={handleModalSubmit}
          onCancel={handleModalCancel}
        />
        <div className='donarDetailMainPage'>
        <Section>
      <ToastContainer position="top-right" autoClose={5000} />

        <div>
  <h2 className={`${styles.formHeaderext}`}>Users Details</h2>
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
       <Link href='/users/add-users'> <button  className={`btn addDonarBtn ${styles.button}`}>Add Users</button></Link>
       {/* <Link href='/event/add-event-category'> <button className={`btn  addDonarBtn ${styles.button}`}>Add Event Category</button></Link> */}

      </div>
      </Section>
      <Section>
      {UsersData.length !==0 ? (
     <div className='table-responsive w-100'>
      <table className='table'>
      <thead>
        <tr>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Role</th>
          <th scope="col">Email</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
      {UsersData.map((product, index) => (
              <tr key={index}>
                <td>{product.FirstName}</td>
                <td>{product.LastName}</td>
                <td>{product.roleId?.roleName}</td>
                <td>{product.Email}</td>
                <td><Link href={`/users/${product._id}`} >
               <AiFillEdit className='red'/></Link>
                {/* <Switch 
                    className={`red ${styles.dltbutton}`} 
                    onChange={(checked) => handleSwitchChange(checked, index)}
                    checked={isActive[index]}
                /> */}
               <MdDeleteForever className={`red ${styles.dltbutton}`} onClick={()=>deleteUserData(product._id)}/>
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
    {UsersData.length !==0 ? (
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
    )
}

export default Users;