import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SalesSection } from "@/components/sales-section"
import { ExpensesSection } from "@/components/expenses-section"
import { FiadosSection } from "@/components/fiados-section"
import { CashFlowSection } from "@/components/cash-flow-section"

export default function CuentasPage({ searchParams }: { searchParams: { tab?: string } }) {
  const defaultTab = searchParams.tab || "fiados"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Cuentas y Fiados</h1>
        <p className="text-base lg:text-lg text-muted-foreground mt-1">Gestiona ventas, gastos y cuentas por cobrar</p>
      </div>

      <Tabs defaultValue={defaultTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-transparent">
          <TabsTrigger
            value="fiados"
            className="h-12 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Fiados
          </TabsTrigger>
          <TabsTrigger
            value="ventas"
            className="h-12 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Ventas
          </TabsTrigger>
          <TabsTrigger
            value="gastos"
            className="h-12 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Gastos
          </TabsTrigger>
          <TabsTrigger
            value="flujo"
            className="h-12 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Flujo de Caja
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fiados" className="space-y-6">
          <FiadosSection />
        </TabsContent>

        <TabsContent value="ventas" className="space-y-6">
          <SalesSection />
        </TabsContent>

        <TabsContent value="gastos" className="space-y-6">
          <ExpensesSection />
        </TabsContent>

        <TabsContent value="flujo" className="space-y-6">
          <CashFlowSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}
