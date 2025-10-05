const InsectListItem = ({ insect }) => {
  return (
    <div className="insect-list-item">
      <h3>{insect.common_name}</h3>
      <p><strong>Scientific Name:</strong> {insect.scientific_name}</p>
      <p>Description {insect.description}</p>
    </div>
  );
}

export default InsectListItem;
