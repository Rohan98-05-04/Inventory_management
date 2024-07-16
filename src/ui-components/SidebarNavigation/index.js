import Logo from "../Logo";
import styles from "./SidebarNavigation.module.css";
import Link from "next/link";
import routes from "../../routes";
import { useRouter } from "next/router";
import { TbLogout } from "react-icons/tb";
import { BiChevronLeft } from "react-icons/bi";
import { useState } from "react";
import Cookies from "js-cookie";
import Modal from "@aio/components/Modal";
import { BsSpeedometer2 } from "react-icons/bs";
import { useEffect } from "react";

const SidebarNavigation = ({ sidebarMenuActive, toggleSidebarMenu }) => {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRoleName, setUserRoleName] = useState(" ");

  useEffect(() => {
    const userCookieValue = Cookies.get("name");

    setUserRoleName(userCookieValue);
  }, [userRoleName]);

  // Function to toggle submenu visibility
  const toggleSubMenu = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  const logout = () => {
    setIsModalOpen(true);
    // if (typeof window !== 'undefined') {
    //   localStorage.removeItem('token');
    //   Cookies.remove("token");
    //   router.push('/login')
    // }
  };

  //Perform action on modal
  const closeModal = () => {
    setIsModalOpen(false);
    //router.push("/product")
  };

  const handleModalSubmit = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      Cookies.remove("token");
      Cookies.remove("name");
      router.push("/login");
    }
    setIsModalOpen(false);

    //router.push("/product-warehouse")
  };
  // Function to handle canceling the modal
  const handleModalCancel = () => {
    setIsModalOpen(false);
    // router.push("/product")
  };

  const sidebarItems = [
    {
      to: "/dashboard",
      name: "Dashboard",
      Icon: BsSpeedometer2,
    },
    {
      to: "/customer",
      name: "Customer",
      Icon: BsSpeedometer2,
    },
    {
      to: "/supplier",
      name: "Supplier",
      Icon: BsSpeedometer2,
    },
    {
      to: "/product",
      name: "Product",
      Icon: BsSpeedometer2,
    },

    {
      to: "/order",
      name: "Order",
      Icon: BsSpeedometer2,
    },

    // {
    //     to: '/users',
    //     name: 'Users',
    //     Icon: BsSpeedometer2
    // },
    // {
    //     to: '/warehouse',
    //     name: 'Warehouse',
    //     Icon: BsSpeedometer2
    // }

    userRoleName === "Superadmin" && {
      to: "/users",
      name: "Users",
      Icon: BsSpeedometer2,
    },
  ].filter(Boolean);

  return (
    <section
      className={`${styles.container} ${
        sidebarMenuActive ? styles["active"] : ""
      }`}
    >
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        heading="Please Confirm to Log Out "
        positiveText="Confirm"
        onSubmit={handleModalSubmit}
        onCancel={handleModalCancel}
      />
      <button
        className={styles["sidebar-close-btn"]}
        onClick={toggleSidebarMenu}
      >
        x
      </button>
      <div className={styles["logo-container"]}>
        {/* <Logo /> */}
        <div className={styles["logo-explain"]}>Kuber advertising </div>
      </div>
      <ul className={styles["sidebar-container"]}>
        {sidebarItems.map((page, index) => {
          const isActive =
            router.asPath === page.to ||
            router.asPath.startsWith(`${page.to}/`);

          return (
            <li
              key={index}
              className={`${styles["sidebar-menu-item"]} ${
                isActive ? styles["active"] : ""
              }`}
            >
              <Link href={page.to}>
                <page.Icon />
                <span>{page.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <ul className={styles["sidebar-footer"]}>
        {/* <button onClick={toggleSidebarMenu}>close</button> */}
        <li onClick={logout} className={styles["footer-item"]}>
          <TbLogout />
          <span>Logout</span>
        </li>
      </ul>
    </section>
  );
};

export default SidebarNavigation;
