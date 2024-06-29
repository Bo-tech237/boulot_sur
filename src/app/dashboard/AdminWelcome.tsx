import Revenue from '@/components/ui/revenue';
import Subscriptions from '@/components/ui/subscriptions';
import Sales from '@/components/ui/sales';
import Active from '@/components/ui/active';
import Transactions from '@/components/ui/transactions';
import RecentSales from '@/components/ui/recent-sales';

export default function AdminWelcome() {
    return (
        <div>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Revenue />
                <Subscriptions />
                <Sales />
                <Active />
            </div>
            <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <Transactions />
                <RecentSales />
            </div>
        </div>
    );
}
