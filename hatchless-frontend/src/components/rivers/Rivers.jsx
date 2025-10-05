import useResources from '../../hooks/useResources.js';

const Rivers = () => {
  const { data: rivers, isLoading, isError, error } = useResources({ resourceName: 'rivers', perPage: 10 });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Rivers</h1>
      <ul>
        {rivers && rivers.map(river => (
          <li key={river.id}>{river.attributes.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Rivers;