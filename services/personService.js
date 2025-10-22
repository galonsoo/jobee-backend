import prisma from "../config/db.js";

const toInt = (value, fallback = 0) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? fallback : parsed;
};

export const createPerson = async (person) => {
    const userId = toInt(person.userId, 0);
    if (!userId) {
        throw new Error("userId es obligatorio");
    }

    return prisma.person.create({
        data: {
            firstName: person.firstName || "",
            lastName: person.lastName || "",
            birthday: toInt(person.birthday ?? person.birthYear),
            Ci: toInt(person.Ci ?? person.ci),
            highSchool: person.highSchool || "",
            description: person.description || "",
            cv: person.cv || null,
            linkedin: person.linkedin || null,
            userId,
        },
    });
};

export const listPersons = async () => {
    return prisma.person.findMany();
};

export const getPersonById = async (id) => {
    return prisma.person.findUnique({ where: { id } });
};

export const listPersonsByUser = async (userId) => {
    return prisma.person.findMany({ where: { userId } });
};

export const updatePerson = async (id, data) => {
    const payload = {};

    if (data.firstName !== undefined) payload.firstName = data.firstName;
    if (data.lastName !== undefined) payload.lastName = data.lastName;
    if (data.highSchool !== undefined) payload.highSchool = data.highSchool;
    if (data.description !== undefined) payload.description = data.description;
    if (data.cv !== undefined) payload.cv = data.cv || null;
    if (data.linkedin !== undefined) payload.linkedin = data.linkedin || null;

    if (data.birthday !== undefined || data.birthYear !== undefined) {
        payload.birthday = toInt(data.birthday ?? data.birthYear);
    }

    if (data.Ci !== undefined || data.ci !== undefined) {
        payload.Ci = toInt(data.Ci ?? data.ci);
    }

    return prisma.person.update({
        where: { id },
        data: payload,
    });
};

export const deletePerson = async (id) => {
    return prisma.person.delete({ where: { id } });
};
