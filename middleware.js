import { NextResponse } from "next/server";
import jwt from "@tsndr/cloudflare-worker-jwt";
import Cookies from "js-cookie";
import { FrontEnd_URL } from './utils/config';

export const config = {
  matcher: [
    "/dashboard",
    "/product",
    "/customer",
    "/order",
    "/supplier",
    "/users"
   
  ],
};
export default async function middleware(req) {
  let token = req.cookies.get("token");
    const userCookieValue = req.cookies.get('name');
    let url = req.url;
  if (!token) {
    return NextResponse.redirect(`${FrontEnd_URL}/login`);
  } else {
    try {
      const cleanedToken = token.value.replace(/"/g, '');
      const isValid = await jwt.verify(cleanedToken, process.env.JWT_SECRET_KEY);

      
      if (!isValid) {
        return NextResponse.redirect(`${FrontEnd_URL}/login`);
      }
      else if(isValid && userCookieValue.value !== 'Superadmin' && url.includes('/users')){
    
          return NextResponse.redirect(`${FrontEnd_URL}/dashboard`)
        
      }
      return NextResponse.next();
    } catch (e) {
      
      return NextResponse.redirect(`${FrontEnd_URL}/login`);
    }
  }
  
}
