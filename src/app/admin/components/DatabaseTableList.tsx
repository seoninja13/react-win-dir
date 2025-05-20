// src/app/admin/components/DatabaseTableList.tsx
'use client';

import { useState, useEffect, useTransition } from 'react';
import { getDatabaseTables } from '../actions/getDatabaseTables';
import { getTableColumnDetails, ColumnDetail } from '../actions/getTableColumnDetails';
import { getTableData } from '../actions/getTableData'; // Import new action

interface Table {
  schema: string;
  name: string;
}

interface StatusMessage {
  type: 'idle' | 'loading' | 'success' | 'error';
  text: string | null;
}

interface ColumnDetailsStatusMessage extends StatusMessage {
  tableName?: string;
}

interface TableDataStatusMessage extends StatusMessage {
  tableName?: string;
}

export default function DatabaseTableList() {
  const [tables, setTables] = useState<Table[]>([]);
  const [tableListStatus, setTableListStatus] = useState<StatusMessage>({ type: 'idle', text: null });
  const [isFetchingTables, startFetchingTables] = useTransition();

  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [columnDetails, setColumnDetails] = useState<ColumnDetail[]>([]);
  const [columnDetailsStatus, setColumnDetailsStatus] = useState<ColumnDetailsStatusMessage>({ type: 'idle', text: null });
  const [isFetchingColumns, startFetchingColumns] = useTransition();

  // State for table data
  const [tableDataColumns, setTableDataColumns] = useState<string[]>([]);
  const [tableDataRows, setTableDataRows] = useState<any[]>([]);
  const [tableDataStatus, setTableDataStatus] = useState<TableDataStatusMessage>({ type: 'idle', text: null });
  const [isFetchingTableData, startFetchingTableData] = useTransition();

  const clearTableSpecificData = () => {
    setSelectedTable(null);
    setColumnDetails([]);
    setColumnDetailsStatus({ type: 'idle', text: null });
    setTableDataColumns([]);
    setTableDataRows([]);
    setTableDataStatus({ type: 'idle', text: null });
  };

  const fetchTables = () => {
    startFetchingTables(async () => {
      setTableListStatus({ type: 'loading', text: 'Loading tables...' });
      clearTableSpecificData();
      try {
        const result = await getDatabaseTables();
        if (result.success && result.tables) {
          setTables(result.tables);
          setTableListStatus({ type: 'success', text: `Found ${result.tables.length} user table(s).` });
        } else {
          setTables([]);
          setTableListStatus({ type: 'error', text: result.error || 'Failed to load tables.' });
        }
      } catch (error: any) {
        console.error('Error calling getDatabaseTables action:', error);
        setTables([]);
        setTableListStatus({ type: 'error', text: `Client-side error: ${error.message || 'An unknown error occurred.'}` });
      }
    });
  };

  const handleSelectTable = (table: Table) => {
    // If clicking the same table, do nothing or maybe toggle view?
    // For now, just re-fetch if it's different or not selected.
    if (selectedTable?.schema !== table.schema || selectedTable?.name !== table.name) {
        setSelectedTable(table);
        setTableDataColumns([]); // Clear previous table data
        setTableDataRows([]);
        setTableDataStatus({ type: 'idle', text: null });
        fetchColumnDetails(table);
    } else if (!selectedTable) { // First selection
        setSelectedTable(table);
        fetchColumnDetails(table);
    }
  };

  const fetchColumnDetails = (table: Table) => {
    startFetchingColumns(async () => {
      setColumnDetailsStatus({ type: 'loading', text: `Fetching schema for ${table.schema}.${table.name}...`, tableName: `${table.schema}.${table.name}` });
      setColumnDetails([]);
      try {
        const result = await getTableColumnDetails(table.schema, table.name);
        if (result.success && result.columns) {
          setColumnDetails(result.columns);
          setColumnDetailsStatus({ type: 'success', text: `Successfully fetched ${result.columns.length} column(s) for ${table.schema}.${table.name}.`, tableName: `${table.schema}.${table.name}` });
        } else {
          setColumnDetailsStatus({ type: 'error', text: result.error || `Failed to load schema for ${table.schema}.${table.name}.`, tableName: `${table.schema}.${table.name}` });
        }
      } catch (error: any) {
        console.error(`Error calling getTableColumnDetails for ${table.schema}.${table.name}:`, error);
        setColumnDetailsStatus({ type: 'error', text: `Client-side error: ${error.message || 'An unknown error occurred.'}`, tableName: `${table.schema}.${table.name}` });
      }
    });
  };

  const fetchTableData = () => {
    if (!selectedTable) return;
    startFetchingTableData(async () => {
      setTableDataStatus({ type: 'loading', text: `Fetching data for ${selectedTable.schema}.${selectedTable.name}...`, tableName: `${selectedTable.schema}.${selectedTable.name}` });
      setTableDataColumns([]);
      setTableDataRows([]);
      try {
        const result = await getTableData(selectedTable.schema, selectedTable.name);
        if (result.success && result.rows && result.columns) {
          setTableDataColumns(result.columns);
          setTableDataRows(result.rows);
          setTableDataStatus({ type: 'success', text: `Successfully fetched ${result.rows.length} row(s) (preview). Total: ${result.rowCount}.`, tableName: `${selectedTable.schema}.${selectedTable.name}` });
        } else {
          setTableDataStatus({ type: 'error', text: result.error || `Failed to load data for ${selectedTable.schema}.${selectedTable.name}.`, tableName: `${selectedTable.schema}.${selectedTable.name}` });
        }
      } catch (error: any) {
        console.error(`Error calling getTableData for ${selectedTable.schema}.${selectedTable.name}:`, error);
        setTableDataStatus({ type: 'error', text: `Client-side error: ${error.message || 'An unknown error occurred.'}`, tableName: `${selectedTable.schema}.${selectedTable.name}` });
      }
    });
  };

  useEffect(() => {
    fetchTables();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Load tables on component mount

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {/* Table List Section */}
      <div className="md:col-span-1 p-4 border rounded-lg shadow-md flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Database Tables</h2>
          <button
            onClick={fetchTables}
            disabled={isFetchingTables}
            className={`px-3 py-1.5 font-medium rounded-md text-white text-xs 
                        ${isFetchingTables ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300'}`}
          >
            {isFetchingTables ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {tableListStatus.text && (
          <div 
            className={`mb-3 p-2 rounded-md text-xs 
                        ${tableListStatus.type === 'success' ? 'bg-green-100 text-green-700' : ''}
                        ${tableListStatus.type === 'error' ? 'bg-red-100 text-red-700' : ''}
                        ${tableListStatus.type === 'loading' || tableListStatus.type === 'idle' ? 'bg-blue-100 text-blue-700' : ''}`}
          >
            <p>{tableListStatus.text}</p>
          </div>
        )}

        {tables.length > 0 ? (
          <ul className="space-y-1 flex-grow overflow-y-auto max-h-[calc(100vh-20rem)] pr-1">
            {tables.map((table) => (
              <li key={`${table.schema}.${table.name}`} className="text-sm">
                <button 
                  onClick={() => handleSelectTable(table)} // Updated to handleSelectTable
                  disabled={isFetchingColumns && selectedTable?.name === table.name && selectedTable?.schema === table.schema}
                  className={`w-full text-left px-2 py-1.5 rounded hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 
                               ${selectedTable?.name === table.name && selectedTable?.schema === table.schema ? 'bg-blue-100 font-semibold' : ''}
                               ${isFetchingColumns && selectedTable?.name === table.name && selectedTable?.schema === table.schema ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span className="font-medium">{table.schema}</span>.{table.name}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          tableListStatus.type !== 'loading' && <p className="text-gray-500 text-sm">No user tables found.</p>
        )}
      </div>

      {/* Details Section (Schema & Data) */}
      <div className="md:col-span-2 p-4 border rounded-lg shadow-md overflow-auto">
        <h2 className="text-xl font-semibold mb-1">
          Table Details: {selectedTable ? `${selectedTable.schema}.${selectedTable.name}` : 'Select a table'}
        </h2>
        
        {/* Column Details Section */}
        {selectedTable && (
          <div className="mt-2">
            <h3 className="text-lg font-medium text-gray-800 mb-1">Schema</h3>
            {columnDetailsStatus.text && (
              <div 
                className={`my-2 p-2 rounded-md text-xs 
                            ${columnDetailsStatus.type === 'success' ? 'bg-green-100 text-green-700' : ''}
                            ${columnDetailsStatus.type === 'error' ? 'bg-red-100 text-red-700' : ''}
                            ${columnDetailsStatus.type === 'loading' ? 'bg-blue-100 text-blue-700' : ''}`}
              >
                <p>{columnDetailsStatus.text}</p>
              </div>
            )}

            {isFetchingColumns && columnDetails.length === 0 && (
              <p className="text-gray-500 text-sm">Loading schema details...</p>
            )}

            {!isFetchingColumns && selectedTable && columnDetails.length === 0 && columnDetailsStatus.type !== 'loading' && (
                <p className="text-gray-500 text-sm">No columns found for this table, or an error occurred while fetching schema.</p>
            )}

            {columnDetails.length > 0 && (
              <div className="overflow-x-auto text-xs mb-4 max-h-60">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      {['Column Name', 'Data Type', 'Nullable', 'Default', 'Max Length'].map(header => (
                        <th key={header} className="px-3 py-1.5 text-left font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {columnDetails.map((col) => (
                      <tr key={col.column_name}>
                        <td className="px-3 py-1.5 whitespace-nowrap font-medium text-gray-900">{col.column_name}</td>
                        <td className="px-3 py-1.5 whitespace-nowrap text-gray-600">{col.data_type}</td>
                        <td className="px-3 py-1.5 whitespace-nowrap text-gray-600">{col.is_nullable}</td>
                        <td className="px-3 py-1.5 whitespace-nowrap text-gray-600">{col.column_default || 'N/A'}</td>
                        <td className="px-3 py-1.5 whitespace-nowrap text-gray-600">{col.character_maximum_length || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* View Data Button - shown when schema is loaded and not currently fetching data */}
            {columnDetails.length > 0 && !isFetchingTableData && (
                <button 
                    onClick={fetchTableData}
                    disabled={isFetchingTableData}
                    className={`mt-1 px-3 py-1.5 font-medium rounded-md text-white text-xs 
                                ${isFetchingTableData ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 focus:ring-2 focus:ring-teal-300'}`}
                >
                    {isFetchingTableData ? 'Loading Data...' : 'View Table Data (Preview)'}
                </button>
            )}
          </div>
        )}

        {/* Table Data Section */}
        {selectedTable && tableDataColumns.length > 0 && (
          <div className="mt-4 pt-2 border-t">
            <h3 className="text-lg font-medium text-gray-800 mb-1">Table Data (Preview - First {tableDataRows.length} rows)</h3>
            {tableDataStatus.text && (
              <div 
                className={`my-2 p-2 rounded-md text-xs 
                            ${tableDataStatus.type === 'success' ? 'bg-green-100 text-green-700' : ''}
                            ${tableDataStatus.type === 'error' ? 'bg-red-100 text-red-700' : ''}
                            ${tableDataStatus.type === 'loading' ? 'bg-blue-100 text-blue-700' : ''}`}
              >
                <p>{tableDataStatus.text}</p>
              </div>
            )}
            <div className="overflow-x-auto text-xs max-h-96">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            {tableDataColumns.map(colName => (
                                <th key={colName} className="px-3 py-1.5 text-left font-medium text-gray-500 uppercase tracking-wider">{colName}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tableDataRows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {tableDataColumns.map(colName => (
                                    <td key={`${rowIndex}-${colName}`} className="px-3 py-1.5 whitespace-nowrap text-gray-600">
                                        {String(row[colName])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
        )}
         {!selectedTable && <p className="text-gray-500 text-sm">Select a table from the list to view its details and data.</p>}
      </div>
    </div>
  );
}
