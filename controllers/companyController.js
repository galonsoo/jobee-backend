import {
    createCompany,
    deleteCompany,
    getCompanyById,
    listAllCompanies,
    listCompaniesByUser,
    updateCompany,
} from "../services/companyService.js";

const serializeCompany = (company) => {
    if (!company) {
        return null;
    }

    return {
        ...company,
        companyId: company.id,
    };
};

export const createCompanyHandler = async (req, res, next) => {
    try {
        const created = await createCompany(req.body);

        return res.status(201).json({
            success: true,
            message: "Company created successfully",
            data: serializeCompany(created),
        });
    } catch (error) {
        next(error);
    }
};

export const getCompanyHandler = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(400).json({ success: false, message: "Invalid company id" });
        }

        const company = await getCompanyById(id);
        if (!company) {
            return res.status(404).json({ success: false, message: "Company not found" });
        }

        return res.status(200).json({
            success: true,
            data: serializeCompany(company),
        });
    } catch (error) {
        next(error);
    }
};

export const listCompaniesByUserHandler = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        if (!userId) {
            return res.status(400).json({ success: false, message: "Invalid user id" });
        }

        const companies = await listCompaniesByUser(userId);
        return res.status(200).json({
            success: true,
            data: companies.map(serializeCompany),
        });
    } catch (error) {
        next(error);
    }
};

export const listAllCompaniesHandler = async (_req, res, next) => {
    try {
        const companies = await listAllCompanies();
        return res.status(200).json({
            success: true,
            data: companies.map(serializeCompany),
        });
    } catch (error) {
        next(error);
    }
};

export const updateCompanyHandler = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(400).json({ success: false, message: "Invalid company id" });
        }

        const updated = await updateCompany(id, req.body);
        return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            data: serializeCompany(updated),
        });
    } catch (error) {
        next(error);
    }
};

export const deleteCompanyHandler = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(400).json({ success: false, message: "Invalid company id" });
        }

        await deleteCompany(id);
        return res.status(200).json({
            success: true,
            message: "Company deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
