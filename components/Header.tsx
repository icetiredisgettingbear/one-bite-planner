import AuthButton from "@/components/AuthButton";
import Link from "next/link";
import Typography from "./Typography";
import Image from "next/image";

interface HeaderProps {
  isSupabaseConnected: boolean;
}

export default function Header({ isSupabaseConnected }: HeaderProps) {
  return (
    <nav className="w-full flex justify-center bg-white border-solid border-b border-b-foreground/10 h-20">
      <div className="w-full max-w-[1280px] px-10 flex justify-between items-center">
        <div className="flex gap-x-8 items-center">
          <Link className="flex justify-center" href="/">
            <Image
              src="/images/one_bite_planner_logo.svg"
              alt="한입 플래너 로고"
              width={120}
              height={28}
            />
          </Link>
          <ul className="flex gap-x-12 list-none none">
            <li className="text-base text-gray-800 font-medium">
              <Link className="no-underline text-[#333]" href="/goals-setup">
                <Typography variant="subtitle2">목표설정</Typography>
              </Link>
            </li>
            <li className="text-base text-gray-800 font-medium">
              <Link className="no-underline text-[#333]" href="/to-do">
                <Typography variant="subtitle2">실행하기</Typography>
              </Link>
            </li>
            <li className="text-base text-gray-800 font-medium">
              <Link className="no-underline text-[#333]" href="/progress">
                <Typography variant="subtitle2">돌아보기</Typography>
              </Link>
            </li>
          </ul>
        </div>

        {isSupabaseConnected && <AuthButton />}
      </div>
    </nav>
  );
}
