import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SalesReportSection } from "@/components/sales-report-section"
import { InventoryReportSection } from "@/components/inventory-report-section"
import { FiadosReportSection } from "@/components/fiados-report-section"

export default function ReportesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Reportes y Estadísticas</h1>
        <p className="text-base lg:text-lg text-muted-foreground mt-1">Analiza el rendimiento de tu negocio</p>
      </div>

      <Tabs defaultValue="ventas" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 h-auto gap-2 bg-transparent">
          <TabsTrigger
            value="ventas"
            className="h-12 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Ventas
          </TabsTrigger>
          <TabsTrigger
            value="inventario"
            className="h-12 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Inventario
          </TabsTrigger>
          <TabsTrigger
            value="fiados"
            className="h-12 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Fiados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ventas">
          <SalesReportSection />
        </TabsContent>

        <TabsContent value="inventario">
          <InventoryReportSection />
        </TabsContent>

        <TabsContent value="fiados">
          <FiadosReportSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}
