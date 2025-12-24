import { Button, Collapse } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AddHatchReport from "./AddHatchReport.jsx";

const AddRiverHatchReportToggle = ({ riverId }) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <div>
      <div className="flex to-center margin-bottom">
        <Button variant={opened ? "light" : "outline"} onClick={toggle}>
          {opened ? 'Cancel' : 'Add Hatch Report for This River'}
        </Button>
      </div>

      <Collapse in={opened}>
        <AddHatchReport riverId={riverId} />
      </Collapse>
    </div>
  );
}

export default AddRiverHatchReportToggle;