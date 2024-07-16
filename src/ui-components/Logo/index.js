import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <Link href={`/`}>
        {/* <Image src={"/Swastik-Logo.png"} width={"100"} height={"100"} alt="logo" /> */}
        <Image src={"/inventory-img.png"} width={"150"} height={"150"} alt="logo" />
      </Link>
    </div>
  );
};

export default Logo;
