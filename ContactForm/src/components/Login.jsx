import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [success, setSuccess] = useState(false);
  const { name, email, message } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setFormData({ name: '', email: '', message: '' }); 
        setSuccess(true); 
        setTimeout(() => setSuccess(false), 3000);
        console.log("Success");
      } else {
        console.log('Something went wrong!');
      }
    } catch (err) {
      console.log('Error submitting the form. Please try again later.');
    } 
  };

  return (
    <div className='login'>
      <div className='child'>
        <h2 className='fs-1 fw-semibold text-black mt-2' style={{fontWeight: "800"}}>Fill The Form</h2>

        <div className="inputs mt-4">
          <form className='d-flex flex-column' style={{ width: "20em" }} onSubmit={handleSubmit}>
            <label htmlFor="Name" className='fs-5 text-black'>Name</label>
            <input
              className='border border-2 rounded-3 fs-6 px-3 mt-1'
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder='Name'
            />

            <label htmlFor="Email" className='fs-5 text-black'>Email</label>
            <input
              className='border border-2 rounded-3 fs-6 px-3 mt-1'
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder='Email'
            />

            <label htmlFor="msg" className='fs-5 mt-3 text-black'>Message</label>
            <textarea
              id="msg"
              className='border border-2 rounded-3 fs-6 px-3 mt-1'
              name="message"
              value={message}
              onChange={onChange}
              placeholder='Enter Your Message'
              rows="2"
            ></textarea>

            <button className='mt-4 mb-4 btnn rounded-5 border border-2'>Submit</button>
          </form>
          {success && (
            <div className="success-animation">
              <span className="checkmark">&#10003;</span>
              <p>Form Submitted Successfully!</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Login;