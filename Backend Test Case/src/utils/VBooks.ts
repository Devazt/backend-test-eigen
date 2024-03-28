import * as Joi from "joi";

export const CreateBookSchema = Joi.object({
    code: Joi.string().required(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    stock: Joi.number().required()
})

export const UpdateBookSchema = Joi.object({
    code: Joi.string(),
    title: Joi.string(),
    author: Joi.string(),
    stock: Joi.number()
})

export const BorrowBookSchema = Joi.object({
    code: Joi.string().required(),
})