
import Link from "next/link";
import { useEffect,useState,useRef } from "react";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { API_BASE_URL } from "../../../../utils/config";
// import { Multiselect } from "multiselect-react-dropdown";
import { ToastContainer, toast } from 'react-toastify';
import Section from "@aio/components/Section";
import styles from "../product.module.css";
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../../components/Spinner'; 
import Modal from "@aio/components/Modal";
import { API_BASE_URL } from "utils/config";
import Select from "react-select";
import Cookies from "js-cookie";
import Product from "..";


export default function AddProduct() {
  const [ProductName, setProductName] = useState("");
  const [Description, setProductDetail] = useState("");
  const [costPrice, setProductCostPrice] = useState("");
  const [sellingPrice, setProductsellingPrice] = useState("");
  const [image, setProductImage] = useState(null);
  const [StockQuantity, setProductStockQty] = useState("");
  const [warrentyPeriod, setProductWarrentyPeriod] = useState("");
  const [weight, setProductWeight] = useState("");
  const [dimension, setProductDimension] = useState("");
  const [lengthProduct, setLength] = useState("");
  const [width, setwidth] = useState("");
  const [height, setHeight] = useState("");
  const [CategoryID, setProductCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const[SupplierID,setSupplierName]=useState("")
  const[productCategorySearch,setProductCategorySearch]=useState("")
  const[supplierSearch,setsupplierSearch]=useState("")
  const[boardWarrent,setBoardWarrent]=useState("");
  const[timerWarrenty,setTimerWarrenty]=useState("")
  const[smpsWarrent,setSmpsWarrent]=useState("");
  const[ledModuleWarrenty,setLedModuleWarrenty]=useState("");
  const fileInputRef = useRef(null);
//   const[addedData,setAddedData]=useState({})

  
  const router = useRouter();
 

  //This is used fetching all supplier data
  useEffect(() => {
    const token = Cookies.get("token");
    const parseToken = JSON.parse(token) || {};
    setIsLoading(true);
          const fetchData = async () => {
            const response = await fetch(`${API_BASE_URL}/supplier/getAllActiveSupplier?search=${supplierSearch}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${parseToken}`,
              },
              body: JSON.stringify(),
            });
            
            if (response.ok) {
              
              const data = await response.json();
              
        
              setSupplierList(data.activeSuppliers)
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
    }
    fetchData();
}, [supplierSearch]);

//This is used for fetching category Data
  useEffect(() => {

    setIsLoading(true);

    
    const token = Cookies.get("token");
          const parseToken = JSON.parse(token) || {};

    const fetchCategoryData = async () => {
      const response = await fetch(`${API_BASE_URL}/category/getAllCategory?search=${productCategorySearch}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${parseToken}`,
        },
        body: JSON.stringify(),
      });
      
      if (response.ok) {
        
        const data = await response.json();
        setCategoryList(data.data);
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
}
fetchCategoryData();
},[productCategorySearch]);

