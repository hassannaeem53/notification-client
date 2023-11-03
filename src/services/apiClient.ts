import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3000/api',
});

// headers: {
//   "x-auth-token":
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlphaW5hYiIsImlhdCI6MTY5MzIzNzI4Nn0.aqBXjj__GywZaitOov61mO6InKIHhdXE0zxJLofn85k",
// },
