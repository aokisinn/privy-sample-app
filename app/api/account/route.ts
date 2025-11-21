import { getServerPrivyClient } from "@/lib/privy/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * ユーザー情報を取得 PrivyのIDトークンを使用してユーザー情報を取得
 * @returns ユーザー情報
 * @throws 401 Unauthorized
 * @throws 500 Failed to fetch user information
 */
export async function GET() {
  try {
    const privyClient = await getServerPrivyClient();

    const cookieStore = await cookies();
    const idToken =  cookieStore.get('privy-id-token')?.value;

    if (!idToken) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await privyClient.users().get({id_token: idToken});

    return NextResponse.json(
      { user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user information" },
      { status: 500 }
    );
  }
}
