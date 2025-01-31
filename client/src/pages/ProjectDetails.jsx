import { useParams } from 'react-router-dom';

export default function ProjectDetails() {
  const { id } = useParams();
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Project Details</h1>
      <div className="bg-white rounded shadow p-4">
        <p>Details for project {id} will be shown here</p>
      </div>
    </div>
  );
}