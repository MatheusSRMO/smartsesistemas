"use server";
import FormData from "form-data";

export async function uploadFile(file: Blob, fileName: string) {
  if (!file) throw new Error("Arquivo não encontrado");

  if (!process.env.TUCANO_CLOUD_SECRET || !process.env.TUCANO_CLOUD_PROJECT_ID) {
    throw new Error("Variáveis de ambiente não configuradas");
  }

  // Converte o Blob em Buffer
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  // Cria um FormData usando a lib `form-data` do Node
  const nodeFormData = new FormData();
  nodeFormData.append("file", fileBuffer, {
    filename: fileName,
    contentType: file.type,
  });
  nodeFormData.append("secret_key", process.env.TUCANO_CLOUD_SECRET);
  nodeFormData.append("project_id", process.env.TUCANO_CLOUD_PROJECT_ID);

  try {
    const response = await fetch("https://cloud.tucano.app/api/upload", {
      method: "POST",
      headers: nodeFormData.getHeaders(), 
      body: nodeFormData.getBuffer(),
    });

    if (!response.ok) {
      console.error(response);
      throw new Error("Erro ao enviar o arquivo");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao enviar o arquivo");
  }
}

export async function listFiles() {
  if (!process.env.TUCANO_CLOUD_SECRET || !process.env.TUCANO_CLOUD_PROJECT_ID) {
    throw new Error("Variáveis de ambiente não configuradas");
  }

  console.log(process.env.TUCANO_CLOUD_PROJECT_ID);
  console.log(process.env.TUCANO_CLOUD_SECRET);

  try {
    const response = await fetch(`https://cloud.tucano.app/api/list/${process.env.TUCANO_CLOUD_PROJECT_ID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error("Erro ao listar os arquivos");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao listar os arquivos");
  }
}