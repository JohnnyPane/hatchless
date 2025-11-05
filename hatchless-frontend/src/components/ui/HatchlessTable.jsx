import { Table, Text, Image } from "@mantine/core"
import { useResourceContext } from "../../contexts/ResourceContext.jsx";
import { formatDate } from "../../utils/dateUtils.js";
import './HatchlessTable.scss';
import { generateImageUrl } from "../../utils/imageUtils.js";

const HatchlessColumnDisplay = ({ column, row, rowData }) => {
  const displayValue = row[column.accessor];

  switch (column.type) {
    case 'text':
      return <Text>{displayValue}</Text>;
    case 'date':
      return <Text>{formatDate(displayValue)}</Text>;
    case 'image':
      const imageUrl = column.getImageUrl ? column.getImageUrl(rowData) : generateImageUrl(displayValue);
      return <Image radius={8} src={imageUrl} alt="" w={50} h={50} />;
    default:
      return <span>{row[column.accessor]}</span>;
  }
}

const HatchlessTable = ({ columns, actionComponent, resourceName, onRowClick }) => {
  const { data, total } = useResourceContext({ resourceName: resourceName });

  const tableData = data.map((row) => {
    const rowData = {};
    columns.forEach((column) => {
      const accessorParts = column.accessor.split('.');
      let value = row.attributes;
      accessorParts.forEach((part) => {
        value = value ? value[part] : undefined;
      });
      rowData[column.accessor] = value;
    });

    return rowData;
  });

  const handleRowClick = (rowData) => {
    if (onRowClick) {
      onRowClick(rowData);
    }
  };


  return (
    <>
      <Text size="sm" className="secondary-text">
        Total: {total}
      </Text>

      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            {columns.map((column) => (
              <Table.Th key={column.label}>{column.label}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {tableData.map((row, rowIndex) => (
            <Table.Tr key={rowIndex} className="table-row clickable" onClick={() => handleRowClick(data[rowIndex])}>
              {columns.map((column) => (
                <Table.Td key={column.accessor} className={`hatchless-table-${column.type}`}>
                  <HatchlessColumnDisplay column={column} row={row} rowData={data[rowIndex]} />
                </Table.Td>
              ))}

              {actionComponent && (
                <Table.Td>
                  {actionComponent({ actionItem: data[rowIndex] })}
                </Table.Td>
              )}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
}

export default HatchlessTable;