//FOr filechange 
const handleFileChange = (event) => {

  const file = event.target.files[0];
  
  // Check if the selected file is a JPEG, JPG, or PNG
  if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png')) {
    // console.log("Product image object=>",file)
    // console.log("Product image=>",file.name)
    setProductImage(file);
  } else {
    // alert('Please select a valid JPEG, JPG, or PNG file.');
    toast.error('Please select a valid JPEG, JPG, or PNG file.', { 
      position: toast.POSITION.TOP_RIGHT,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

  }
};

//Submit function performed

  const addProductCategory = () => {
    setIsLoading(true);
    //  if (CategoryID?.value === undefined || SupplierID?.value === undefined) {
    //   alert("Please fill required fields.");
     
    //    return;
    //  }

    // const token = localStorage.getItem("token");
    // const parseToken = JSON.parse(token) || {};
  
    


   
    let productDetail = {
      ProductName: ProductName.trim() ? ProductName : undefined,
      costPrice: costPrice.trim() ? costPrice : undefined,
      sellingPrice: sellingPrice.trim() ? sellingPrice : undefined,
      StockQuantity: StockQuantity.trim() ? StockQuantity : undefined,
      Description: Description.trim() ? Description : undefined,
      //dimension: dimension.trim() ? dimension :" ",
      //...(dimension.trim() ? { dimension: dimension } : {}),
      ...(lengthProduct ? { length: lengthProduct } : {}),
      ...(width ? { width: width } : {}),
      ...(height ? { height: height } : {}),
      ...(weight ? { weight: weight} : {}),
      ...(boardWarrent ? { boardWarrent: boardWarrent} : {}),
      ...(smpsWarrent ? { smpsWarrent: smpsWarrent} : {}),
      ...(timerWarrenty ? { timerWarrenty: timerWarrenty} : {}),
      ...(ledModuleWarrenty ? { ledModuleWarrenty: ledModuleWarrenty} : {}),
      // weight: weight.trim() ? weight : " ",
     // warrentyPeriod: warrentyPeriod.trim() ? warrentyPeriod : " ",
      CategoryID: CategoryID?.value ? CategoryID?.value: undefined,
      SupplierID:SupplierID?.value ? SupplierID?.value : undefined,
      image:image ? image : undefined,
      Description: Description.trim() ? Description : undefined,
  
    };
 
    // Filter out undefined values from the object
    productDetail = Object.fromEntries(Object.entries(productDetail).filter(([_, v]) => v !== undefined));
    const token = Cookies.get("token");
    const parseToken = JSON.parse(token) || {};

    const fetchData = async () => {

      const formData = new FormData();
      formData.append("ProductName", productDetail.ProductName);
      formData.append("costPrice", productDetail.costPrice);
      formData.append("sellingPrice", productDetail.sellingPrice);
      formData.append("StockQuantity", productDetail.StockQuantity);
      formData.append("image", image);
      formData.append("length", lengthProduct);
      formData.append("width", width);
      formData.append("height", height);
      formData.append("Description", productDetail.Description);
      if(productDetail.weight){
        formData.append("weight", productDetail.weight);

      }
      if(productDetail.boardWarrent){
        formData.append("boardWarrent", productDetail.boardWarrent);
      }
      if(productDetail.smpsWarrent){
        formData.append("smpsWarrent", productDetail.smpsWarrent);
      }
      if(productDetail.timerWarrenty){
        formData.append("timerWarrenty", productDetail.timerWarrenty);
      }
      if(productDetail.ledModuleWarrenty){
        formData.append("ledModuleWarrenty", productDetail.ledModuleWarrenty);
      }
      
      
      
      formData.append("CategoryID", productDetail.CategoryID);
      formData.append("SupplierID", productDetail.SupplierID);

      const response = await fetch(`${API_BASE_URL}/product/addProduct`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json"        },

        headers: { 
          // 'Content-Type': 'multipart/form-data', 
        // "Content-Type": "application/json",
        'Authorization': `Bearer ${parseToken}`,
      },
        

        body: formData,
      });

      if (response.ok) {
         const data = await response.json();
         
         toast.success('Add successfully', {
           position: toast.POSITION.TOP_RIGHT,
         });
         router.push("/product");
         setIsLoading(false);
    //setIsModalOpen(true);
        
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
  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/product")
  }
  const handleModalSubmit = () => {
    setIsModalOpen(false);
    router.push("/product-warehouse")
  }

  // Function to handle canceling the modal
  const handleModalCancel = () => {
    setIsModalOpen(false);
    router.push("/product")
  }
 //It is used for get the value when change the value in dropdown list
  const handleInputChange = (inputValue) => {
    // Implement searching logic here if needed
    
    setProductCategorySearch(inputValue)
    setsupplierSearch(inputValue)
  };

  return (
    <Section>
       {isLoading &&    <Spinner/>  }
       <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        heading="Do you want to add warehouse and quantity"
        positiveText="Confirm"
        onSubmit={handleModalSubmit}
        onCancel={handleModalCancel}
      />
    <div className="donarPage w-100">
      <ToastContainer position="top-right" autoClose={5000} />

      <div className="addDonarForm">
        <h2 className={`${styles.formHeaderext}`}>Enter Product Details</h2>
        <div >
          {image ? (<img className={`${styles.productImage}`} src={URL.createObjectURL(image)} alt=""/>): (<img className={`${styles.productImage}`} src="" alt=""/>)}
        </div>
        <form>
          <div className="formMainDiv">
            <div className="label-form eventInp">
              <label htmlFor="name" className="required">Product Name</label>
              <br />
              <input
                type="text"
                id="name"
                value={ProductName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="label-form eventInp">
              <label htmlFor="img" className="required">Product Image</label>
              <br />
              <input
                type="file"
                id="img"
                //value={image}
                accept=".jpg, .jpeg, .png"
                ref={fileInputRef}
               onChange={handleFileChange}
               //onChange={(e) => console.log(e.target.files[0].name)}
                //onChange={(e) => console.log("IMAGE",e)}
              />
            </div>
            {/* <div className="label-form eventInp">
              <label htmlFor="category">Product Category</label>
              <br />
              <select name="category" 
                onChange={(e) =>setProductCategory(e.target.value)}>
                  <option>Select One</option>
                   {categoryList.map(val=><option key={val._id} value={val._id}>{val.CategoryName}</option>) }

                </select>
             
            </div> */}

            <div className="label-form eventInp">
                <label htmlFor="category" className="required">Product Category</label>
                <br />
               
                <Select 
                  // name="customerid"
                  options={categoryList.map((element) =>( {
                      value: element._id, label: element.CategoryName 
                    
                  }))}
                  placeholder="Select One"
                  // defaultValue={CategoryID}
                  onChange={setProductCategory}
                   onInputChange={handleInputChange}
                   required={true}
                  //isSearchable
                />
                
                
              </div>
            {/* <div className="label-form eventInp">
              <label htmlFor="supplier">Supplier Name</label>
              <br />
              <select name="supplier" 
                onChange={(e) =>setSupplierName(e.target.value)}>
                  <option>Select One</option>
                   {supplierList.map(val=><option key={val._id} value={val._id}>{val.SupplierName}</option>) }

                </select>
            
            </div> */}


            <div className="label-form eventInp">
                <label htmlFor="supplier" className="required" >Supplier Name</label>
                <br />
               
                <Select 
                  // name="customerid"
                  options={supplierList.map((element) =>( {
                      value: element._id, label: element.SupplierName 
                    
                  }))}
                  placeholder="Select One"
                  // defaultValue={SupplierID}
                  onChange={setSupplierName}
                   onInputChange={handleInputChange}
                   required={true}
                  //isSearchable
                />
                
                
              </div>

            <div className="label-form eventInp">
              <label htmlFor="costprice" className="required">Cost Price</label>
              <br />
              <input
                type="number"
                id="price"
                value={costPrice}
                onChange={(e) => setProductCostPrice(e.target.value)}
              />
              
            </div>
            <div className="label-form eventInp">
              <label htmlFor="sellingPrice" className="required">Selling Price</label>
              <br />
              <input
                type="number"
                id="price"
                value={sellingPrice}
                onChange={(e) => setProductsellingPrice(e.target.value)}
              />
              
            </div>
            <div className="label-form eventInp">
              <label htmlFor="StockQuantity" className="required" >Stock Quantity</label>
              <br />
              <input
                type="number"
                id="weight"
                value={StockQuantity}
                onChange={(e) => setProductStockQty(e.target.value)}
              />
            </div>
            <div className="label-form eventInp">
              <label htmlFor="BoardWarrent">Board Warranty</label>
              <br />
              <input
                type="number"
                id="BoardWarrent"
                value={boardWarrent}
                onChange={(e) => setBoardWarrent(e.target.value)}
              />
            </div>
            <div className="label-form eventInp">
              <label htmlFor="wty">SMPS Warranty</label>
              <br />
              <input
                type="number"
                id="wty"
                value={smpsWarrent}
                onChange={(e) => setSmpsWarrent(e.target.value)}
              />
            </div>
            <div className="label-form eventInp">
              <label htmlFor="wty">Timer Warranty</label>
              <br />
              <input
                type="number"
                id="wty"
                value={timerWarrenty}
                onChange={(e) => setTimerWarrenty(e.target.value)}
              />
            </div>
            <div className="label-form eventInp">
              <label htmlFor="wty">Led Module Warranty</label>
              <br />
              <input
                type="number"
                id="wty"
                value={ledModuleWarrenty}
                onChange={(e) => setLedModuleWarrenty(e.target.value)}
              />
            </div>
            <div className="label-form eventInp">
              <label htmlFor="weight">Weight</label>
              <br />
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setProductWeight(e.target.value)}
              />
            </div>
            <div className="label-form eventInp">
              <label htmlFor="dimension">Dimension</label>
              <br />
              <input
                  type="number"
                  id="dimension"
                  placeholder="Length"
                  value={lengthProduct}
                  onChange={(e) => setLength(e.target.value)}
                />
            </div>
            <div className="label-form eventInp">
            <label>&nbsp;</label>
            <input
                  type="number"
                  id="dimension"
                  placeholder="Width"
                  value={width}
                  onChange={(e) => setwidth(e.target.value)}
                />
            </div>
            <div className="label-form eventInp">
            <label>&nbsp;</label>
            <input
                  type="number"
                  id="dimension"
                  placeholder="Height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
            </div>
          <div className="label-form textAraeLabel">
              <label htmlFor="description" className="required">Product Detail</label>
              <br />
              <textarea
              className="textareaEvent"
                type="text"
                id="description"
                value={Description}
                onChange={(e) => setProductDetail(e.target.value)}
              />
            </div>
          </div>

        

          <div className="d-flex ">
            <div className="submitEvent addDonarSubmitBtnMain">
            <Link href='/product'> <button
                className="addDonarSubmitBtn"
                type="button">
                Back
              </button></Link>
              
            </div>
            <div className="nextDonarSubmitBtnMain">
            <button
                className="addDonarSubmitBtn"
                type="button"
                onClick={addProductCategory}
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
