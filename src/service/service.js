import * as XLSX from "xlsx";

async function Data(filePath) {
  try {
    const response = await fetch(filePath); 
    const blob = await response.blob(); 

    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = (e) => {
        try {
          const arrayBuffer = e.target.result; 
          const workbook = XLSX.read(arrayBuffer, { type: "array" }); 

          const sheetName = workbook.SheetNames[0]; 
          const sheet = workbook.Sheets[sheetName]; 
          const jsonData = XLSX.utils.sheet_to_json(sheet); 

          resolve(jsonData); 
        } catch (error) {
          reject("Erro ao processar o Excel: " + error.message); 
        }
      };

      reader.onerror = () => {
        reject("Erro ao ler o arquivo."); 
      };

      reader.readAsArrayBuffer(blob); 
    });
  } catch (error) {
    throw new Error("Erro ao buscar o arquivo Excel: " + error.message); 
  }
}

export default Data;

