import Nav from "../components/NavComponent";
import Side from "../components/SideComponent";
export default function SystemLayoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full bg-inherit flex flex-col">
      <Nav />
      <div className="flex-1 flex overflow-y-hidden">
        <Side />
        <div className="flex-1 overflow-auto p-[24px] bg-background">
          <div className="h-full shadow-list rounded-list bg-[#fff] p-[16px] flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
