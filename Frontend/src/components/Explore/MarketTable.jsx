// // src/components/explore/MarketTable.js
// import { ChevronUp, ChevronDown } from 'lucide-react';

// export default function MarketTable({ data, handleSort, sortConfig }) {
//   const formatNumber = (num) => {
//     return new Intl.NumberFormat('en-US', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     }).format(num);
//   };
  
//   const formatMarketCap = (num) => {
//     return `$${num}B`;
//   };

//   const getSortIcon = (columnKey) => {
//     if (sortConfig.key !== columnKey) return null;
//     return sortConfig.direction === 'asc' ? 
//       <ChevronUp size={14} className="inline ml-1" /> : 
//       <ChevronDown size={14} className="inline ml-1" />;
//   };

//   return (
//     <div className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden mb-8">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
//           <thead className="bg-gray-50 dark:bg-gray-800">
//             <tr>
//               <TableHeader 
//                 title="Name" 
//                 onClick={() => handleSort('name')}
//                 sortIcon={getSortIcon('name')}
//                 align="left"
//               />
//               <TableHeader 
//                 title="Price" 
//                 onClick={() => handleSort('price')}
//                 sortIcon={getSortIcon('price')}
//               />
//               <TableHeader 
//                 title="24h Change" 
//                 onClick={() => handleSort('change24h')}
//                 sortIcon={getSortIcon('change24h')}
//               />
//               <TableHeader 
//                 title="Market Cap" 
//                 onClick={() => handleSort('marketCap')}
//                 sortIcon={getSortIcon('marketCap')}
//               />
//               <TableHeader 
//                 title="Volume (24h)" 
//                 onClick={() => handleSort('volume24h')}
//                 sortIcon={getSortIcon('volume24h')}
//               />
//               <TableHeader title="Action" />
//             </tr>
//           </thead>
//           <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
//             {data.map((item) => (
//               <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center">
//                     <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium">
//                       {item.symbol.substring(0, 2)}
//                     </div>
//                     <div className="ml-4">
//                       <div className="text-sm font-medium">{item.name}</div>
//                       <div className="text-sm text-gray-500 dark:text-gray-400">{item.symbol}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                   ${formatNumber(item.price)}
//                 </td>
//                 <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${item.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//                   {item.change24h >= 0 ? '+' : ''}{item.change24h}%
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
//                   {formatMarketCap(item.marketCap)}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
//                   ${formatNumber(item.volume24h)}B
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right">
//                   <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-sm transition-colors">
//                     Trade
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
      
//       {data.length === 0 && (
//         <div className="py-20 text-center text-gray-500 dark:text-gray-400">
//           <p>No results found. Try adjusting your filters.</p>
//         </div>
//       )}
//     </div>
//   );
// }

// function TableHeader({ title, onClick, sortIcon, align = "right" }) {
//   return (
//     <th 
//       scope="col" 
//       className={`px-6 py-3 text-${align} text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${onClick ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700' : ''}`}
//       onClick={onClick}
//     >
//       <div className="flex items-center justify-end">
//         {align === "left" ? (
//           <>
//             <span>{title}</span>
//             {sortIcon}
//           </>
//         ) : (
//           <>
//             <span>{title}</span>
//             {sortIcon}
//           </>
//         )}
//       </div>
//     </th>
//   );
// }











// src/components/explore/MarketTable.js
import { ChevronUp, ChevronDown } from 'lucide-react';
import AssetItem from './AssetItem';

export default function MarketTable({ data, handleSort, sortConfig }) {
  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === 'asc' ? 
      <ChevronUp size={14} className="inline ml-1" /> : 
      <ChevronDown size={14} className="inline ml-1" />;
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden mb-8">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <TableHeader 
                title="Name" 
                onClick={() => handleSort('name')}
                sortIcon={getSortIcon('name')}
                align="left"
              />
              <TableHeader 
                title="Price" 
                onClick={() => handleSort('price')}
                sortIcon={getSortIcon('price')}
              />
              <TableHeader 
                title="24h Change" 
                onClick={() => handleSort('change24h')}
                sortIcon={getSortIcon('change24h')}
              />
              <TableHeader 
                title="Market Cap" 
                onClick={() => handleSort('marketCap')}
                sortIcon={getSortIcon('marketCap')}
              />
              <TableHeader 
                title="Volume (24h)" 
                onClick={() => handleSort('volume24h')}
                sortIcon={getSortIcon('volume24h')}
              />
              <TableHeader title="Action" />
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
            {data.map((item) => (
              <AssetItem key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
      
      {data.length === 0 && (
        <EmptyState />
      )}
    </div>
  );
}

function TableHeader({ title, onClick, sortIcon, align = "right" }) {
  return (
    <th 
      scope="col" 
      className={`px-6 py-3 text-${align} text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${onClick ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-end">
        {align === "left" ? (
          <>
            <span>{title}</span>
            {sortIcon}
          </>
        ) : (
          <>
            <span>{title}</span>
            {sortIcon}
          </>
        )}
      </div>
    </th>
  );
}

function EmptyState() {
  return (
    <div className="py-20 text-center text-gray-500 dark:text-gray-400">
      <p className="text-lg mb-2">No results found</p>
      <p>Try adjusting your search filters to find what you're looking for.</p>
    </div>
  );
}