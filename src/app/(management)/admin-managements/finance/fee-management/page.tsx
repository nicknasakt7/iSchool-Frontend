import FeeManagementHeader from '@/components/features/admin-management/finance/fee-management/FeeMangementHeader';
import TuitionFilters from '@/components/features/admin-management/finance/fee-management/TuitionFilters';
import TuitionTable from '@/components/features/admin-management/finance/fee-management/TuitionTable';

export default function FeeManagementPage() {
  return (
    <div className="p-4 min-h-screen space-y-6">
      <FeeManagementHeader />
      <TuitionFilters />
      <TuitionTable />
    </div>
  );
}
