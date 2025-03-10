import { Input } from "@/components/ui/input";

interface SearchFormProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchForm({ searchQuery, setSearchQuery }: SearchFormProps) {
  return (
    <div className="mb-4">
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by description..."
        className="w-full"
      />
    </div>
  );
}