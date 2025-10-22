import prisma from "../config/db.js";

export const createCompany = async (company) => {
    const userId = parseInt(company.userId, 10);
    if (!userId) {
        throw new Error("userId es obligatorio");
    }

    return prisma.company.create({
        data: {
            rut: company.rut || "",
            name: company.name || "",
            legalReason: company.legalReason || "",
            groupName: company.groupName || "",
            subGroupName: company.subGroupName || "",
            userId,
        },
    });
};

export const getCompanyById = async (id) => {
    return prisma.company.findUnique({ where: { id } });
};

export const listCompaniesByUser = async (userId) => {
    return prisma.company.findMany({ where: { userId } });
};

export const listAllCompanies = async () => {
    return prisma.company.findMany();
};

export const updateCompany = async (id, data) => {
    const payload = {};

    if (data.rut !== undefined) payload.rut = data.rut || "";
    if (data.name !== undefined) payload.name = data.name || "";
    if (data.legalReason !== undefined) payload.legalReason = data.legalReason || "";
    if (data.groupName !== undefined) payload.groupName = data.groupName || "";
    if (data.subGroupName !== undefined) payload.subGroupName = data.subGroupName || "";
    if (data.userId !== undefined) {
        const parsedUserId = parseInt(data.userId, 10);
        if (!parsedUserId) {
            throw new Error("userId es obligatorio");
        }
        payload.userId = parsedUserId;
    }

    return prisma.company.update({ where: { id }, data: payload });
};

export const deleteCompany = async (id) => {
    return prisma.company.delete({ where: { id } });
};
