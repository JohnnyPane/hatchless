import hatchlessClient from "./hatchlessClient.js";
import { toPluralName, toSingularName } from "../utils/railsNames.js";


export const createApi = (resourceName) => {
  const pluralName = toPluralName(resourceName);
  const singularName = toSingularName(resourceName);

  return {
    async get ( id, params = {} ) {
      try {
        const response = await hatchlessClient.get(`/${pluralName}/${id}`, { params });
        return response.data;
      } catch (error) {
        throw new Error(`Failed to fetch ${singularName} with ID ${id}`);
      }
    },

    async query ( params = {} ) {
      try {
        const response = await hatchlessClient.get(`/${pluralName}`, { params });
        return response.data;
      } catch (error) {
        throw new Error(`Failed to query ${pluralName}`);
      }
    },

    async create ( data ) {
      const formattedData = { [singularName]: data };
      try {
        const response = await hatchlessClient.post(`/${pluralName}`, formattedData);
        return response.data;
      } catch (error) {
        throw new Error(`Failed to create ${singularName}`);
      }
    },

    async update ( id, data ) {
      const formattedData = { [singularName]: data };
      try {
        const response = await hatchlessClient.put(`/${pluralName}/${id}`, formattedData);
        return response.data;
      } catch (error) {
        throw new Error(`Failed to update ${singularName} with ID ${id}`);
      }
    },

    async delete ( id ) {
      try {
        const response = await hatchlessClient.delete(`/${pluralName}/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(`Failed to delete ${singularName} with ID ${id}`);
      }
    },

    async uploadImages (id, files) {
      const formData = new FormData();
      files.forEach(file => formData.append('images[]', file));

      const response = await hatchlessClient.post(`/${pluralName}/${id}/upload_images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    }
  }
}
