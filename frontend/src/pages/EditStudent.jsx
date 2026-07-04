import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`/students/${id}`);
        setName(res.data.student.name);
        setBranch(res.data.student.branch);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/students/${id}`, { name, branch });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditStudent;
