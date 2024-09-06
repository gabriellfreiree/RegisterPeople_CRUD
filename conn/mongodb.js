const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb+srv://guipereira05122005:senha@aplicacao.8rmcc.mongodb.net/?retryWrites=true&w=majority&appName=Aplicacao";
const client = new MongoClient(uri);
// client.db("projeto_tap_registro").collection("users").findOne({
//     email: "gui5@email.com"
// }).then((user)=> {
//     console.log(user)
//     client.close()
// }).catch((error) => {
//     console.log(error)
// })

module.exports = client

const ProjetoBD = client.db("ProjetoBD");
const myColl = myDB.collection("users");

app.get('/cadastrar', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.post('/listar', async (req, res) => {
    const user = new users(req.body);
    await user.save();
    res.json(user);
});

// ... (rotas para atualizar e deletar)

app.put('/atualizar/:id', async (req, res) => {
    const { id } = req.params;
    const updatedUser = await users.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedUser);
});

app.delete('/excluir/:id', async (req, res) => {
    const { id } = req.params;
    await users.findByIdAndDelete(id);
    res.json({ message: 'Usuário deletado' });
});