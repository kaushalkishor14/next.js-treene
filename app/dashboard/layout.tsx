import Sidebar from '@/components/user-components/sidebar';



export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div >
      <Sidebar > 
        {children}
      </Sidebar>
    </div>
  );
}