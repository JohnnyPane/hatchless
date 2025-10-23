const InsectListItem = ({ insect }) => {
  return (
    <div className="insect-list-item">
      <h3>{insect.common_name}</h3>
      <p><strong>Scientific Name:</strong> {insect.scientific_name}</p>
      <p>Description {insect.description}</p>

      <h5>Fly Patterns</h5>
      {insect.fly_patterns && insect.fly_patterns.length > 0 ? (
        <div>
          {insect.fly_patterns.map((fly, index) => (
            <div key={index} className="fly-pattern">
              <p><strong>Name:</strong> {fly.name}</p>
              <p><strong>Category:</strong> {fly.category}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No fly patterns available.</p>
      )}
    </div>
  );
}

export default InsectListItem;
