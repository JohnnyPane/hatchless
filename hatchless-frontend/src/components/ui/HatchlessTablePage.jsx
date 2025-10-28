import { Card } from "@mantine/core";
import HatchlessPagination from "./HatchlessPagination.jsx";
import HatchlessTable from "./HatchlessTable.jsx";

const HatchlessTablePage = ({ resourceName, columns, actionComponent }) => {
  return (
    <div>
      <Card shadow="sm" padding="lg" radius="md" withBorder className="hatchless-table">
        <HatchlessTable columns={columns} actionComponent={actionComponent} />

        <div className="flex to-center margin-top">
          <HatchlessPagination resourceName={resourceName} />
        </div>
      </Card>
    </div>
  );
}

export default HatchlessTablePage;