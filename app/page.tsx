export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <main className="flex-1 flex justify-center">
        <h2 className="font-bold text-4xl mt-16">One Bite Planner</h2>
      </main>
      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>ⓒ 한입 플래너. All rights reserved.</p>
      </footer>
    </div>
  );
}
