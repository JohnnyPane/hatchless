import { Text, Table } from "@mantine/core"
import { useResourceContext } from "../../contexts/ResourceContext.jsx";

const HatchlessTable = ({ columns, actionComponent, resourceName }) => {
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

  return (
    <>
      <Text size="sm" color="dimmed" className="margin-bottom-small">
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
            <Table.Tr key={rowIndex}>
              {columns.map((column) => (
                <Table.Td key={column.accessor}>
                  {row[column.accessor]}
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