import { Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useResourceContext } from "../../contexts/ResourceContext.jsx";
import HatchlessTablePage from "./HatchlessTablePage.jsx";
import HatchlessPagination from "./HatchlessPagination.jsx";

const ResponsiveList = ({ columns, CardComponent, onClick, resourceName }) => {
  const resources = useResourceContext({ resourceName: resourceName });
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    const hasResources = resources?.data?.length > 0;

    return (
      <div>
        <Text size="xs" color="dimmed" className="margin-bottom">Total: {resources.total}</Text>

        {hasResources && resources?.data.map(resource => (
          <div className="margin-bottom" key={resource.id}>
            <CardComponent item={resource.attributes} onClick={onClick} />
          </div>
        ))}

        {!hasResources && <Text className="center-text margin-t-80">No resources found.</Text> }

        <div className="flex to-center margin-top">
          <HatchlessPagination resourceName={resourceName} />
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <HatchlessTablePage resources={resources} onRowClick={onClick} resourceData={resources} columns={columns} resourceName={resourceName} />
    </div>
  )
}

export default ResponsiveList;