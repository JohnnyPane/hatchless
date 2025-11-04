import { useState } from "react";
import { Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";

import useResource from "../../hooks/useResource.js";
import HatchlessTablePage from "../ui/HatchlessTablePage.jsx";
import HotFlyDrawer from "./HotFlyDrawer.jsx";

const columns = [
  { accessor: 'image_url', label: 'Image', type: 'image' },
  { accessor: 'fly_pattern.name', label: 'Fly Pattern', type: 'text' },
  { accessor: 'fly_pattern.category', label: 'Fly Type', type: 'text' },
  { accessor: 'fly_shop.name', label: 'Fly Shop', type: 'text' },
  { accessor: 'created_at', label: 'Posted On', type: 'date' }
];

const HotFliesTable = ({ displayHeader = true }) => {
  const [selectedHotFlyId, setSelectedHotFlyId] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const { data: selectedHotFly } = useResource("hot_flies", selectedHotFlyId);

  const onRowClick = (hotFly) => {
    setSelectedHotFlyId(hotFly.id);
    open();
  }

  const onClose = () => {
    setSelectedHotFlyId(null);
    close();
  }

  return (
    <div>
      {displayHeader && <div className="center-text">
        <Text size="md" className="margin-bottom">
          These are the flies local fly shops are recommending right now for this river.

          They’re handpicked by guides and shop staff who know the current hatches and conditions, giving you an edge on
          what patterns are producing fish today.
        </Text>
      </div>}

      <HatchlessTablePage resourceName="hot_flies" columns={columns} onRowClick={onRowClick} />

      <HotFlyDrawer hotFly={selectedHotFly} onClose={onClose} isOpen={opened} />
    </div>
  )
}

export default HotFliesTable;