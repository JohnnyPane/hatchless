import useResources from "../../hooks/useResources.js";

const FlyPatternsList = ({ riverId }) => {
  const { data: flyPatterns, isLoading, isError, error } = useResources({ resourceName: "fly_patterns", perPage: 1000, scopes: [{ name: "by_river", args: [riverId]}]  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Fly Patterns</h2>
      <ul>
        {flyPatterns.map((fp) => (
          <li key={fp.id}>
            {fp.attributes.name} - {fp.attributes.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FlyPatternsList;