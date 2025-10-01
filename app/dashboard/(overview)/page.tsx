import { lusitana } from "../../ui/fonts";
import CardWrapper, { Card } from "../../ui/dashboard/cards";
import {
  fetchCardData,
  // fetchLatestInvoices,
  // fetchRevenue,
} from "../../lib/data";
import RevenueChart from "../../ui/dashboard/revenue-chart";
import LatestInvoices from "../../ui/dashboard/latest-invoices";
import { Suspense } from "react";
import {
  CardSkeleton,
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
} from "@/app/ui/skeletons";

// async ini memungkinkan kita untuk mengambil data
export default async function Page() {
  // const revenue = await fetchRevenue();
  // const latestInvoices = await fetchLatestInvoices();
  // const {
  //   numberOfCustomers,
  //   numberOfInvoices,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashbard
      </h1>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* dan komponent di bawah ini, untuk menampilkan data nya */}
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
        <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
          {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
        </Suspense>
      </div>
    </main>
  );
}
