import { Table, Text, Image, Box } from "@mantine/core"
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
      const isLogo = column.isLogo || false;

      return (
        <Box
          w={50}
          h={50}
          style={{
            overflow: 'hidden',
            borderRadius: 8,
            backgroundColor: isLogo ? '#f8f9fa' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: isLogo ? '1px solid #eee' : 'none'
          }}
        >
          <Image
            src={imageUrl}
            alt=""
            w="100%"
            h="100%"
            fit={isLogo ? "contain" : "cover"}
            p={isLogo ? 4 : 0}
            fallbackSrc={`https://placehold.co/80x80?text=[no image available]&font=roboto`}
          />
        </Box>
      );
    default:
      return <span>{row[column.accessor]}</span>;
  }
}

const HatchlessTable = ({ resources, columns, actionComponent, onRowClick }) => {
  const { data, total } = resources;

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