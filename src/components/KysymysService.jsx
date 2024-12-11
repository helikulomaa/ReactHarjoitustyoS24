import axios from "axios";

let palvelin = 'http://localhost:8080/';

export const getKysymykset = async () => {
    try {
        const response = await axios.get(palvelin + 'kysymys/all');
        return (response.data);
    } catch (error) {
        return ({ status: 400, message: 'Haku ei onnistunut: ' + error.message });
    }
}

export const getKysymys = async (id) => {
    try {
        const response = await axios.get(palvelin + 'kysymys/' + id);
        return (response);
    } catch (error) {
        return ({ status: 400, message: 'Haku ei onnistunut: ' + error.message });
    }
}

export const addKysymys = async (kysymys) => {
    try {
        const response = await axios.post(palvelin + 'kysymys/add', kysymys, {
            headers: { 'Content-Type': 'application/json' }
        });
        return (response);
    } catch (error) {
        return ({ status: 400, message: 'Lisäys ei onnistunut: ' + error.message });
    }
}

export const deleteKysymys = async (id) => {
    try {
        const response = await axios.delete(palvelin + 'kysymys/delete/' + id);
        return (response);
    } catch (error) {
        return ({ status: error.status, message: 'Poisto ei onnistunut: ' + error.message });
    }
}

export const getVastaukset = async () => {
    try {
        const response = await axios.get(palvelin + 'vastaus/all');
        return (response);
    } catch (error) {
        return ({ status: 400, message: 'Haku ei onnistunut: ' + error.message });
    }
}

export const addVastaus = async (vastaus) => {
    try {
        const response = await axios.post(palvelin + 'vastaus/add', vastaus, {
            headers: { 'Content-Type': 'application/json' }
        });
        return (response);
    } catch (error) {
        return ({ status: 400, message: 'Lisäys ei onnistunut: ' + error.message });
    }
}

export const deleteVastaus = async (id) => {
    try {
        const response = await axios.delete(palvelin + 'vastaus/delete/' + id);
        return (response);
    } catch (error) {
        return ({ status: error.status, message: 'Poisto ei onnistunut: ' + error.message });
    }
}

export const editVastaus = async (vastaus) => {
    try {
        const response = await axios.put(palvelin + 'vastaus/muokkaa/' + vastaus.id, vastaus);
        return (response);
    } catch (error) {
        return ({ status: error.status, message: 'Muokkaus ei onnistunut: ' + error.message });
    }
}
