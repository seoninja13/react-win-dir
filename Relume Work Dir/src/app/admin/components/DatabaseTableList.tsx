'use client';

import { useState, useEffect } from 'react';

interface TableInfo {
  table_name: string;
  table_schema: string;
  table_type: string;
}

interface ColumnInfo {
  column_name: string;
  data_type: string;
  is_nullable: string;
  column_default: string | null;
  is_identity: string;
  is_primary_key: boolean;
  is_foreign_key: boolean;
  references?: {
    table: string;
    column: string;
  };
}

interface TableData {
  rows: any[];
  columns: string[];
}

export default function DatabaseTableList() {
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [columns, setColumns] = useState<ColumnInfo[]>([]);
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [isLoadingTables, setIsLoadingTables] = useState(true);
  const [isLoadingColumns, setIsLoadingColumns] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch tables on component mount
  useEffect(() => {
    const fetchTables = async () => {
      try {
        setIsLoadingTables(true);
        setError(null);
        
        const response = await fetch('/api/admin/tables');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch tables: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setTables(data.tables);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        console.error('Error fetching tables:', err);
      } finally {
        setIsLoadingTables(false);
      }
    };

    fetchTables();
  }, []);

  // Fetch columns when a table is selected
  useEffect(() => {
    if (!selectedTable) {
      setColumns([]);
      setTableData(null);
      return;
    }

    const fetchColumns = async () => {
      try {
        setIsLoadingColumns(true);
        setError(null);
        
        const response = await fetch(`/api/admin/tables/${selectedTable}/columns`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch columns: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setColumns(data.columns);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        console.error('Error fetching columns:', err);
      } finally {
        setIsLoadingColumns(false);
      }
    };

    const fetchTableData = async () => {
      try {
        setIsLoadingData(true);
        setError(null);
        
        const response = await fetch(`/api/admin/tables/${selectedTable}/data?limit=10`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch table data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setTableData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        console.error('Error fetching table data:', err);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchColumns();
    fetchTableData();
  }, [selectedTable]);

  return (
    <div className="mb-8 p-4 rounded-lg border bg-white">
      <h2 className="text-xl font-semibold mb-4">Database Tables</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}
      
      {isLoadingTables ? (
        <div className="flex items-center justify-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <label htmlFor="table-select" className="block text-sm font-medium text-gray-700 mb-1">
              Select a table to view its structure and data:
            </label>
            <select
              id="table-select"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={selectedTable || ''}
              onChange={(e) => setSelectedTable(e.target.value || null)}
            >
              <option value="">-- Select a table --</option>
              {tables
                .filter((table) => table.table_schema === 'public')
                .map((table) => (
                  <option key={table.table_name} value={table.table_name}>
                    {table.table_name}
                  </option>
                ))}
            </select>
          </div>

          {selectedTable && (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Table Structure</h3>
                {isLoadingColumns ? (
                  <div className="flex items-center justify-center h-20">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Column Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Data Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nullable
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Default
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Constraints
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {columns.map((column) => (
                          <tr key={column.column_name}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {column.column_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {column.data_type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {column.is_nullable === 'YES' ? 'Yes' : 'No'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {column.column_default || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {column.is_primary_key && (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 mr-1">
                                  PK
                                </span>
                              )}
                              {column.is_foreign_key && (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800 mr-1">
                                  FK
                                </span>
                              )}
                              {column.is_identity === 'YES' && (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Identity
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sample Data (10 rows)</h3>
                {isLoadingData ? (
                  <div className="flex items-center justify-center h-20">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                  </div>
                ) : tableData && tableData.rows.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {tableData.columns.map((column) => (
                            <th
                              key={column}
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {tableData.rows.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {tableData.columns.map((column) => (
                              <td key={column} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {typeof row[column] === 'object'
                                  ? JSON.stringify(row[column])
                                  : String(row[column] ?? '-')}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">No data available</p>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
