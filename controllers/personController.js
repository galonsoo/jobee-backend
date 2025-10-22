import {
    createPerson,
    deletePerson,
    getPersonById,
    listPersons,
    listPersonsByUser,
    updatePerson,
} from "../services/personService.js";

const serializePerson = (person) => {
    if (!person) return null;

    const birthday = person.birthday ?? null;

    return {
        ...person,
        personId: person.id,
        birthYear: birthday,
        birthday,
    };
};

export const createPersonHandler = async (req, res, next) => {
    try {
        const created = await createPerson(req.body);

        return res.status(201).json({
            success: true,
            message: "Person created successfully",
            data: serializePerson(created),
        });
    } catch (error) {
        next(error);
    }
};

export const listPersonsHandler = async (_req, res, next) => {
    try {
        const persons = await listPersons();
        return res.status(200).json({
            success: true,
            data: persons.map(serializePerson),
        });
    } catch (error) {
        next(error);
    }
};

export const getPersonByIdHandler = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(400).json({ success: false, message: "Invalid person id" });
        }

        const person = await getPersonById(id);
        if (!person) {
            return res.status(404).json({ success: false, message: "Person not found" });
        }

        return res.status(200).json({
            success: true,
            data: serializePerson(person),
        });
    } catch (error) {
        next(error);
    }
};

export const listPersonsByUserHandler = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        if (!userId) {
            return res.status(400).json({ success: false, message: "Invalid user id" });
        }

        const persons = await listPersonsByUser(userId);
        return res.status(200).json({
            success: true,
            data: persons.map(serializePerson),
        });
    } catch (error) {
        next(error);
    }
};

export const updatePersonHandler = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(400).json({ success: false, message: "Invalid person id" });
        }

        const updated = await updatePerson(id, req.body);
        return res.status(200).json({
            success: true,
            message: "Person updated successfully",
            data: serializePerson(updated),
        });
    } catch (error) {
        next(error);
    }
};

export const deletePersonHandler = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(400).json({ success: false, message: "Invalid person id" });
        }

        await deletePerson(id);
        return res.status(200).json({
            success: true,
            message: "Person deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
