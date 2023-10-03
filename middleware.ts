import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server'
 
const verifyPath = ['/profile']
 
export async function middleware(req: NextRequest) {
 const { pathname } = req.nextUrl;
 
  // 编写认证中间件
  const auth = async (authorization: string) => {
    // { Authorization: Bearer token}
    const token = authorization.replace('Bearer ', '');
    try {
      // 报错：token 被篡改或者为空，属于 401 错误：未认证错误。
    //   await jose.jwtVerify(
    //     token, new TextEncoder().encode(JWT_SECRET)
    //   );
    } catch (err) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
 
    // 执行后续逻辑
    return NextResponse.next();
  }
 
  const isNeedVerify = verifyPath.some(path => pathname.indexOf(path) !== -1);
  console.log('isNeedVerify',isNeedVerify)
  // 校验逻辑
  if (isNeedVerify) {
    // return NextResponse.redirect(new URL('/login', req.url));
    /* 权限校验 */
    const authorization = req.headers.get('Authorization');
    if (authorization) {
      return await auth(authorization as string);
    } else {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } else {
    return NextResponse.next();
  }
 
}
 
export const config = {
  // 需要中间件过滤的目录
  // matcher: ['/profile'],
}