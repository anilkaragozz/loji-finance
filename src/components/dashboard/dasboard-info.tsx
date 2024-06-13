import { CalendarClock, HandCoins } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BarCharts from "@/components/chart/bar-chart";
import PieCharts from "@/components/chart/pie-chart";

const DashboardInfo = () => {
  return (
    <>
      <Card className="max-w-xl max-h-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Debt Data</CardTitle>
          <HandCoins className="h-6 w-6 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <BarCharts />
        </CardContent>
      </Card>

      <Card className="max-w-xl max-h-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Debt Distribution
          </CardTitle>
          <CalendarClock className="h-6 w-6 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <PieCharts />
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardInfo;
