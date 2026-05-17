import { cookies } from "next/headers";
import { ADMIN_FLASH_COOKIE } from "@/lib/admin-flash-constants";

export { ADMIN_FLASH_COOKIE } from "@/lib/admin-flash-constants";

/** Cookie court non httpOnly : lu par le layout admin ; effacé via `clearAdminFlashMessage`. */
export async function setAdminFlashMessage(message: string) {
  const jar = await cookies();
  jar.set(ADMIN_FLASH_COOKIE, message.slice(0, 400), {
    path: "/admin",
    maxAge: 60,
    sameSite: "lax",
  });
}
