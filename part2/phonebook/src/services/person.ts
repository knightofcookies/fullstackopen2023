import axios from "axios";

type newPersonObject = {
    name: string;
    phone: string;
};

const baseUrl = "http://localhost:3001/persons";

const getAllPersons = () => {
    return axios.get(baseUrl);
};

const createPerson = (newPerson: newPersonObject) => {
    return axios.post(baseUrl, newPerson);
};

const deletePerson = (id: number) => {
    return axios.delete(`${baseUrl}/${id}`);
};

export default { getAllPersons, createPerson, deletePerson };