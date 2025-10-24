import InsectListItem from "./InsectListItem.jsx";

const InsectList = ({ insects }) => {
  if (!insects || insects.length === 0) {
    return <p>No insects found.</p>;
  }

  return (
    <div>
      {insects.map(insect => (
        <InsectListItem key={insect.id} insect={insect} />
      ))}
    </div>
  );
}

export default InsectList;