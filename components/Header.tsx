import AuthButton from "@/components/AuthButton";

interface HeaderProps {
  isSupabaseConnected: boolean;
}

export default function Header({ isSupabaseConnected }: HeaderProps) {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <div className="flex gap-x-12 items-center">
          <h1 className="text-xl font-bold">한입 플래너</h1>
          <ul className="flex space-x-6">
            <li className="text-base text-gray-800 font-medium">목표설정</li>
            <li className="text-base text-gray-800 font-medium">실행하기</li>
            <li className="text-base text-gray-800 font-medium">돌아보기</li>
          </ul>
        </div>

        <div className="flex gap-x-2 items-center">
          {/* <DeployButton /> */}
          {isSupabaseConnected && <AuthButton />}
        </div>
      </div>
    </nav>
  );
}
