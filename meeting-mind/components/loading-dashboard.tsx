import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function LoadingDashboard() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/4 mt-2" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-4 w-1/3 mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-1/3 mt-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
