import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import data from '../../../../components/modules/dashboard/dashboard.json'
import { SectionCards } from '@/components/modules/dashboard/sidebar/section-card';
import { ChartAreaInteractive } from '@/components/modules/dashboard/sidebar/cart-area-interactive';
import { DataTable } from '@/components/modules/dashboard/sidebar/data-table';

const TenantDashboardPage = () => {
    return (
      //   <div>
      //   <div>
      //     <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      //       <div className="aspect-video rounded-xl bg-gray-200 " />
      //       <div className="aspect-video rounded-xl bg-gray-200" />
      //       <div className="aspect-video rounded-xl bg-gray-200" />
      //     </div>
      //     <div className="min-h-[100vh] rounded-xl bg-gray-200 mt-4" />
      //   </div>
      // </div>

      <SidebarProvider>
            
            <SidebarInset>
              
              <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <SectionCards />
                    <div className="px-4 lg:px-6">
                      <ChartAreaInteractive />
                    </div>
                    <DataTable data={data} />
                  </div>
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
    );
};

export default TenantDashboardPage;