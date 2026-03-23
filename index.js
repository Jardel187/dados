const mongoose = require("mongoose");


const uri =
  "mongodb+srv://Ghost:gP3SdESEKVdI2G9u@cluster0.4jfvwr3.mongodb.net/SiteDeRock?appName=Cluster0";

async function executarCRUD() {
  try {
    await mongoose.connect(uri);
    console.log("🔥 Conectado ao MongoDB Atlas com sucesso!");

    const BandaSchema = new mongoose.Schema({
      nome: String,
      anoFormacao: Number,
      genero: String,
    });

    const Banda = mongoose.model("Banda", BandaSchema);

    const banda1 = new Banda({
      nome: "System of a Down",
      anoFormacao: 1994,
      genero: "Nu Metal",
    });
    const banda2 = new Banda({
      nome: "Avenged Sevenfold",
      anoFormacao: 1999,
      genero: "Heavy Metal",
    });
    const banda3 = new Banda({
      nome: "Linkin Park",
      anoFormacao: 1996,
      genero: "Nu Metal",
    });
    const bandaErrada = new Banda({
      nome: "Banda Falsa",
      anoFormacao: 2025,
      genero: "Pop",
    });

    await Banda.insertMany([banda1, banda2, banda3, bandaErrada]);
    console.log("✅ Bandas cadastradas no banco!");

    const todasAsBandas = await Banda.find();
    console.log("\n🎸 Lista de Bandas Cadastradas agora:");
    console.log(todasAsBandas);

    await Banda.updateOne(
      { nome: "Avenged Sevenfold" },
      { genero: "Metalcore / Heavy Metal" },
    );
    console.log("\n✏️ Gênero do Avenged Sevenfold atualizado!");

    await Banda.deleteOne({ nome: "Banda Falsa" });
    console.log("\n🗑️ Banda Falsa removida do banco de dados!");
  } catch (erro) {
    console.error("❌ Deu algum erro na conexão:", erro);
  } finally {
    mongoose.disconnect();
    console.log("\nConexão encerrada.");
  }
}

executarCRUD();
