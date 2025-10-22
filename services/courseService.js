import { pool } from "../config/db.js";
import "express-async-errors";

export async function createCourse(courseData) {
    const { title, description, duration, theme, price } = courseData;

    if (!title) {
        throw new Error("Título es obligatorio");
    }

    const durationNumber = parseInt(duration, 10) || 0;
    const priceNumber = parseInt(price, 10) || 0;

    const [result] = await pool.query(
        "INSERT INTO Course (title, description, duration, theme, price) VALUES (?, ?, ?, ?, ?)",
        [
            title,
            description || '',
            durationNumber,
            theme || 'basico',
            priceNumber,
        ]
    );

    return {
        courseId: result.insertId,
        title,
        description: description || '',
        duration: durationNumber,
        theme: theme || 'basico',
        price: priceNumber,
    };
}

export async function getAllCourses() {
    const [rows] = await pool.query("SELECT * FROM Course");
    return rows;
}

export async function getCourseById(courseId) {
    const [rows] = await pool.query("SELECT * FROM Course WHERE courseId = ?", [courseId]);
    if (rows.length === 0) throw new Error("Curso no encontrado");
    return rows[0];
}

export async function updateCourse(courseId, updates) {
    const current = await getCourseById(courseId);

    const nextValues = {
        title: updates.title || current.title,
        description: updates.description || current.description,
        duration: parseInt(updates.duration, 10) || current.duration,
        theme: updates.theme || current.theme,
        price: parseInt(updates.price, 10) || current.price,
    };

    await pool.query(
        "UPDATE Course SET title = ?, description = ?, duration = ?, theme = ?, price = ? WHERE courseId = ?",
        [
            nextValues.title,
            nextValues.description,
            nextValues.duration,
            nextValues.theme,
            nextValues.price,
            courseId,
        ]
    );

    return getCourseById(courseId);
}

export async function deleteCourse(courseId) {
    await pool.query("DELETE FROM Course WHERE courseId = ?", [courseId]);
    return { message: "Curso eliminado" };
}
