import { Card } from "@mantine/core";
import HatchlessPagination from "./HatchlessPagination.jsx";
import HatchlessTable from "./HatchlessTable.jsx";

const HatchlessTablePage = ({ resourceName, resources, columns, actionComponent, onRowClick }) => {

  return (
    <div>
      <Card shadow="sm" padding="lg" radius="md" withBorder className="card">
        <HatchlessTable resources={resources} columns={columns} actionComponent={actionComponent} onRowClick={onRowClick} />

        <div className="flex to-center margin-top">
          <HatchlessPagination resourceName={resourceName} />
        </div>
      </Card>
    </div>
  );
}

export default HatchlessTablePage;