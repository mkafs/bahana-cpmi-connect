import { useState } from "react";
import { Calendar, Filter, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { CpmiStatus } from "@/types/auth";

interface FilterOptions {
  search?: string;
  kelas?: string;
  status?: CpmiStatus | "";
  dateRange?: {
    start: string;
    end: string;
  };
}

interface FilterBarProps {
  onFiltersChange: (filters: FilterOptions) => void;
  showKelasFilter?: boolean;
  showStatusFilter?: boolean;
  showDateFilter?: boolean;
  placeholder?: string;
  className?: string;
}

// Mock data - replace with real data from your API
const kelasList = [
  { id: "1", name: "Kelas A" },
  { id: "2", name: "Kelas B" },
  { id: "3", name: "Kelas C" },
];

const statusOptions = [
  { value: "aktif", label: "Aktif" },
  { value: "piket", label: "Piket" },
  { value: "sudah_terbang", label: "Sudah Terbang" },
];

export function FilterBar({
  onFiltersChange,
  showKelasFilter = true,
  showStatusFilter = true,
  showDateFilter = true,
  placeholder = "Cari nama, pelajaran, atau kata kunci...",
  className = ""
}: FilterBarProps) {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterOptions = {};
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.kelas) count++;
    if (filters.status) count++;
    if (filters.dateRange) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <Card className={`p-4 space-y-4 ${className}`}>
      {/* Main Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={placeholder}
            value={filters.search || ""}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="pl-10"
          />
        </div>
        
        <Popover open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="relative">
              <Filter className="h-4 w-4 mr-2" />
              Filter
              {activeFiltersCount > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Filter Advanced</h4>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>

              {/* Kelas Filter */}
              {showKelasFilter && (
                <div className="space-y-2">
                  <Label>Kelas</Label>
                  <Select value={filters.kelas || ""} onValueChange={(value) => updateFilters({ kelas: value || undefined })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kelas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Semua Kelas</SelectItem>
                      {kelasList.map((kelas) => (
                        <SelectItem key={kelas.id} value={kelas.id}>
                          {kelas.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Status Filter */}
              {showStatusFilter && (
                <div className="space-y-2">
                  <Label>Status CPMI</Label>
                  <Select value={filters.status || ""} onValueChange={(value) => updateFilters({ status: value as CpmiStatus || "" })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Semua Status</SelectItem>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Date Range Filter */}
              {showDateFilter && (
                <div className="space-y-2">
                  <Label>Rentang Tanggal</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="date"
                      placeholder="Tanggal mulai"
                      value={filters.dateRange?.start || ""}
                      onChange={(e) => updateFilters({ 
                        dateRange: { 
                          start: e.target.value, 
                          end: filters.dateRange?.end || "" 
                        } 
                      })}
                    />
                    <Input
                      type="date"
                      placeholder="Tanggal akhir"
                      value={filters.dateRange?.end || ""}
                      onChange={(e) => updateFilters({ 
                        dateRange: { 
                          start: filters.dateRange?.start || "", 
                          end: e.target.value 
                        } 
                      })}
                    />
                  </div>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              Search: {filters.search}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilters({ search: undefined })}
              />
            </Badge>
          )}
          {filters.kelas && (
            <Badge variant="secondary" className="gap-1">
              Kelas: {kelasList.find(k => k.id === filters.kelas)?.name}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilters({ kelas: undefined })}
              />
            </Badge>
          )}
          {filters.status && (
            <Badge variant="secondary" className="gap-1">
              Status: {statusOptions.find(s => s.value === filters.status)?.label}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilters({ status: "" })}
              />
            </Badge>
          )}
          {filters.dateRange && (filters.dateRange.start || filters.dateRange.end) && (
            <Badge variant="secondary" className="gap-1">
              <Calendar className="h-3 w-3" />
              {filters.dateRange.start} - {filters.dateRange.end}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilters({ dateRange: undefined })}
              />
            </Badge>
          )}
        </div>
      )}
    </Card>
  );
}