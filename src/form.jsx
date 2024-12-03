import { useState } from "react";

const AddForm = () => {
  const [form, setForm] = useState({ name: "", email: "" });
  const handleSubmnit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  return (
    <form
      onSubmit={(event) => {
        handleSubmnit(event);
      }}
    >
      <label htmlFor="'name">이름:</label>
      <input
        onChange={(e) => {
          handleChange(e);
        }}
        type="text"
        id="name"
        name="name"
        value={form.name}
      />
      <label htmlFor="email">이메일:</label>
      <input
        onChange={(e) => {
          handleChange(e);
        }}
        type="email"
        id="email"
        name="email"
        value={form.email}
      />
      <button>Submit</button>
      <div>{form.name}</div>
      <div>{form.email}</div>
    </form>
  );
};

export default AddForm;
