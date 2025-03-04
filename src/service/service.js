import * as XLSX from "xlsx";

async function Data(filePath) {
  try {
    const response = await fetch(filePath); // Usando fetch para obter o arquivo
    const blob = await response.blob(); // Obtendo o blob do arquivo

    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = (e) => {
        try {
          const arrayBuffer = e.target.result; // Usando ArrayBuffer
          const workbook = XLSX.read(arrayBuffer, { type: "array" }); // Passando o ArrayBuffer para o XLSX

          const sheetName = workbook.SheetNames[0]; // Pega o nome da primeira planilha
          const sheet = workbook.Sheets[sheetName]; // Obtém a primeira planilha
          const jsonData = XLSX.utils.sheet_to_json(sheet); // Converte para JSON

          resolve(jsonData); // Retorna os dados JSON
        } catch (error) {
          reject("Erro ao processar o Excel: " + error.message); // Se houver erro no processamento
        }
      };

      reader.onerror = () => {
        reject("Erro ao ler o arquivo."); // Se houver erro no FileReader
      };

      reader.readAsArrayBuffer(blob); // Usando readAsArrayBuffer para ler o arquivo
    });
  } catch (error) {
    throw new Error("Erro ao buscar o arquivo Excel: " + error.message); // Se houver erro ao buscar o arquivo
  }
}

export default Data;

