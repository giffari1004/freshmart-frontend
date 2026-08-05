interface StatCardProps {
  label: string;
  value: number;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="flex-1 rounded-xl border border-stone-200 bg-white px-5 py-4">
      <p className="text-xs font-medium text-stone-500">{label}</p>
      <p className="mt-1 font-serif text-2xl text-stone-900">{value}</p>
    </div>
  );
}