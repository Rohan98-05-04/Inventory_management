import Link from "next/link";
import FullButton from "@aio/components/FullButton";
import Input from "@aio/components/Input";
import Logo from "@aio/components/Logo";
import styles from "./login.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_BASE_URL } from "../../../utils/config";
import Cookies from "js-cookie";
import Spinner from "../../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [Email, setLoginId] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const handleKeyPress = (event) => {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === 'Enter') {
      // Prevent the default form submission behavior
      event.preventDefault();
      
      // Call your custom submit function
      handleLogin();
    }
  };

  const handleLogin = () => {
    if (Email.trim() === "" || Password.trim() === "") {
      toast.error("Please fill in all fields.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    // router.push('/dashboard');

    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email, Password }),
      });

      if (response.ok) {
        const data = await response.json();

        const jsonString = JSON.stringify(data.user.token);

        const userId = data.user.roleid;

        if (jsonString) {
          Cookies.set("token", jsonString);
         // localStorage.setItem("token", jsonString);
        }
        await fetchUserDataById(userId);
        router.push("/dashboard");
        toast.success("Login successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
      } else {
        const data = await response.json();
        setIsLoading(false);
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    //Fetch user data by id
    const fetchUserDataById = async (userId) => {
      const response = await fetch(`${API_BASE_URL}/role/getByID/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${parseToken}`,
        },
        body: JSON.stringify(),
      });

      if (response.ok) {
        const data = await response.json();

        const userIdString = JSON.stringify(data.data.roleName);

        if (userIdString) {
          const cleanedRoleId = userIdString.replace(/"/g, "");
          Cookies.set("name", cleanedRoleId);
        }

        setIsLoading(false);
      } else {
        const data = await response.json();
        setIsLoading(false);
      }
    };

    fetchData();
  };
  useEffect(() => {
    // setIsLoading(true);
    
     const token = Cookies.get("token");
    if (token) {
      router.push("/dashboard");
    } else {
      // setIsLoading(false);
      router.push("/login");
    }
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <div className={styles.container}>
        {isLoading && <Spinner />}
        <section className={styles["login-container"]}>
          <div className={styles["brand-container"]}>
            <Logo />
            <div className={styles["logo-explain"]}>
              INVENTORY MANAGEMENT SYSTEM
            </div>
          </div>

          {/* login form */}
          <div className={styles["form-container"]}>
            <div className="t-center" style={{ margin: "15px 0" }}>
              <div className={styles["sm-brand-container"]}>
                <Logo />
              </div>
              <h1>Login</h1>
              <p>Please enter email and password to login</p>
            </div>
            <div>
              {/* <Input
                inputContainerStyle={{ padding: "15px 30px" }}
                type="text"
                placeholder="Email"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                name="email"
                label={"Email"}
              />
              <Input
                inputContainerStyle={{ padding: "15px 30px" }}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="email"
                label={"Email"}
              />
              <FullButton onClick={handleLogin} label={"Login"} /> */}
              <div className={styles["loginFormMain"]}>
                <form onKeyDown={handleKeyPress}>
                  <div className={`${styles.inputMain} label-form`}>
                    <label htmlFor="loginId">Login Id</label>
                    <br />
                    <input
                      type="loginId"
                      id="loginId"
                      value={Email}
                      onChange={(e) => setLoginId(e.target.value)}
                    />
                  </div>
                  <div className={`${styles.inputMain} label-form`}>
                    <label htmlFor="password">Password</label>
                    <br />

                    <input
                      type="password"
                      id="password"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    className={`${styles.loginBtn}`}
                    type="button"
                    onClick={handleLogin}
                  >
                    Sign In
                  </button>
                  {/* <h2 className="signupText">Don't have an account?<Link href='/Sign-up'> Sign Up</Link></h2> */}
                </form>
              </div>
              {/* <p className="tc-grey t-center">
                Dont have an account?{" "}
                <Link className="link" href={`/signup`}>Signup for free</Link>
              </p> */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
