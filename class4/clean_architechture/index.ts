import express from 'express';
import { usersController } from './infrastructure';
const app = express();
app.use(express.json());

app.post('/user/register', (req, res) => usersController.registerUser(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
