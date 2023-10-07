import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const verifyPath = ['/abc']
 
export async function middleware(req: NextRequest) {
 const { pathname } = req.nextUrl;
 
  // 编写认证中间件
  const auth = async (authorization: string) => {
    // { Authorization: Bearer token}
    try {
      //const res=await adminAuth.verifyIdToken(authorization)
      //console.log(res,'22222')
    } catch (err) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
 
    // 执行后续逻辑
    return NextResponse.next();
  }
 
  const isNeedVerify = verifyPath.some(path => pathname.indexOf(path) !== -1);

  // 校验逻辑
  if (isNeedVerify) {
    // return NextResponse.redirect(new URL('/login', req.url));
    /* 权限校验 */
    const accessToken = req.cookies.get('accessToken')
    if (accessToken) {
      return await auth(accessToken as string);
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